import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { 
  Play, Copy, Check, Code, Terminal, Key, 
  Lock, Send, Download, Zap, FileJson,
  Clock, Database, AlertCircle, CheckCircle
} from "lucide-react";

interface APIPlaygroundProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function APIPlayground({ deviceView }: APIPlaygroundProps) {
  const [selectedEndpoint, setSelectedEndpoint] = useState("create-design");
  const [authMethod, setAuthMethod] = useState<'api-key' | 'oauth' | 'jwt'>('api-key');
  const [apiKey, setApiKey] = useState("sk_test_aBcDeFgHiJkLmNoPqRsTuVwXyZ123456");
  const [requestBody, setRequestBody] = useState(`{
  "name": "Ergonomic Office Chair",
  "description": "Modern chair with mesh back",
  "tags": ["furniture", "office"],
  "visibility": "private"
}`);
  const [response, setResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const isMobile = deviceView === 'mobile';

  const endpoints = [
    {
      id: "create-design",
      method: "POST",
      path: "/v2/designs",
      category: "Designs",
      description: "Create a new 3D design",
      color: "from-blue-500 to-cyan-500",
      methodColor: "bg-green-500",
      requestBody: `{
  "name": "Ergonomic Office Chair",
  "description": "Modern chair with mesh back",
  "tags": ["furniture", "office"],
  "visibility": "private"
}`,
      responseExample: {
        id: "des_2L8F9mKpN4Qr",
        name: "Ergonomic Office Chair",
        description: "Modern chair with mesh back",
        user_id: "usr_9Xa2Bc3De4Fg",
        tags: ["furniture", "office"],
        visibility: "private",
        file_url: null,
        thumbnail_url: null,
        polygon_count: null,
        created_at: "2025-11-28T14:32:18Z",
        updated_at: "2025-11-28T14:32:18Z"
      }
    },
    {
      id: "get-design",
      method: "GET",
      path: "/v2/designs/{design_id}",
      category: "Designs",
      description: "Retrieve a design by ID",
      color: "from-blue-500 to-cyan-500",
      methodColor: "bg-blue-500",
      requestBody: null,
      responseExample: {
        id: "des_2L8F9mKpN4Qr",
        name: "Ergonomic Office Chair",
        description: "Modern chair with mesh back",
        user_id: "usr_9Xa2Bc3De4Fg",
        file_url: "https://cdn.pros.io/designs/des_2L8F9mKpN4Qr/main.usd",
        thumbnail_url: "https://cdn.pros.io/designs/des_2L8F9mKpN4Qr/thumb.jpg",
        polygon_count: 245678,
        material_count: 3,
        version: 5,
        created_at: "2025-11-28T14:32:18Z",
        updated_at: "2025-11-28T15:45:22Z"
      }
    },
    {
      id: "start-render",
      method: "POST",
      path: "/v2/render-jobs",
      category: "Rendering",
      description: "Start a photorealistic render job",
      color: "from-purple-500 to-pink-500",
      methodColor: "bg-green-500",
      requestBody: `{
  "design_id": "des_2L8F9mKpN4Qr",
  "settings": {
    "resolution": "4k",
    "quality": "photorealistic",
    "ray_tracing": {
      "enabled": true,
      "samples": 512,
      "bounces": 8
    },
    "output_format": "png"
  },
  "priority": "normal"
}`,
      responseExample: {
        id: "rjb_8Xy9Za1Bc2Cd",
        design_id: "des_2L8F9mKpN4Qr",
        status: "queued",
        queue_position: 12,
        estimated_time_seconds: 180,
        priority: "normal",
        created_at: "2025-11-28T15:48:30Z",
        webhook_url: null
      }
    },
    {
      id: "ai-generate",
      method: "POST",
      path: "/v2/ai/generate",
      category: "AI",
      description: "Generate 3D model from voice/text",
      color: "from-yellow-500 to-orange-500",
      methodColor: "bg-green-500",
      requestBody: `{
  "prompt": "Modern minimalist coffee table with glass top and wood legs",
  "style": "modern",
  "complexity": "moderate",
  "num_variations": 3
}`,
      responseExample: {
        job_id: "aig_5Mn6Op7Qr8St",
        status: "processing",
        estimated_time_seconds: 12,
        variations: [],
        created_at: "2025-11-28T15:52:14Z"
      }
    },
    {
      id: "collaboration-session",
      method: "POST",
      path: "/v2/sessions",
      category: "Collaboration",
      description: "Start a real-time collaboration session",
      color: "from-green-500 to-emerald-500",
      methodColor: "bg-green-500",
      requestBody: `{
  "design_id": "des_2L8F9mKpN4Qr",
  "name": "Design Review - Q4 Product",
  "max_participants": 10,
  "settings": {
    "voice_enabled": true,
    "spatial_audio": true,
    "recording_enabled": false
  }
}`,
      responseExample: {
        id: "ses_3Uv4Wx5Yz6Ab",
        design_id: "des_2L8F9mKpN4Qr",
        host_id: "usr_9Xa2Bc3De4Fg",
        name: "Design Review - Q4 Product",
        status: "active",
        host_key: "hk_BcDeFgHiJkLmNoPqR",
        participant_key: "pk_StUvWxYzAbCdEfGh",
        join_url: "https://app.pros.io/collab/ses_3Uv4Wx5Yz6Ab",
        started_at: "2025-11-28T15:55:00Z"
      }
    },
    {
      id: "search-assets",
      method: "GET",
      path: "/v2/assets/search",
      category: "Assets",
      description: "Search marketplace for 3D assets",
      color: "from-cyan-500 to-blue-500",
      methodColor: "bg-blue-500",
      requestBody: null,
      responseExample: {
        total: 1247,
        page: 1,
        per_page: 20,
        results: [
          {
            id: "ast_7Ij8Kl9Mn0Op",
            name: "Realistic Wood Texture Pack",
            category: "texture",
            preview_url: "https://cdn.pros.io/assets/ast_7Ij8Kl9Mn0Op/preview.jpg",
            downloads: 12450,
            rating: 4.8,
            price_usd: 0,
            license: "commercial"
          }
        ]
      }
    }
  ];

  const selectedEndpointData = endpoints.find(e => e.id === selectedEndpoint);

  const handleSendRequest = async () => {
    setIsLoading(true);
    setResponse(null);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1200));

