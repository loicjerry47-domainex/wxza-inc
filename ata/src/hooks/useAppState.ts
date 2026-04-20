import { useReducer, useCallback, useMemo } from 'react';

// Enhanced type definitions
export type ViewMode = 'showcase' | 'dashboard' | 'prototypes' | 'walkthroughs' | 'comparison';
export type DashboardView = 'overview' | 'analytics' | 'ventures';

export interface AppState {
  viewMode: ViewMode;
  dashboardView: DashboardView;
  compareVentures: string[];
  isOnline: boolean;
  isLoading: boolean;
  error: string | null;
  lastActivity: number;
  preferences: {
    theme: 'light' | 'dark' | 'system';
    reducedMotion: boolean;
    highContrast: boolean;
  };
  analytics: {
    sessionId: string;
    pageViews: number;
    interactions: number;
  };
}

export type AppAction =
  | { type: 'SET_VIEW_MODE'; payload: ViewMode }
  | { type: 'SET_DASHBOARD_VIEW'; payload: DashboardView }
  | { type: 'SET_COMPARE_VENTURES'; payload: string[] }
  | { type: 'ADD_COMPARE_VENTURE'; payload: string }
  | { type: 'REMOVE_COMPARE_VENTURE'; payload: string }
  | { type: 'SET_ONLINE_STATUS'; payload: boolean }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'CLEAR_ERROR' }
  | { type: 'UPDATE_ACTIVITY' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' | 'system' }
  | { type: 'TOGGLE_REDUCED_MOTION' }
  | { type: 'TOGGLE_HIGH_CONTRAST' }
  | { type: 'TRACK_PAGE_VIEW' }
  | { type: 'TRACK_INTERACTION' }
  | { type: 'RESET_STATE' };

const initialState: AppState = {
  viewMode: 'dashboard',
  dashboardView: 'overview',
  compareVentures: [],
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true,
  isLoading: false,
  error: null,
  lastActivity: Date.now(),
  preferences: {
    theme: 'system',
    reducedMotion: false,
    highContrast: false,
  },
  analytics: {
    sessionId: crypto.randomUUID(),
    pageViews: 0,
    interactions: 0,
  },
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_VIEW_MODE':
      return {
        ...state,
        viewMode: action.payload,
        lastActivity: Date.now(),
        error: null, // Clear errors on navigation
      };

    case 'SET_DASHBOARD_VIEW':
      return {
        ...state,
        dashboardView: action.payload,
        lastActivity: Date.now(),
      };

    case 'SET_COMPARE_VENTURES':
      return {
        ...state,
        compareVentures: action.payload,
        lastActivity: Date.now(),
      };

    case 'ADD_COMPARE_VENTURE':
      if (state.compareVentures.includes(action.payload)) {
        return state; // Already exists
      }
      return {
        ...state,
        compareVentures: [...state.compareVentures, action.payload].slice(0, 5), // Limit to 5
        lastActivity: Date.now(),
      };

    case 'REMOVE_COMPARE_VENTURE':
      return {
        ...state,
        compareVentures: state.compareVentures.filter(id => id !== action.payload),
        lastActivity: Date.now(),
      };

    case 'SET_ONLINE_STATUS':
      return {
        ...state,
        isOnline: action.payload,
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };

    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    case 'UPDATE_ACTIVITY':
      return {
        ...state,
        lastActivity: Date.now(),
      };

    case 'SET_THEME':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          theme: action.payload,
        },
      };

    case 'TOGGLE_REDUCED_MOTION':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          reducedMotion: !state.preferences.reducedMotion,
        },
      };

    case 'TOGGLE_HIGH_CONTRAST':
      return {
        ...state,
        preferences: {
          ...state.preferences,
          highContrast: !state.preferences.highContrast,
        },
      };

    case 'TRACK_PAGE_VIEW':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          pageViews: state.analytics.pageViews + 1,
        },
      };

    case 'TRACK_INTERACTION':
      return {
        ...state,
        analytics: {
          ...state.analytics,
          interactions: state.analytics.interactions + 1,
        },
        lastActivity: Date.now(),
      };

    case 'RESET_STATE':
      return {
        ...initialState,
        analytics: {
          ...initialState.analytics,
          sessionId: crypto.randomUUID(),
        },
      };

    default:
      return state;
  }
}

export function useAppState() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Memoized action creators
  const actions = useMemo(() => ({
    setViewMode: (mode: ViewMode) => dispatch({ type: 'SET_VIEW_MODE', payload: mode }),
    setDashboardView: (view: DashboardView) => dispatch({ type: 'SET_DASHBOARD_VIEW', payload: view }),
    setCompareVentures: (ventures: string[]) => dispatch({ type: 'SET_COMPARE_VENTURES', payload: ventures }),
    addCompareVenture: (ventureId: string) => dispatch({ type: 'ADD_COMPARE_VENTURE', payload: ventureId }),
    removeCompareVenture: (ventureId: string) => dispatch({ type: 'REMOVE_COMPARE_VENTURE', payload: ventureId }),
    setOnlineStatus: (isOnline: boolean) => dispatch({ type: 'SET_ONLINE_STATUS', payload: isOnline }),
    setLoading: (isLoading: boolean) => dispatch({ type: 'SET_LOADING', payload: isLoading }),
    setError: (error: string | null) => dispatch({ type: 'SET_ERROR', payload: error }),
    clearError: () => dispatch({ type: 'CLEAR_ERROR' }),
    updateActivity: () => dispatch({ type: 'UPDATE_ACTIVITY' }),
    setTheme: (theme: 'light' | 'dark' | 'system') => dispatch({ type: 'SET_THEME', payload: theme }),
    toggleReducedMotion: () => dispatch({ type: 'TOGGLE_REDUCED_MOTION' }),
    toggleHighContrast: () => dispatch({ type: 'TOGGLE_HIGH_CONTRAST' }),
    trackPageView: () => dispatch({ type: 'TRACK_PAGE_VIEW' }),
    trackInteraction: () => dispatch({ type: 'TRACK_INTERACTION' }),
    resetState: () => dispatch({ type: 'RESET_STATE' }),
  }), []);

  // Computed values
  const computed = useMemo(() => ({
    isCompareMode: state.viewMode === 'comparison',
    hasCompareVentures: state.compareVentures.length > 0,
    canAddMoreVentures: state.compareVentures.length < 5,
    isRecentActivity: Date.now() - state.lastActivity < 300000, // 5 minutes
    sessionDuration: Date.now() - (state.analytics.sessionId ? 0 : Date.now()),
  }), [state]);

  return {
    state,
    actions,
    computed,
  };
}

// Type guard functions
export function isDashboardView(value: string): value is DashboardView {
  return ['overview', 'analytics', 'ventures'].includes(value);
}

export function isViewMode(value: string): value is ViewMode {
  return ['showcase', 'dashboard', 'prototypes', 'walkthroughs', 'comparison'].includes(value);
}