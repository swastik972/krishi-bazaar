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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Plus, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard Component
 * Displays individual product information with interactive quantity selection
 * and dynamic pricing calculations based on bulk discounts
 */
export default function ProductCard({ product }: ProductCardProps) {
  // State for selected quantity, initialized to product's minimum order quantity
  const [quantity, setQuantity] = useState(product.minQuantity.toString());
  const total = parseInt(quantity) * product.pricePerKg;

  // Define bulk pricing tiers with quantity thresholds and discounts
  const tiers = [
    { quantity: product.minQuantity, discount: 0 },      // Base tier
    { quantity: product.minQuantity * 5, discount: 5 },  // Medium tier (5% off)
    { quantity: product.minQuantity * 10, discount: 10 }, // Large tier (10% off)
    { quantity: product.minQuantity * 20, discount: 15 }, // Bulk tier (15% off)
  ];

  // Calculate current pricing tier based on selected quantity
  const currentTier = tiers.reduce((acc, tier) => {
    if (parseInt(quantity) >= tier.quantity) {
      return tier;
    }
    return acc;
  }, tiers[0]);

  // Calculate final price with applied discount
  const discountedPrice = product.pricePerKg * (1 - currentTier.discount / 100);
  const finalTotal = parseInt(quantity) * discountedPrice;

  // Handlers for quantity increment/decrement
  const incrementQuantity = () => {
    const current = parseInt(quantity);
    const nextTier = tiers.find(tier => tier.quantity > current);
    if (nextTier) {
      setQuantity(nextTier.quantity.toString());
    }
  };

  const decrementQuantity = () => {
    const current = parseInt(quantity);
    const prevTier = [...tiers].reverse().find(tier => tier.quantity < current);
    if (prevTier && prevTier.quantity >= product.minQuantity) {
      setQuantity(prevTier.quantity.toString());
    }
  };

  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="overflow-hidden transition-all hover:shadow-lg">
        {/* Product Image Section */}
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

        {/* Product Information */}
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl">{product.name}</CardTitle>
            <Badge variant="outline" className="capitalize">
              {product.category}
            </Badge>
          </div>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>

        {/* Pricing and Quantity Selection */}
        <CardContent>
          <div className="space-y-4">
            {/* Base Price Display with Discount Badge */}
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">Base price per kg</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <span className="font-bold">
                      ₹{product.pricePerKg.toFixed(2)}
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

            {/* Quantity Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-500">Quantity (kg)</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={parseInt(quantity) <= product.minQuantity || !product.available}
                    onClick={decrementQuantity}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-16 text-center font-medium">{quantity}kg</span>
                  <Button
                    variant="outline"
                    size="icon"
                    disabled={!product.available}
                    onClick={incrementQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Progress Bar for Quantity Tiers */}
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 transition-all"
                  style={{
                    width: `${Math.min(
                      (parseInt(quantity) / (product.minQuantity * 20)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>

        {/* Total Price and Action Button */}
        <CardFooter className="flex flex-col gap-4">
          <div className="w-full flex justify-between items-center">
            <span className="text-sm font-semibold">Total</span>
            <div className="text-right">
              <span className="text-lg font-bold">₹{finalTotal.toFixed(2)}</span>
              {currentTier.discount > 0 && (
                <div className="text-sm text-gray-500 line-through">
                  ₹{total.toFixed(2)}
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