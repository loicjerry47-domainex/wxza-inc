import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import { Checkbox } from "./ui/checkbox";
import { 
  Search, 
  Filter, 
  SortAsc, 
  Grid3X3, 
  List,
  TrendingUp,
  Users,
  DollarSign,
  Target,
  Calendar,
  MapPin,
  Award,
  Zap,
  Eye,
  ChevronRight,
  Building2,
  Rocket,
  Shield,
  Globe,
  BarChart3,
  Activity,
  Star,
  GitCompare,
  Plus
} from "lucide-react";
import { VentureData } from "./VentureData";
import { EnhancedVentureDetailView } from "./EnhancedVentureDetailView";

interface EnhancedVentureDashboardProps {
  ventures: VentureData[];
  onCompareVentures?: (ventureIds: string[]) => void;
}

export function EnhancedVentureDashboard({ ventures, onCompareVentures }: EnhancedVentureDashboardProps) {
  const [selectedVenture, setSelectedVenture] = useState<VentureData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("funding");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);
  const [isComparisonMode, setIsComparisonMode] = useState(false);

  const categories = [...new Set(ventures.map(v => v.category))];
  const statuses = [...new Set(ventures.map(v => v.status))];

  const filteredAndSortedVentures = useMemo(() => {
    let filtered = ventures.filter(venture => {
      const matchesSearch = venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venture.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           venture.tagline.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === "all" || venture.category === categoryFilter;
      const matchesStatus = statusFilter === "all" || venture.status === statusFilter;
      
      return matchesSearch && matchesCategory && matchesStatus;
    });

    // Sort ventures
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "funding":
          const aFunding = parseFloat(a.financials.fundingAsk.replace(/\$|,/g, ''));
          const bFunding = parseFloat(b.financials.fundingAsk.replace(/\$|,/g, ''));
          return bFunding - aFunding;
        case "revenue":
          const aRevenue = parseFloat(a.financials.projectedRevenue.year5.replace(/\$|,/g, ''));
          const bRevenue = parseFloat(b.financials.projectedRevenue.year5.replace(/\$|,/g, ''));
          return bRevenue - aRevenue;
        case "name":
          return a.name.localeCompare(b.name);
        case "established":
          return new Date(b.established).getTime() - new Date(a.established).getTime();
        default:
          return 0;
      }
    });

    return filtered;
  }, [ventures, searchQuery, categoryFilter, statusFilter, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Growth": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Launch": return "bg-orange-100 text-orange-800 border-orange-200";
      case "Scale": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatCurrency = (amount: string) => {
    return amount.replace(/\$(\d+)([MBK])/g, '$$$1$2');
  };

  const calculatePortfolioMetrics = () => {
    const totalFunding = ventures.reduce((sum, v) => {
      const amount = parseFloat(v.financials.fundingAsk.replace(/\$|,/g, ''));
      const multiplier = v.financials.fundingAsk.includes('B') ? 1000 : 
                        v.financials.fundingAsk.includes('M') ? 1 : 0.001;
      return sum + (amount * multiplier);
    }, 0);

    const totalRevenue = ventures.reduce((sum, v) => {
      const amount = parseFloat(v.financials.projectedRevenue.year5.replace(/\$|,/g, ''));
      const multiplier = v.financials.projectedRevenue.year5.includes('B') ? 1000 : 
                        v.financials.projectedRevenue.year5.includes('M') ? 1 : 0.001;
      return sum + (amount * multiplier);
    }, 0);

    const avgTeamSize = ventures.reduce((sum, v) => sum + (v.team?.teamSize || 0), 0) / ventures.length;
    const totalEmployees = ventures.reduce((sum, v) => sum + (v.team?.teamSize || 0), 0);

    return { totalFunding, totalRevenue, avgTeamSize, totalEmployees };
  };

  const handleComparisonToggle = (ventureId: string) => {
    setSelectedForComparison(prev => {
      if (prev.includes(ventureId)) {
        return prev.filter(id => id !== ventureId);
      } else if (prev.length < 4) { // Limit to 4 ventures for comparison
        return [...prev, ventureId];
      }
      return prev;
    });
  };

  const handleStartComparison = () => {
    if (selectedForComparison.length >= 2 && onCompareVentures) {
      onCompareVentures(selectedForComparison);
    }
  };

  const metrics = calculatePortfolioMetrics();

  if (selectedVenture) {
    return (
      <EnhancedVentureDetailView 
        venture={selectedVenture} 
        onBack={() => setSelectedVenture(null)}
        allVentures={ventures}
        onSelectVenture={setSelectedVenture}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-auto relative">
      {/* Organic Flowing Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-pink-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '12s', animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '10s', animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 space-y-8 p-6">
      {/* Enhanced Header */}
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Enterprise Venture Portfolio
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Comprehensive analysis and strategic insights for revolutionary technology ventures
          </p>
        </div>
        
        <div className="flex items-center justify-center gap-8 text-sm">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-primary" />
            <span className="font-medium">{ventures.length} Active Ventures</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <span className="font-medium">${metrics.totalRevenue.toFixed(1)}B Revenue Potential</span>
          </div>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" />
            <span className="font-medium">{metrics.totalEmployees} Team Members</span>
          </div>
        </div>
      </div>

      {/* Portfolio Metrics Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Funding</p>
                <p className="text-2xl font-bold">${metrics.totalFunding.toFixed(1)}M</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3 text-green-600" />
                  <span className="text-xs text-green-600">Portfolio growth</span>
                </div>
              </div>
              <DollarSign className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Revenue Potential</p>
                <p className="text-2xl font-bold">${metrics.totalRevenue.toFixed(1)}B</p>
                <div className="flex items-center gap-1 mt-1">
                  <Rocket className="h-3 w-3 text-blue-600" />
                  <span className="text-xs text-blue-600">5-year projection</span>
                </div>
              </div>
              <BarChart3 className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Team Size</p>
                <p className="text-2xl font-bold">{metrics.totalEmployees}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Users className="h-3 w-3 text-purple-600" />
                  <span className="text-xs text-purple-600">Total employees</span>
                </div>
              </div>
              <Users className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">ROI Multiple</p>
                <p className="text-2xl font-bold">{(metrics.totalRevenue / metrics.totalFunding).toFixed(0)}×</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="h-3 w-3 text-yellow-600" />
                  <span className="text-xs text-yellow-600">Average return</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-primary opacity-80" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Advanced Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Advanced Filters & Search
            </CardTitle>
            <div className="flex items-center gap-2">
              {onCompareVentures && (
                <Button
                  variant={isComparisonMode ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => {
                    setIsComparisonMode(!isComparisonMode);
                    if (!isComparisonMode) {
                      setSelectedForComparison([]);
                    }
                  }}
                >
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare
                  {selectedForComparison.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedForComparison.length}
                    </Badge>
                  )}
                </Button>
              )}
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search ventures, technologies, markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                {statuses.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="funding">Funding Amount</SelectItem>
                <SelectItem value="revenue">Revenue Potential</SelectItem>
                <SelectItem value="name">Company Name</SelectItem>
                <SelectItem value="established">Established Date</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Showing {filteredAndSortedVentures.length} of {ventures.length} ventures</span>
            </div>
            
            <div className="flex items-center gap-2">
              {isComparisonMode && selectedForComparison.length >= 2 && (
                <Button onClick={handleStartComparison} size="sm">
                  <GitCompare className="h-4 w-4 mr-2" />
                  Compare {selectedForComparison.length} Ventures
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                  setSortBy("funding");
                  setSelectedForComparison([]);
                  setIsComparisonMode(false);
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ventures Grid/List */}
      <div className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' 
          : 'grid-cols-1'
      }`}>
        {filteredAndSortedVentures.map((venture) => (
          <Card 
            key={venture.id} 
            className={`group cursor-pointer hover:shadow-xl transition-all duration-300 border-l-4 border-l-primary hover:border-l-8 ${
              viewMode === 'list' ? 'hover:bg-muted/20' : ''
            } ${
              selectedForComparison.includes(venture.id) ? 'ring-2 ring-primary bg-primary/5' : ''
            }`}
            onClick={() => {
              if (isComparisonMode) {
                handleComparisonToggle(venture.id);
              } else {
                setSelectedVenture(venture);
              }
            }}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-3">
                    {isComparisonMode && (
                      <Checkbox
                        checked={selectedForComparison.includes(venture.id)}
                        onChange={() => handleComparisonToggle(venture.id)}
                        disabled={!selectedForComparison.includes(venture.id) && selectedForComparison.length >= 4}
                      />
                    )}
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {venture.name}
                    </CardTitle>
                    {!isComparisonMode && (
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs">{venture.category}</Badge>
                    <Badge className={`text-xs ${getStatusColor(venture.status)}`}>
                      {venture.status}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span>{venture.headquarters}</span>
                    </div>
                  </div>
                  
                  <CardDescription className="text-sm line-clamp-2">
                    {venture.tagline}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {viewMode === 'grid' ? (
                <>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <DollarSign className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">Funding Ask</span>
                      </div>
                      <p className="font-medium">{venture.financials.fundingAsk}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">Year 5 Revenue</span>
                      </div>
                      <p className="font-medium">{formatCurrency(venture.financials.projectedRevenue.year5)}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Target className="h-3 w-3 text-primary" />
                      <span className="text-xs text-muted-foreground">Market Impact</span>
                    </div>
                    <p className="text-sm">{venture.impact}</p>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-4 gap-6 text-sm">
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <DollarSign className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">Funding</span>
                    </div>
                    <p className="font-medium">{venture.financials.fundingAsk}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">Revenue (Y5)</span>
                    </div>
                    <p className="font-medium">{formatCurrency(venture.financials.projectedRevenue.year5)}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Users className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">Team Size</span>
                    </div>
                    <p className="font-medium">{venture.team?.teamSize || 'N/A'}</p>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-1 mb-1">
                      <Calendar className="h-3 w-3 text-primary" />
                      <span className="text-muted-foreground">Established</span>
                    </div>
                    <p className="font-medium">{venture.established}</p>
                  </div>
                </div>
              )}
              
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  {isComparisonMode ? (
                    <>
                      <GitCompare className="h-3 w-3" />
                      <span>Select for comparison</span>
                    </>
                  ) : (
                    <>
                      <Eye className="h-3 w-3" />
                      <span>Click to explore details</span>
                    </>
                  )}
                </div>
                
                <div className="flex items-center gap-1">
                  {venture.technology?.patents?.length > 0 && (
                    <Badge variant="outline" className="text-xs">
                      <Shield className="h-3 w-3 mr-1" />
                      {venture.technology.patents.length} Patents
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAndSortedVentures.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="font-medium">No ventures found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search criteria or clearing filters
                </p>
              </div>
              <Button 
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setCategoryFilter("all");
                  setStatusFilter("all");
                }}
              >
                Clear All Filters
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}