import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const links = [
  { href: "/", label: "Home" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/partners", label: "Partners" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <img
              src="https://images.unsplash.com/photo-1593741682812-7b2454287961"
              alt="Logo"
              className="h-8 w-8 rounded-full object-cover"
            />
            <span className="font-bold text-xl text-[#2E7D32]">FarmFresh B2B</span>
          </a>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={`text-sm font-medium transition-colors hover:text-[#2E7D32] ${
                  location === link.href ? "text-[#2E7D32]" : "text-gray-500"
                }`}
              >
                {link.label}
              </a>
            </Link>
          ))}
          <Button>Get a Quote</Button>
        </nav>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <nav className="flex flex-col space-y-4">
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <a
                    className={`text-sm font-medium transition-colors hover:text-[#2E7D32] ${
                      location === link.href ? "text-[#2E7D32]" : "text-gray-500"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                </Link>
              ))}
              <Button className="w-full">Get a Quote</Button>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
