// app/onboarding/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ArrowLeft, Check, Sparkles, Users, Video, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
    router.push('/app');
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
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-3xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-zinc-600 dark:text-zinc-400">Step {currentStep} of 3</span>
            <span className="text-sm text-zinc-600 dark:text-zinc-400">{Math.round((currentStep / 3) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-zinc-900 dark:bg-zinc-100 transition-all duration-300"
              style={{ width: `${(currentStep / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Content Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-sm p-8 md:p-12">
          {/* Step 1: Role Selection */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  What best describes you?
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">This helps us personalize your experience</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className={`p-6 rounded-lg border-2 transition-all text-left ${
                        formData.role === role.id
                          ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <Icon className={`w-8 h-8 mb-3 ${
                        formData.role === role.id 
                          ? 'text-zinc-900 dark:text-zinc-100' 
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`} />
                      <h3 className="font-semibold text-lg text-zinc-900 dark:text-zinc-100">
                        {role.label}
                      </h3>
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
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  What type of content will you create?
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">Select all that apply</p>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                {contentTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => handleContentTypeToggle(type)}
                    className={`p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                      formData.contentType.includes(type)
                        ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800'
                        : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                    }`}
                  >
                    <span className="font-medium text-zinc-900 dark:text-zinc-100">{type}</span>
                    {formData.contentType.includes(type) && (
                      <Check className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
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
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 mb-3">
                  Almost there!
                </h2>
                <p className="text-zinc-600 dark:text-zinc-400">Tell us about your goals and experience</p>
              </div>

              {/* Goals */}
              <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  What's your primary goal?
                </h3>
                <div className="space-y-3">
                  {goals.map((goal) => (
                    <button
                      key={goal}
                      onClick={() => setFormData({ ...formData, goal })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        formData.goal === goal
                          ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <span className="text-zinc-900 dark:text-zinc-100">{goal}</span>
                      {formData.goal === goal && (
                        <Check className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience */}
              <div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                  Your video editing experience?
                </h3>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <button
                      key={exp}
                      onClick={() => setFormData({ ...formData, experience: exp })}
                      className={`w-full p-4 rounded-lg border-2 transition-all text-left flex items-center justify-between ${
                        formData.experience === exp
                          ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600'
                      }`}
                    >
                      <span className="text-zinc-900 dark:text-zinc-100">{exp}</span>
                      {formData.experience === exp && (
                        <Check className="w-5 h-5 text-zinc-900 dark:text-zinc-100" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
            <Button
              onClick={handleBack}
              disabled={currentStep === 1}
              variant="outline"
              className="h-9"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!isStepValid()}
                className="h-9"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleFinish}
                disabled={!isStepValid()}
                className="h-9"
              >
                Get Started
                <Check className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Skip Option */}
        <div className="text-center mt-6">
          <button 
            onClick={() => router.push('/app')}
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors text-sm"
          >
            Skip for now
          </button>
        </div>
      </div>
    </div>
  );
}