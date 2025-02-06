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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(product.minQuantity.toString());
  const total = parseInt(quantity) * product.pricePerKg;

  // Calculate bulk pricing tiers
  const tiers = [
    { quantity: product.minQuantity, discount: 0 },
    { quantity: product.minQuantity * 5, discount: 5 },
    { quantity: product.minQuantity * 10, discount: 10 },
    { quantity: product.minQuantity * 20, discount: 15 },
  ];

  const currentTier = tiers.reduce((acc, tier) => {
    if (parseInt(quantity) >= tier.quantity) {
      return tier;
    }
    return acc;
  }, tiers[0]);

  const discountedPrice = product.pricePerKg * (1 - currentTier.discount / 100);
  const finalTotal = parseInt(quantity) * discountedPrice;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        <div className="aspect-square overflow-hidden relative">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
          {!product.available && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg">
                Out of Stock
              </Badge>
            </div>
          )}
        </div>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <Badge variant="outline">{product.category}</Badge>
          </div>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Base price per kg</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="font-bold">
                      ${product.pricePerKg.toFixed(2)}
                      {currentTier.discount > 0 && (
                        <Badge variant="secondary" className="ml-2">
                          -{currentTier.discount}%
                        </Badge>
                      )}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Bulk discounts available:</p>
                    {tiers.map((tier) => (
                      <div key={tier.quantity} className="text-sm">
                        {tier.quantity}kg+: {tier.discount}% off
                      </div>
                    ))}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-500">Quantity (kg)</label>
              <Select
                value={quantity}
                onValueChange={setQuantity}
                disabled={!product.available}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select quantity" />
                </SelectTrigger>
                <SelectContent>
                  {tiers.map((tier) => (
                    <SelectItem key={tier.quantity} value={tier.quantity.toString()}>
                      {tier.quantity} kg {tier.discount > 0 && `(-${tier.discount}%)`}
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
            <div className="text-right">
              <span className="text-lg font-bold">${finalTotal.toFixed(2)}</span>
              {currentTier.discount > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  ${total.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <Button
            className="w-full"
            disabled={!product.available}
            variant={product.available ? "default" : "secondary"}
          >
            {product.available ? "Add to Cart" : "Out of Stock"}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}