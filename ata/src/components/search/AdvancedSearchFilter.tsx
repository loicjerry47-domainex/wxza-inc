import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Slider } from '../ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { 
  Search, 
  Filter, 
  X, 
  SlidersHorizontal,
  TrendingUp,
  DollarSign,
  Target,
  Calendar,
  Users,
  Globe,
  Zap,
  RotateCcw,
  BookMark,
  Clock
} from 'lucide-react';
import { VentureData } from '../VentureData';
import { useInvestor } from '../investor/InvestorContext';
import { useAnalytics } from '../analytics/AnalyticsTracker';

interface SearchFilters {
  query: string;
  categories: string[];
  statuses: string[];
  fundingRange: [number, number];
  revenueRange: [number, number];
  technologies: string[];
  regions: string[];
  teamSizeRange: [number, number];
  dateRange: 'all' | '6m' | '1y' | '2y';
  sortBy: 'relevance' | 'funding' | 'revenue' | 'recent';
  sortOrder: 'asc' | 'desc';
  showFavoritesOnly: boolean;
}

interface AdvancedSearchFilterProps {
  ventures: VentureData[];
  onFilterChange: (filteredVentures: VentureData[]) => void;
  className?: string;
}

const defaultFilters: SearchFilters = {
  query: '',
  categories: [],
  statuses: [],
  fundingRange: [0, 1000],
  revenueRange: [0, 1000],
  technologies: [],
  regions: [],
  teamSizeRange: [0, 1000],
  dateRange: 'all',
  sortBy: 'relevance',
  sortOrder: 'desc',
  showFavoritesOnly: false,
};

