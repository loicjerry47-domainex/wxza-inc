import React, { useState, useCallback, useMemo, Suspense, lazy } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { 
  ArrowLeft, 
  Play, 
  Smartphone, 
  Monitor, 
  Tablet,
  Eye,
  Zap,
  Leaf,
  Heart,
  Globe,
  Users,
  Brain,
  Camera,
  Car,
  Loader2,
  AlertTriangle
} from "lucide-react";
import { ventureData } from "./VentureData";
import { Alert, AlertDescription } from "./ui/alert";

// Lazy load individual prototype components for better performance
const NimbusBiomePrototype = lazy(() => import("./prototypes/NimbusBiomePrototype").then(m => ({ default: m.NimbusBiomePrototype })));
const LensstormPrototype = lazy(() => import("./prototypes/LensstormPrototype").then(m => ({ default: m.LensstormPrototype })));
const OtoPrototype = lazy(() => import("./prototypes/OtoPrototype").then(m => ({ default: m.OtoPrototype })));
const EverBloomPrototype = lazy(() => import("./prototypes/EverBloomPrototype").then(m => ({ default: m.EverBloomPrototype })));
const GcraftPrototype = lazy(() => import("./prototypes/GcraftPrototype").then(m => ({ default: m.GcraftPrototype })));
const HearbAssistPrototype = lazy(() => import("./prototypes/HearbAssistPrototype").then(m => ({ default: m.HearbAssistPrototype })));
const ProsPrototype = lazy(() => import("./prototypes/ProsPrototype").then(m => ({ default: m.ProsPrototype })));
const InectPrototype = lazy(() => import("./prototypes/InectPrototype").then(m => ({ default: m.InectPrototype })));
const MparkerPrototype = lazy(() => import("./prototypes/MparkerPrototype").then(m => ({ default: m.MparkerPrototype })));

interface PrototypeShowcaseProps {
  onBack: () => void;
}

// Loading fallback component
function PrototypeLoader() {
  return (
    <div className="flex items-center justify-center h-full min-h-[400px]">
      <div className="flex flex-col items-center gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading prototype...</p>
      </div>
    </div>
  );
}

// Error fallback component
function PrototypeError({ onRetry }: { onRetry: () => void }) {
  return (
    <Alert className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">Failed to load prototype</p>
          <Button onClick={onRetry} size="sm" variant="outline">
            Try Again
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  );
}

const prototypeComponents = {
  "nimbus-biome": NimbusBiomePrototype,
  "lensstorm": LensstormPrototype,
  "oto": OtoPrototype,
  "everbloom": EverBloomPrototype,
  "gcraft": GcraftPrototype,
  "hearb-assist": HearbAssistPrototype,
  "pros": ProsPrototype,
  "inect": InectPrototype,
  "mparker": MparkerPrototype,
};

const ventureIcons = {
  "nimbus-biome": Leaf,
  "lensstorm": Eye,
  "oto": Users,
  "everbloom": Heart,
  "gcraft": Zap,
  "hearb-assist": Globe,
  "pros": Brain,
  "inect": Camera,
  "mparker": Car,
};

