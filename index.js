// server/index.ts
import express2 from "express";

// server/routes.ts
import { createServer } from "http";

// shared/schema.ts
import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
var products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  // Either "vegetables" or "fruits"
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  pricePerKg: integer("price_per_kg").notNull(),
  minQuantity: integer("min_quantity").notNull(),
  // Minimum order quantity in kg
  available: boolean("available").default(true)
});
var bulkOrders = pgTable("bulk_orders", {
  id: serial("id").primaryKey(),
  businessName: text("business_name").notNull(),
  contactPerson: text("contact_person").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  orderType: text("order_type").notNull(),
  // Type of produce being ordered
  message: text("message"),
  // Optional special requirements
  products: jsonb("products").notNull()
  // Array of product IDs and quantities
});
var newsletters = pgTable("newsletters", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  businessName: text("business_name").notNull()
});
var insertProductSchema = createInsertSchema(products).omit({ id: true });
var insertBulkOrderSchema = createInsertSchema(bulkOrders).omit({ id: true });
var insertNewsletterSchema = createInsertSchema(newsletters).omit({ id: true });
var mockProducts = [
  {
    id: 1,
    name: "Organic Carrots",
    category: "vegetables",
    description: "Fresh organic carrots perfect for restaurants and catering",
    imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    pricePerKg: 50,
    minQuantity: 10,
    available: true
  },
  {
    id: 2,
    name: "Premium Apples",
    category: "fruits",
    description: "Crisp and sweet apples sourced directly from local orchards",
    imageUrl: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1560806887-1e4cd0b6cbd6%3Fixlib%3Drb-1.2.1%26w%3D1000%26q%3D80&f=1&nofb=1&ipt=11a0ece5543e1a1993dd792920302b64471b9f557d2848ce57eb75e3c084dd43&ipo=images",
    pricePerKg: 100,
    minQuantity: 20,
    available: true
  },
  {
    id: 3,
    name: "Fresh Lettuce",
    category: "vegetables",
    description: "Hydroponically grown lettuce, perfect for salads and sandwiches",
    imageUrl: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1",
    pricePerKg: 50,
    minQuantity: 5,
    available: true
  },
  {
    id: 4,
    name: "Bell Peppers Mix",
    category: "vegetables",
    description: "Colorful mix of red, yellow, and green bell peppers",
    imageUrl: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83",
    pricePerKg: 80,
    minQuantity: 10,
    available: true
  },
  {
    id: 5,
    name: "Sweet Mangoes",
    category: "fruits",
    description: "Premium mangoes perfect for restaurants and juice bars",
    imageUrl: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716",
    pricePerKg: 100,
    minQuantity: 15,
    available: true
  },
  {
    id: 6,
    name: "Fresh Oranges",
    category: "fruits",
    description: "Juicy citrus oranges ideal for fresh juice and culinary use",
    imageUrl: "https://images.unsplash.com/photo-1547514701-42782101795e",
    pricePerKg: 80,
    minQuantity: 20,
    available: true
  },
  {
    id: 7,
    name: "Fresh Tomatoes",
    category: "vegetables",
    description: "Vine-ripened tomatoes perfect for salads and cooking",
    imageUrl: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea",
    pricePerKg: 50,
    minQuantity: 10,
    available: true
  },
  {
    id: 8,
    name: "Green Beans",
    category: "vegetables",
    description: "Crisp and tender green beans for wholesale buyers",
    imageUrl: "https://images.unsplash.com/photo-1567375698348-5d9d5ae99de0",
    pricePerKg: 50,
    minQuantity: 8,
    available: true
  },
  {
    id: 9,
    name: "Fresh Berries Mix",
    category: "fruits",
    description: "Premium mix of strawberries, blueberries, and raspberries",
    imageUrl: "https://wallpapercave.com/wp/wp4079878.jpg",
    pricePerKg: 70,
    minQuantity: 5,
    available: true
  }
];

// server/storage.ts
var MemStorage = class {
  products;
  orders;
  newsletters;
  currentProductId;
  currentOrderId;
  currentNewsletterId;
  constructor() {
    this.products = /* @__PURE__ */ new Map();
    this.orders = /* @__PURE__ */ new Map();
    this.newsletters = /* @__PURE__ */ new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentNewsletterId = 1;
    mockProducts.forEach((product) => {
      this.products.set(product.id, product);
      if (product.id >= this.currentProductId) {
        this.currentProductId = product.id + 1;
      }
    });
  }
  /**
   * Retrieve all available products
   * @returns Promise<Product[]> Array of all products
   */
  async getProducts() {
    return Array.from(this.products.values());
  }
  /**
   * Get products filtered by category
   * @param category - Product category ("vegetables" or "fruits")
   * @returns Promise<Product[]> Array of filtered products
   */
  async getProductsByCategory(category) {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }
  /**
   * Create a new bulk order
   * @param order - Order details from the customer
   * @returns Promise<BulkOrder> Created order with generated ID
   */
  async createBulkOrder(order) {
    const id = this.currentOrderId++;
    const newOrder = { ...order, id, message: order.message || null };
    this.orders.set(id, newOrder);
    return newOrder;
  }
  /**
   * Subscribe to newsletter
   * @param newsletter - Newsletter subscription details
   * @returns Promise<Newsletter> Created subscription with generated ID
   */
  async subscribeNewsletter(newsletter) {
    const id = this.currentNewsletterId++;
    const newNewsletter = { ...newsletter, id };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
};
var storage = new MemStorage();

// server/routes.ts
function registerRoutes(app2) {
  app2.get("/api/products", async (_req, res) => {
    const products2 = await storage.getProducts();
    res.json(products2);
  });
  app2.get("/api/products/:category", async (req, res) => {
    const products2 = await storage.getProductsByCategory(req.params.category);
    res.json(products2);
  });
  app2.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertBulkOrderSchema.parse(req.body);
      const order = await storage.createBulkOrder(orderData);
      res.status(201).json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });
  app2.post("/api/newsletter", async (req, res) => {
    try {
      const newsletterData = insertNewsletterSchema.parse(req.body);
      const newsletter = await storage.subscribeNewsletter(newsletterData);
      res.status(201).json(newsletter);
    } catch (error) {
      res.status(400).json({ error: "Invalid newsletter data" });
    }
  });
  const httpServer = createServer(app2);
  return httpServer;
}

// server/vite.ts
import express from "express";
import fs from "fs";
import path2, { dirname as dirname2 } from "path";
import { fileURLToPath as fileURLToPath2 } from "url";
import { createServer as createViteServer, createLogger } from "vite";

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import themePlugin from "@replit/vite-plugin-shadcn-theme-json";
import path, { dirname } from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
import { fileURLToPath } from "url";
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), runtimeErrorOverlay(), themePlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
      "@shared": path.resolve(__dirname, "shared")
    }
  },
  root: path.resolve(__dirname, "client"),
  build: {
    outDir: path.resolve(__dirname, "dist/public"),
    emptyOutDir: true
  },
  base: "/krishi-bazaar"
});

// server/vite.ts
import { nanoid } from "nanoid";
var __filename2 = fileURLToPath2(import.meta.url);
var __dirname2 = dirname2(__filename2);
var viteLogger = createLogger();
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        __dirname2,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(__dirname2, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}

// server/index.ts
var app = express2();
app.use(express2.json());
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  const server = registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    throw err;
  });
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }
  const PORT = 5e3;
  server.listen(PORT, "0.0.0.0", () => {
    log(`serving on port ${PORT}`);
  });
})();
