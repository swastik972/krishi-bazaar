import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PartnerCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
  };
}

export default function PartnerCard({ service }: PartnerCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <div className="text-4xl mb-4">{service.icon}</div>
          <CardTitle>{service.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>{service.description}</CardDescription>
        </CardContent>
      </Card>
    </motion.div>
  );
}
