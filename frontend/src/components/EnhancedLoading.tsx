import React, { useState, useEffect } from 'react';

interface GenerationProgressProps {
  message?: string;
  className?: string;
}

export const GenerationProgress: React.FC<GenerationProgressProps> = ({
  message = "Generating your website sections...",
  className = ""
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    "Analyzing your business concept...",
    "Identifying key website sections...", 
    "Generating creative content ideas...",
    "Optimizing section descriptions...",
    "Finalizing your website structure..."
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepInterval: NodeJS.Timeout;
    
    // More realistic progress simulation
    const startProgress = () => {
      let currentProgress = 0;
      
      progressInterval = setInterval(() => {
        setProgress(prev => {
          // Slower, more realistic progress
          if (prev >= 100) return 100;
          
          // Simulate varying speeds (faster at start, slower at end)
          let increment;
          if (prev < 20) increment = Math.random() * 8 + 2; // 2-10% at start
          else if (prev < 60) increment = Math.random() * 6 + 1; // 1-7% in middle  
          else if (prev < 90) increment = Math.random() * 3 + 0.5; // 0.5-3.5% near end
          else increment = Math.random() * 1 + 0.1; // 0.1-1.1% at very end
          
          currentProgress = Math.min(prev + increment, 100);
          return currentProgress;
        });
      }, 400); // Update every 400ms for smoother feel

      // Step progression tied to progress
      stepInterval = setInterval(() => {
        setCurrentStep(prev => {
          const nextStep = (prev + 1) % steps.length;
          return nextStep;
        });
      }, 1200); // Change step every 1.2 seconds
    };

    // Small delay before starting for better UX
    const startDelay = setTimeout(startProgress, 200);

    return () => {
      clearTimeout(startDelay);
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  return (
    <div className={`flex flex-col items-center justify-center space-y-6 py-12 ${className}`}>
      {/* Main Loading Animation */}
      <div className="relative">
        {/* Outer Ring */}
        <div className="w-20 h-20 border-4 border-primary/20 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-transparent border-t-primary rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
        </div>
        
        {/* Inner Pulse */}
        <div className="absolute inset-4 bg-primary/10 rounded-full animate-pulse-glow"></div>
        
        {/* Center Icon */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="w-8 h-8 text-primary animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-80 max-w-full space-y-3">
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Progress</span>
          <span>{Math.min(Math.round(progress), 100)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full transition-all duration-300 ease-out relative"
            style={{ width: `${Math.min(progress, 100)}%` }}
          >
            <div className="absolute inset-0 bg-white/20 animate-progress"></div>
          </div>
        </div>
      </div>

      {/* Status Text */}
      <div className="text-center space-y-2">
        <p className="text-foreground font-medium animate-fade-in-up">{message}</p>
        <p className="text-muted-foreground text-sm animate-fade-in-up stagger-1">
          {steps[currentStep]}
        </p>
      </div>

      {/* Animated Dots */}
      <div className="flex space-x-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-primary rounded-full animate-bounce"
            style={{ 
              animationDelay: `${i * 0.15}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
}

export const SectionLoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ 
  className = '', 
  lines = 3 
}) => {
  return (
    <div className={`w-full max-w-7xl mx-auto space-y-6 ${className}`}>
      {/* Header Skeleton - Centered */}
      <div className="text-center space-y-4 animate-fade-in-up">
        <div className="skeleton h-8 w-80 mx-auto"></div>
        <div className="skeleton h-4 w-96 max-w-full mx-auto"></div>
        <div className="skeleton h-1 w-24 mx-auto"></div>
      </div>

      {/* Cards Skeleton - Centered Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className={`card p-6 space-y-4 animate-fade-in-scale stagger-${index + 1}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3">
                <div className="skeleton w-8 h-8 rounded-full"></div>
                <div className="skeleton h-6 w-32"></div>
              </div>
              <div className="skeleton h-6 w-16 rounded-full"></div>
            </div>
            <div className="space-y-2">
              {Array.from({ length: lines }).map((_, lineIndex) => (
                <div
                  key={lineIndex}
                  className={`skeleton h-4 ${
                    lineIndex === lines - 1 ? 'w-3/4' : 'w-full'
                  }`}
                  style={{ animationDelay: `${(index * 0.1) + (lineIndex * 0.05)}s` }}
                ></div>
              ))}
            </div>
            <div className="skeleton h-3 w-20"></div>
          </div>
        ))}
      </div>

      {/* Loading message */}
      <div className="text-center animate-fade-in-up stagger-3">
        <p className="text-muted-foreground animate-pulse">
          ✨ Crafting your perfect website sections...
        </p>
      </div>
    </div>
  );
};

export const EnhancedLoadingButton: React.FC<{
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}> = ({ isLoading, children, className = '', onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
        relative overflow-hidden transition-all duration-200 
        disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-primary/10 animate-shimmer"></div>
      )}
      <span className={`flex items-center justify-center ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-200`}>
        {children}
      </span>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </button>
  );
};
