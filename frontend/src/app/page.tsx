'use client';

import React, { useState } from 'react';
import { WebsiteIdeaForm } from '@/components/WebsiteIdeaForm';
import { SectionPreview } from '@/components/SectionPreview';
import { ErrorAlert } from '@/components/ErrorAlert';
import { GenerationProgress, SectionLoadingSkeleton } from '@/components/EnhancedLoading';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useWebsiteIdea } from '@/hooks/useWebsiteIdea';

export default function Home() {
  const { 
    currentIdea, 
    isLoading, 
    error, 
    createIdea, 
    clearError 
  } = useWebsiteIdea();

  const [showPreview, setShowPreview] = useState(false);

  const handleSubmit = async (prompt: string) => {
    const idea = await createIdea(prompt);
    if (idea) {
      setShowPreview(true);
    }
  };

  const handleNewIdea = () => {
    setShowPreview(false);
    clearError();
  };

  return (
    <div className="min-h-screen bg-background theme-transition flex flex-col">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/10 dark:from-primary/10 dark:via-background dark:to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent opacity-60" />
      
      {/* Header */}
      <header className="relative bg-card/80 backdrop-blur-md shadow-sm border-b border-border theme-transition">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-2 theme-transition tracking-tight">
                🚀 Website Idea Generator
              </h1>
              <p className="text-muted-foreground max-w-2xl text-sm sm:text-base lg:text-lg theme-transition">
                Describe your website concept and get AI-generated section suggestions to kickstart your project
              </p>
            </div>
            <div className="flex-shrink-0">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content - Perfect Centering */}
      <main className="relative flex-1 flex flex-col">
        {/* Error Alert */}
        {error && (
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
            <ErrorAlert 
              message={error}
              onDismiss={clearError}
              className="mb-6"
            />
          </div>
        )}

        {!showPreview ? (
          /* Form Section - True Center */
          <div className="flex-1 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
              <div className="card glass p-6 sm:p-8 lg:p-10 shadow-2xl border border-border theme-transition">
                <div className="text-center mb-6 sm:mb-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-primary/10 rounded-full mb-4 sm:mb-6 theme-transition ring-1 ring-border">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-primary theme-transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-2 sm:mb-3 theme-transition">
                    Share Your Vision
                  </h2>
                  <p className="text-muted-foreground text-base sm:text-lg theme-transition max-w-md mx-auto">
                    Tell us about your website idea and we&apos;ll generate the perfect sections for you
                  </p>
                </div>

                <WebsiteIdeaForm 
                  onSubmit={handleSubmit}
                  isLoading={isLoading}
                />

                {/* Enhanced Loading State */}
                {isLoading && (
                  <GenerationProgress 
                    message="Analyzing your idea and generating perfect sections..."
                    className="mt-6 sm:mt-8"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Preview Section - Properly Centered */
          <div className="flex-1 flex items-start justify-center py-6 sm:py-8 lg:py-12">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="space-y-6 sm:space-y-8">
                {/* Back Button - Enhanced */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in-up">
                  <button
                    onClick={handleNewIdea}
                    className="group inline-flex items-center px-6 py-3 border-2 border-border rounded-xl shadow-lg text-sm font-semibold text-foreground bg-card hover:bg-primary hover:text-primary-foreground hover:border-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transition-all duration-300 theme-transition transform hover:scale-105 hover:shadow-xl"
                  >
                    <svg className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Create New Idea
                  </button>
                  
                  {/* Success indicator */}
                  <div className="flex items-center space-x-2 text-green-600 dark:text-green-400 animate-fade-in-up stagger-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium">Generation Complete!</span>
                  </div>
                </div>

                {/* Loading transition for sections - Centered */}
                {isLoading ? (
                  <div className="flex justify-center">
                    <SectionLoadingSkeleton />
                  </div>
                ) : currentIdea ? (
                  <div className="flex justify-center animate-fade-in-scale">
                    <SectionPreview 
                      sections={currentIdea.sections}
                      prompt={currentIdea.prompt}
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative bg-card/50 backdrop-blur-md border-t border-border theme-transition mt-auto">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="text-center text-muted-foreground theme-transition">
            <p className="mb-2 text-xs sm:text-sm font-medium">Built with Next.js, NestJS, and MongoDB</p>
            <p className="text-xs opacity-75">Powered by AI-assisted development ✨</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
