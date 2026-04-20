import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { VentureData } from '../VentureData';

interface InvestorProfile {
  id: string;
  name?: string;
  email?: string;
  organization?: string;
  investmentFocus: string[];
  riskTolerance: 'conservative' | 'moderate' | 'aggressive';
  investmentRange: {
    min: number;
    max: number;
  };
  preferredStage: string[];
  geography: string[];
  createdAt: number;
  lastActive: number;
}

interface ViewingHistory {
  ventureId: string;
  timestamp: number;
  timeSpent: number;
  actionsPerformed: string[];
}

interface Comparison {
  id: string;
  ventures: string[];
  createdAt: number;
  name?: string;
}

interface InvestorNote {
  ventureId: string;
  content: string;
  timestamp: number;
  tags: string[];
}

interface InvestorPreferences {
  currency: 'USD' | 'EUR' | 'GBP' | 'CAD';
  dateFormat: 'MM/DD/YYYY' | 'DD/MM/YYYY' | 'YYYY-MM-DD';
  theme: 'light' | 'dark' | 'auto';
  emailNotifications: boolean;
  dataRetention: boolean;
  showAdvancedMetrics: boolean;
  defaultDashboardView: 'overview' | 'analytics' | 'ventures';
}

interface InvestorState {
  profile: InvestorProfile | null;
  favorites: string[];
  viewingHistory: ViewingHistory[];
  comparisons: Comparison[];
  notes: Record<string, InvestorNote>;
  preferences: InvestorPreferences;
  searchHistory: string[];
  isAuthenticated: boolean;
}

interface InvestorContextType extends InvestorState {
  // Profile management
  createProfile: (profile: Omit<InvestorProfile, 'id' | 'createdAt' | 'lastActive'>) => void;
  updateProfile: (updates: Partial<InvestorProfile>) => void;
  
  // Favorites management
  toggleFavorite: (ventureId: string) => void;
  isFavorite: (ventureId: string) => boolean;
  
  // Viewing history
  trackVentureView: (ventureId: string, timeSpent: number, actions: string[]) => void;
  getVentureHistory: (ventureId: string) => ViewingHistory[];
  
  // Comparisons
  createComparison: (ventures: string[], name?: string) => string;
  updateComparison: (id: string, updates: Partial<Comparison>) => void;
  deleteComparison: (id: string) => void;
  
  // Notes
  addNote: (ventureId: string, content: string, tags?: string[]) => void;
  updateNote: (ventureId: string, content: string, tags?: string[]) => void;
  deleteNote: (ventureId: string) => void;
  
  // Preferences
  updatePreferences: (updates: Partial<InvestorPreferences>) => void;
  
  // Search
  addToSearchHistory: (query: string) => void;
  getSearchSuggestions: () => string[];
  
  // Recommendations
  getRecommendedVentures: (ventures: VentureData[]) => VentureData[];
  
  // Export data
  exportInvestorData: () => Blob;
  importInvestorData: (data: string) => void;
  
  // Clear data
  clearAllData: () => void;
}

const defaultPreferences: InvestorPreferences = {
  currency: 'USD',
  dateFormat: 'MM/DD/YYYY',
  theme: 'auto',
  emailNotifications: true,
  dataRetention: true,
  showAdvancedMetrics: false,
  defaultDashboardView: 'overview',
};

const InvestorContext = createContext<InvestorContextType | null>(null);

export function useInvestor() {
  const context = useContext(InvestorContext);
  if (!context) {
    throw new Error('useInvestor must be used within an InvestorProvider');
  }
  return context;
}

interface InvestorProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'investor_data_v1';

