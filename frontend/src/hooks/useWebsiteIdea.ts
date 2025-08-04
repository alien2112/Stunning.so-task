import { useState, useCallback } from 'react';
import { websiteIdeaApi } from '@/services/api';
import { WebsiteIdea, CreateWebsiteIdeaRequest } from '@/types';

interface UseWebsiteIdeaResult {
  websiteIdeas: WebsiteIdea[];
  currentIdea: WebsiteIdea | null;
  isLoading: boolean;
  error: string | null;
  createIdea: (prompt: string) => Promise<WebsiteIdea | null>;
  fetchAllIdeas: () => Promise<void>;
  fetchIdeaById: (id: string) => Promise<void>;
  deleteIdea: (id: string) => Promise<void>;
  clearError: () => void;
}

export const useWebsiteIdea = (): UseWebsiteIdeaResult => {
  const [websiteIdeas, setWebsiteIdeas] = useState<WebsiteIdea[]>([]);
  const [currentIdea, setCurrentIdea] = useState<WebsiteIdea | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const createIdea = useCallback(async (prompt: string): Promise<WebsiteIdea | null> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Add realistic loading timing (minimum 4-6 seconds for authentic feel)
      const minLoadingTime = 4000; // 4 seconds minimum
      const maxLoadingTime = 6000; // 6 seconds maximum
      const actualLoadingTime = Math.random() * (maxLoadingTime - minLoadingTime) + minLoadingTime;
      
      // Start the API call and minimum timing in parallel
      const [apiResult] = await Promise.all([
        websiteIdeaApi.create({ prompt } as CreateWebsiteIdeaRequest),
        new Promise(resolve => setTimeout(resolve, actualLoadingTime))
      ]);
      
      setCurrentIdea(apiResult);
      setWebsiteIdeas(prev => [apiResult, ...prev]);
      return apiResult;
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to create website idea';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchAllIdeas = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const ideas = await websiteIdeaApi.getAll();
      setWebsiteIdeas(ideas);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch website ideas';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchIdeaById = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const idea = await websiteIdeaApi.getById(id);
      setCurrentIdea(idea);
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to fetch website idea';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteIdea = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      await websiteIdeaApi.delete(id);
      setWebsiteIdeas(prev => prev.filter(idea => idea._id !== id));
      if (currentIdea?._id === id) {
        setCurrentIdea(null);
      }
    } catch (err: unknown) {
      const errorMessage = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to delete website idea';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentIdea]);

  return {
    websiteIdeas,
    currentIdea,
    isLoading,
    error,
    createIdea,
    fetchAllIdeas,
    fetchIdeaById,
    deleteIdea,
    clearError,
  };
};
