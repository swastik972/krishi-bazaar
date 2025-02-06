import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PartnerCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
    category: "farmer" | "business";
  };
}

export default function PartnerCard({ service }: PartnerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full overflow-hidden">
        <CardHeader>
          <div className="text-4xl mb-4">{service.icon}</div>
          <CardTitle className="text-xl">{service.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <CardDescription className="text-sm">
            {service.description}
          </CardDescription>
          <Button variant="outline" className="w-full">
            Learn More
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}