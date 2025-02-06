import { Product } from "@shared/schema";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Organic Carrots",
    category: "vegetables",
    description: "Fresh organic carrots perfect for restaurants and catering",
    imageUrl: "https://images.unsplash.com/photo-1620987278429-ab178d6eb547",
    pricePerKg: 2,
    minQuantity: 10,
    available: true,
  },
  {
    id: 2,
    name: "Premium Apples",
    category: "fruits",
    description: "Crisp and sweet apples sourced directly from local orchards",
    imageUrl: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908",
    pricePerKg: 3,
    minQuantity: 20,
    available: true,
  },
  // Add more mock products...
];

export const partnerServices = [
  {
    id: 1,
    title: "Bulk Seed & Equipment Supply",
    description: "Quality seeds and modern farming equipment for optimal yield",
    icon: "🌱",
  },
  {
    id: 2,
    title: "Water & Irrigation Solutions",
    description: "Smart irrigation systems for efficient water management",
    icon: "💧",
  },
  // Add more partner services...
];
