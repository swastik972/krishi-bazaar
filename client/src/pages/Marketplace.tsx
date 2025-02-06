import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Product } from "@shared/schema";
import ProductCard from "@/components/marketplace/ProductCard";
import BulkOrderForm from "@/components/marketplace/BulkOrderForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function Marketplace() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: [selectedCategory === "all" ? "/api/products" : `/api/products/${selectedCategory}`],
  });

  return (
    <div className="container py-16">
      <h1 className="text-4xl font-bold text-center mb-8">Marketplace</h1>
      
      <Tabs defaultValue="all" onValueChange={setSelectedCategory} className="w-full mb-8">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="vegetables">Vegetables</TabsTrigger>
          <TabsTrigger value="fruits">Fruits</TabsTrigger>
        </TabsList>
      </Tabs>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-[400px] w-full" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      <div className="mt-16">
        <BulkOrderForm />
      </div>
    </div>
  );
}
