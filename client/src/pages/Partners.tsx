import { useState } from "react";
import { partnerServices } from "@/lib/mockData";
import PartnerCard from "@/components/partners/PartnerCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Partners() {
  const farmerServices = partnerServices.filter(service => service.category === "farmer");
  const businessServices = partnerServices.filter(service => service.category === "business");

  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Business Solutions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive solutions for both farmers and businesses to optimize their operations
          and maximize profitability.
        </p>
      </div>

      <Tabs defaultValue="farmer" className="w-full mb-12">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
          <TabsTrigger value="farmer">For Farmers</TabsTrigger>
          <TabsTrigger value="business">For Businesses</TabsTrigger>
        </TabsList>
        <TabsContent value="farmer" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farmerServices.map((service) => (
              <PartnerCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="business" className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessServices.map((service) => (
              <PartnerCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-16 space-y-16">
        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-4">Modern Farming Solutions</h2>
              <p className="text-gray-600 mb-4">
                Our platform provides farmers with cutting-edge technology and support
                to maximize yield and efficiency.
              </p>
              <img
                src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449"
                alt="Modern irrigation system"
                className="rounded-lg w-full object-cover h-64"
              />
            </div>
            <div className="space-y-6">
              <img
                src="https://images.unsplash.com/photo-1595974482597-4b8ac28b3f8c"
                alt="Farm technology"
                className="rounded-lg w-full object-cover h-64"
              />
              <p className="text-gray-600">
                Join our network of progressive farmers who are transforming their
                operations through smart technology and data-driven decisions.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-8 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1556767576-5ec41e3239ea"
                alt="Business operations"
                className="rounded-lg w-full object-cover h-64"
              />
              <p className="text-gray-600 mt-6">
                Our platform has helped hundreds of businesses streamline their supply chain
                and connect directly with quality producers.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-2xl font-bold mb-4">Business Success Stories</h2>
              <p className="text-gray-600 mb-4">
                Discover how businesses are transforming their operations and growing
                their profits through our integrated solutions.
              </p>
              <Button size="lg" className="w-full md:w-auto">
                Become a Partner
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}