export function AdvancedSearchFilter({ ventures, onFilterChange, className }: AdvancedSearchFilterProps) {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  const { favorites, getSearchSuggestions, addToSearchHistory } = useInvestor();
  const { trackEvent, trackVentureEngagement } = useAnalytics();

  // Extract unique values for filter options
  const filterOptions = useMemo(() => {
    const categories = [...new Set(ventures.map(v => v.category))];
    const statuses = [...new Set(ventures.map(v => v.status))];
    const technologies = [...new Set(ventures.flatMap(v => v.technology?.coretech || []))];
    const regions = [...new Set(ventures.map(v => v.headquarters || 'Global'))];

    return {
      categories: categories.sort(),
      statuses: statuses.sort(),
      technologies: technologies.sort(),
      regions: regions.sort(),
    };
  }, [ventures]);

  // Apply filters and search
  const filteredVentures = useMemo(() => {
    let result = [...ventures];

    // Text search
    if (filters.query.trim()) {
      const query = filters.query.toLowerCase();
      result = result.filter(venture =>
        venture.name.toLowerCase().includes(query) ||
        venture.description.toLowerCase().includes(query) ||
        venture.category.toLowerCase().includes(query) ||
        venture.tagline?.toLowerCase().includes(query) ||
        venture.technology?.coretech?.some(tech => tech.toLowerCase().includes(query)) ||
        venture.keyMetrics?.some(metric => metric.toLowerCase().includes(query))
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter(v => filters.categories.includes(v.category));
    }

    // Status filter
    if (filters.statuses.length > 0) {
      result = result.filter(v => filters.statuses.includes(v.status));
    }

    // Funding range
    result = result.filter(v => {
      const funding = parseFloat(v.financials?.fundingAsk?.replace(/[^0-9.]/g, '') || '0');
      return funding >= filters.fundingRange[0] && funding <= filters.fundingRange[1];
    });

    // Revenue range
    result = result.filter(v => {
      const revenue = parseFloat(v.financials?.projectedRevenue?.year5?.replace(/[^0-9.]/g, '') || '0');
      return revenue >= filters.revenueRange[0] && revenue <= filters.revenueRange[1];
    });

    // Technology filter
    if (filters.technologies.length > 0) {
      result = result.filter(v =>
        filters.technologies.some(tech => v.technology?.coretech?.includes(tech))
      );
    }

    // Region filter
    if (filters.regions.length > 0) {
      result = result.filter(v => 
        filters.regions.includes(v.headquarters || 'Global')
      );
    }

    // Team size range
    result = result.filter(v => {
      const teamSize = v.team?.teamSize || 0;
      return teamSize >= filters.teamSizeRange[0] && teamSize <= filters.teamSizeRange[1];
    });

    // Favorites only
    if (filters.showFavoritesOnly) {
      result = result.filter(v => favorites.includes(v.id));
    }

    // Sorting
    result.sort((a, b) => {
      let aValue: number | string;
      let bValue: number | string;

      switch (filters.sortBy) {
        case 'funding':
          aValue = parseFloat(a.financials?.fundingAsk?.replace(/[^0-9.]/g, '') || '0');
          bValue = parseFloat(b.financials?.fundingAsk?.replace(/[^0-9.]/g, '') || '0');
          break;
        case 'revenue':
          aValue = parseFloat(a.financials?.projectedRevenue?.year5?.replace(/[^0-9.]/g, '') || '0');
          bValue = parseFloat(b.financials?.projectedRevenue?.year5?.replace(/[^0-9.]/g, '') || '0');
          break;
        case 'recent':
          aValue = new Date(a.established || '2023-01-01').getTime();
          bValue = new Date(b.established || '2023-01-01').getTime();
          break;
        default: // relevance
          // Simple relevance scoring based on query matches
          if (filters.query.trim()) {
            const query = filters.query.toLowerCase();
            aValue = [a.name, a.description, a.category].join(' ').toLowerCase().split(query).length;
            bValue = [b.name, b.description, b.category].join(' ').toLowerCase().split(query).length;
          } else {
            aValue = parseFloat(a.financials?.fundingAsk?.replace(/[^0-9.]/g, '') || '0');
            bValue = parseFloat(b.financials?.fundingAsk?.replace(/[^0-9.]/g, '') || '0');
          }
          break;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return filters.sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return filters.sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

    return result;
  }, [ventures, filters, favorites]);

  // Update parent component when filters change
  useEffect(() => {
    onFilterChange(filteredVentures);
    
    // Track search and filter usage
    if (filters.query.trim()) {
      trackEvent('search_performed', {
        query: filters.query,
        results_count: filteredVentures.length,
        filters_applied: Object.entries(filters).filter(([key, value]) => 
          key !== 'query' && key !== 'sortBy' && key !== 'sortOrder' && 
          (Array.isArray(value) ? value.length > 0 : value !== defaultFilters[key as keyof SearchFilters])
        ).length,
      });
    }
  }, [filteredVentures, onFilterChange, filters, trackEvent]);

  const handleQueryChange = (query: string) => {
    setFilters(prev => ({ ...prev, query }));
    
    if (query.trim()) {
      addToSearchHistory(query);
      setSearchHistory(prev => [query, ...prev.filter(q => q !== query).slice(0, 4)]);
    }
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    trackEvent('filters_reset');
  };

  const toggleArrayFilter = (key: keyof SearchFilters, value: string) => {
    setFilters(prev => {
      const currentArray = prev[key] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [key]: newArray };
    });
  };

  const getActiveFilterCount = () => {
    return Object.entries(filters).filter(([key, value]) => {
      if (key === 'query') return value.trim() !== '';
      if (key === 'sortBy' || key === 'sortOrder') return false;
      if (Array.isArray(value)) return value.length > 0;
      if (key.includes('Range')) {
        const defaultRange = defaultFilters[key as keyof SearchFilters] as [number, number];
        const currentRange = value as [number, number];
        return currentRange[0] !== defaultRange[0] || currentRange[1] !== defaultRange[1];
      }
      return value !== defaultFilters[key as keyof SearchFilters];
    }).length;
  };

  const getSuggestions = () => {
    const suggestions = getSearchSuggestions();
    return [...suggestions, ...searchHistory].slice(0, 5);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Advanced Search & Filters
          </CardTitle>
          <div className="flex items-center gap-2">
            {getActiveFilterCount() > 0 && (
              <Badge variant="secondary" className="text-xs">
                {getActiveFilterCount()} filters
              </Badge>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search ventures, technologies, or keywords..."
            value={filters.query}
            onChange={(e) => handleQueryChange(e.target.value)}
            className="pl-9 pr-4"
          />
          
          {/* Search Suggestions */}
          {filters.query && getSuggestions().length > 0 && (
            <Card className="absolute top-full mt-1 w-full z-50 border shadow-lg">
              <CardContent className="p-2">
                <div className="space-y-1">
                  {getSuggestions().map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleQueryChange(suggestion)}
                      className="w-full text-left px-2 py-1 text-sm hover:bg-muted rounded flex items-center gap-2"
                    >
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant={filters.showFavoritesOnly ? "default" : "outline"}
            size="sm"
            onClick={() => setFilters(prev => ({ ...prev, showFavoritesOnly: !prev.showFavoritesOnly }))}
          >
            <BookMark className="h-4 w-4 mr-1" />
            Favorites Only
          </Button>

          <Select value={filters.sortBy} onValueChange={(value) => setFilters(prev => ({ ...prev, sortBy: value as any }))}>
            <SelectTrigger className="w-32 h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="funding">Funding</SelectItem>
              <SelectItem value="revenue">Revenue</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilters(prev => ({ 
              ...prev, 
              sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc' 
            }))}
          >
            {filters.sortOrder === 'asc' ? '↑' : '↓'}
          </Button>

          {getActiveFilterCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters}>
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
          )}
        </div>

        {/* Results Summary */}
        <div className="text-sm text-muted-foreground">
          Showing {filteredVentures.length} of {ventures.length} ventures
          {filters.query && ` for "${filters.query}"`}
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-6 pt-4 border-t">
            {/* Categories */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Target className="h-4 w-4" />
                Categories
              </label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.categories.map(category => (
                  <Button
                    key={category}
                    variant={filters.categories.includes(category) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleArrayFilter('categories', category)}
                  >
                    {category}
                    {filters.categories.includes(category) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Status */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Development Stage
              </label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.statuses.map(status => (
                  <Button
                    key={status}
                    variant={filters.statuses.includes(status) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleArrayFilter('statuses', status)}
                  >
                    {status}
                    {filters.statuses.includes(status) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Funding Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Funding Required: ${filters.fundingRange[0]}M - ${filters.fundingRange[1]}M
              </label>
              <Slider
                value={filters.fundingRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, fundingRange: value as [number, number] }))}
                min={0}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>

            {/* Revenue Range */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Projected Revenue: ${filters.revenueRange[0]}M - ${filters.revenueRange[1]}M
              </label>
              <Slider
                value={filters.revenueRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, revenueRange: value as [number, number] }))}
                min={0}
                max={1000}
                step={10}
                className="w-full"
              />
            </div>

            {/* Technologies */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Technologies
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {filterOptions.technologies.slice(0, 12).map(tech => (
                  <div key={tech} className="flex items-center space-x-2">
                    <Checkbox
                      id={tech}
                      checked={filters.technologies.includes(tech)}
                      onCheckedChange={() => toggleArrayFilter('technologies', tech)}
                    />
                    <label htmlFor={tech} className="text-sm truncate">{tech}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Regions */}
            <div className="space-y-3">
              <label className="text-sm font-medium flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Regions
              </label>
              <div className="flex flex-wrap gap-2">
                {filterOptions.regions.map(region => (
                  <Button
                    key={region}
                    variant={filters.regions.includes(region) ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleArrayFilter('regions', region)}
                  >
                    {region}
                    {filters.regions.includes(region) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}