import { partnerServices } from "@/lib/mockData";
import PartnerCard from "@/components/partners/PartnerCard";

export default function Partners() {
  return (
    <div className="container py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Business Solutions</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Comprehensive solutions for both buyers and farmers to optimize their operations
          and maximize profitability.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {partnerServices.map((service) => (
          <PartnerCard key={service.id} service={service} />
        ))}
      </div>

      <div className="mt-16 bg-white rounded-lg p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">Partner Success Stories</h2>
            <p className="text-gray-600 mb-4">
              Join our network of successful businesses and farmers who have transformed
              their operations through our platform.
            </p>
            <img
              src="https://images.unsplash.com/photo-1507679799987-c73779587ccf"
              alt="Business partnership"
              className="rounded-lg w-full object-cover h-64"
            />
          </div>
          <div className="space-y-6">
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
              alt="Farmer partnership"
              className="rounded-lg w-full object-cover h-64"
            />
            <p className="text-gray-600">
              Our platform has helped hundreds of businesses streamline their supply chain
              and connect directly with quality producers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
