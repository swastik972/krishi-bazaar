import { useState } from "react";
import { Product } from "@shared/schema";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(product.minQuantity.toString());
  const total = parseInt(quantity) * product.pricePerKg;

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform hover:scale-105"
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-500">Price per kg</span>
            <span className="font-bold">${product.pricePerKg.toFixed(2)}</span>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-gray-500">Quantity (kg)</label>
            <Select 
              value={quantity} 
              onValueChange={setQuantity}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select quantity" />
              </SelectTrigger>
              <SelectContent>
                {[
                  product.minQuantity,
                  product.minQuantity * 2,
                  product.minQuantity * 5,
                  product.minQuantity * 10,
                ].map((qty) => (
                  <SelectItem key={qty} value={qty.toString()}>
                    {qty} kg
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-4">
        <div className="w-full flex justify-between items-center">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-lg font-bold">${total.toFixed(2)}</span>
        </div>
        <Button className="w-full" disabled={!product.available}>
          {product.available ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
