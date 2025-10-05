// components/CTASection.tsx (Server Component)
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Transform Your Content?
        </h2>
        <p className="text-xl mb-8 text-purple-100">
          Join thousands of creators making viral-worthy videos
        </p>
        <Button>Start Creating Free</Button>
      </div>
    </section>
  );
}