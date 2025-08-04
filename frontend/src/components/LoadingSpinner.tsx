import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'default' | 'dots' | 'pulse';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '',
  variant = 'default'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  if (variant === 'dots') {
    return (
      <div className={`flex space-x-1 justify-center items-center ${className}`}>
        <div className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce`} style={{ animationDelay: '0ms' }}></div>
        <div className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce`} style={{ animationDelay: '150ms' }}></div>
        <div className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce`} style={{ animationDelay: '300ms' }}></div>
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`${sizeClasses[size]} bg-blue-600 dark:bg-blue-400 rounded-full animate-pulse ${className}`}>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  return (
    <div className={`animate-spin rounded-full border-2 border-gray-300 dark:border-gray-600 border-t-blue-600 dark:border-t-blue-400 ${sizeClasses[size]} ${className}`}>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export const LoadingSkeleton: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 bg-[length:200%_100%] animate-shimmer rounded ${className}`}>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
    </div>
  );
};

export const AdvancedLoadingState: React.FC<{ 
  message?: string;
  className?: string;
}> = ({ 
  message = "Processing your request...",
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 py-12 ${className}`}>
      <div className="relative">
        <LoadingSpinner size="lg" />
        <div className="absolute inset-0 rounded-full border-2 border-blue-200 dark:border-blue-800 animate-ping"></div>
      </div>
      <div className="text-center space-y-2">
        <p className="text-gray-600 dark:text-gray-300 font-medium">{message}</p>
        <div className="flex space-x-1 justify-center">
          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
          <span className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
        </div>
      </div>
    </div>
  );
};
