import Hero from "@/components/home/Hero";
import About from "@/components/home/About";

export default function Home() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <Hero />
      <About />
    </div>
  );
}
