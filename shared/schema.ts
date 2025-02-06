import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

/**
 * Database schema for products table
 * Stores information about available produce items
 */
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // Either "vegetables" or "fruits"
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerKg: integer("price_per_kg").notNull(),
  minQuantity: integer("min_quantity").notNull(), // Minimum order quantity in kg
  available: boolean("available").default(true),
});

/**
 * Database schema for bulk orders
 * Tracks B2B customer orders and requirements
 */
export const bulkOrders = pgTable("bulk_orders", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  orderType: text("order_type").notNull(), // Type of produce being ordered
  message: text("message"), // Optional special requirements
  products: jsonb("products").notNull(), // Array of product IDs and quantities
});

/**
 * Database schema for newsletter subscriptions
 * Manages B2B customer communications
 */
export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  businessName: text("business_name").notNull(),
});

// Zod schemas for input validation
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertBulkOrderSchema = createInsertSchema(bulkOrders).omit({ id: true });
export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true });

// TypeScript type definitions
export type Product = typeof products.$inferSelect;
export type BulkOrder = typeof bulkOrders.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertBulkOrder = z.infer<typeof insertBulkOrderSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;

/**
 * Mock product data for development and testing
 * Provides a realistic dataset for the marketplace
 */
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
  {
    id: 3,
    name: "Fresh Lettuce",
    category: "vegetables",
    description: "Hydroponically grown lettuce, perfect for salads and sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1",
    pricePerKg: 4,
    minQuantity: 5,
    available: true,
  },
  {
    id: 4,
    name: "Bell Peppers Mix",
    category: "vegetables",
    description: "Colorful mix of red, yellow, and green bell peppers",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    pricePerKg: 5,
    minQuantity: 10,
    available: true,
  },
  {
    id: 5,
    name: "Sweet Mangoes",
    category: "fruits",
    description: "Premium mangoes perfect for restaurants and juice bars",
    imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
    pricePerKg: 6,
    minQuantity: 15,
    available: true,
  },
  {
    id: 6,
    name: "Fresh Oranges",
    category: "fruits",
    description: "Juicy citrus oranges ideal for fresh juice and culinary use",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e",
    pricePerKg: 4,
    minQuantity: 20,
    available: true,
  },
  {
    id: 7,
    name: "Fresh Tomatoes",
    category: "vegetables",
    description: "Vine-ripened tomatoes perfect for salads and cooking",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    pricePerKg: 3,
    minQuantity: 10,
    available: true,
  },
  {
    id: 8,
    name: "Green Beans",
    category: "vegetables",
    description: "Crisp and tender green beans for wholesale buyers",
    imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0",
    pricePerKg: 4,
    minQuantity: 8,
    available: true,
  },
  {
    id: 9,
    name: "Fresh Berries Mix",
    category: "fruits",
    description: "Premium mix of strawberries, blueberries, and raspberries",
    imageUrl: "https://images.unsplash.com/photo-1563583991746-31aacf353cef",
    pricePerKg: 8,
    minQuantity: 5,
    available: true,
  },
];