import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "The Problem",
    description: "Businesses struggle with inconsistent quality & pricing from middlemen",
    icon: "🛑",
  },
  {
    title: "Our Solution",
    description: "Direct access to farm-fresh produce at wholesale prices",
    icon: "✅",
  },
  {
    title: "Mission",
    description: "Supporting local farmers while ensuring businesses get premium-quality products",
    icon: "🌍",
  },
  {
    title: "Objective",
    description: "Providing transparent, bulk-order pricing with seamless logistics",
    icon: "🎯",
  },
];

export default function About() {
  return (
    <div className="container">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Why Choose Krishi Bazaar?</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          We're revolutionizing the way businesses source fresh produce by connecting
          them directly with farmers, ensuring quality and fair pricing, We are also providing essential tools for farmers, seed supply, fertilizer and pesticides supply, and 24/7 support.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card>
              <CardHeader>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://www.adb.org/sites/default/files/content-media/4755-nepals-farmers-cooperative-01.jpg"
          className="rounded-lg shadow-lg"
        />
        <div>
          <h3 className="text-2xl font-bold mb-4">Direct Farm to Business</h3>
          <p className="text-gray-600 mb-6">
            Our platform eliminates unnecessary intermediaries, ensuring that both farmers
            and businesses benefit from direct transactions. This results in fresher
            produce, better prices, and sustainable partnerships.
          </p>
          <img
            src="https://english.onlinekhabar.com/wp-content/uploads/2017/01/isard2-768x512.jpg"
            alt="Fresh produce selection"
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </div>
  );
}
