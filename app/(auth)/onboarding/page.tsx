// app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Sparkles, Users, Video, Target } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [formData, setFormData] = useState({
    role: '',
    contentType: [] as string[],
    goal: '',
    experience: ''
  });

  const roles = [
    { id: 'creator', label: 'Content Creator', icon: Sparkles },
    { id: 'marketer', label: 'Social Media Marketer', icon: Target },
    { id: 'agency', label: 'Agency/Team', icon: Users },
    { id: 'business', label: 'Business Owner', icon: Video }
  ];

  const contentTypes = [
    'Educational Content',
    'Product Demos',
    'Personal Brand',
    'Motivational Videos',
    'Testimonials',
    'Podcast Clips'
  ];

  const goals = [
    'Grow my audience',
    'Increase engagement',
    'Drive sales/conversions',
    'Build brand awareness',
    'Save time editing'
  ];

  const experiences = [
    'Beginner - Just getting started',
    'Intermediate - Some experience',
    'Advanced - Very experienced'
  ];

  const handleRoleSelect = (roleId: string) => {
    setFormData({ ...formData, role: roleId });
  };

  const handleContentTypeToggle = (type: string) => {
    const updatedTypes = formData.contentType.includes(type)
      ? formData.contentType.filter(t => t !== type)
      : [...formData.contentType, type];
    setFormData({ ...formData, contentType: updatedTypes });
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep((currentStep + 1) as Step);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step);
    }
  };

  const handleFinish = () => {
    console.log('Onboarding completed:', formData);
    // Redirect to dashboard
    router.push('/dashboard');
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.role !== '';
      case 2:
        return formData.contentType.length > 0;
      case 3:
        return formData.goal !== '' && formData.experience !== '';
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">Step {currentStep} of 3</span>
            <span className="text-sm text-slate-400">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-purple-600 to-pink-600 transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-slate-800/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 md:p-12">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">What best describes you?</h2>
                <p className="text-slate-400">This helps us personalize your experience</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        formData.role === role.id
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${formData.role === role.id ? 'text-purple-400' : 'text-slate-400'}`} />
                      <h3 className="font-semibold text-lg">{role.label}</h3>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Content Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">What type of content will you create?</h2>
                <p className="text-slate-400">Select all that apply</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleContentTypeToggle(type)}
                    className={`p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                      formData.contentType.includes(type)
                        ? 'border-purple-500 bg-purple-500/10'
                        : 'border-white/10 hover:border-purple-500/50'
                    }`}
                  >
                    <span className="font-medium">{type}</span>
                    {formData.contentType.includes(type) && (
                      <Check className="w-5 h-5 text-purple-400" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Goals and Experience */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold mb-3">Almost there!</h2>
                <p className="text-slate-400">Tell us about your goals and experience</p>
              </div>

              {/* Goals */}
              <div>
                <h3 className="text-xl font-semibold mb-4">What's your primary goal?</h3>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, goal })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                        formData.goal === goal
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <span>{goal}</span>
                      {formData.goal === goal && (
                        <Check className="w-5 h-5 text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xl font-semibold mb-4">Your video editing experience?</h3>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setFormData({ ...formData, experience: exp })}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center justify-between ${
                        formData.experience === exp
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-white/10 hover:border-purple-500/50'
                      }`}
                    >
                      <span>{exp}</span>
                      {formData.experience === exp && (
                        <Check className="w-5 h-5 text-purple-400" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-white/10">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-slate-700/50 rounded-lg font-semibold hover:bg-slate-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next
                <ArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                disabled={!isStepValid()}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Get Started
                <Check className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button 
            onClick={() => router.push('/dashboard')}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}