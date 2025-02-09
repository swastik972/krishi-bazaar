import { Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertNewsletterSchema } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

export default function Footer() {
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(insertNewsletterSchema),
    defaultValues: {
      email: "",
      businessName: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      await apiRequest("POST", "/api/newsletter", data);
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "You've been subscribed to our newsletter.",
      });
      form.reset();
    },
  });

  return (
    <footer className="bg-[#5D4037] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/"><a className="hover:text-[#FFB300]">Home</a></Link></li>
              <li><Link href="/marketplace"><a className="hover:text-[#FFB300]">Marketplace</a></Link></li>
              <li><Link href="/partners"><a className="hover:text-[#FFB300]">Partners</a></Link></li>
              <li><Link href="/contact"><a className="hover:text-[#FFB300]">Contact</a></Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              <li>Email: pantharajan0@gmail.com</li>
              <li>Phone: +977 9762248648</li>
              <li>Address: Lokanthali, Bhaktapur</li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="font-bold text-lg mb-4">Newsletter Signup</h3>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => mutation.mutate(data))} 
                    className="space-y-4">
                <FormField
                  control={form.control}
                  name="businessName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          placeholder="Business Name" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input 
                          type="email" 
                          placeholder="Email Address" 
                          className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button 
                  type="submit" 
                  className="w-full bg-[#FFB300] hover:bg-[#FFA000] text-[#5D4037]"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Subscribing..." : "Subscribe for Updates"}
                </Button>
              </form>
            </Form>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20 text-center text-sm">
          <p>&copy; 2025 Krishi Bazaar. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