    const mockResponse = {
      status: 200,
      statusText: "OK",
      headers: {
        "content-type": "application/json",
        "x-request-id": "req_" + Math.random().toString(36).substr(2, 9),
        "x-ratelimit-limit": "1000",
        "x-ratelimit-remaining": "987",
        "x-response-time": "87ms"
      },
      data: selectedEndpointData?.responseExample,
      timing: {
        dns: 12,
        tcp: 8,
        tls: 15,
        ttfb: 42,
        total: 87
      }
    };

    setResponse(mockResponse);
    setIsLoading(false);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const authMethods = [
    { id: 'api-key', name: 'API Key', icon: Key, description: 'Simple authentication with API key' },
    { id: 'oauth', name: 'OAuth 2.0', icon: Lock, description: 'Industry-standard OAuth flow' },
    { id: 'jwt', name: 'JWT Token', icon: Terminal, description: 'JSON Web Token authentication' }
  ];

  return (
    <div className={`space-y-${isMobile ? '4' : '6'} p-${isMobile ? '4' : '6'}`}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl border border-white/10">
            <Terminal className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">API Playground</h2>
            <p className="text-sm text-gray-400">Test API endpoints in real-time · 150+ endpoints available</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { label: "API Version", value: "v2", icon: Code, color: "text-blue-400" },
            { label: "Endpoints", value: "150+", icon: Database, color: "text-green-400" },
            { label: "Uptime", value: "99.97%", icon: CheckCircle, color: "text-purple-400" },
            { label: "Avg Latency", value: "87ms", icon: Zap, color: "text-yellow-400" }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="p-3 bg-white/5 rounded-lg border border-white/10"
            >
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
              <p className={`text-xl font-bold ${stat.color}`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Panel - Endpoint Selection */}
        <div className="lg:col-span-1 space-y-4">
          {/* Authentication */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Lock className="w-4 h-4 text-purple-400" />
                Authentication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {authMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setAuthMethod(method.id as any)}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    authMethod === method.id
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <method.icon className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold text-white text-sm">{method.name}</span>
                  </div>
                  <p className="text-xs text-gray-400">{method.description}</p>
                </button>
              ))}

              {authMethod === 'api-key' && (
                <div className="space-y-2 pt-2">
                  <label className="text-xs text-gray-400">API Key</label>
                  <Input
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="bg-black/30 border-white/10 text-white font-mono text-xs"
                    placeholder="sk_test_..."
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Endpoints List */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white text-sm">
                <Code className="w-4 h-4 text-green-400" />
                Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {endpoints.map((endpoint) => (
                <button
                  key={endpoint.id}
                  onClick={() => {
                    setSelectedEndpoint(endpoint.id);
                    setRequestBody(endpoint.requestBody || '');
                    setResponse(null);
                  }}
                  className={`w-full p-3 rounded-lg border transition-all text-left ${
                    selectedEndpoint === endpoint.id
                      ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'
                      : 'bg-white/5 border-white/10 hover:border-white/30'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Badge className={`${endpoint.methodColor} text-white border-0 text-xs px-2 py-0.5`}>
                      {endpoint.method}
                    </Badge>
                    <span className="text-xs text-gray-400">{endpoint.category}</span>
                  </div>
                  <p className="font-mono text-xs text-purple-400">{endpoint.path}</p>
                  <p className="text-xs text-gray-400 mt-1">{endpoint.description}</p>
                </button>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Panel - Request/Response */}
        <div className="lg:col-span-2 space-y-4">
          {/* Request Builder */}
          <Card className="bg-white/5 backdrop-blur-xl border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <Send className="w-5 h-5 text-green-400" />
                  Request
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${selectedEndpointData?.methodColor} text-white border-0`}>
                    {selectedEndpointData?.method}
                  </Badge>
                  <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                    {selectedEndpointData?.category}
                  </Badge>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Endpoint URL */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Endpoint URL</label>
                <div className="flex items-center gap-2">
                  <Input
                    value={`https://api.pros.io${selectedEndpointData?.path}`}
                    readOnly
                    className="bg-black/30 border-white/10 text-white font-mono text-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopy(`https://api.pros.io${selectedEndpointData?.path}`)}
                  >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              {/* Headers */}
              <div>
                <label className="text-xs text-gray-400 mb-2 block">Headers</label>
                <div className="bg-black/30 rounded-lg p-3 border border-white/10 font-mono text-xs space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">Authorization:</span>
                    <span className="text-gray-300">Bearer {apiKey.substring(0, 20)}...</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">Content-Type:</span>
                    <span className="text-gray-300">application/json</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-purple-400">User-Agent:</span>
                    <span className="text-gray-300">PRO'S-API-Playground/1.0</span>
                  </div>
                </div>
              </div>

              {/* Request Body */}
              {selectedEndpointData?.requestBody && (
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">Request Body (JSON)</label>
                  <Textarea
                    value={requestBody}
                    onChange={(e) => setRequestBody(e.target.value)}
                    className="bg-black/30 border-white/10 text-white font-mono text-xs min-h-[200px]"
                    placeholder="Enter JSON request body..."
                  />
                </div>
              )}

              {/* Send Button */}
              <Button
                onClick={handleSendRequest}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                {isLoading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4 mr-2" />
                    </motion.div>
                    Sending Request...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Send Request
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Response */}
          <AnimatePresence mode="wait">
            {response && (
              <motion.div
                key="response"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <Card className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between text-white">
                      <div className="flex items-center gap-2">
                        <FileJson className="w-5 h-5 text-green-400" />
                        Response
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-green-500/20 text-green-300 border-green-500/30">
                          {response.status} {response.statusText}
                        </Badge>
                        <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30">
                          {response.headers['x-response-time']}
                        </Badge>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Response Headers */}
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block">Response Headers</label>
                      <div className="bg-black/30 rounded-lg p-3 border border-green-500/20 font-mono text-xs space-y-1">
                        {Object.entries(response.headers).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-2">
                            <span className="text-green-400">{key}:</span>
                            <span className="text-gray-300">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Response Body */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="text-xs text-gray-400">Response Body (JSON)</label>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleCopy(JSON.stringify(response.data, null, 2))}
                        >
                          {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                          Copy
                        </Button>
                      </div>
                      <div className="bg-black/30 rounded-lg p-4 border border-green-500/20 overflow-x-auto">
                        <pre className="font-mono text-xs text-green-300">
                          {JSON.stringify(response.data, null, 2)}
                        </pre>
                      </div>
                    </div>

                    {/* Timing Breakdown */}
                    <div>
                      <label className="text-xs text-gray-400 mb-2 block">Timing Breakdown</label>
                      <div className="space-y-2">
                        {Object.entries(response.timing).map(([key, value]) => (
                          <div key={key} className="flex items-center gap-3">
                            <Clock className="w-4 h-4 text-cyan-400" />
                            <span className="text-xs text-gray-400 capitalize w-20">{key}</span>
                            <div className="flex-1 bg-black/30 rounded-full h-2 overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${(value / response.timing.total) * 100}%` }}
                                className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                              />
                            </div>
                            <span className="text-xs text-white font-mono">{value}ms</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Code Examples */}
          {!response && (
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Code className="w-5 h-5 text-purple-400" />
                  Code Examples
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* cURL */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">cURL</label>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/10 overflow-x-auto">
                    <pre className="font-mono text-xs text-purple-300">
{`curl -X ${selectedEndpointData?.method} https://api.pros.io${selectedEndpointData?.path} \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json"${selectedEndpointData?.requestBody ? ` \\
  -d '${requestBody}'` : ''}`}
                    </pre>
                  </div>
                </div>

                {/* JavaScript */}
                <div>
                  <label className="text-xs text-gray-400 mb-2 block">JavaScript (Fetch)</label>
                  <div className="bg-black/30 rounded-lg p-3 border border-white/10 overflow-x-auto">
                    <pre className="font-mono text-xs text-purple-300">
{`const response = await fetch('https://api.pros.io${selectedEndpointData?.path}', {
  method: '${selectedEndpointData?.method}',
  headers: {
    'Authorization': 'Bearer ${apiKey}',
    'Content-Type': 'application/json'
  }${selectedEndpointData?.requestBody ? `,
  body: JSON.stringify(${requestBody})` : ''}
});

const data = await response.json();
console.log(data);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
