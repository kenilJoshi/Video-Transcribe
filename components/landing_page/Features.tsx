// components/Features.tsx (Server Component)

import { Sparkles, Zap, Film, Wand2 } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Captions",
    description: "Instantly generate perfectly-timed, trendy captions that boost engagement and retention"
  },
  {
    icon: Film,
    title: "Cinematic B-Roll",
    description: "Access 1000+ curated clips or upload your own to create stunning visual storytelling"
  },
  {
    icon: Wand2,
    title: "Professional Effects",
    description: "Add zoom effects, cinematic frames, and transitions with just a few clicks"
  },
  {
    icon: Zap,
    title: "Smart Audio Library",
    description: "Curated music and sound effects that elevate your content instantly"
  }
];

export default function Features() {
  return (
    <section className="mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Everything You Need to Go Viral</h2>
        <p className="text-xl text-slate-400">Professional video editing, simplified</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-purple-500/50 transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mb-4">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400">{feature.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}