"use client"
import { useState, useEffect } from 'react';
import { Sparkles, Play, Check, Video, Wand2, Zap, ArrowRight, Star, TrendingUp, Users, Clock, Scissors, Music, Image, Type, Download, Layers, BarChart3, MessageSquare, Rocket, Target, Award } from 'lucide-react';

export default function ReelForgeLanding() {
  const [email, setEmail] = useState('');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleSubmit = () => {
    if (email) {
      console.log('Email submitted:', email);
      setEmail('');
    }
  };

  const features = [
    {
      icon: <Type className="w-7 h-7" />,
      title: "AI Captions",
      description: "Perfectly timed captions with custom styling",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Image className="w-7 h-7" />,
      title: "Smart B-Roll",
      description: "Auto-insert cinematic footage",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Music className="w-7 h-7" />,
      title: "Audio Magic",
      description: "Background music & sound effects",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: <Scissors className="w-7 h-7" />,
      title: "Auto Editing",
      description: "Cut silence & add transitions",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <Layers className="w-7 h-7" />,
      title: "Effects Library",
      description: "Cinematic filters one click away",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: <Download className="w-7 h-7" />,
      title: "Multi-Export",
      description: "All platforms, all formats",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const stats = [
    { icon: <Users className="w-6 h-6" />, value: "10K+", label: "Creators", gradient: "from-blue-500 to-cyan-500" },
    { icon: <Video className="w-6 h-6" />, value: "50K+", label: "Videos", gradient: "from-purple-500 to-pink-500" },
    { icon: <TrendingUp className="w-6 h-6" />, value: "2M+", label: "Views", gradient: "from-orange-500 to-red-500" }
  ];

  const benefits = [
    {
      icon: <Clock className="w-10 h-10" />,
      title: "10x Faster",
      description: "What took hours now takes minutes",
      metric: "Save 10hrs/week"
    },
    {
      icon: <TrendingUp className="w-10 h-10" />,
      title: "3x Engagement",
      description: "Higher retention and views",
      metric: "300% boost"
    },
    {
      icon: <Rocket className="w-10 h-10" />,
      title: "5x Content",
      description: "Produce more, grow faster",
      metric: "500% increase"
    }
  ];

  const pricingPlans = [
    {
      name: "Starter",
      price: "$19",
      popular: false,
      gradient: "from-blue-500 to-cyan-500",
      features: [
        "20 videos/month",
        "HD 1080p export",
        "300+ B-roll clips",
        "Auto captions",
        "500MB storage",
        "Email support"
      ]
    },
    {
      name: "Pro",
      price: "$49",
      popular: true,
      gradient: "from-purple-500 to-pink-500",
      features: [
        "100 videos/month",
        "4K export",
        "1000+ B-roll clips",
        "Advanced AI",
        "5GB storage",
        "Priority support",
        "Custom branding",
        "Analytics"
      ]
    },
    {
      name: "Agency",
      price: "$99",
      popular: false,
      gradient: "from-orange-500 to-red-500",
      features: [
        "Unlimited videos",
        "4K export",
        "Premium clips",
        "Team features",
        "20GB storage",
        "Dedicated support",
        "API access",
        "White-label"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Content Creator",
      content: "ReelForge is pure magic! My editing time went from 3 hours to 10 minutes.",
      avatar: "SC",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Mike Rodriguez",
      role: "Social Media Manager",
      content: "Our engagement doubled overnight. This AI is ridiculously smart!",
      avatar: "MR",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      name: "Emma Thompson",
      role: "Agency Owner",
      content: "We're producing 5x more content. The ROI is absolutely insane.",
      avatar: "ET",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-3xl transition-all duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.5) 0%, transparent 70%)',
            left: `${mousePosition.x - 250}px`,
            top: `${mousePosition.y - 250}px`,
          }}
        />
        <div className="absolute top-20 right-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Dot Pattern Overlay */}
      <div className="fixed inset-0 opacity-30 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }}></div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ReelForge
          </div>
          <div className="flex items-center gap-3">
            <a 
              href="/login"
              className="px-5 py-2 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Login
            </a>
            <a 
              href="/signup"
              className="px-5 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all"
            >
              Sign Up
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Floating Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full px-4 py-1.5 mb-6 backdrop-blur-xl animate-float">
            <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
            <span className="text-xs font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Trusted by 10,000+ creators worldwide
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-5 leading-tight">
            <span className="block text-white">Turn Boring Videos</span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
              Into Viral Gold
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            AI-powered video editing that <span className="text-white font-semibold">transforms</span> your raw footage into 
            <span className="text-white font-semibold"> scroll-stopping content</span> in minutes
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-10 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-5 py-3 rounded-xl bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-slate-500 shadow-xl"
            />
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all w-full sm:w-auto flex items-center justify-center gap-2 whitespace-nowrap group hover:scale-105"
            >
              Start Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Trust Signals */}
          <div className="flex items-center justify-center gap-6 text-sm text-slate-500 mb-12">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>No credit card</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>7-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-green-400" />
              <span>Cancel anytime</span>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative max-w-5xl mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-3 shadow-2xl">
              <div className="aspect-video rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden group">
                {/* Animated Grid */}
                <div className="absolute inset-0" style={{
                  backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)',
                  backgroundSize: '50px 50px'
                }}></div>
                
                <button className="relative z-10 w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-all shadow-2xl shadow-blue-500/50">
                  <Play className="w-10 h-10 ml-1 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Stats */}
      <section className="relative py-16 border-y border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} mb-3 group-hover:scale-110 transition-transform shadow-lg`}>
                  {stat.icon}
                </div>
                <div className="text-3xl font-black mb-1 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-slate-500 font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits with Parallax Cards */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Why Creators Love Us
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Stop wasting time on tedious editing. Start creating content that matters.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-slate-900/50 to-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all hover:scale-105 hover:shadow-xl hover:shadow-blue-500/20"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 rounded-2xl transition-all"></div>
                
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <div className="text-blue-400">{benefit.icon}</div>
                  </div>
                  <div className="text-2xl font-black mb-2 text-white">{benefit.title}</div>
                  <p className="text-slate-400 mb-3 leading-relaxed text-sm">{benefit.description}</p>
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full px-3 py-1.5 text-xs font-bold text-blue-400 border border-blue-500/30">
                    <Target className="w-3 h-3" />
                    {benefit.metric}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Bento Grid */}
      <section className="relative py-24 bg-gradient-to-b from-transparent via-slate-900/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-lg text-slate-400">Everything you need in one place</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl p-5 hover:border-blue-500/50 transition-all hover:-translate-y-1 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2 text-white">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-orange-200 to-red-200 bg-clip-text text-transparent">
              Loved By Creators
            </h2>
            <p className="text-lg text-slate-400">Real results from real users</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all group"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-base text-slate-300 mb-5 italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 bg-gradient-to-br ${testimonial.gradient} rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white text-sm">{testimonial.name}</div>
                    <div className="text-xs text-slate-500">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing with Glow Effect */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-green-200 to-emerald-200 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-lg text-slate-400">Choose your plan, scale as you grow</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index}
                className={`relative rounded-2xl p-1 transition-all ${
                  plan.popular 
                    ? 'scale-105 shadow-2xl shadow-purple-500/30' 
                    : 'hover:scale-105'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-slate-900 text-xs font-black px-5 py-2 rounded-full shadow-lg flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      MOST POPULAR
                    </div>
                  </div>
                )}

                <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-10 rounded-2xl`}></div>
                <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6">
                  <h3 className="text-xl font-black mb-2 text-white">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-black bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-slate-500 text-base">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.gradient} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-slate-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button 
                    className={`w-full py-3 rounded-xl font-semibold transition-all text-sm ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.gradient} hover:shadow-xl text-white`
                        : 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                    }`}
                  >
                    Get Started
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-3xl opacity-30 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl border border-slate-700/50 rounded-3xl p-12 text-center">
              <h2 className="text-4xl md:text-5xl font-black mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Ready to Go Viral?
              </h2>
              <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto leading-relaxed">
                Join 10,000+ creators transforming their content with AI. Start your free trial today—no credit card required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/50 transition-all group">
                  Start Free Trial
                  <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl font-semibold transition-all">
                  Watch Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-slate-800/50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-black bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-3">
                ReelForge
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Transform raw videos into viral content with AI-powered editing.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Product</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">Features</li>
                <li className="hover:text-white cursor-pointer transition-colors">Pricing</li>
                <li className="hover:text-white cursor-pointer transition-colors">API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Resources</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">Blog</li>
                <li className="hover:text-white cursor-pointer transition-colors">Support</li>
                <li className="hover:text-white cursor-pointer transition-colors">Community</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm text-slate-500">
                <li className="hover:text-white cursor-pointer transition-colors">About</li>
                <li className="hover:text-white cursor-pointer transition-colors">Privacy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800/50 pt-6 text-center">
            <p className="text-slate-600 text-sm">© 2025 ReelForge. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}