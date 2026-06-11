/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { PRODUCTS } from "./src/data";

dotenv.config();

// Safe initialization of GoogleGenAI
let ai: GoogleGenAI | null = null;
const apiKey = process.env.GEMINI_API_KEY;

if (apiKey) {
  try {
    ai = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        }
      }
    });
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI:", err);
  }
} else {
  console.warn("GEMINI_API_KEY environment variable is not defined. AI Chatbot will run in simulation mode.");
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Global parsed body size
  app.use(express.json());

  // API Endpoint: Intelligent Chatbot Advisor
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Prepare contextual instruction for DEHA Shopping Advisor
    const catalogString = PRODUCTS.map(p => {
      const discountText = p.discountPrice ? `(Discount Price: $${p.discountPrice})` : "";
      return `Product ID: "${p.id}", Name: "${p.name}", Category: "${p.category}", Gender: "${p.gender}", Price: $${p.price} ${discountText}, Brand: "${p.brand}", Colors: [${p.colors.map(c => c.name).join(", ")}], Sizes: [${p.sizes.join(", ")}], SKU: "${p.sku}", Description: "${p.description}", Features: [${p.details.join("; ")}].`;
    }).join("\n");

    const systemInstruction = `You are a premium, elegant, and friendly AI Fashion and Lifestyle Advisor for the luxury shopping brand "DEHA".
Your personality is modern, elegant, minimalism-inspired, extremely helpful, and trustworthy.

You have access to the active product catalog of DEHA listed below:
${catalogString}

We have some active coupon codes:
- "DEHA50" gives a massive 50% discount on clothing, fashion, and general cart items (Minimum spend $80).
- "GOLD15" gives 15% off design accessories and solid brass desktop items.

YOUR GOAL:
1. Help customers discover fashion matching their style, age, gender (Men, Women, Kids), interests, or budgets.
2. Recommend ACTUAL products from the catalog above by their exact Name and Price. Speak about their colors and luxury fabrics (Mulberry Silk, Mongolian Cashmere, Italian Calfskin, Solid Brass).
3. Always remain high-end, inspiring, and concise. Never fabricate items that do not exist in the DEHA catalog above!
4. Respond in clean, elegant Markdown. Use bullet points for product recommendations. If they ask for matching suggestions (e.g. "What matches the Classic Silk Wrap Dress?"), suggest 1-2 styling accessories (e.g., the Leather Backpack or the solid Brass docks) from our catalog.`;

    if (!ai) {
      // Graceful local simulated advisor fallback if API key is not configured
      const lower = message.toLowerCase();
      let responseText = "Greetings from DEHA. I would love to guide you, but the AI key is being initialized. However, based on your request, I strongly suggest checking our elegant **Classic Silk Wrap Dress** or our **Aura Vegan Leather iPhone Case**! Would you like me to tell you more about these items?";
      
      if (lower.includes("dress") || lower.includes("women") || lower.includes("silk") || lower.includes("wrap")) {
        responseText = "Our **Classic Silk Wrap Dress** ($189.00, currently on sale for **$159.00**) would look absolutely remarkable on you. Fabricated in 100% genuine Mulberry silk with an adjustable tie. We recommend pairing it with the **Saddle Tan Leather Backpack** ($340.00) for a timeless, elegant urban look. Shall I add it to your shopping cart?";
      } else if (lower.includes("phone") || lower.includes("iphone") || lower.includes("case") || lower.includes("accessories")) {
        responseText = "For phone lovers, our **Aura Vegan Leather iPhone Case** ($49.00, on promo for **$39.00**) features fully protective recycled TPU bumpers layered with premium pebbled leather and support for MagSafe. You can also pair it on your desk with the heavy **Solid Brass Magnetic Charging Dock** ($89.00). Perfect for hands-free view times.";
      } else if (lower.includes("men") || lower.includes("sweater") || lower.includes("knit") || lower.includes("mockneck")) {
        responseText = "For Men's styling, the **Architect Ribbed Mockneck Sweater** ($135.00) crafted from Merino Wool and GOTS Certified Cotton provides a crisp, elegant outline. Perfect for office-to-dinner transitions. You could also complement it with the raw indigo **Japanese Selvedge Denim Jacket** ($195.00). Would you like to review these sizes?";
      } else if (lower.includes("kids") || lower.includes("baby") || lower.includes("children")) {
        responseText = "For kids, our signature **Organic Cotton Unisex Overalls** ($45.00) are woven in GOTS waffle-knit cotton to ensure absolutely zero skin friction. Very adjust-friendly with natural wood shoulder buttons. Perfect for age-conscious styling!";
      } else if (lower.includes("discount") || lower.includes("sale") || lower.includes("offer") || lower.includes("coupon")) {
        responseText = "We have wonderful current promotions! Use code **DEHA50** at checkout for 50% off select attire with any spend over $80. You can also apply **GOLD15** to receive 15% off all luxury metallic accessories! Let me know if you would like me to detail these products.";
      }

      return res.json({ responseText });
    }

    try {
      // Reconstruct simple chat messages for GoogleGenAI
      const contentParts: { role: string; parts: { text: string }[] }[] = [];
      
      // Incorporate short chat history context
      if (Array.isArray(history)) {
        history.slice(-8).forEach((h: { sender: string; text: string }) => {
          contentParts.push({
            role: h.sender === "user" ? "user" : "model",
            parts: [{ text: h.text }]
          });
        });
      }

      contentParts.push({
        role: "user",
        parts: [{ text: message }]
      });

      // Call Gemini Model using current @google/genai specifications
      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: contentParts.map(cp => ({
          role: cp.role,
          parts: cp.parts
        })),
        config: {
          systemInstruction: systemInstruction,
          temperature: 0.75,
        }
      });

      const responseText = response.text || "I am terribly sorry, I could not formulate a response. How else may I guide your DEHA experience?";
      return res.json({ responseText });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      return res.status(500).json({ error: err?.message || "An error occurred with our AI Shopping Assistant." });
    }
  });

  // Vite development vs production serving
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // SPA fallback route
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`DEHA Server serving on http://localhost:${PORT}`);
  });
}

startServer();