export function InvestorProvider({ children }: InvestorProviderProps) {
  const [state, setState] = useState<InvestorState>(() => {
    // Load from localStorage
    if (typeof window !== 'undefined') {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsedData = JSON.parse(stored);
          return {
            ...parsedData,
            preferences: { ...defaultPreferences, ...parsedData.preferences },
          };
        }
      } catch (error) {
        console.warn('Failed to load investor data from localStorage:', error);
      }
    }
    
    return {
      profile: null,
      favorites: [],
      viewingHistory: [],
      comparisons: [],
      notes: {},
      preferences: defaultPreferences,
      searchHistory: [],
      isAuthenticated: false,
    };
  });

  // Auto-save to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (error) {
        console.warn('Failed to save investor data to localStorage:', error);
      }
    }
  }, [state]);

  const createProfile = useCallback((profileData: Omit<InvestorProfile, 'id' | 'createdAt' | 'lastActive'>) => {
    const profile: InvestorProfile = {
      ...profileData,
      id: `investor_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    setState(prev => ({
      ...prev,
      profile,
      isAuthenticated: true,
    }));
  }, []);

  const updateProfile = useCallback((updates: Partial<InvestorProfile>) => {
    setState(prev => ({
      ...prev,
      profile: prev.profile ? {
        ...prev.profile,
        ...updates,
        lastActive: Date.now(),
      } : null,
    }));
  }, []);

  const toggleFavorite = useCallback((ventureId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.includes(ventureId)
        ? prev.favorites.filter(id => id !== ventureId)
        : [...prev.favorites, ventureId],
    }));
  }, []);

  const isFavorite = useCallback((ventureId: string) => {
    return state.favorites.includes(ventureId);
  }, [state.favorites]);

  const trackVentureView = useCallback((ventureId: string, timeSpent: number, actions: string[]) => {
    const viewingEntry: ViewingHistory = {
      ventureId,
      timestamp: Date.now(),
      timeSpent,
      actionsPerformed: actions,
    };

    setState(prev => ({
      ...prev,
      viewingHistory: [viewingEntry, ...prev.viewingHistory.slice(0, 99)], // Keep last 100 views
    }));
  }, []);

  const getVentureHistory = useCallback((ventureId: string) => {
    return state.viewingHistory.filter(item => item.ventureId === ventureId);
  }, [state.viewingHistory]);

  const createComparison = useCallback((ventures: string[], name?: string) => {
    const comparison: Comparison = {
      id: `comparison_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ventures,
      createdAt: Date.now(),
      name,
    };

    setState(prev => ({
      ...prev,
      comparisons: [comparison, ...prev.comparisons],
    }));

    return comparison.id;
  }, []);

  const updateComparison = useCallback((id: string, updates: Partial<Comparison>) => {
    setState(prev => ({
      ...prev,
      comparisons: prev.comparisons.map(comp =>
        comp.id === id ? { ...comp, ...updates } : comp
      ),
    }));
  }, []);

  const deleteComparison = useCallback((id: string) => {
    setState(prev => ({
      ...prev,
      comparisons: prev.comparisons.filter(comp => comp.id !== id),
    }));
  }, []);

  const addNote = useCallback((ventureId: string, content: string, tags: string[] = []) => {
    const note: InvestorNote = {
      ventureId,
      content,
      timestamp: Date.now(),
      tags,
    };

    setState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [ventureId]: note,
      },
    }));
  }, []);

  const updateNote = useCallback((ventureId: string, content: string, tags: string[] = []) => {
    setState(prev => ({
      ...prev,
      notes: {
        ...prev.notes,
        [ventureId]: {
          ...prev.notes[ventureId],
          content,
          tags,
          timestamp: Date.now(),
        },
      },
    }));
  }, []);

  const deleteNote = useCallback((ventureId: string) => {
    setState(prev => {
      const newNotes = { ...prev.notes };
      delete newNotes[ventureId];
      return {
        ...prev,
        notes: newNotes,
      };
    });
  }, []);

  const updatePreferences = useCallback((updates: Partial<InvestorPreferences>) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...updates,
      },
    }));
  }, []);

  const addToSearchHistory = useCallback((query: string) => {
    if (!query.trim()) return;

    setState(prev => ({
      ...prev,
      searchHistory: [
        query,
        ...prev.searchHistory.filter(q => q !== query).slice(0, 9), // Keep last 10 unique searches
      ],
    }));
  }, []);

  const getSearchSuggestions = useCallback(() => {
    return state.searchHistory.slice(0, 5); // Return top 5 recent searches
  }, [state.searchHistory]);

  const getRecommendedVentures = useCallback((ventures: VentureData[]) => {
    if (!state.profile) return ventures.slice(0, 3);

    // Score ventures based on investor profile
    const scoredVentures = ventures.map(venture => {
      let score = 0;

      // Investment focus match
      if (state.profile?.investmentFocus.some(focus =>
        venture.category.toLowerCase().includes(focus.toLowerCase()) ||
        venture.technologies.some(tech => tech.toLowerCase().includes(focus.toLowerCase()))
      )) {
        score += 5;
      }

      // Stage preference match
      if (state.profile?.preferredStage.includes(venture.status)) {
        score += 3;
      }

      // Viewing history bonus
      const viewCount = state.viewingHistory.filter(v => v.ventureId === venture.id).length;
      score += Math.min(viewCount * 0.5, 2);

      // Favorites bonus
      if (state.favorites.includes(venture.id)) {
        score += 10;
      }

      // Investment range match
      if (state.profile?.investmentRange) {
        const funding = parseFloat(venture.funding.replace(/[^0-9.]/g, ''));
        if (funding >= state.profile.investmentRange.min && funding <= state.profile.investmentRange.max) {
          score += 2;
        }
      }

      return { ...venture, recommendationScore: score };
    });

    return scoredVentures
      .sort((a, b) => b.recommendationScore - a.recommendationScore)
      .slice(0, 6);
  }, [state.profile, state.viewingHistory, state.favorites]);

  const exportInvestorData = useCallback(() => {
    const exportData = {
      ...state,
      exportedAt: new Date().toISOString(),
      version: '1.0',
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    });

    return blob;
  }, [state]);

  const importInvestorData = useCallback((data: string) => {
    try {
      const parsed = JSON.parse(data);
      
      if (parsed.version === '1.0') {
        setState({
          ...parsed,
          preferences: { ...defaultPreferences, ...parsed.preferences },
        });
      } else {
        throw new Error('Unsupported data version');
      }
    } catch (error) {
      console.error('Failed to import investor data:', error);
      throw error;
    }
  }, []);

  const clearAllData = useCallback(() => {
    setState({
      profile: null,
      favorites: [],
      viewingHistory: [],
      comparisons: [],
      notes: {},
      preferences: defaultPreferences,
      searchHistory: [],
      isAuthenticated: false,
    });

    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const value: InvestorContextType = {
    ...state,
    createProfile,
    updateProfile,
    toggleFavorite,
    isFavorite,
    trackVentureView,
    getVentureHistory,
    createComparison,
    updateComparison,
    deleteComparison,
    addNote,
    updateNote,
    deleteNote,
    updatePreferences,
    addToSearchHistory,
    getSearchSuggestions,
    getRecommendedVentures,
    exportInvestorData,
    importInvestorData,
    clearAllData,
  };

  return (
    <InvestorContext.Provider value={value}>
      {children}
    </InvestorContext.Provider>
  );
}

// Custom hooks for specific investor functionality
export function useInvestorPreferences() {
  const { preferences, updatePreferences } = useInvestor();
  return { preferences, updatePreferences };
}

export function useInvestorFavorites() {
  const { favorites, toggleFavorite, isFavorite } = useInvestor();
  return { favorites, toggleFavorite, isFavorite };
}

export function useInvestorNotes() {
  const { notes, addNote, updateNote, deleteNote } = useInvestor();
  return { notes, addNote, updateNote, deleteNote };
}

export function useVentureRecommendations(ventures: VentureData[]) {
  const { getRecommendedVentures } = useInvestor();
  return getRecommendedVentures(ventures);
}