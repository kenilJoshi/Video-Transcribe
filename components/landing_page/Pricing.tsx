// components/Pricing.tsx (Server Component)

import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: "Starter",
    price: "$19",
    popular: false,
    features: ["20 videos/month", "HD export", "300+ B-roll clips", "500MB storage"]
  },
  {
    name: "Pro",
    price: "$49",
    popular: true,
    features: ["100 videos/month", "4K export", "1000+ B-roll clips", "5GB storage"]
  },
  {
    name: "Agency",
    price: "$99",
    popular: false,
    features: ["Unlimited videos", "4K export", "All clips", "20GB storage"]
  }
];

export default function Pricing() {
  return (
    <section className="max-w-5xl mx-auto px-4 py-16">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
        <p className="text-xl text-slate-400">Choose the plan that fits your content goals</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {pricingPlans.map((plan, index) => (
          <div 
            key={index} 
            className={`rounded-2xl p-8 ${
              plan.popular 
                ? 'bg-gradient-to-b from-purple-600 to-pink-600 scale-105' 
                : 'bg-slate-800/50 border border-white/10'
            }`}
          >
            {plan.popular && (
              <div className="bg-white text-purple-600 text-sm font-semibold px-3 py-1 rounded-full inline-block mb-4">
                Most Popular
              </div>
            )}
            <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
            <div className="mb-6">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className="text-slate-400">/month</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-green-400" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button 
              className={`w-full py-3 rounded-lg font-semibold transition-all ${
                plan.popular 
                  ? 'bg-white text-purple-600 hover:bg-slate-100' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
            >
              Get Started
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}