export function PrototypeShowcase({ onBack }: PrototypeShowcaseProps) {
  const [selectedVenture, setSelectedVenture] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [error, setError] = useState<string | null>(null);

  // Memoized callbacks for performance
  const handleBack = useCallback(() => {
    setSelectedVenture(null);
    setError(null);
  }, []);

  const handleSelectVenture = useCallback((ventureId: string) => {
    setSelectedVenture(ventureId);
    setError(null);
  }, []);

  const handleDeviceChange = useCallback((device: 'desktop' | 'tablet' | 'mobile') => {
    setDeviceView(device);
  }, []);

  const handleRetry = useCallback(() => {
    setError(null);
    setSelectedVenture(null);
  }, []);

  // Memoized venture data
  const venture = useMemo(() => 
    selectedVenture ? ventureData.find(v => v.id === selectedVenture) : null,
    [selectedVenture]
  );

  const PrototypeComponent = useMemo(() => 
    selectedVenture ? prototypeComponents[selectedVenture as keyof typeof prototypeComponents] : null,
    [selectedVenture]
  );

  if (selectedVenture) {
    if (!venture || !PrototypeComponent) {
      return (
        <div className="min-h-screen p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Prototype Not Found</h2>
            <Button onClick={() => setSelectedVenture(null)}>Back to Gallery</Button>
          </div>
        </div>
      );
    }

    // Special handling for PRO'S prototype which needs different props
    if (selectedVenture === 'pros') {
      return (
        <ProsPrototype onBack={() => setSelectedVenture(null)} />
      );
    }

    return (
      <div className="min-h-screen">
        {/* Prototype Header */}
        <div className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleBack}
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </Button>
                <div>
                  <h1 className="text-xl font-bold">{venture.name} Prototype</h1>
                  <p className="text-sm text-muted-foreground">{venture.tagline}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Play className="h-3 w-3" />
                  Interactive Demo
                </Badge>
                
                {/* Device View Selector */}
                <div className="flex items-center border rounded-lg p-1">
                  <Button
                    variant={deviceView === 'desktop' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('desktop')}
                    className="h-8 w-8 p-0"
                  >
                    <Monitor className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={deviceView === 'tablet' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('tablet')}
                    className="h-8 w-8 p-0"
                  >
                    <Tablet className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={deviceView === 'mobile' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => handleDeviceChange('mobile')}
                    className="h-8 w-8 p-0"
                  >
                    <Smartphone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prototype Content */}
        <div className="container mx-auto px-4 py-8">
          <div className={`mx-auto transition-all duration-300 ${
            deviceView === 'desktop' ? 'max-w-7xl' :
            deviceView === 'tablet' ? 'max-w-4xl' :
            'max-w-md'
          }`}>
            <div className={`border rounded-lg shadow-2xl bg-background overflow-hidden ${
              deviceView === 'mobile' ? 'aspect-[9/16]' :
              deviceView === 'tablet' ? 'aspect-[4/3]' :
              'aspect-[16/10]'
            }`}>
              <Suspense fallback={<PrototypeLoader />}>
                <PrototypeComponent deviceView={deviceView} />
              </Suspense>
            </div>
          </div>
          
          {/* Prototype Information */}
          <Card className="mt-8 max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>About This Prototype</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-2">Core Technology</h4>
                  <div className="space-y-1">
                    {venture.technology.coretech.slice(0, 4).map((tech, index) => (
                      <Badge key={index} variant="outline" className="mr-2">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Key Features Demonstrated</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Interactive user interface design</li>
                    <li>• Core functionality workflow</li>
                    <li>• Real-time data visualization</li>
                    <li>• Responsive design adaptation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Venture Prototypes
            </h1>
            <p className="text-lg text-muted-foreground">
              Interactive demonstrations of revolutionary technology platforms
            </p>
          </div>
          <Button onClick={onBack} variant="outline" className="flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {/* Prototype Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ventureData.map((venture) => {
            const IconComponent = ventureIcons[venture.id as keyof typeof ventureIcons];
            return (
              <Card 
                key={venture.id} 
                className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-2 hover:border-primary/20"
                onClick={() => handleSelectVenture(venture.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${
                      venture.status === 'Scale' ? 'bg-purple-100 text-purple-600' :
                      venture.status === 'Growth' ? 'bg-blue-100 text-blue-600' :
                      venture.status === 'Active' ? 'bg-green-100 text-green-600' : 
                      'bg-orange-100 text-orange-600'
                    }`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <Badge variant="outline">{venture.category}</Badge>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {venture.name}
                  </CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {venture.tagline}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Development Stage:</span>
                      <Badge className={`${
                        venture.status === 'Scale' ? 'bg-purple-500' :
                        venture.status === 'Growth' ? 'bg-blue-500' :
                        venture.status === 'Active' ? 'bg-green-500' : 'bg-orange-500'
                      }`}>
                        {venture.status}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Team Size:</span>
                      <span className="font-medium">{venture.team?.teamSize || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Patents:</span>
                      <span className="font-medium">{venture.technology?.patents?.length || 0}</span>
                    </div>
                    
                    <Button 
                      className="w-full mt-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      variant="outline"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      View Prototype
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Prototype Features Info */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Interactive Prototype Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Monitor className="h-8 w-8 text-primary" />
                <h3 className="font-medium">Responsive Design</h3>
                <p className="text-sm text-muted-foreground">
                  View prototypes across desktop, tablet, and mobile devices to see responsive adaptations.
                </p>
              </div>
              <div className="space-y-2">
                <Zap className="h-8 w-8 text-primary" />
                <h3 className="font-medium">Interactive Elements</h3>
                <p className="text-sm text-muted-foreground">
                  Experience core functionality through clickable interfaces and realistic data flows.
                </p>
              </div>
              <div className="space-y-2">
                <Eye className="h-8 w-8 text-primary" />
                <h3 className="font-medium">Realistic Data</h3>
                <p className="text-sm text-muted-foreground">
                  Prototypes use realistic data and scenarios based on actual venture specifications.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}