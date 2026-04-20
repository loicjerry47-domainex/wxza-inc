import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Progress } from "../ui/progress";
import { 
  ArrowLeft, 
  Wallet, 
  ArrowRight, 
  Check, 
  Loader2,
  ExternalLink,
  QrCode,
  Shield,
  Zap,
  ArrowUpDown,
  ChevronDown
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface WalletOnboardingWalkthroughProps {
  onBack: () => void;
}

export function WalletOnboardingWalkthrough({ onBack }: WalletOnboardingWalkthroughProps) {
  const [currentFrame, setCurrentFrame] = useState(1);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  const [showSwapModal, setShowSwapModal] = useState(false);
  const [approvalStep, setApprovalStep] = useState(0);
  const [swapAmount, setSwapAmount] = useState('100');
  const [fromNetwork, setFromNetwork] = useState('ethereum');
  const [toNetwork, setToNetwork] = useState('polygon');
  const [showSuccess, setShowSuccess] = useState(false);

  const frames = [
    { id: 1, title: 'Landing Page', description: 'Welcome to AND Token Ecosystem' },
    { id: 2, title: 'Wallet Connect', description: 'Choose your wallet provider' },
    { id: 3, title: 'Dashboard', description: 'Your connected wallet dashboard' },
    { id: 4, title: 'Swap & Bridge', description: 'Cross-chain token operations' },
    { id: 5, title: 'Success', description: 'Welcome to the ecosystem!' }
  ];

  // Simulate approval process
  useEffect(() => {
    if (approvalStep > 0 && approvalStep < 3) {
      const timer = setTimeout(() => {
        setApprovalStep(prev => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [approvalStep]);

  const handleWalletConnect = (provider: string) => {
    setTimeout(() => {
      setWalletConnected(true);
      setShowWalletModal(false);
      setCurrentFrame(3);
    }, 1500);
  };

  const handleBridgeStart = () => {
    setApprovalStep(1);
    setTimeout(() => {
      setShowSuccess(true);
      setCurrentFrame(5);
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-blue-950 dark:via-background dark:to-cyan-950">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <Button 
            onClick={onBack}
            variant="ghost" 
            className="mb-6 hover:bg-blue-100 dark:hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Walkthroughs
          </Button>
          
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 dark:text-blue-100">
                Investor Onboarding & Wallet Setup
              </h1>
              <p className="text-blue-700 dark:text-blue-300 mt-2">
                Frame {currentFrame} of {frames.length}: {frames[currentFrame - 1]?.description}
              </p>
            </div>
            <Badge className="bg-blue-500 text-white px-4 py-2">
              <Wallet className="h-4 w-4 mr-2" />
              Walkthrough A
            </Badge>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Progress</span>
            <span className="text-sm text-blue-600 dark:text-blue-400">{currentFrame}/{frames.length}</span>
          </div>
          <Progress value={(currentFrame / frames.length) * 100} className="h-2" />
        </div>

        {/* Frame Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 overflow-x-auto">
            {frames.map((frame) => (
              <Button
                key={frame.id}
                onClick={() => setCurrentFrame(frame.id)}
                variant={currentFrame === frame.id ? 'default' : 'outline'}
                size="sm"
                className={`whitespace-nowrap ${
                  currentFrame === frame.id 
                    ? 'bg-blue-600 text-white' 
                    : 'border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20'
                }`}
              >
                {frame.title}
              </Button>
            ))}
          </div>
        </div>

        {/* Frame Content */}
        <Card className="min-h-96 bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border-blue-200 dark:border-blue-800">
          <CardContent className="p-8">
            
            {/* Frame 1: Landing Page */}
            {currentFrame === 1 && (
              <div className="text-center space-y-8">
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold text-blue-900 dark:text-blue-100">
                    Welcome to AND Ecosystem
                  </h2>
                  <p className="text-xl text-blue-700 dark:text-blue-300 max-w-2xl mx-auto">
                    Stake tokens, participate in governance, and earn rewards from breakthrough ventures
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 p-6 rounded-xl border border-blue-200 dark:border-blue-800">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mb-4">
                      <Wallet className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-2">Secure Wallet</h3>
                    <p className="text-blue-700 dark:text-blue-300 text-sm">Connect your wallet securely</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-500/10 to-indigo-500/10 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                    <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mb-4">
                      <Zap className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-purple-900 dark:text-purple-100 mb-2">Fast Swaps</h3>
                    <p className="text-purple-700 dark:text-purple-300 text-sm">Cross-chain token bridging</p>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 p-6 rounded-xl border border-green-200 dark:border-green-800">
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mb-4">
                      <Shield className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-bold text-green-900 dark:text-green-100 mb-2">Earn Rewards</h3>
                    <p className="text-green-700 dark:text-green-300 text-sm">Stake and govern ventures</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    onClick={() => {
                      setShowWalletModal(true);
                      setCurrentFrame(2);
                    }}
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3 text-lg"
                  >
                    <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mr-3">[HS]</span>
                    Connect Wallet
                  </Button>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    ↑ Hotspot: Click to open wallet connection modal
                  </p>
                </div>
              </div>
            )}

            {/* Frame 2: Wallet Connect Modal */}
            {currentFrame === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Connect Your Wallet
                  </h2>
                  <p className="text-blue-700 dark:text-blue-300">
                    Choose your preferred wallet provider to get started
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button
                    onClick={() => handleWalletConnect('metamask')}
                    className="flex items-center gap-3 p-6 h-auto bg-orange-50 hover:bg-orange-100 dark:bg-orange-950/30 dark:hover:bg-orange-950/50 border border-orange-200 dark:border-orange-800 text-orange-900 dark:text-orange-100"
                  >
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">M</span>
                    </div>
                    <div className="text-left">
                      <div className="font-bold">MetaMask</div>
                      <div className="text-xs text-orange-700 dark:text-orange-300">Browser wallet</div>
                    </div>
                    <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold ml-auto">[HS]</span>
                  </Button>

                  <Button
                    onClick={() => setShowQRCode(true)}
                    className="flex items-center gap-3 p-6 h-auto bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/30 dark:hover:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-100"
                  >
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <QrCode className="h-4 w-4 text-white" />
                    </div>
                    <div className="text-left">
                      <div className="font-bold">WalletConnect</div>
                      <div className="text-xs text-blue-700 dark:text-blue-300">Scan QR code</div>
                    </div>
                    <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold ml-auto">[HS]</span>
                  </Button>
                </div>

                {showQRCode && (
                  <div className="bg-white dark:bg-gray-900 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-sm mx-auto">
                    <div className="text-center space-y-4">
                      <div className="w-48 h-48 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900 dark:to-cyan-900 rounded-lg mx-auto flex items-center justify-center">
                        <QrCode className="h-24 w-24 text-blue-600 dark:text-blue-400" />
                      </div>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Scan with your mobile wallet
                      </p>
                    </div>
                  </div>
                )}

                {walletConnected && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 px-4 py-2 rounded-full">
                      <Check className="h-4 w-4" />
                      Wallet Connected Successfully!
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Frame 3: Dashboard */}
            {currentFrame === 3 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
                    Wallet Dashboard
                  </h2>
                  <Badge className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200">
                    <Check className="h-3 w-3 mr-1" />
                    Connected
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Wallet Balance */}
                  <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white border-0">
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="text-blue-100">Wallet Balance</div>
                        <div className="text-3xl font-bold">$12,847.50</div>
                        <div className="text-blue-200 text-sm">0x7a4f...8d2c</div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button 
                        onClick={() => {
                          setShowSwapModal(true);
                          setCurrentFrame(4);
                        }}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                      >
                        <ArrowUpDown className="h-4 w-4 mr-2" />
                        <span className="bg-yellow-400 text-yellow-900 px-1 py-0.5 rounded text-xs font-bold mr-2">[HS]</span>
                        Swap
                      </Button>
                      <Button variant="outline" className="w-full">
                        <ArrowRight className="h-4 w-4 mr-2" />
                        Bridge
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Zap className="h-4 w-4 mr-2" />
                        Stake
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Recent Transactions */}
                  <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-sm text-muted-foreground">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between text-sm">
                        <span>Received USDC</span>
                        <span className="text-green-600">+$500</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Staked AND</span>
                        <span className="text-blue-600">1,000 AND</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Governance Vote</span>
                        <span className="text-purple-600">Proposal #5</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Frame 4: Swap & Bridge */}
            {currentFrame === 4 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-2">
                    Cross-Chain Bridge
                  </h2>
                  <p className="text-blue-700 dark:text-blue-300">
                    Move tokens between networks securely
                  </p>
                </div>

                <div className="max-w-md mx-auto space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-blue-900 dark:text-blue-100 block mb-2">From Network</label>
                      <Select value={fromNetwork} onValueChange={setFromNetwork}>
                        <SelectTrigger className="bg-white dark:bg-gray-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ethereum">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-500 rounded-full" />
                              Ethereum
                            </div>
                          </SelectItem>
                          <SelectItem value="polygon">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-purple-500 rounded-full" />
                              Polygon
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-blue-900 dark:text-blue-100 block mb-2">Amount</label>
                      <Input 
                        value={swapAmount}
                        onChange={(e) => setSwapAmount(e.target.value)}
                        className="bg-white dark:bg-gray-800"
                        placeholder="Enter amount"
                      />
                      <div className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                        ≈ ${(parseFloat(swapAmount) * 1.02).toFixed(2)} USD
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-blue-900 dark:text-blue-100 block mb-2">To Network</label>
                      <Select value={toNetwork} onValueChange={setToNetwork}>
                        <SelectTrigger className="bg-white dark:bg-gray-800">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="polygon">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-purple-500 rounded-full" />
                              Polygon
                            </div>
                          </SelectItem>
                          <SelectItem value="ethereum">
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 bg-blue-500 rounded-full" />
                              Ethereum
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {approvalStep === 0 && (
                    <Button 
                      onClick={handleBridgeStart}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3"
                    >
                      <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold mr-3">[HS]</span>
                      Bridge Tokens
                    </Button>
                  )}

                  {/* Approval Stepper */}
                  {approvalStep > 0 && (
                    <div className="space-y-4">
                      <div className="text-center">
                        <h3 className="font-bold text-blue-900 dark:text-blue-100 mb-4">Processing Transaction</h3>
                      </div>

                      <div className="space-y-3">
                        <div className={`flex items-center gap-3 p-3 rounded-lg ${
                          approvalStep >= 1 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {approvalStep >= 2 ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : approvalStep === 1 ? (
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className={approvalStep >= 1 ? 'text-green-800 dark:text-green-200' : 'text-gray-600'}>
                            Step 1: Approve Token
                          </span>
                        </div>

                        <div className={`flex items-center gap-3 p-3 rounded-lg ${
                          approvalStep >= 2 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {approvalStep >= 3 ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : approvalStep === 2 ? (
                            <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className={approvalStep >= 2 ? 'text-green-800 dark:text-green-200' : 'text-gray-600'}>
                            Step 2: Bridge Transaction
                          </span>
                        </div>

                        <div className={`flex items-center gap-3 p-3 rounded-lg ${
                          approvalStep >= 3 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          {approvalStep >= 3 ? (
                            <Check className="h-5 w-5 text-green-600" />
                          ) : (
                            <div className="w-5 h-5 border-2 border-gray-300 rounded-full" />
                          )}
                          <span className={approvalStep >= 3 ? 'text-green-800 dark:text-green-200' : 'text-gray-600'}>
                            Step 3: Confirm Receipt
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Frame 5: Success */}
            {currentFrame === 5 && (
              <div className="text-center space-y-8">
                <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
                  <Check className="h-12 w-12 text-white" />
                </div>

                <div className="space-y-4">
                  <h2 className="text-3xl font-bold text-green-900 dark:text-green-100">
                    Welcome to the AND Ecosystem!
                  </h2>
                  <p className="text-green-700 dark:text-green-300 max-w-2xl mx-auto">
                    Your wallet is connected and tokens are bridged. You're now ready to stake, 
                    participate in governance, and earn rewards from our venture portfolio.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-2xl font-bold text-blue-600">$102.50</div>
                    <div className="text-sm text-blue-700 dark:text-blue-300">Bridged Successfully</div>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950/30 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="text-2xl font-bold text-purple-600">12%</div>
                    <div className="text-sm text-purple-700 dark:text-purple-300">Available APY</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-950/30 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-2xl font-bold text-green-600">9</div>
                    <div className="text-sm text-green-700 dark:text-green-300">Ventures Available</div>
                  </div>
                </div>

                <div className="space-x-4">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <Zap className="h-4 w-4 mr-2" />
                    Start Staking
                  </Button>
                  <Button variant="outline">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Explore Ventures
                  </Button>
                </div>
              </div>
            )}

          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between mt-8">
          <Button 
            onClick={() => setCurrentFrame(Math.max(1, currentFrame - 1))}
            disabled={currentFrame === 1}
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50 dark:border-blue-800 dark:text-blue-300 dark:hover:bg-blue-900/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Previous Frame
          </Button>

          <div className="text-sm text-blue-600 dark:text-blue-400 font-medium">
            Frame {currentFrame} of {frames.length}
          </div>

          <Button 
            onClick={() => setCurrentFrame(Math.min(frames.length, currentFrame + 1))}
            disabled={currentFrame === frames.length}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Next Frame
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}