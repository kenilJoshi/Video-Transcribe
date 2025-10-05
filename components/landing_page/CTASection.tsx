// components/CTASection.tsx (Server Component)
import { Button } from "../ui/button";

export default function CTASection() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="bg-gradient-to-r from-card to-card-foreground rounded-3xl p-12 text-center">
        <hgroup>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to Transform Your Content?
          </h2>
          <p className="text-xl mb-8 text-white">
            Join thousands of creators making viral-worthy videos
          </p>
        </hgroup>
        <Button className="cursor-pointer">Start Creating Free</Button>
      </div>
    </section>
  );
}
