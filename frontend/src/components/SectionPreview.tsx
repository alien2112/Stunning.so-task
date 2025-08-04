import React, { useState, useEffect } from 'react';
import { Section } from '@/types';

interface SectionCardProps {
  section: Section;
  index: number;
}

const SectionCard: React.FC<SectionCardProps> = ({ section, index }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 150); // Staggered animation

    return () => clearTimeout(timer);
  }, [index]);

  const typeIcons: Record<string, string> = {
    hero: '🎯',
    about: '📖',
    contact: '📞',
    features: '⭐',
    gallery: '🖼️',
    services: '🛠️',
    testimonials: '💬',
  };

  const typeColors: Record<string, string> = {
    hero: 'bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/20 text-purple-900 dark:text-purple-300 border-purple-300 dark:border-purple-700',
    about: 'bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/20 text-blue-900 dark:text-blue-300 border-blue-300 dark:border-blue-700',
    contact: 'bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/20 text-green-900 dark:text-green-300 border-green-300 dark:border-green-700',
    features: 'bg-gradient-to-br from-yellow-100 to-yellow-200 dark:from-yellow-900/30 dark:to-yellow-800/20 text-yellow-900 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700',
    gallery: 'bg-gradient-to-br from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/20 text-pink-900 dark:text-pink-300 border-pink-300 dark:border-pink-700',
    services: 'bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/30 dark:to-indigo-800/20 text-indigo-900 dark:text-indigo-300 border-indigo-300 dark:border-indigo-700',
    testimonials: 'bg-gradient-to-br from-orange-100 to-orange-200 dark:from-orange-900/30 dark:to-orange-800/20 text-orange-900 dark:text-orange-300 border-orange-300 dark:border-orange-700',
  };

  return (
    <div 
      className={`
        card card-hover p-8 lg:p-10 theme-transition group overflow-hidden relative min-h-[280px] lg:min-h-[320px]
        ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Enhanced decorative background */}
      <div className="absolute top-0 right-0 w-40 h-40 opacity-10 transform rotate-12 translate-x-10 -translate-y-10">
        <div className="text-8xl">
          {typeIcons[section.type] || '📄'}
        </div>
      </div>

      {/* Header with better spacing */}
      <div className="flex items-start justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex-shrink-0 text-4xl lg:text-5xl transform group-hover:scale-110 transition-transform duration-300">
            {typeIcons[section.type] || '📄'}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-xl lg:text-2xl font-bold text-foreground theme-transition leading-tight group-hover:text-primary transition-colors duration-300">
              {section.name}
            </h3>
          </div>
        </div>
        <span className={`
          px-4 py-2 text-sm font-bold rounded-full border-2 theme-transition flex-shrink-0 ml-4
          ${typeColors[section.type] || 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-200 dark:border-gray-600'}
        `}>
          {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
        </span>
      </div>

      {/* Enhanced description with better typography */}
      <p className="text-muted-foreground leading-relaxed theme-transition text-base lg:text-lg mb-8 relative z-10 line-clamp-4">
        {section.description}
      </p>

      {/* Enhanced footer */}
      <div className="flex items-center justify-between text-sm font-medium text-muted-foreground/80 theme-transition relative z-10 mt-auto">
        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
          Section {index + 1}
        </span>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-green-600 dark:text-green-400 font-semibold">Ready</span>
        </div>
      </div>

      {/* Enhanced hover effect gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
    </div>
  );
};

interface SectionPreviewProps {
  sections: Section[];
  prompt: string;
  className?: string;
}

export const SectionPreview: React.FC<SectionPreviewProps> = ({ 
  sections, 
  prompt, 
  className = '' 
}) => {
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHeaderVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (!sections || sections.length === 0) {
    return null;
  }

  return (
    <div className={`w-full max-w-7xl mx-auto space-y-8 lg:space-y-12 ${className}`}>
      {/* Enhanced Header */}
      <div className={`text-center space-y-6 ${headerVisible ? 'animate-fade-in-scale' : 'opacity-0'}`}>
        {/* Title with gradient */}
        <div className="space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Generated Website Sections
          </h2>
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-bounce">✨</div>
            <div className="animate-bounce" style={{ animationDelay: '0.1s' }}>🎯</div>
            <div className="animate-bounce" style={{ animationDelay: '0.2s' }}>🚀</div>
          </div>
        </div>

        {/* Prompt display */}
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-lg lg:text-xl text-muted-foreground theme-transition leading-relaxed">
            Based on your idea: 
            <span className="block sm:inline mt-2 sm:mt-0 sm:ml-2">
              <span className="font-semibold italic text-primary bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
                &quot;{prompt}&quot;
              </span>
            </span>
          </p>
          
          {/* Decorative separator */}
          <div className="flex items-center justify-center space-x-4">
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-20"></div>
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div 
                  key={i} 
                  className="w-2 h-2 bg-primary rounded-full animate-pulse" 
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
            <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent flex-1 max-w-20"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span>{sections.length} Sections Generated</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
            <span>Ready to Implement</span>
          </div>
        </div>
      </div>

      {/* Enhanced Sections Grid */}
      <div className="grid gap-8 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3">
        {sections.map((section, index) => (
          <SectionCard 
            key={section.id} 
            section={section} 
            index={index}
          />
        ))}
      </div>

      {/* Enhanced Actions Section */}
      <div className={`text-center pt-8 lg:pt-12 border-t border-border theme-transition space-y-6 ${headerVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Your Website Structure is Ready!</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            These carefully crafted sections provide a solid foundation for your website. 
            Each section is designed to engage your visitors and achieve your business goals.
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => window.print()}
            className="group inline-flex items-center px-6 py-3 border-2 border-primary rounded-xl shadow-lg text-sm font-semibold text-primary bg-primary/5 hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary focus:ring-offset-background transition-all duration-300 theme-transition transform hover:scale-105 hover:shadow-xl"
          >
            <svg className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Sections
          </button>

          <button className="group inline-flex items-center px-6 py-3 border-2 border-border rounded-xl shadow-lg text-sm font-semibold text-muted-foreground bg-card hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring focus:ring-offset-background transition-all duration-300 theme-transition transform hover:scale-105 hover:shadow-xl">
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            Share Results
          </button>
        </div>

        {/* Additional info */}
        <div className="text-xs text-muted-foreground/70 max-w-md mx-auto">
          💡 Tip: Each section can be customized further based on your specific needs and brand requirements.
        </div>
      </div>
    </div>
  );
};
