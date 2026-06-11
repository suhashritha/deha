/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  description: string;
  details: string[];
  price: number;
  discountPrice?: number; // Promo/discount price
  rating: number;
  ratingCount: number;
  images: string[];
  category: "Fashion" | "Accessories" | "Lifestyle" | "New Arrivals" | "Trending";
  gender: "Men" | "Women" | "Kids" | "Unisex";
  brand: string;
  sizes: string[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  material: string;
  sku: string;
  isBestSeller?: boolean;
}

export interface Review {
  id: string;
  author: string;
  avatar?: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verified: boolean;
  helpfulCount: number;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: "Orders" | "Shipping" | "Returns" | "Payments" | "Account";
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
}

export interface PromoDeal {
  id: string;
  code: string;
  title: string;
  description: string;
  discountPercent: number;
  expiryDate: string; // ISO or human-readable for timers
  minimumSpend: number;
}
