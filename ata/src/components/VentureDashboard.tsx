import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Target, 
  Zap, 
  Shield, 
  Award,
  Building2,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter
} from "lucide-react";
import { VentureData } from "./VentureData";
import { VentureDetailView } from "./VentureDetailView";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

interface VentureDashboardProps {
  ventures: VentureData[];
}

export function VentureDashboard({ ventures }: VentureDashboardProps) {
  const [selectedVenture, setSelectedVenture] = useState<VentureData | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const categories = [...new Set(ventures.map(v => v.category))];
  const statuses = [...new Set(ventures.map(v => v.status))];

  const filteredVentures = ventures.filter(venture => {
    const matchesSearch = venture.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         venture.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || venture.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || venture.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Growth": return "bg-blue-100 text-blue-800";
      case "Launch": return "bg-orange-100 text-orange-800";
      case "Scale": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: string) => {
    return amount.replace(/\$(\d+)([MBK])/g, '$$$1$2');
  };

  if (selectedVenture) {
    return (
      <VentureDetailView 
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

      <div className="relative z-10 space-y-6 p-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-black tracking-wider">INTERACTIVE VENTURE DASHBOARD</h1>
        <p className="text-white/60 max-w-2xl mx-auto">
          Explore detailed insights, financial projections, and strategic analysis for each revolutionary venture
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex gap-4 items-center">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search ventures..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-48">
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
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Filter className="h-4 w-4" />
          <span>{filteredVentures.length} ventures shown</span>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Ventures</p>
                <p className="text-2xl font-bold">{filteredVentures.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Combined Revenue</p>
                <p className="text-2xl font-bold">$630B+</p>
              </div>
              <DollarSign className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">People Impacted</p>
                <p className="text-2xl font-bold">1.5B+</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Industries</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <Target className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Venture Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVentures.map((venture) => (
          <Card 
            key={venture.id} 
            className="cursor-pointer hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary"
            onClick={() => setSelectedVenture(venture)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="text-lg">{venture.name}</CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs">{venture.category}</Badge>
                    <Badge className={`text-xs ${getStatusColor(venture.status)}`}>
                      {venture.status}
                    </Badge>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
              <CardDescription className="text-sm">
                {venture.tagline}
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-4">
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
                    <span className="text-muted-foreground">Year 5 Rev</span>
                  </div>
                  <p className="font-medium">{formatCurrency(venture.financials.projectedRevenue.year5)}</p>
                </div>
              </div>
              
              <div className="space-y-1">
                <div className="flex items-center gap-1">
                  <Target className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Market Impact</span>
                </div>
                <p className="text-sm">{venture.impact}</p>
              </div>
              
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Zap className="h-3 w-3" />
                <span>Click to explore details</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVentures.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No ventures found matching your criteria.</p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearchQuery("");
              setCategoryFilter("all");
              setStatusFilter("all");
            }}
            className="mt-4"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}