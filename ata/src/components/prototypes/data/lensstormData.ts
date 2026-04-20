export const products = [
  {
    id: 'basic',
    name: 'Stealth Basic',
    price: '$499',
    features: ['Basic HUD', 'Voice Control', 'NFC Ring', '8hr Battery'],
    popular: false
  },
  {
    id: 'pro',
    name: 'Stealth Pro',
    price: '$899',
    features: ['Advanced HUD', 'Gesture Control', 'NFC Ring', 'Bone Conduction', '12hr Battery'],
    popular: true
  },
  {
    id: 'elite',
    name: 'Stealth Elite',
    price: '$1,299',
    features: ['Full AR Suite', 'AI Assistant', 'Premium Materials', 'Wireless Charging', '16hr Battery'],
    popular: false
  }
];

export const features = [
  {
    icon: '🛡️',
    title: 'Stealth Design',
    description: 'Completely invisible AR integration into any glasses frame'
  },
  {
    icon: '📡',
    title: 'NFC Ring Control',
    description: 'Gesture control through elegant NFC ring interface'
  },
  {
    icon: '🔊',
    title: 'Bone Conduction',
    description: 'Crystal clear audio without blocking ambient sound'
  }
];

export const workflowSteps = [
  {
    step: '01',
    title: 'Upload Photo',
    description: 'Take a photo of your glasses for AI fit detection',
    icon: 'upload'
  },
  {
    step: '02',
    title: 'AI Analysis',
    description: 'Our AI analyzes your frame for optimal lens placement',
    icon: 'cpu'
  },
  {
    step: '03',
    title: 'Precision Fabrication',
    description: 'Custom AR lenses manufactured for your exact frames',
    icon: 'settings'
  },
  {
    step: '04',
    title: 'Smart Integration',
    description: 'NFC ring and app complete your invisible AR system',
    icon: 'smartphone'
  }
];