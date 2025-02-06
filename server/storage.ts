import { Product, InsertProduct, BulkOrder, InsertBulkOrder, Newsletter, InsertNewsletter, mockProducts } from "@shared/schema";

/**
 * Storage interface defining the contract for data operations
 * Allows for different storage implementations (memory, database, etc.)
 */
export interface IStorage {
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createBulkOrder(order: InsertBulkOrder): Promise<BulkOrder>;
  subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter>;
}

/**
 * In-memory storage implementation for development and testing
 * Uses Map objects to store data with automatic ID generation
 */
export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private orders: Map<number, BulkOrder>;
  private newsletters: Map<number, Newsletter>;
  private currentProductId: number;
  private currentOrderId: number;
  private currentNewsletterId: number;

  constructor() {
    // Initialize storage maps
    this.products = new Map();
    this.orders = new Map();
    this.newsletters = new Map();

    // Initialize ID counters
    this.currentProductId = 1;
    this.currentOrderId = 1;
    this.currentNewsletterId = 1;

    // Populate with mock products
    mockProducts.forEach(product => {
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
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  /**
   * Get products filtered by category
   * @param category - Product category ("vegetables" or "fruits")
   * @returns Promise<Product[]> Array of filtered products
   */
  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(
      (product) => product.category === category
    );
  }

  /**
   * Create a new bulk order
   * @param order - Order details from the customer
   * @returns Promise<BulkOrder> Created order with generated ID
   */
  async createBulkOrder(order: InsertBulkOrder): Promise<BulkOrder> {
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
  async subscribeNewsletter(newsletter: InsertNewsletter): Promise<Newsletter> {
    const id = this.currentNewsletterId++;
    const newNewsletter = { ...newsletter, id };
    this.newsletters.set(id, newNewsletter);
    return newNewsletter;
  }
}

// Export singleton instance
export const storage = new MemStorage();