/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, Review, BlogItem, FAQItem, PromoDeal } from "./types";

export const PRODUCTS: Product[] = [
  // WOMEN'S FASHION
  {
    id: "w-1",
    name: "Classic Silk Wrap Dress",
    description: "Crafted from 100% natural Mulberry silk fluid drape, featuring an adjustable waist tie and subtle balloon sleeves. The epitome of effortless day-to-night transitions.",
    details: [
      "100% Mulberry Silk",
      "True wraps-around fit with interior button securing",
      "Long sleeves with small elasticated cuffs",
      "Dry clean only",
      "Designed in Copenhagen"
    ],
    price: 189.00,
    discountPrice: 159.00,
    rating: 4.8,
    ratingCount: 124,
    images: [
      "https://files.catbox.moe/jfa4ng.webp",
      "https://files.catbox.moe/d39kbm.webp"
    ],
    category: "Fashion",
    gender: "Women",
    brand: "DEHA Atelier",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Emerald Green", hex: "#0F52BA" },
      { name: "Creamy White", hex: "#FDFDFD" },
      { name: "Noir Black", hex: "#111111" }
    ],
    inStock: true,
    material: "Mulberry Silk",
    sku: "DH-W-DRS-001",
    isBestSeller: true
  },
  {
    id: "w-2",
    name: "Butter yellow maxi dress",
    description: "Incredibly soft, heavy-gauge premium Mongolian cashmere. Dropped shoulders, relaxed drape, and ribbed neck trim for maximum comfort and style.",
    details: [
      "100% Mongolian Cashmere",
      "Ribbed crewneck, cuffs, and drop-tail hem",
      "Heavyweight thermal luxury",
      "Loose fit, size down for traditional silhouette",
      "Sustainable premium yarn tracing"
    ],
    price: 210.00,
    rating: 4.9,
    ratingCount: 88,
    images: [
      "https://files.catbox.moe/d39kbm.webp",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Fashion",
    gender: "Women",
    brand: "DEHA Originals",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Oatmeal Beige", hex: "#D2B48C" },
      { name: "Slate Grey", hex: "#708090" },
      { name: "Charcoal Blue", hex: "#1C3144" }
    ],
    inStock: true,
    material: "Cashmere",
    sku: "DH-W-KNT-002"
  },
  {
    id: "w-3",
    name: "Deconstructed Wool Blazer",
    description: "Slightly structured tailored blazer in fine high-twist luxury virgin wool. Minimal internal padding creates a light, breathable cover with sharp lapels.",
    details: [
      "80% Pure Virgin Wool, 20% Technical Wool Blend",
      "Acetate silk lining for effortless sliding",
      "Two flap pockets, single vent back",
      "Relaxed double-breasted tailoring",
      "Responsibly tanned horn buttons"
    ],
    price: 245.00,
    discountPrice: 195.00,
    rating: 4.7,
    ratingCount: 65,
    images: [
      "https://www.magnific.com/photos/woman",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Fashion",
    gender: "Women",
    brand: "DEHA Atelier",
    sizes: ["XS", "S", "M", "L"],
    colors: [
      { name: "Mocha", hex: "#4E3629" },
      { name: "Midnight Noir", hex: "#1A1A1A" }
    ],
    inStock: true,
    material: "Virgin Wool",
    sku: "DH-W-BLZ-003",
    isBestSeller: true
  },

  // MEN'S FASHION
  {
    id: "m-1",
    name: "Architect Ribbed Mockneck Sweater",
    description: "A modern wardrobe cornerstone engineered with breathable organic cotton and Merino wool ribbing. Holds shape beautifully for a structured outline.",
    details: [
      "60% Merino Wool, 40% GOTS Cert Organic Cotton",
      "5-gauge flat rib knit pattern",
      "Form-fitting mockneck collar",
      "Resilient stretch cuffs and hem",
      "Hypoallergenic and temperature-regulating"
    ],
    price: 135.00,
    rating: 4.7,
    ratingCount: 95,
    images: [
      "https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop"
    ],
    category: "New Arrivals",
    gender: "Men",
    brand: "DEHA Originals",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Ink Black", hex: "#0E0E0E" },
      { name: "Pebble Tan", hex: "#C2B280" },
      { name: "Forest Tint", hex: "#1E3F20" }
    ],
    inStock: true,
    material: "Merino Cotton Blend",
    sku: "DH-M-SWT-004",
    isBestSeller: true
  },
  {
    id: "m-2",
    name: "Japanese Selvedge Denim Jacket",
    description: "Unwashed pristine raw denim meticulously woven in Kojima, Japan. Details custom DEHA copper rivet buttons and standard dual front pockets. Will age uniquely.",
    details: [
      "14oz Pure Japanese Raw Selvedge Denim",
      "Deep indigo shade displaying red-line selvedge seam",
      "Embossed copper button adjustments",
      "Grows softer and moulds to body with continuous wear",
      "Proudly woven using traditional shuttle looms"
    ],
    price: 195.00,
    discountPrice: 175.00,
    rating: 4.9,
    ratingCount: 54,
    images: [
      "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Trending",
    gender: "Men",
    brand: "DEHA Atelier",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Indiglo Indigo", hex: "#152238" },
      { name: "Stashed Grey", hex: "#2F4F4F" }
    ],
    inStock: true,
    material: "Kojima Selvedge Denim",
    sku: "DH-M-DEN-005"
  },
  {
    id: "m-3",
    name: "The Essential Trench Coat",
    description: "Premium tailored heavy gabardine trench coat. High-collar design, secure metal belt buckle closure, double-breasted button panels for wind resistance and class.",
    details: [
      "High-density water-resistant Gabardine cotton",
      "Signature double-breasted storm flap jacket cover",
      "Interior zip secure passports/phone pockets",
      "Traditional sleeve straps and button epaulets",
      "Elegant silk satin matching liner"
    ],
    price: 299.00,
    rating: 4.6,
    ratingCount: 38,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544923246-77307dd654cb?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Fashion",
    gender: "Men",
    brand: "DEHA Atelier",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Luxury Camel", hex: "#C19A6B" },
      { name: "Caviar Black", hex: "#16161D" }
    ],
    inStock: true,
    material: "Gabardine Cotton",
    sku: "DH-M-TRN-006"
  },

  // KIDS' FASHION
  {
    id: "k-1",
    name: "kids frock",
    description: "Ultra-comfortable lightweight overalls in certified GOTS organic waffle-knit cotton. Stretch side bands and sturdy wood buttons for super simple diaper swaps.",
    details: [
      "100% Certified Organic Waffle Cotton",
      "Easy wood adjustment button shoulder straps",
      "No internal tags or sharp zippers to ensure zero skin rub",
      "Reinforced heavy kneepads",
      "Eco-safe non-toxic pastels"
    ],
    price: 45.00,
    rating: 4.8,
    ratingCount: 42,
    images: [
      "https://files.catbox.moe/zrqqui.jpg",
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Fashion",
    gender: "Kids",
    brand: "DEHA Mini",
    sizes: ["6M", "12M", "18M", "2T", "4T"],
    colors: [
      { name: "Soft Sage", hex: "#9CABA1" },
      { name: "Honey Mustard", hex: "#E3A857" },
      { name: "Dusty Peach", hex: "#F3D3C4" }
    ],
    inStock: true,
    material: "Organic Cotton",
    sku: "DH-K-OVH-007"
  },

  // ACCESSORIES (Fashion & Phone Accessories)
  {
    id: "a-1",
    name: "Aura Vegan Leather iPhone Case",
    description: "Premium biodegradable pebbled vegan leather protective case with MagSafe magnetic ring matrix. Tailored solid milled aluminum button shields.",
    details: [
      "Tough eco-conscious biodegradable recycled TPU bumper case",
      "Fully layered pebbled vegan composite finish",
      "Enriched MagSafe alignment arrays supporting 15W swift charges",
      "Slightly raised camera cluster rim protecting delicate glass profile",
      "Anti-scratch velvet micro-fiber soft liner"
    ],
    price: 49.00,
    discountPrice: 39.00,
    rating: 4.8,
    ratingCount: 198,
    images: [
      "https://images.unsplash.com/photo-1601597111158-2fceff270190?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Accessories",
    gender: "Unisex",
    brand: "DEHA Tech",
    sizes: ["iPhone 15 Pro", "iPhone 15 Pro Max", "iPhone 16 Pro", "iPhone 16 Pro Max"],
    colors: [
      { name: "Warm Chestnut", hex: "#7E5835" },
      { name: "Forest Green", hex: "#224A32" },
      { name: "Sleek Midnight", hex: "#1C1C1E" }
    ],
    inStock: true,
    material: "Biodegradable Vegan Leather",
    sku: "DH-A-IPH-008",
    isBestSeller: true
  },
  {
    id: "a-2",
    name: "Solid Brass Magnetic Charging Dock",
    description: "Extravagant bedside minimalist desktop stand casted in single blocks of premium solid sand-blasted brass. Heavy stable alignment holding phone in standard portrait or landsat mode.",
    details: [
      "Heavy premium weight solid lead-free C360 Brass",
      "Silicone base traction preventing desktop slippage",
      "Compatible with internal mag components",
      "Grows dynamic beautiful rich copper patina finish",
      "45-degree angle perfect for video streaming or alarm viewing"
    ],
    price: 89.00,
    rating: 4.9,
    ratingCount: 74,
    images: [
      "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Accessories",
    gender: "Unisex",
    brand: "DEHA Tech",
    sizes: ["Universal Stand"],
    colors: [
      { name: "Mirror Polished Brass", hex: "#D4AF37" }
    ],
    inStock: true,
    material: "C360 Brass & Silicone",
    sku: "DH-A-CHG-009"
  },
  {
    id: "a-3",
    name: "The Chronicle Leather Backpack",
    description: "Finely assembled top-grain Italian calfskin waterproof backpack. Dedicated laptop capsule, custom matte gold rivets, and orthotics-approved ergonomic padded belt lines.",
    details: [
      "Full-Grain Italian Calfskin leather with weatherproofing",
      "Fitted pocket for up to 16-inch laptops",
      "Solid milled premium custom brass zippers",
      "Backside hidden sleeve for smart luggage handles",
      "Breathable high-mesh lumbar support grid"
    ],
    price: 340.00,
    rating: 4.9,
    ratingCount: 112,
    images: [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Accessories",
    gender: "Unisex",
    brand: "DEHA Atelier",
    sizes: ["One Size"],
    colors: [
      { name: "Saddle Tan", hex: "#8B5A2B" },
      { name: "Deep Navy Blue", hex: "#000080" },
      { name: "Obsidian Black", hex: "#000000" }
    ],
    inStock: true,
    material: "Full-Grain Leather",
    sku: "DH-A-BPK-010",
    isBestSeller: true
  },

  // LIFESTYLE
  {
    id: "l-1",
    name: "Nordic Ceramic Scented Candle Set",
    description: "Unpolished stoneware pottery candle pots. Scented with pure natural botanical pine resins and cold-pressed lavender oils. Perfect for therapeutic modern living rooms.",
    details: [
      "Organic soy waxes with zero synthetic chemical traces",
      "Wooden wicks that double as comfortable calming cracklers",
      "Includes 3 distinct scents: Fjord Pine, Sandalwood, Lavender Mist",
      "Tenth-generation handcrafted natural ceramic stoneware vessels",
      "Clean 45-hour steady environment burning cycle"
    ],
    price: 65.00,
    rating: 4.8,
    ratingCount: 140,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1602872030219-0ec6def7a3be?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Lifestyle",
    gender: "Unisex",
    brand: "DEHA Living",
    sizes: ["Standard Set (3x 120g)"],
    colors: [
      { name: "Stoneware Charcoal", hex: "#3A3A3A" },
      { name: "Sand Beige", hex: "#ECE2D0" }
    ],
    inStock: true,
    material: "Organic Soy Wax & Stoneware",
    sku: "DH-L-CDL-011"
  },
  {
    id: "l-2",
    name: "Architect Fine Linen Journal",
    description: "Hardbound designer drawing journal in heavy organic linen fabric, packed with premium heavyweight unruled cream cotton paper suited for fountain pens.",
    details: [
      "Natural premium woven organic linen cover fabric",
      "160 pages of 120gsm unruled cotton bleed-proof sheets",
      "Stitched lay-flat binding structure",
      "Includes expandable pocket and dual raw silk ribbons",
      "Responsibly milled FSC-certified archival stock"
    ],
    price: 32.00,
    rating: 4.7,
    ratingCount: 76,
    images: [
      "https://images.unsplash.com/photo-1531346878377-a5ec20888e57?q=80&w=800&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=800&auto=format&fit=crop"
    ],
    category: "Lifestyle",
    gender: "Unisex",
    brand: "DEHA Living",
    sizes: ["A5"],
    colors: [
      { name: "Flaxen Grey", hex: "#C8C2BC" },
      { name: "Hunter Green", hex: "#355E3B" }
    ],
    inStock: true,
    material: "Linen & Recycled Cotton Paper",
    sku: "DH-L-JRN-012"
  }
];

export const BLOGS: BlogItem[] = [
  {
    id: "b-1",
    title: "The Art of Slow Fashion: How to Curate a Long-Lasting Capsule Wardrobe",
    category: "Style Guides",
    excerpt: "Transitioning to a minimalist lifestyle begins at your hangers. Uncover our structural guide to premium essentials that stay relevant across decades.",
    content: "When curating a capsule wardrobe, the goal is versatility, high-grade structural fabric longevity, and silhouette elegance. Rather than purchasing disposable micro-trends, investing in top-tier foundation items—such as a Cashmere Knit mockneck, deep Indigo Japanese Raw Denim, or a tailored Virgin Wool Blazer—allows you to craft upwards of 40 distinctive, powerful looks with less than 12 total items.\n\nNext time you shop, ask yourself: Can I wear this next season? Will the dye hold through thirty gentle cold-washes? At DEHA, we prioritize this standard of longevity by hand-selecting biological fibers like GOTS organic cotton and authentic Mulberry silk, ensuring your investments persist gracefully.",
    author: "Elena Vasquez (Creative Director)",
    date: "June 1, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: "b-2",
    title: "A Desk Transformed: Crafting a Modern Aesthetic Workspace",
    category: "Lifestyle Tips",
    excerpt: "The psychological connection between clean desk environments and rapid creative focus. Exploring raw timber, authentic brass, and modular design.",
    content: "Our workspaces directly influence our subconscious anxiety levels and long-term focus. Incorporating raw, heavy architectural items like cast brass bases, natural linen journals, and gentle pine wax aromas anchors the body securely to the ground during intense Zoom streams or code pushes.\n\nMinimal desktop setups clear visual clutter: swap dynamic neon cables for singular clean docks, keep your screen at direct viewport eye level, and ensure natural light diffuses smoothly through workspace windows to relieve visual fatigue.",
    author: "Marc Henderson (Lifestyle Lead)",
    date: "May 25, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=800&auto=format&fit=crop"
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "f-1",
    question: "What makes DEHA's materials different?",
    answer: "Every single fabric layer at DEHA is meticulously inspected and sustainably sourced. We specify fully traceable materials: Mongolian virgin cashmere, Japanese selvedge denim woven on vintage shuttle looms, and GOTS-certified organic cotton. This prevents chemical run-offs and preserves deep rich skin comfort.",
    category: "Orders"
  },
  {
    id: "f-2",
    question: "How fast is express delivery?",
    answer: "We support fully secure international express logistics. For domestic urban locations, deliveries take strictly 1 to 2 business days. Standard secure delivery takes 3 to 5 business days. Accurate real-time delivery timers are generated at checkout depending on your local ZIP coordinate.",
    category: "Shipping"
  },
  {
    id: "f-3",
    question: "Do you have an easy return policy?",
    answer: "Yes, we guarantee complete peace of mind. Every product arrives with a prepaid security returns slip valid for 30 full days after delivery. Simply place the items back in their native unblemished packaging box and drop off at your nearest global postage partner.",
    category: "Returns"
  },
  {
    id: "f-4",
    question: "What phone devices fit the Aura Vegan Leather case?",
    answer: "The Aura Vegan Leather case is custom-engineered and precision-moulded with solid metal buttons to fit Apple iPhone 15 Pro, iPhone 15 Pro Max, iPhone 16 Pro, and iPhone 16 Pro Max perfectly, ensuring full unhindered MagSafe charger connectivity.",
    category: "Account"
  }
];

export const PROMO_DEALS: PromoDeal[] = [
  {
    id: "d-1",
    code: "DEHA50",
    title: "Exclusive Welcome Promotion",
    description: "Get 50% off of accessories, fashion lines, and premium styling for our seasonal welcome period.",
    discountPercent: 50,
    expiryDate: "June 25, 2026",
    minimumSpend: 80.00
  },
  {
    id: "d-2",
    code: "GOLD15",
    title: "Premium Accessories Special",
    description: "Enrich your desk or device with 15% off all genuine leather and heavy C360 solid brass items.",
    discountPercent: 15,
    expiryDate: "June 18, 2026",
    minimumSpend: 40.00
  }
];

export const MOCK_REVIEWS: Review[] = [
  {
    id: "r-1",
    author: "Charlotte Dubois",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    title: "The wrap dress is pure art",
    comment: "This is easily one of the most elegant dresses I've ever put on. The Mulberry silk feels cool, heavy, and extremely luxurious. Exceeds Zara Atelier or other high-street labels completely.",
    date: "June 05, 2026",
    verified: true,
    helpfulCount: 28
  },
  {
    id: "r-2",
    author: "Richard K.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
    rating: 5,
    title: "Heavy and stable charging stand",
    comment: "Absolutely gorgeous brass work on this dock. It is phenomenally heavy (doesn't slide!) and has matched my executive study desk layout wonderfully. Will buy the Aura phone case next.",
    date: "May 28, 2026",
    verified: true,
    helpfulCount: 14
  }
];
