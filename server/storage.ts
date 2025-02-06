import { Product, InsertProduct, BulkOrder, InsertBulkOrder, Newsletter, InsertNewsletter } from "@shared/schema";

export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createBulkOrder(order: InsertBulkOrder): Promise<BulkOrder>;
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, BulkOrder>;
  private newsletters: Map<number, Newsletter>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentNewsletterId: number;

  constructor() {
    this.products = new Map();
    this.orders = new Map();
    this.newsletters = new Map();
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentNewsletterId = 1;
  }

  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  async createBulkOrder(order: InsertBulkOrder): Promise<BulkOrder> {
    const id = this.currentOrderId++;
    const newOrder = { ...order, id };
    this.orders.set(id, newOrder);
    return newOrder;
  }

  async subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newNewsletter = { ...newsletter, id };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
}

export const storage = new MemStorage();
