import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function Hero() {
  return (
    <div className="relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1593741682812-7b2454287961"
          alt="Fresh produce"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="container relative z-10 text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl font-bold mb-4">
            Direct Farm-Fresh Supply for Your Business
          </h1>
          <p className="text-xl mb-8">
            Guaranteed Freshness | Wholesale Pricing | Direct from Farmers
          </p>
          <div className="flex gap-4">
            <Link href="/marketplace">
              <Button size="lg" className="bg-[#2E7D32] hover:bg-[#1B5E20]">
                Explore Marketplace
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/20">
                Get a Quote
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
