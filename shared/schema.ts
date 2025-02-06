import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerKg: integer("price_per_kg").notNull(),
  minQuantity: integer("min_quantity").notNull(),
  available: boolean("available").default(true),
});

export const bulkOrders = pgTable("bulk_orders", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  orderType: text("order_type").notNull(),
  message: text("message"),
  products: jsonb("products").notNull(),
});

export const newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  businessName: text("business_name").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertBulkOrderSchema = createInsertSchema(bulkOrders).omit({ id: true });
export const insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type BulkOrder = typeof bulkOrders.$inferSelect;
export type Newsletter = typeof newsletters.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type InsertBulkOrder = z.infer<typeof insertBulkOrderSchema>;
export type InsertNewsletter = z.infer<typeof insertNewsletterSchema>;
