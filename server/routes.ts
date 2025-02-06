import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBulkOrderSchema, insertNewsletterSchema } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/products", async (_req, res) => {
    const products = await storage.getProducts();
    res.json(products);
  });

  app.get("/api/products/:category", async (req, res) => {
    const products = await storage.getProductsByCategory(req.params.category);
    res.json(products);
  });

  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertBulkOrderSchema.parse(req.body);
      const order = await storage.createBulkOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeNewsletter(newsletterData);
      res.status(201).json(newsletter);
    } catch (error) {
      res.status(400).json({ error: "Invalid newsletter data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
