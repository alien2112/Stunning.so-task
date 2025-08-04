import React, { useState, useMemo } from 'react';

interface WebsiteIdeaFormProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
  className?: string;
}

export const WebsiteIdeaForm: React.FC<WebsiteIdeaFormProps> = ({ 
  onSubmit, 
  isLoading, 
  className = '' 
}) => {
  const [prompt, setPrompt] = useState('');
  const [errors, setErrors] = useState<{ prompt?: string }>({});

  const placeholderTexts = useMemo(() => [
    "Landing page for a modern bakery",
    "Portfolio website for a UX designer",
    "E-commerce store for handmade jewelry",
    "Restaurant website with online ordering",
    "Corporate website for a tech startup",
    "Blog website for a travel photographer"
  ], []);

  const [placeholder, setPlaceholder] = useState("Corporate website for a tech startup");

  // Set random placeholder after component mounts to avoid hydration issues
  React.useEffect(() => {
    const randomPlaceholder = placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];
    setPlaceholder(randomPlaceholder);
  }, [placeholderTexts]);

  const validateForm = (): boolean => {
    const newErrors: { prompt?: string } = {};
    
    if (!prompt.trim()) {
      newErrors.prompt = 'Please enter a website idea';
    } else if (prompt.trim().length < 10) {
      newErrors.prompt = 'Website idea must be at least 10 characters long';
    } else if (prompt.trim().length > 500) {
      newErrors.prompt = 'Website idea must not exceed 500 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || isLoading) {
      return;
    }

    try {
      await onSubmit(prompt.trim());
      setPrompt('');
      setErrors({});
    } catch {
      // Error handling is done in the parent component
    }
  };

  const handleInputChange = (value: string) => {
    setPrompt(value);
    // Clear errors when user starts typing
    if (errors.prompt) {
      setErrors({});
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div>
        <label 
          htmlFor="website-prompt" 
          className="block text-sm font-medium text-foreground mb-3 theme-transition"
        >
          Describe your website idea
        </label>
        <textarea
          id="website-prompt"
          value={prompt}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className={`
            form-input w-full resize-none transition-all duration-200 theme-transition
            placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring
            ${errors.prompt 
              ? 'border-destructive bg-destructive/5' 
              : 'border-border hover:border-muted-foreground'
            }
          `}
          disabled={isLoading}
          maxLength={500}
          aria-describedby={errors.prompt ? 'prompt-error' : 'prompt-counter'}
        />
        <div className="flex justify-between items-center mt-2">
          {errors.prompt && (
            <p id="prompt-error" className="text-sm text-destructive theme-transition" role="alert">
              {errors.prompt}
            </p>
          )}
          <div className="ml-auto">
            <span 
              id="prompt-counter"
              className={`text-xs theme-transition ${
                prompt.length > 450 
                  ? 'text-warning' 
                  : 'text-muted-foreground'
              }`}
              aria-label={`Character count: ${prompt.length} of 500`}
            >
              {prompt.length}/500
            </span>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading || !prompt.trim()}
        className={`
          w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 theme-transition
          flex items-center justify-center space-x-3 relative overflow-hidden group
          ${isLoading || !prompt.trim()
            ? 'bg-muted text-muted-foreground cursor-not-allowed opacity-60'
            : 'btn-primary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background transform hover:scale-[1.02] shadow-lg hover:shadow-xl active:scale-[0.98]'
          }
        `}
        aria-label={isLoading ? 'Generating website sections' : 'Generate website sections'}
      >
        {/* Loading shimmer effect */}
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
        )}
        
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span>Generating Sections...</span>
          </>
        ) : (
          <>
            <svg className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span>Generate Website Sections</span>
          </>
        )}
      </button>

      {/* Helper text */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground theme-transition">
          💡 Try being specific about your business type, target audience, or key features
        </p>
      </div>
    </form>
  );
};
