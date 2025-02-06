import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "@shared/schema";
import ProductCard from "@/components/marketplace/ProductCard";
import BulkOrderForm from "@/components/marketplace/BulkOrderForm";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type SortOption = "price-asc" | "price-desc" | "name-asc" | "name-desc";

export default function Marketplace() {
  const [sortBy, setSortBy] = useState<SortOption>("price-asc");

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const sortProducts = (productsToSort: Product[]) => {
    return [...productsToSort].sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.pricePerKg - b.pricePerKg;
        case "price-desc":
          return b.pricePerKg - a.pricePerKg;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  };

  const vegetables = sortProducts(products.filter(p => p.category === "vegetables"));
  const fruits = sortProducts(products.filter(p => p.category === "fruits"));

  return (
    <div className="container py-16">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Marketplace</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Browse our selection of fresh, farm-direct produce available for bulk purchase.
          Enjoy quantity-based discounts and guaranteed quality.
        </p>
      </div>

      <div className="flex justify-end mb-8">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="name-asc">Name: A to Z</SelectItem>
            <SelectItem value="name-desc">Name: Z to A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[500px] w-full" />
          ))}
        </div>
      ) : (
        <div className="space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🥬</span> Fresh Vegetables
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vegetables.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-3xl">🍎</span> Fresh Fruits
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {fruits.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      )}

      <div className="mt-16">
        <BulkOrderForm />
      </div>
    </div>
  );
}