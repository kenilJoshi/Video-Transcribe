// components/HeroSection.tsx (Client Component)
'use client';

import { useState } from 'react';
import { Sparkles, Play, Check } from 'lucide-react';

export default function HeroSection() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle email submission
    console.log('Email submitted:', email);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 pt-20 pb-32">
      <div className="text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-purple-500/20 border border-purple-500/50 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-sm text-purple-300">Transform Your Content in Minutes</span>
        </div>
        
        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
          Turn Raw Videos Into
          <br />
          <span className='text-primary'>Viral Short-Form Content</span>
        </h1>
        
        <p className="text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
          ReelForge uses AI to add captions, b-roll, music, and cinematic effects to your videos. 
          Create scroll-stopping content that grows your audience.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="px-6 py-4 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm w-full sm:w-80 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button 
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
          >
            Get Early Access
            <Play className="w-5 h-5" />
          </button>
        </form>

        <div className="flex items-center justify-center gap-8 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            No credit card required
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-400" />
            Free trial included
          </div>
        </div>
      </div>

      {/* Video Preview Mockup */}
      <div className="mt-20 max-w-5xl mx-auto">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-3xl opacity-30"></div>
          <div className="relative bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 aspect-video flex items-center justify-center">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Play className="w-8 h-8 ml-1" />
              </div>
              <p className="text-slate-400">Watch demo video</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}