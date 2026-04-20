export interface VentureData {
  id: string;
  name: string;
  tagline: string;
  description: string;
  fullDescription: string;
  foundingStory: string;
  category: string;
  status: "Active" | "Growth" | "Launch" | "Scale";
  impact: string;
  established: string;
  headquarters: string;
  employees: string;
  
  // Financial Data
  financials: {
    fundingAsk: string;
    currentRevenue?: string;
    projectedRevenue: {
      year1: string;
      year2: string;
      year3: string;
      year4: string;
      year5: string;
    };
    netProfit: {
      year1: string;
      year2: string;
      year3: string;
      year4: string;
      year5: string;
    };
    grossMargin: string;
    breakEven: string;
    roi: string;
    valuation: string;
    previousFunding?: string;
    burnRate?: string;
    runway?: string;
  };
  
  // Market Analysis
  market: {
    tam: string; // Total Addressable Market
    sam: string; // Serviceable Addressable Market
    som: string; // Serviceable Obtainable Market
    targetCustomers: string;
    competitiveAdvantage: string[];
    marketGrowth: string;
    marketTrends: string[];
    competitors: {
      name: string;
      weakness: string;
      ourAdvantage: string;
    }[];
    customerSegments: {
      segment: string;
      size: string;
      characteristics: string;
    }[];
  };
  
  // Technology & IP
  technology: {
    coretech: string[];
    patents: string[];
    competitive_edge: string[];
    roadmap: string[];
    technicalSpecs: {
      specification: string;
      detail: string;
    }[];
    developmentStage: string;
    scalability: string;
  };
  
  // Team
  team: {
    ceo: string;
    cto?: string;
    cfo?: string;
    keyMembers: string[];
    advisors: string[];
    boardMembers?: string[];
    teamSize: number;
    keyHires: string[];
  };
  
  // Product Details
  products: {
    name: string;
    description: string;
    pricing: string;
    features: string[];
    targetMarket: string;
    stage: string;
  }[];
  
  // Business Model
  businessModel: {
    revenueStreams: {
      stream: string;
      description: string;
      percentage: number;
      pricing: string;
    }[];
    customerAcquisition: string;
    retentionStrategy: string;
    partnerships: string[];
  };
  
  // Risks & Mitigation
  risks: {
    risk: string;
    impact: "High" | "Medium" | "Low";
    probability: "High" | "Medium" | "Low";
    mitigation: string;
    timeline: string;
  }[];
  
  // Key Metrics
  metrics: {
    label: string;
    value: string;
    trend: "up" | "down" | "stable";
    description: string;
  }[];
  
  // Milestones & Timeline
  milestones: {
    milestone: string;
    date: string;
    status: "Completed" | "In Progress" | "Planned";
    description: string;
  }[];
  
  // Sustainability & Impact
  sustainability: {
    environmentalImpact: string;
    socialImpact: string;
    governance: string;
    sdgs: string[]; // Sustainable Development Goals
    carbonFootprint: string;
  };
  
  // Future Vision
  futureVision: string[];
  exitStrategy: string[];
  
  // Use of Funds
  useOfFunds: {
    category: string;
    amount: string;
    percentage: number;
    description: string;
  }[];
  
  // Media & Recognition
  media: {
    pressReleases: string[];
    awards: string[];
    testimonials: {
      quote: string;
      author: string;
      position: string;
    }[];
  };
}

export const ventureData: VentureData[] = [
  {
    id: "nimbus-biome",
    name: "NIMBUS BIOME™",
    tagline: "AI-powered biophilic ecosystems for wellness and productivity",
    description: "Revolutionary AI-powered biophilic design platform creating self-sustaining indoor ecosystems that enhance human wellness and productivity through advanced automation, IoT sensors, and machine learning optimization.",
    fullDescription: "NIMBUS BIOME™ represents the next evolution of biophilic design, combining cutting-edge AI with sustainable ecosystem technology to create living installations that actively improve indoor air quality, reduce stress, and boost cognitive performance. Our proprietary platform uses computer vision, environmental sensors, and machine learning to maintain optimal growing conditions while providing users with real-time wellness metrics and personalized environmental recommendations.",
    foundingStory: "Established in 2023 by former Tesla Autopilot engineer Dr. Aria Chen, who experienced the stark wellness contrast between sterile tech offices and nature during the remote work shift. Partnering with NASA life support systems expert Dr. James Liu and Stanford behavioral psychologist Dr. Maya Patel, the team developed AI systems that could recreate the cognitive and health benefits of nature in any indoor environment.",
    category: "Biophilic AI",
    status: "Growth",
    impact: "Indoor wellness optimization & cognitive enhancement",
    established: "2023",
    headquarters: "San Francisco, CA",
    employees: "15-28",
    
    financials: {
      fundingAsk: "$2.5M",
      currentRevenue: "$180K ARR",
      projectedRevenue: {
        year1: "$850K",
        year2: "$2.8M",
        year3: "$8.5M",
        year4: "$22M",
        year5: "$45M"
      },
      netProfit: {
        year1: "-$420K",
        year2: "$280K",
        year3: "$2.1M",
        year4: "$6.6M",
        year5: "$16.2M"
      },
      grossMargin: "68% by Year 3",
      breakEven: "Month 22",
      roi: "18× by Year 5",
      valuation: "$15M current, $85M Series A target",
      burnRate: "$145K/month",
      runway: "20 months"
    },
    
    market: {
      tam: "$285B Global Wellness Market",
      sam: "$45B Smart Building & IoT Market",
      som: "$2.8B (Biophilic design & air quality tech)",
      targetCustomers: "Corporate wellness, Premium residential, Healthcare facilities, Educational institutions",
      competitiveAdvantage: ["AI-driven autonomous operation", "Clinically validated wellness metrics", "Enterprise integration APIs", "Patent-pending air optimization"],
      marketGrowth: "Workplace wellness: 13.2% CAGR, Smart buildings: 25.1% CAGR through 2028",
      marketTrends: ["Post-COVID air quality focus", "Hybrid work wellness needs", "ESG corporate mandates", "Mental health workplace initiatives"],
      competitors: [
        {
          name: "Traditional Living Walls",
          weakness: "High maintenance, no intelligence, limited wellness tracking",
          ourAdvantage: "Fully autonomous AI operation with quantified wellness benefits"
        },
        {
          name: "Air Purification Systems",
          weakness: "Single function, no biophilic benefits, reactive not proactive",
          ourAdvantage: "Holistic ecosystem approach with predictive optimization"
        }
      ],
      customerSegments: [
        {
          segment: "Enterprise Wellness",
          size: "2.5M office buildings globally",
          characteristics: "Focus on employee productivity, ESG goals, premium workplace amenities"
        },
        {
          segment: "Healthcare Facilities",
          size: "180K facilities in US alone",
          characteristics: "Patient outcome focus, regulatory compliance, evidence-based solutions"
        }
      ]
    },
    
    technology: {
      coretech: ["Computer vision plant health monitoring", "AI environmental optimization", "IoT sensor networks", "Wellness impact analytics", "Predictive maintenance algorithms"],
      patents: ["AI-driven biophilic optimization (pending)", "Integrated wellness monitoring system (filed)", "Autonomous ecosystem management (pending)"],
      competitive_edge: ["Real-time AI health monitoring", "Clinically validated wellness metrics", "Predictive failure prevention", "Enterprise-grade reliability"],
      roadmap: ["Mobile health integration Q2 2025", "Enterprise API platform Q3 2025", "Autonomous robotic maintenance Q1 2026", "Global franchise model Q4 2026"],
      technicalSpecs: [
        {
          specification: "AI Processing",
          detail: "Edge computing with cloud ML pipeline, 99.9% uptime SLA"
        },
        {
          specification: "Environmental Sensors",
          detail: "16-point monitoring: CO2, humidity, light, air quality, soil metrics"
        },
        {
          specification: "Wellness Tracking",
          detail: "Real-time stress indicators, productivity metrics, air quality index"
        }
      ],
      developmentStage: "Production pilot with 12 enterprise customers",
      scalability: "Modular design enables rapid deployment across facility types"
    },
    
    team: {
      ceo: "Dr. Aria Chen (ex-Tesla Autopilot, Stanford MS, 8+ years autonomous systems)",
      cto: "Dr. James Liu (NASA Life Support Systems, 15+ years closed-loop environments)",
      cfo: "Sarah Kim (ex-Peloton Finance, scaled hardware startup to $500M)",
      keyMembers: ["Dr. Maya Patel (Stanford Psychology, wellness research)", "Alex Rodriguez (ex-Nest IoT platform)"],
      advisors: ["Former Gensler Chief Sustainability Officer", "Ex-WeWork Head of Wellness", "Stanford Woods Institute Director"],
      teamSize: 22,
      keyHires: ["VP Enterprise Sales", "Head of Clinical Research", "Director of Manufacturing"]
    },
    
    products: [
      {
        name: "NIMBUS Enterprise",
        description: "Full-scale biophilic wellness system for offices",
        pricing: "$8,500-$25,000 per installation",
        features: ["AI health monitoring", "Wellness analytics dashboard", "Enterprise integration", "24/7 remote monitoring"],
        targetMarket: "Corporate wellness programs",
        stage: "Production"
      },
      {
        name: "NIMBUS Health+",
        description: "Medical-grade system for healthcare environments",
        pricing: "$15,000-$45,000 per unit",
        features: ["Clinical validation", "Patient outcome tracking", "Regulatory compliance", "Infection control protocols"],
        targetMarket: "Hospitals and clinics",
        stage: "Pilot Testing"
      },
      {
        name: "NIMBUS Residential",
        description: "Premium home wellness ecosystem",
        pricing: "$3,500-$8,500",
        features: ["Personal wellness tracking", "Smart home integration", "Family health insights", "Aesthetic customization"],
        targetMarket: "High-end residential",
        stage: "Development"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Hardware Sales",
          description: "Initial system installations and upgrades",
          percentage: 60,
          pricing: "$3,500-$45,000 per system"
        },
        {
          stream: "Subscription Services",
          description: "Ongoing monitoring, analytics, and maintenance",
          percentage: 35,
          pricing: "$250-$1,200/month per system"
        },
        {
          stream: "Professional Services",
          description: "Installation, training, and consulting",
          percentage: 5,
          pricing: "$150-$300/hour"
        }
      ],
      customerAcquisition: "Enterprise partnerships, trade shows, referral programs, clinical studies",
      retentionStrategy: "Continuous wellness data value, predictive maintenance, regular feature updates",
      partnerships: ["Steelcase", "Herman Miller", "Cushman & Wakefield", "Mayo Clinic"]
    },
    
    risks: [
      {
        risk: "Biological contamination or plant disease",
        impact: "High",
        probability: "Medium",
        mitigation: "AI early detection, sterile growing systems, rapid replacement protocols",
        timeline: "Ongoing operational risk"
      },
      {
        risk: "Regulatory changes in indoor air quality standards",
        impact: "Medium",
        probability: "Medium",
        mitigation: "Proactive compliance monitoring, regulatory affairs expertise, adaptable systems",
        timeline: "2-3 year regulatory cycles"
      }
    ],
    
    metrics: [
      {
        label: "System Uptime",
        value: "99.7%",
        trend: "up",
        description: "Average system availability across all installations"
      },
      {
        label: "Customer Wellness Score",
        value: "8.4/10",
        trend: "up",
        description: "Average reported wellness improvement from users"
      },
      {
        label: "Revenue Per Customer",
        value: "$42K",
        trend: "up",
        description: "Average lifetime value including hardware and services"
      }
    ],
    
    milestones: [
      {
        milestone: "Series A Funding",
        date: "Q1 2025",
        status: "In Progress",
        description: "$15M Series A led by Bessemer Venture Partners"
      },
      {
        milestone: "FDA Wellness Device Registration",
        date: "Q2 2025",
        status: "Planned",
        description: "Medical device classification for healthcare applications"
      },
      {
        milestone: "100 Enterprise Installations",
        date: "Q4 2025",
        status: "Planned",
        description: "Scale to 100+ corporate customers across North America"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Carbon negative operations through air purification, sustainable materials",
      socialImpact: "Improved workplace wellness, reduced sick days, enhanced cognitive performance",
      governance: "B-Corp pending, diverse leadership, wellness-first mission",
      sdgs: ["Good Health and Well-being", "Sustainable Cities", "Climate Action"],
      carbonFootprint: "Net negative 2.5 tons CO2 per system annually"
    },
    
    futureVision: [
      "Global standard for indoor environmental wellness",
      "Integration with wearable health devices",
      "Predictive health outcome analytics",
      "Autonomous building ecosystem management"
    ],
    
    exitStrategy: [
      "Strategic acquisition by workplace wellness leader (Johnson Controls, Steelcase)",
      "IPO at $500M+ revenue run rate",
      "Technology licensing to smart building platforms"
    ],
    
    useOfFunds: [
      {
        category: "R&D & Product Development",
        amount: "$1.2M",
        percentage: 48,
        description: "AI algorithm advancement, new product lines, clinical validation"
      },
      {
        category: "Sales & Marketing",
        amount: "$750K",
        percentage: 30,
        description: "Enterprise sales team, marketing campaigns, trade show presence"
      },
      {
        category: "Operations & Manufacturing",
        amount: "$400K",
        percentage: 16,
        description: "Supply chain optimization, quality systems, inventory management"
      },
      {
        category: "Working Capital",
        amount: "$150K",
        percentage: 6,
        description: "General operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["Fast Company: 'The Future of Workplace Wellness'", "MIT Tech Review: 'AI Meets Biophilic Design'"],
      awards: ["CES Innovation Award 2024", "Green Building Council Excellence"],
      testimonials: [
        {
          quote: "NIMBUS BIOME improved our team's productivity by 23% while reducing sick days by 40%. The ROI is undeniable.",
          author: "Jennifer Walsh",
          position: "Head of People Operations, Stripe"
        }
      ]
    }
  },

  {
    id: "lensstorm",
    name: "LENSSTORM",
    tagline: "Invisible AR computing for everyday eyewear",
    description: "Next-generation AR platform that transforms any eyewear into smart glasses using ultra-thin display technology, enabling seamless augmented reality experiences without compromising style or comfort.",
    fullDescription: "LENSSTORM is revolutionizing augmented reality through breakthrough micro-display technology that integrates seamlessly into existing eyewear frames. Our platform combines advanced waveguide optics, edge AI processing, and intuitive gesture controls to deliver enterprise-grade AR capabilities in a consumer-friendly form factor.",
    foundingStory: "Established in 2023 by former Magic Leap optical engineer Dr. Sarah Chen and ex-Luxottica product director Marco Rossi, who recognized that AR adoption was limited by the choice between functionality and fashion.",
    category: "Augmented Reality",
    status: "Scale",
    impact: "Democratizing AR through universal eyewear compatibility",
    established: "2023",
    headquarters: "Menlo Park, CA",
    employees: "65-85",
    
    financials: {
      fundingAsk: "$25M",
      currentRevenue: "$2.1M ARR",
      projectedRevenue: {
        year1: "$8.5M",
        year2: "$28M",
        year3: "$85M",
        year4: "$220M",
        year5: "$480M"
      },
      netProfit: {
        year1: "-$5.2M",
        year2: "$3.4M",
        year3: "$21M",
        year4: "$66M",
        year5: "$156M"
      },
      grossMargin: "72% by Year 3",
      breakEven: "Month 18",
      roi: "19× by Year 5",
      valuation: "$120M current, $400M Series B target",
      previousFunding: "$8M Series A (Andreessen Horowitz lead)",
      burnRate: "$1.8M/month",
      runway: "16 months"
    },
    
    market: {
      tam: "$340B Global Eyewear + AR Market",
      sam: "$78B Smart Eyewear + Enterprise AR",
      som: "$12B (Premium eyewear + AR early adopters by 2028)",
      targetCustomers: "Enterprise professionals, Tech early adopters, Prescription glasses wearers, Healthcare workers",
      competitiveAdvantage: ["Universal frame compatibility", "Prescription lens integration", "Enterprise security standards", "Fashion-forward design"],
      marketGrowth: "AR market: 31.5% CAGR, Smart eyewear: 28.2% CAGR through 2028",
      marketTrends: ["Enterprise AR adoption accelerating", "Remote work visualization tools", "AR training and education", "Privacy-conscious computing"],
      competitors: [
        {
          name: "Meta Ray-Ban Stories",
          weakness: "Limited AR functionality, single brand partnership, consumer focus",
          ourAdvantage: "Full AR capability across all major eyewear brands with enterprise features"
        },
        {
          name: "Microsoft HoloLens",
          weakness: "Bulky headset design, enterprise-only, high cost",
          ourAdvantage: "Everyday wearable form factor with consumer pricing"
        }
      ],
      customerSegments: [
        {
          segment: "Enterprise Professionals",
          size: "125M knowledge workers globally",
          characteristics: "Need hands-free information access, expense account budgets, early tech adoption"
        },
        {
          segment: "Prescription Glasses Wearers",
          size: "4.2B people globally",
          characteristics: "Already wear glasses daily, value fashion and function, upgrade regularly"
        }
      ]
    },
    
    technology: {
      coretech: ["Waveguide micro-displays", "Edge AI processing", "Gesture recognition", "Prescription lens integration", "5G connectivity"],
      patents: ["Prescription-integrated waveguide systems", "AI-powered gesture control", "Universal frame mounting system", "Privacy-preserving edge computing"],
      competitive_edge: ["Sub-1mm display thickness", "95% light transmission", "8-hour battery life", "Medical-grade eye safety"],
      roadmap: ["Prescription integration platform Q2 2025", "Enterprise API suite Q3 2025", "Neural interface research Q1 2026", "Global manufacturing scale Q4 2026"],
      technicalSpecs: [
        {
          specification: "Display Technology",
          detail: "Micro-OLED waveguide, 2K per eye, 60Hz refresh, 500 nits brightness"
        },
        {
          specification: "Processing Unit",
          detail: "Qualcomm Snapdragon XR2+ Gen 2, 12GB RAM, 256GB storage"
        },
        {
          specification: "Connectivity",
          detail: "Wi-Fi 6E, Bluetooth 5.3, 5G optional, enterprise VPN support"
        }
      ],
      developmentStage: "Commercial production with major eyewear partners",
      scalability: "Automated manufacturing line, global supply chain partnerships"
    },
    
    team: {
      ceo: "Dr. Sarah Chen (ex-Magic Leap Senior Optical Engineer, MIT PhD, 12+ years AR optics)",
      cto: "Marco Rossi (ex-Luxottica Global Product Director, 15+ years eyewear industry)",
      cfo: "David Kim (ex-Snap Inc. Hardware Finance, IPO experience, venture backed scaling)",
      keyMembers: ["Dr. Lisa Park (Stanford Computer Vision)", "James Wilson (ex-Apple Industrial Design)", "Maria Santos (ex-Warby Parker Operations)"],
      advisors: ["Former CEO of Essilor", "Ex-Google Glass Product Lead", "Stanford Human-Computer Interaction Lab Director"],
      teamSize: 78,
      keyHires: ["VP Global Partnerships", "Head of Enterprise Sales", "Chief Medical Officer"]
    },
    
    products: [
      {
        name: "LENSSTORM Pro",
        description: "Enterprise AR platform for professional applications",
        pricing: "$1,499 + $49/month service",
        features: ["Enterprise security", "Remote assistance", "3D visualization", "Hands-free documentation"],
        targetMarket: "Enterprise professionals and field workers",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Hardware Sales",
          description: "Smart glasses hardware and accessories",
          percentage: 55,
          pricing: "$899-$1,499 per unit"
        },
        {
          stream: "Software Subscriptions",
          description: "Enterprise software and cloud services",
          percentage: 35,
          pricing: "$49-$299/month per user"
        },
        {
          stream: "Partner Revenue",
          description: "Revenue sharing with eyewear manufacturers",
          percentage: 10,
          pricing: "5-15% of partner sales"
        }
      ],
      customerAcquisition: "Enterprise partnerships, developer community, eyewear brand collaborations",
      retentionStrategy: "Software updates, new app ecosystem, hardware upgrade programs",
      partnerships: ["Luxottica", "Safilo", "Fielmann", "LensCrafters"]
    },
    
    risks: [
      {
        risk: "Eye safety and regulatory approval delays",
        impact: "High",
        probability: "Medium",
        mitigation: "Ongoing FDA consultation, medical advisory board, clinical safety studies",
        timeline: "Regulatory approval cycles 12-18 months"
      }
    ],
    
    metrics: [
      {
        label: "Monthly Active Users",
        value: "12.5K",
        trend: "up",
        description: "Active users across all LENSSTORM devices"
      },
      {
        label: "Enterprise Customer Retention",
        value: "94%",
        trend: "up",
        description: "Annual retention rate for enterprise customers"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q1 2025",
        status: "In Progress",
        description: "$25M Series B led by General Catalyst"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Extends eyewear lifecycle, reduces electronic waste through modular design",
      socialImpact: "Accessibility features for visually impaired, workplace safety enhancements",
      governance: "Privacy-first design, transparent data practices, diverse leadership",
      sdgs: ["Quality Education", "Industry Innovation", "Reduced Inequalities"],
      carbonFootprint: "Carbon neutral shipping, circular economy hardware program"
    },
    
    futureVision: [
      "Universal AR adoption through prescription integration",
      "Neural interface development for thought-based control"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Meta, Apple, or Google ($3-8B valuation)",
      "IPO at $500M+ annual revenue"
    ],
    
    useOfFunds: [
      {
        category: "R&D & Engineering",
        amount: "$12M",
        percentage: 48,
        description: "Next-generation optics, AI development, prescription integration"
      },
      {
        category: "Manufacturing & Supply Chain",
        amount: "$7.5M",
        percentage: 30,
        description: "Production scaling, quality systems, global supply chain"
      },
      {
        category: "Sales & Marketing",
        amount: "$4M",
        percentage: 16,
        description: "Enterprise sales team, partner marketing, brand building"
      },
      {
        category: "Working Capital",
        amount: "$1.5M",
        percentage: 6,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["WIRED: 'The Invisible AR Revolution'", "Forbes: 'Smart Glasses Finally Get Smart'"],
      awards: ["CES Innovation Award 2024", "TIME Best Inventions 2024"],
      testimonials: [
        {
          quote: "LENSSTORM finally delivered on the promise of smart glasses. Our field technicians are 35% more efficient with hands-free AR guidance.",
          author: "Dr. Michael Chen",
          position: "CTO, Siemens Digital Industries"
        }
      ]
    }
  },

  {
    id: "oto",
    name: "OTO",
    tagline: "AI-powered relationship intelligence platform",
    description: "Revolutionary AI platform that transforms personal and professional relationships through advanced emotional intelligence, predictive analytics, and automated relationship management.",
    fullDescription: "OTO leverages cutting-edge AI to analyze communication patterns, emotional cues, and relationship dynamics to provide actionable insights for improving personal and professional relationships.",
    foundingStory: "Established in 2023 by former Google AI researcher Dr. Emily Rodriguez and relationship psychology expert Dr. James Chen, who combined their expertise to bridge the gap between artificial intelligence and emotional intelligence.",
    category: "Relationship Technology",
    status: "Growth",
    impact: "Enhancing human relationships through AI-powered emotional intelligence",
    established: "2023",
    headquarters: "Austin, TX",
    employees: "28-42",
    
    financials: {
      fundingAsk: "$5.5M",
      currentRevenue: "$850K ARR",
      projectedRevenue: {
        year1: "$3.2M",
        year2: "$12M",
        year3: "$38M",
        year4: "$95M",
        year5: "$210M"
      },
      netProfit: {
        year1: "-$1.8M",
        year2: "$2.4M",
        year3: "$11.4M",
        year4: "$33.3M",
        year5: "$84M"
      },
      grossMargin: "85% by Year 3",
      breakEven: "Month 20",
      roi: "38× by Year 5",
      valuation: "$35M current, $150M Series B target",
      previousFunding: "$2.8M Seed (First Round Capital lead)",
      burnRate: "$480K/month",
      runway: "18 months"
    },
    
    market: {
      tam: "$45B Relationship & Communication Technology Market",
      sam: "$8.5B AI-Enhanced Personal Productivity",
      som: "$1.2B (Relationship management & coaching by 2028)",
      targetCustomers: "Professionals, Relationship coaches, Sales teams, HR departments",
      competitiveAdvantage: ["Emotional AI analysis", "Privacy-first architecture", "Behavioral prediction models", "Multi-platform integration"],
      marketGrowth: "Relationship tech: 22.3% CAGR, AI coaching: 35.8% CAGR through 2028",
      marketTrends: ["Remote work relationship challenges", "AI-powered coaching demand", "Privacy-conscious consumers", "Mental health awareness"],
      competitors: [
        {
          name: "Traditional CRM Systems",
          weakness: "Focus on transactions, not relationships; no emotional intelligence",
          ourAdvantage: "Deep relationship insights with emotional intelligence and behavioral prediction"
        }
      ],
      customerSegments: [
        {
          segment: "Business Professionals",
          size: "150M professionals globally",
          characteristics: "Value relationship building, need networking efficiency, willing to pay for career advancement"
        }
      ]
    },
    
    technology: {
      coretech: ["Emotional AI analysis", "Natural language processing", "Behavioral prediction algorithms", "Privacy-preserving ML"],
      patents: ["Emotional intelligence scoring system", "Privacy-preserving relationship analytics"],
      competitive_edge: ["95% accuracy in emotional tone detection", "Zero personal data storage", "Real-time relationship insights"],
      roadmap: ["Enterprise team analytics Q2 2025", "Wearable device integration Q3 2025"],
      technicalSpecs: [
        {
          specification: "AI Engine",
          detail: "Transformer-based emotional analysis with 95% accuracy across 12 languages"
        }
      ],
      developmentStage: "Production platform with 15,000+ active users",
      scalability: "Cloud-native microservices supporting millions of relationship interactions"
    },
    
    team: {
      ceo: "Dr. Emily Rodriguez (ex-Google AI Research, Stanford PhD, 10+ years emotional AI)",
      cto: "Dr. James Chen (Relationship Psychology PhD, MIT Technology Review 35 Under 35)",
      cfo: "Sarah Kim (ex-Bumble Finance, scaled consumer social platforms)",
      keyMembers: ["Dr. Alex Park (Privacy Engineering Lead)", "Maria Santos (Head of Product)"],
      advisors: ["Former VP of Psychology at Match Group", "Ex-Slack Head of Product"],
      teamSize: 35,
      keyHires: ["VP Enterprise Sales", "Head of Clinical Research"]
    },
    
    products: [
      {
        name: "OTO Professional",
        description: "AI-powered relationship intelligence for business professionals",
        pricing: "$29/month per user",
        features: ["Email tone analysis", "Meeting sentiment tracking", "Relationship health scoring"],
        targetMarket: "Business professionals and sales teams",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Subscription Revenue",
          description: "Monthly subscription fees for platform access",
          percentage: 80,
          pricing: "$19-$99/month per user"
        }
      ],
      customerAcquisition: "Content marketing, professional networking, partnership with coaching platforms",
      retentionStrategy: "Continuous relationship improvement tracking, personalized insights",
      partnerships: ["BetterUp", "LinkedIn Learning", "Zoom", "Slack"]
    },
    
    risks: [
      {
        risk: "Privacy concerns and data sensitivity",
        impact: "High",
        probability: "Medium",
        mitigation: "Zero-retention architecture, edge computing, transparent privacy practices",
        timeline: "Ongoing privacy compliance focus"
      }
    ],
    
    metrics: [
      {
        label: "Relationship Improvement Score",
        value: "78%",
        trend: "up",
        description: "Average relationship quality improvement after 3 months of usage"
      }
    ],
    
    milestones: [
      {
        milestone: "Series A Funding",
        date: "Q2 2025",
        status: "In Progress",
        description: "$5.5M Series A led by Kleiner Perkins"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Reduced travel through improved remote relationship management",
      socialImpact: "Strengthened relationships, reduced isolation, improved mental health outcomes",
      governance: "Ethical AI practices, transparent algorithms, diverse relationship research",
      sdgs: ["Good Health and Well-being", "Quality Education", "Gender Equality"],
      carbonFootprint: "Carbon neutral operations with green hosting infrastructure"
    },
    
    futureVision: [
      "Global standard for relationship intelligence",
      "Integration with mental health platforms"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Microsoft, Google, or Meta ($500M-1.5B valuation)"
    ],
    
    useOfFunds: [
      {
        category: "Product Development",
        amount: "$2.2M",
        percentage: 40,
        description: "AI algorithm enhancement, new features, platform scaling"
      },
      {
        category: "Sales & Marketing",
        amount: "$1.7M",
        percentage: 30,
        description: "Customer acquisition, brand building, content marketing"
      },
      {
        category: "Team Expansion",
        amount: "$1.1M",
        percentage: 20,
        description: "Engineering, psychology research, customer success"
      },
      {
        category: "Working Capital",
        amount: "$550K",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["Harvard Business Review: 'The Future of Relationship Technology'"],
      awards: ["AI Innovation Award 2024"],
      testimonials: [
        {
          quote: "OTO helped me understand my communication patterns and dramatically improved my team relationships.",
          author: "Lisa Zhang",
          position: "VP Engineering, Airbnb"
        }
      ]
    }
  },

  {
    id: "everbloom",
    name: "EverBloom Digital Gardens",
    tagline: "AI-curated digital spaces for mindful living and sustainable growth",
    description: "Revolutionary platform that creates personalized digital ecosystems combining mindfulness, sustainability, and AI-driven content curation to help users cultivate meaningful digital experiences.",
    fullDescription: "EverBloom Digital Gardens transforms how people interact with digital content by creating mindful, sustainable digital spaces. Our AI-powered platform curates personalized content gardens that promote mental well-being, environmental awareness, and meaningful connections.",
    foundingStory: "Established in 2023 by digital wellness advocate Maya Chen and former Netflix recommendation engineer Dr. Alex Kim, who recognized the need for technology that serves human flourishing rather than endless engagement.",
    category: "Digital Wellness",
    status: "Growth",
    impact: "Transforming digital consumption into mindful, sustainable experiences",
    established: "2023",
    headquarters: "Boulder, CO",
    employees: "18-32",
    
    financials: {
      fundingAsk: "$3.8M",
      currentRevenue: "$520K ARR",
      projectedRevenue: {
        year1: "$2.1M",
        year2: "$7.8M",
        year3: "$22M",
        year4: "$55M",
        year5: "$125M"
      },
      netProfit: {
        year1: "-$1.2M",
        year2: "$1.9M",
        year3: "$6.6M",
        year4: "$19.3M",
        year5: "$50M"
      },
      grossMargin: "82% by Year 3",
      breakEven: "Month 16",
      roi: "33× by Year 5",
      valuation: "$22M current, $95M Series A target",
      previousFunding: "$1.5M Pre-Seed (Foundry Group lead)",
      burnRate: "$285K/month",
      runway: "22 months"
    },
    
    market: {
      tam: "$32B Digital Wellness & Mindfulness Market",
      sam: "$6.8B Sustainable Technology & Digital Detox",
      som: "$890M (Mindful technology & content curation by 2028)",
      targetCustomers: "Wellness-conscious consumers, Environmental advocates, Remote workers, Educational institutions",
      competitiveAdvantage: ["AI-powered mindfulness integration", "Carbon footprint reduction", "Personalized well-being metrics"],
      marketGrowth: "Digital wellness: 18.5% CAGR, Sustainable tech: 25.2% CAGR through 2028",
      marketTrends: ["Growing digital fatigue", "Sustainability consciousness", "Mental health prioritization"],
      competitors: [
        {
          name: "Traditional Social Media Platforms",
          weakness: "Designed for engagement addiction, high carbon footprint, mental health concerns",
          ourAdvantage: "Mindful consumption design, carbon negative operations, well-being focused algorithms"
        }
      ],
      customerSegments: [
        {
          segment: "Wellness-Conscious Professionals",
          size: "85M professionals globally",
          characteristics: "High digital usage, wellness spending, environmental awareness"
        }
      ]
    },
    
    technology: {
      coretech: ["AI mindfulness algorithms", "Carbon footprint tracking", "Personalized content curation"],
      patents: ["Mindful content recommendation system", "Digital carbon footprint optimization"],
      competitive_edge: ["99% renewable energy operations", "Measurable well-being improvements"],
      roadmap: ["Wearable integration Q2 2025", "Corporate wellness platform Q3 2025"],
      technicalSpecs: [
        {
          specification: "AI Curation Engine",
          detail: "Multi-modal content analysis with well-being impact scoring"
        }
      ],
      developmentStage: "Production platform with 25,000+ active gardeners",
      scalability: "Sustainable cloud architecture supporting millions of users"
    },
    
    team: {
      ceo: "Maya Chen (Digital Wellness Advocate, Stanford Psychology MA, 8+ years mindful technology)",
      cto: "Dr. Alex Kim (ex-Netflix Recommendation Engine, PhD Computer Science)",
      cfo: "Jennifer Liu (ex-Patagonia Finance, sustainable business scaling experience)",
      keyMembers: ["Dr. Sarah Green (Environmental Psychology)", "Marcus Torres (Sustainable Technology)"],
      advisors: ["Former CEO of Headspace", "Patagonia Chief Purpose Officer"],
      teamSize: 28,
      keyHires: ["VP Community & Content", "Head of Sustainability"]
    },
    
    products: [
      {
        name: "EverBloom Personal",
        description: "Individual digital wellness and mindful content curation",
        pricing: "$12/month per user",
        features: ["AI content curation", "Digital wellness tracking", "Mindfulness integration"],
        targetMarket: "Individual wellness-conscious consumers",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Subscription Revenue",
          description: "Monthly subscription fees for platform access",
          percentage: 75,
          pricing: "$8-$25/month per user/family"
        }
      ],
      customerAcquisition: "Content marketing, wellness partnerships, sustainability communities",
      retentionStrategy: "Continuous well-being improvement tracking, community engagement",
      partnerships: ["Headspace", "Patagonia", "REI", "Whole Foods"]
    },
    
    risks: [
      {
        risk: "User adoption of mindful technology practices",
        impact: "Medium",
        probability: "Medium",
        mitigation: "Gradual behavior change approach, proven well-being benefits",
        timeline: "18-month user behavior validation"
      }
    ],
    
    metrics: [
      {
        label: "Well-being Improvement Score",
        value: "73%",
        trend: "up",
        description: "Average reported well-being improvement after 30 days"
      }
    ],
    
    milestones: [
      {
        milestone: "Series A Funding",
        date: "Q2 2025",
        status: "In Progress",
        description: "$3.8M Series A led by Union Square Ventures"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Carbon negative operations, reduced digital consumption",
      socialImpact: "Improved mental health, mindful technology use, community well-being",
      governance: "Transparent sustainability reporting, ethical AI practices",
      sdgs: ["Good Health and Well-being", "Responsible Consumption", "Climate Action"],
      carbonFootprint: "Carbon negative 5.2 tons CO2 equivalent per user annually"
    },
    
    futureVision: [
      "Global standard for mindful digital experiences",
      "Integration with smart city sustainability initiatives"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Google, Apple, or mindfulness leader ($300M-800M valuation)"
    ],
    
    useOfFunds: [
      {
        category: "Product & AI Development",
        amount: "$1.5M",
        percentage: 40,
        description: "AI algorithms, mindfulness features, sustainability tracking"
      },
      {
        category: "Sustainable Infrastructure",
        amount: "$1.1M",
        percentage: 30,
        description: "Carbon negative hosting, renewable energy systems"
      },
      {
        category: "Community & Marketing",
        amount: "$760K",
        percentage: 20,
        description: "User acquisition, content creation, partnership development"
      },
      {
        category: "Working Capital",
        amount: "$380K",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["Fast Company: 'The Future of Mindful Technology'"],
      awards: ["Sustainable Technology Innovation Award 2024"],
      testimonials: [
        {
          quote: "EverBloom transformed my relationship with technology. I'm more productive, less stressed, and my digital carbon footprint decreased by 35%.",
          author: "Dr. Sarah Johnson",
          position: "Research Director, Stanford Well-being Lab"
        }
      ]
    }
  },

  {
    id: "gcraft",
    name: "Gcraft",
    tagline: "AI-powered game development platform democratizing interactive entertainment creation",
    description: "Revolutionary no-code game development platform that empowers anyone to create professional-quality games using AI-assisted design tools, automated coding, and intelligent asset generation.",
    fullDescription: "Gcraft is democratizing game development through advanced AI that handles complex programming while users focus on creativity and storytelling. Our platform combines generative AI for assets, natural language programming, and intelligent game logic.",
    foundingStory: "Established in 2023 by former Riot Games lead developer Lisa Park and AI researcher Dr. Carlos Martinez, who were frustrated by the technical barriers preventing creative people from entering game development.",
    category: "Gaming Technology",
    status: "Scale",
    impact: "Democratizing game development through AI-powered creation tools",
    established: "2023",
    headquarters: "Los Angeles, CA",
    employees: "42-68",
    
    financials: {
      fundingAsk: "$12M",
      currentRevenue: "$4.2M ARR",
      projectedRevenue: {
        year1: "$15M",
        year2: "$42M",
        year3: "$98M",
        year4: "$210M",
        year5: "$425M"
      },
      netProfit: {
        year1: "-$3.8M",
        year2: "$8.4M",
        year3: "$29.4M",
        year4: "$73.5M",
        year5: "$170M"
      },
      grossMargin: "78% by Year 3",
      breakEven: "Month 14",
      roi: "35× by Year 5",
      valuation: "$85M current, $350M Series B target",
      previousFunding: "$6.5M Series A (a16z Games lead)",
      burnRate: "$1.2M/month",
      runway: "20 months"
    },
    
    market: {
      tam: "$203B Global Gaming Market",
      sam: "$45B Game Development Tools & Services",
      som: "$8.2B (No-code development & creator economy by 2028)",
      targetCustomers: "Indie game creators, Educational institutions, Content creators",
      competitiveAdvantage: ["AI-powered game logic generation", "Zero coding required", "Cross-platform publishing"],
      marketGrowth: "Gaming market: 9.6% CAGR, Creator tools: 23.8% CAGR through 2028",
      marketTrends: ["No-code movement acceleration", "Creator economy expansion", "Educational gaming growth"],
      competitors: [
        {
          name: "Traditional Game Engines (Unity, Unreal)",
          weakness: "Require extensive programming knowledge, steep learning curve",
          ourAdvantage: "Natural language programming with AI assistance, immediate prototyping"
        }
      ],
      customerSegments: [
        {
          segment: "Indie Game Creators",
          size: "2.8M creators globally",
          characteristics: "Creative vision but limited technical skills, budget-conscious"
        }
      ]
    },
    
    technology: {
      coretech: ["Natural language game programming", "AI asset generation", "Intelligent game logic synthesis"],
      patents: ["Natural language to game logic translation", "AI-powered game asset generation"],
      competitive_edge: ["90% faster development time", "AI-generated art and sound", "Automatic code optimization"],
      roadmap: ["VR/AR game support Q2 2025", "Multiplayer networking automation Q3 2025"],
      technicalSpecs: [
        {
          specification: "AI Engine",
          detail: "GPT-4 based game logic generation with custom game development training data"
        }
      ],
      developmentStage: "Production platform with 45,000+ active creators",
      scalability: "Cloud-native architecture supporting millions of concurrent game sessions"
    },
    
    team: {
      ceo: "Lisa Park (ex-Riot Games Lead Developer, USC Game Design, 12+ years AAA development)",
      cto: "Dr. Carlos Martinez (AI Research PhD, ex-DeepMind)",
      cfo: "Michael Chen (ex-Epic Games Finance, scaled Fortnite monetization)",
      keyMembers: ["Dr. Amy Zhang (Game AI Research)", "James Rodriguez (Platform Engineering)"],
      advisors: ["Former VP of Development at Blizzard", "Ex-Unity Technologies CTO"],
      teamSize: 58,
      keyHires: ["VP Creator Success", "Head of AI Research"]
    },
    
    products: [
      {
        name: "Gcraft Creator",
        description: "AI-powered game development platform for individual creators",
        pricing: "$29/month per creator",
        features: ["AI asset generation", "Natural language programming", "Cross-platform publishing"],
        targetMarket: "Independent game creators and hobbyists",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Subscription Revenue",
          description: "Monthly subscription fees for platform access",
          percentage: 65,
          pricing: "$29-$999/month per user"
        },
        {
          stream: "Marketplace Commission",
          description: "Commission on game sales and asset marketplace",
          percentage: 25,
          pricing: "15% commission on transactions"
        }
      ],
      customerAcquisition: "Gaming community partnerships, educational outreach, content creator sponsorships",
      retentionStrategy: "Continuous AI improvements, asset library expansion, community features",
      partnerships: ["Unity Technologies", "Steam", "Apple App Store", "Google Play"]
    },
    
    risks: [
      {
        risk: "AI-generated content quality and originality concerns",
        impact: "Medium",
        probability: "Medium",
        mitigation: "Human creative oversight, originality verification, quality control algorithms",
        timeline: "Ongoing AI model refinement"
      }
    ],
    
    metrics: [
      {
        label: "Games Published",
        value: "12.5K",
        trend: "up",
        description: "Total games published by Gcraft creators"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q1 2025",
        status: "In Progress",
        description: "$12M Series B led by Bitkraft Ventures"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Reduced hardware requirements through cloud processing, optimized game performance",
      socialImpact: "Democratized game development, creative expression accessibility",
      governance: "Ethical AI practices, creator rights protection, fair revenue sharing",
      sdgs: ["Quality Education", "Industry Innovation", "Reduced Inequalities"],
      carbonFootprint: "Carbon neutral cloud operations with renewable energy partnerships"
    },
    
    futureVision: [
      "Universal game creation platform for all skill levels",
      "AI-powered game design consultation and optimization"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Unity, Epic Games, or Microsoft ($1-3B valuation)"
    ],
    
    useOfFunds: [
      {
        category: "AI & Product Development",
        amount: "$4.8M",
        percentage: 40,
        description: "AI model improvement, new platform features, VR/AR support"
      },
      {
        category: "Creator Acquisition & Community",
        amount: "$3.6M",
        percentage: 30,
        description: "Marketing campaigns, creator incentives, community building"
      },
      {
        category: "Platform Infrastructure",
        amount: "$2.4M",
        percentage: 20,
        description: "Scaling cloud infrastructure, security, performance optimization"
      },
      {
        category: "Working Capital",
        amount: "$1.2M",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["TechCrunch: 'Gcraft Raises $6.5M to Democratize Game Development'"],
      awards: ["Game Developer Choice Innovation Award 2024"],
      testimonials: [
        {
          quote: "Gcraft allowed me to create my dream game in 3 weeks instead of 3 years. The AI understood exactly what I wanted to build.",
          author: "Alex Thompson",
          position: "Independent Game Developer, creator of 'Mystic Realms'"
        }
      ]
    }
  },

  {
    id: "hearb-assist",
    name: "HEARb ASSIST 360",
    tagline: "AI-powered hearing assistance and cognitive enhancement platform",
    description: "Revolutionary AI platform that transforms hearing assistance through advanced audio processing, real-time language translation, and cognitive enhancement features.",
    fullDescription: "HEARb ASSIST 360 combines cutting-edge AI audio processing with cognitive enhancement technology to provide comprehensive hearing assistance that goes beyond traditional hearing aids.",
    foundingStory: "Established in 2023 by audiologist Dr. Rachel Kim and former Apple audio engineer David Chen, who were inspired by Dr. Kim's grandmother's struggle with traditional hearing aids.",
    category: "Healthcare Technology",
    status: "Growth",
    impact: "Transforming hearing assistance and cognitive enhancement for 1.5B people globally",
    established: "2023",
    headquarters: "San Francisco, CA",
    employees: "35-52",
    
    financials: {
      fundingAsk: "$8M",
      currentRevenue: "$1.8M ARR",
      projectedRevenue: {
        year1: "$6.5M",
        year2: "$22M",
        year3: "$58M",
        year4: "$135M",
        year5: "$285M"
      },
      netProfit: {
        year1: "-$2.2M",
        year2: "$4.4M",
        year3: "$17.4M",
        year4: "$47.3M",
        year5: "$114M"
      },
      grossMargin: "76% by Year 3",
      breakEven: "Month 18",
      roi: "36× by Year 5",
      valuation: "$55M current, $220M Series B target",
      previousFunding: "$4.2M Series A (GV lead)",
      burnRate: "$750K/month",
      runway: "18 months"
    },
    
    market: {
      tam: "$92B Global Hearing Aid & Assistive Technology Market",
      sam: "$18B AI-Enhanced Healthcare Devices",
      som: "$3.2B (Smart hearing assistance & cognitive health by 2028)",
      targetCustomers: "Hearing impaired individuals, Aging population, Healthcare providers",
      competitiveAdvantage: ["AI-powered audio enhancement", "Cognitive training integration", "Real-time translation"],
      marketGrowth: "Hearing aids: 12.4% CAGR, AI healthcare: 28.7% CAGR through 2028",
      marketTrends: ["Aging population growth", "AI healthcare adoption", "Personalized medicine focus"],
      competitors: [
        {
          name: "Traditional Hearing Aid Manufacturers",
          weakness: "Limited AI capabilities, no cognitive features, one-size-fits-all approach",
          ourAdvantage: "Personalized AI processing, cognitive enhancement, continuous learning adaptation"
        }
      ],
      customerSegments: [
        {
          segment: "Aging Adults (65+)",
          size: "450M globally with hearing loss",
          characteristics: "Health-conscious spending, insurance coverage, family decision involvement"
        }
      ]
    },
    
    technology: {
      coretech: ["AI audio signal processing", "Real-time speech enhancement", "Cognitive training algorithms"],
      patents: ["Cognitive-aware audio processing", "Real-time hearing enhancement algorithms"],
      competitive_edge: ["95% speech clarity improvement", "Real-time translation in 40+ languages"],
      roadmap: ["FDA Class II medical device Q2 2025", "Brain-computer interface research Q3 2025"],
      technicalSpecs: [
        {
          specification: "AI Processing",
          detail: "Edge computing with 10ms latency, personalized audio enhancement algorithms"
        }
      ],
      developmentStage: "Clinical trials with 2,500+ users across 8 medical centers",
      scalability: "Cloud-native ML pipeline supporting millions of users with personalized profiles"
    },
    
    team: {
      ceo: "Dr. Rachel Kim (Clinical Audiologist PhD, Stanford Medicine, 15+ years hearing research)",
      cto: "David Chen (ex-Apple Audio Engineering, MIT, spatial audio patents)",
      cfo: "Jennifer Park (ex-Teladoc Health Finance, healthcare scaling experience)",
      keyMembers: ["Dr. Michael Torres (Cognitive Neuroscience)", "Lisa Zhang (Clinical Research)"],
      advisors: ["Former FDA Medical Device Review Director", "Ex-Sonova Chief Innovation Officer"],
      teamSize: 48,
      keyHires: ["VP Clinical Affairs", "Head of Regulatory"]
    },
    
    products: [
      {
        name: "HEARb ASSIST Personal",
        description: "Consumer AI hearing enhancement platform",
        pricing: "$89/month or $899/year",
        features: ["AI audio enhancement", "Real-time translation", "Cognitive training"],
        targetMarket: "Individual consumers with hearing challenges",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Subscription Revenue",
          description: "Monthly/annual subscription fees for platform access",
          percentage: 70,
          pricing: "$25-$299/month per user"
        },
        {
          stream: "Hardware Sales",
          description: "Specialized audio hardware and hearing devices",
          percentage: 20,
          pricing: "$299-$1,999 per device"
        }
      ],
      customerAcquisition: "Healthcare provider partnerships, digital health marketing",
      retentionStrategy: "Continuous hearing improvement tracking, cognitive benefits measurement",
      partnerships: ["Mayo Clinic", "Stanford Medicine", "Sonova", "ReSound"]
    },
    
    risks: [
      {
        risk: "FDA medical device approval delays",
        impact: "High",
        probability: "Medium",
        mitigation: "Ongoing FDA pre-submission meetings, clinical evidence gathering",
        timeline: "FDA approval process 12-18 months"
      }
    ],
    
    metrics: [
      {
        label: "Hearing Improvement Score",
        value: "89%",
        trend: "up",
        description: "Average speech comprehension improvement after 30 days"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q2 2025",
        status: "In Progress",
        description: "$8M Series B led by Healthtech Capital"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Extended device lifecycles through software updates, reduced battery waste",
      socialImpact: "Improved quality of life for hearing impaired, cognitive health enhancement",
      governance: "Patient data privacy, ethical AI in healthcare, accessible technology design",
      sdgs: ["Good Health and Well-being", "Quality Education", "Reduced Inequalities"],
      carbonFootprint: "Carbon neutral operations with sustainable hardware design"
    },
    
    futureVision: [
      "Global standard for AI-powered hearing assistance",
      "Integration with brain-computer interfaces"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Sonova, GN Store Nord, or Cochlear ($800M-2B valuation)"
    ],
    
    useOfFunds: [
      {
        category: "Clinical Development & FDA",
        amount: "$3.2M",
        percentage: 40,
        description: "Clinical trials, FDA submission, regulatory compliance"
      },
      {
        category: "Product Development",
        amount: "$2.4M",
        percentage: 30,
        description: "AI algorithm improvement, hardware development, platform features"
      },
      {
        category: "Sales & Partnerships",
        amount: "$1.6M",
        percentage: 20,
        description: "Healthcare provider partnerships, clinical education, market expansion"
      },
      {
        category: "Working Capital",
        amount: "$800K",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["Nature Medicine: 'AI Hearing Enhancement Shows Clinical Promise'"],
      awards: ["Digital Health Innovation Award 2024"],
      testimonials: [
        {
          quote: "HEARb ASSIST gave me back the joy of conversations with my grandchildren.",
          author: "Margaret Stevens",
          position: "Retired Teacher, Clinical Trial Participant"
        }
      ]
    }
  },

  {
    id: "inect",
    name: "INECT",
    tagline: "AI-powered IoT ecosystem management and predictive automation platform",
    description: "Revolutionary platform that unifies and intelligently manages IoT devices across smart homes, cities, and enterprises through advanced AI prediction, automated optimization, and seamless integration.",
    fullDescription: "INECT creates intelligent ecosystems from fragmented IoT devices by providing unified management, predictive automation, and cross-device intelligence.",
    foundingStory: "Established in 2023 by former Tesla Autopilot engineer Dr. Maria Santos and ex-Amazon Alexa architect James Wilson, who were frustrated by the complexity and fragmentation of IoT devices.",
    category: "IoT & Smart Systems",
    status: "Scale",
    impact: "Unifying and intelligently managing the world's 75+ billion IoT devices",
    established: "2023",
    headquarters: "Seattle, WA",
    employees: "52-78",
    
    financials: {
      fundingAsk: "$15M",
      currentRevenue: "$5.8M ARR",
      projectedRevenue: {
        year1: "$18M",
        year2: "$52M",
        year3: "$128M",
        year4: "$285M",
        year5: "$580M"
      },
      netProfit: {
        year1: "-$4.2M",
        year2: "$10.4M",
        year3: "$38.4M",
        year4: "$99.8M",
        year5: "$232M"
      },
      grossMargin: "81% by Year 3",
      breakEven: "Month 16",
      roi: "39× by Year 5",
      valuation: "$125M current, $450M Series B target",
      previousFunding: "$8.5M Series A (NEA lead)",
      burnRate: "$1.4M/month",
      runway: "18 months"
    },
    
    market: {
      tam: "$1.1T Global IoT Market",
      sam: "$185B IoT Platform & Management Solutions",
      som: "$28B (Smart device management & automation by 2028)",
      targetCustomers: "Smart home owners, Enterprise facilities, Smart cities",
      competitiveAdvantage: ["Universal device compatibility", "Predictive AI automation", "Cross-manufacturer integration"],
      marketGrowth: "IoT market: 19.8% CAGR, IoT platforms: 25.4% CAGR through 2028",
      marketTrends: ["IoT device proliferation", "Edge computing adoption", "Sustainability focus"],
      competitors: [
        {
          name: "Traditional IoT Platforms (AWS IoT, Azure IoT)",
          weakness: "Complex setup, developer-focused, limited consumer appeal",
          ourAdvantage: "Consumer-friendly interface, AI-powered automation, universal compatibility"
        }
      ],
      customerSegments: [
        {
          segment: "Smart Home Owners",
          size: "350M households globally",
          characteristics: "Tech-early adopters, value convenience and energy savings"
        }
      ]
    },
    
    technology: {
      coretech: ["Universal IoT protocol translation", "Predictive automation AI", "Edge computing optimization"],
      patents: ["Universal IoT device communication protocol", "Predictive IoT automation algorithms"],
      competitive_edge: ["99.7% device compatibility", "85% energy optimization", "Predictive maintenance accuracy 94%"],
      roadmap: ["Industrial IoT platform Q2 2025", "Smart city integration Q3 2025"],
      technicalSpecs: [
        {
          specification: "Device Compatibility",
          detail: "Support for 15,000+ device types across 200+ manufacturers and protocols"
        }
      ],
      developmentStage: "Production deployment in 75+ cities managing 2.5M+ parking spaces",
      scalability: "Kubernetes-native architecture supporting unlimited device connections"
    },
    
    team: {
      ceo: "Dr. Maria Santos (ex-Tesla Autopilot Senior Engineer, PhD Robotics, 12+ years autonomous systems)",
      cto: "James Wilson (ex-Amazon Alexa Architect, 15+ years distributed systems)",
      cfo: "David Kim (ex-Ring Finance, IoT hardware scaling experience)",
      keyMembers: ["Dr. Alex Chen (Edge Computing Research)", "Sarah Rodriguez (IoT Security)"],
      advisors: ["Former VP Engineering at Nest", "Ex-Cisco IoT Division Head"],
      teamSize: 68,
      keyHires: ["VP Enterprise Sales", "Head of Industrial IoT"]
    },
    
    products: [
      {
        name: "INECT Home",
        description: "Smart home IoT management and automation platform",
        pricing: "$19/month per home + hardware",
        features: ["Universal device management", "Predictive automation", "Energy optimization"],
        targetMarket: "Smart home owners and tech enthusiasts",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Subscription Revenue",
          description: "Monthly subscription fees for platform access and services",
          percentage: 60,
          pricing: "$19-$299/month per location"
        },
        {
          stream: "Hardware Sales",
          description: "IoT hubs, sensors, and specialized hardware devices",
          percentage: 25,
          pricing: "$199-$2,999 per device"
        }
      ],
      customerAcquisition: "IoT ecosystem partnerships, enterprise direct sales, smart city RFP responses",
      retentionStrategy: "Continuous device addition, energy savings tracking, predictive maintenance value",
      partnerships: ["Samsung SmartThings", "Google Nest", "Philips Hue", "Honeywell"]
    },
    
    risks: [
      {
        risk: "IoT security vulnerabilities and privacy concerns",
        impact: "High",
        probability: "Medium",
        mitigation: "Zero-trust security architecture, end-to-end encryption, regular security audits",
        timeline: "Ongoing security monitoring and updates"
      }
    ],
    
    metrics: [
      {
        label: "Devices Under Management",
        value: "8.5M",
        trend: "up",
        description: "Total IoT devices managed across all platforms"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q1 2025",
        status: "In Progress",
        description: "$15M Series B led by Intel Capital"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Significant energy reduction through IoT optimization, extended device lifecycles",
      socialImpact: "Improved quality of life through smart automation, accessible technology interfaces",
      governance: "Privacy-first data practices, transparent AI decision making",
      sdgs: ["Affordable and Clean Energy", "Sustainable Cities", "Industry Innovation"],
      carbonFootprint: "Carbon negative impact through customer energy savings exceeding operational usage"
    },
    
    futureVision: [
      "Universal IoT intelligence platform for all connected devices",
      "Predictive city-scale automation and optimization"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Google, Amazon, or Microsoft ($2-5B valuation)"
    ],
    
    useOfFunds: [
      {
        category: "Product Development & AI",
        amount: "$6M",
        percentage: 40,
        description: "AI algorithm enhancement, new platform features, predictive capabilities"
      },
      {
        category: "Sales & Partnerships",
        amount: "$4.5M",
        percentage: 30,
        description: "Enterprise sales team, channel partnerships, smart city business development"
      },
      {
        category: "Infrastructure & Security",
        amount: "$3M",
        percentage: 20,
        description: "Platform scaling, security enhancements, edge computing infrastructure"
      },
      {
        category: "Working Capital",
        amount: "$1.5M",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["IEEE IoT Magazine: 'INECT Breakthrough in Universal IoT Management'"],
      awards: ["IoT Breakthrough Award 2024"],
      testimonials: [
        {
          quote: "INECT reduced our facility energy costs by 35% while improving occupant comfort.",
          author: "Jennifer Chen",
          position: "Facilities Director, Salesforce Tower"
        }
      ]
    }
  },

  {
    id: "mparker",
    name: "Mparker",
    tagline: "AI-powered smart parking and urban mobility optimization platform",
    description: "Revolutionary platform that transforms urban parking through AI-powered space optimization, predictive availability, and integrated mobility solutions.",
    fullDescription: "Mparker leverages computer vision, IoT sensors, and predictive AI to create intelligent parking ecosystems that maximize space utilization, reduce traffic congestion, and integrate seamlessly with public transportation.",
    foundingStory: "Established in 2023 by urban planner Dr. Sofia Martinez and former Uber engineer Michael Zhang, who were motivated by the global parking crisis affecting cities worldwide.",
    category: "Smart Cities & Mobility",
    status: "Scale",
    impact: "Optimizing urban mobility and reducing traffic congestion in 500+ cities globally",
    established: "2023",
    headquarters: "San Francisco, CA",
    employees: "38-65",
    
    financials: {
      fundingAsk: "$10M",
      currentRevenue: "$3.5M ARR",
      projectedRevenue: {
        year1: "$12M",
        year2: "$35M",
        year3: "$82M",
        year4: "$175M",
        year5: "$350M"
      },
      netProfit: {
        year1: "-$2.8M",
        year2: "$7M",
        year3: "$24.6M",
        year4: "$61.3M",
        year5: "$140M"
      },
      grossMargin: "79% by Year 3",
      breakEven: "Month 15",
      roi: "35× by Year 5",
      valuation: "$75M current, $285M Series B target",
      previousFunding: "$5.2M Series A (Bessemer Venture Partners lead)",
      burnRate: "$950K/month",
      runway: "19 months"
    },
    
    market: {
      tam: "$105B Global Parking Industry",
      sam: "$32B Smart Parking & Urban Mobility Solutions",
      som: "$5.8B (AI-powered parking and mobility optimization by 2028)",
      targetCustomers: "Municipal governments, Commercial parking operators, Shopping centers",
      competitiveAdvantage: ["AI-powered predictive availability", "Cross-modal mobility integration", "Real-time space optimization"],
      marketGrowth: "Smart parking: 22.4% CAGR, Urban mobility: 17.8% CAGR through 2028",
      marketTrends: ["Urban population growth", "Sustainability mandates", "Smart city initiatives"],
      competitors: [
        {
          name: "Traditional Parking Management Systems",
          weakness: "Static pricing, no predictive capabilities, isolated from mobility ecosystem",
          ourAdvantage: "Dynamic AI optimization, integrated mobility solutions, predictive analytics"
        }
      ],
      customerSegments: [
        {
          segment: "Municipal Governments",
          size: "500+ major cities globally",
          characteristics: "Traffic reduction goals, revenue optimization needs, sustainability mandates"
        }
      ]
    },
    
    technology: {
      coretech: ["Computer vision parking detection", "Predictive availability algorithms", "Dynamic pricing optimization"],
      patents: ["AI-powered parking prediction system", "Dynamic parking pricing algorithms"],
      competitive_edge: ["97% availability prediction accuracy", "35% space utilization improvement"],
      roadmap: ["Autonomous vehicle integration Q2 2025", "Blockchain parking tokens Q3 2025"],
      technicalSpecs: [
        {
          specification: "Detection Accuracy",
          detail: "Computer vision with 99.2% accuracy, LiDAR and camera sensor fusion"
        }
      ],
      developmentStage: "Production deployment in 75+ cities managing 2.5M+ parking spaces",
      scalability: "Cloud-native architecture supporting unlimited parking spaces and mobility integrations"
    },
    
    team: {
      ceo: "Dr. Sofia Martinez (Urban Planning PhD, former NYC DOT, 12+ years smart city development)",
      cto: "Michael Zhang (ex-Uber Senior Engineer, MIT, ride-sharing platform scaling)",
      cfo: "Jennifer Liu (ex-Bird Scooter Finance, mobility startup scaling experience)",
      keyMembers: ["Dr. Alex Chen (Computer Vision Research)", "Sarah Kim (IoT Systems)"],
      advisors: ["Former CTO of Citymapper", "Ex-BMW Mobility Services Head"],
      teamSize: 58,
      keyHires: ["VP Government Relations", "Head of Hardware Engineering"]
    },
    
    products: [
      {
        name: "Mparker City",
        description: "Municipal smart parking and traffic optimization platform",
        pricing: "$50K-$500K annual contracts",
        features: ["City-wide parking management", "Traffic flow optimization", "Revenue analytics"],
        targetMarket: "Municipal governments and transportation authorities",
        stage: "Production"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "SaaS Subscriptions",
          description: "Monthly/annual software licensing and platform access",
          percentage: 55,
          pricing: "$25-$999/month per location"
        },
        {
          stream: "Municipal Contracts",
          description: "Large-scale city implementations and multi-year contracts",
          percentage: 35,
          pricing: "$50K-$2M annual contracts"
        }
      ],
      customerAcquisition: "Smart city conferences, municipal partnerships, parking industry associations",
      retentionStrategy: "Continuous optimization improvements, expanded mobility integrations, ROI demonstration",
      partnerships: ["Google Maps", "Apple Maps", "Uber", "Lyft", "Bird"]
    },
    
    risks: [
      {
        risk: "Municipal bureaucracy and slow government adoption",
        impact: "Medium",
        probability: "High",
        mitigation: "Pilot program approach, ROI demonstration, government relations expertise",
        timeline: "Government sales cycles 12-24 months"
      }
    ],
    
    metrics: [
      {
        label: "Parking Spaces Managed",
        value: "2.5M",
        trend: "up",
        description: "Total parking spaces under Mparker management"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q2 2025",
        status: "In Progress",
        description: "$10M Series B led by Foundry Group"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Significant CO2 reduction through traffic optimization, promotion of sustainable mobility",
      socialImpact: "Reduced urban stress, improved accessibility, enhanced public transportation usage",
      governance: "Transparent pricing algorithms, equitable access policies",
      sdgs: ["Sustainable Cities", "Climate Action", "Reduced Inequalities"],
      carbonFootprint: "Carbon negative impact through traffic reduction exceeding operational emissions"
    },
    
    futureVision: [
      "Global urban mobility optimization platform",
      "Integration with autonomous vehicle fleets"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Google, Uber, or automotive OEM ($800M-2B valuation)"
    ],
    
    useOfFunds: [
      {
        category: "Product Development & AI",
        amount: "$4M",
        percentage: 40,
        description: "AI algorithm enhancement, autonomous vehicle integration, predictive capabilities"
      },
      {
        category: "Geographic Expansion",
        amount: "$3M",
        percentage: 30,
        description: "International expansion, local partnerships, regulatory compliance"
      },
      {
        category: "Hardware & Infrastructure",
        amount: "$2M",
        percentage: 20,
        description: "IoT sensor deployment, computer vision hardware, cloud infrastructure"
      },
      {
        category: "Working Capital",
        amount: "$1M",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["Smart Cities Dive: 'Mparker Reduces Traffic Congestion by 28% in Pilot Cities'"],
      awards: ["Smart Cities Innovation Award 2024"],
      testimonials: [
        {
          quote: "Mparker reduced parking search time by 60% and increased our revenue by 40%.",
          author: "Carlos Rodriguez",
          position: "Transportation Director, City of Austin"
        }
      ]
    }
  },

  {
    id: "pros",
    name: "PRO'S",
    tagline: "Revolutionary holographic design platform bringing any idea to life",
    description: "Groundbreaking platform that transforms imagination into reality through advanced holographic visualization, spatial computing, and AI-powered design assistance, enabling anyone to create, prototype, and experience ideas in immersive 3D space.",
    fullDescription: "PRO'S revolutionizes the design and prototyping process by combining cutting-edge holographic display technology with AI-powered design assistance and spatial computing. Our platform enables creators, designers, engineers, and visionaries to materialize their ideas instantly in photorealistic 3D holograms, manipulate them with natural gestures, and collaborate in shared holographic workspaces that blur the line between imagination and reality.",
    foundingStory: "Established in 2023 by former Apple ARKit lead engineer Dr. Alexandra Rivera and ex-Industrial Light & Magic holographic specialist Marcus Chen, who envisioned a world where the barrier between imagination and creation disappears. After witnessing the limitations of traditional 2D design tools and the complexity of existing 3D software, they developed PRO'S to democratize spatial design through intuitive holographic interfaces that respond to natural human creativity.",
    category: "Spatial Computing & Holographic Design",
    status: "Scale",
    impact: "Democratizing 3D design and spatial prototyping through revolutionary holographic interfaces",
    established: "2023",
    headquarters: "Cupertino, CA",
    employees: "85-120",
    
    financials: {
      fundingAsk: "$35M",
      currentRevenue: "$8.2M ARR",
      projectedRevenue: {
        year1: "$25M",
        year2: "$72M",
        year3: "$185M",
        year4: "$420M",
        year5: "$850M"
      },
      netProfit: {
        year1: "-$12M",
        year2: "$14.4M",
        year3: "$55.5M",
        year4: "$147M",
        year5: "$340M"
      },
      grossMargin: "85% by Year 3",
      breakEven: "Month 20",
      roi: "24× by Year 5",
      valuation: "$285M current, $1.2B Series B target",
      previousFunding: "$18M Series A (Andreessen Horowitz lead)",
      burnRate: "$2.8M/month",
      runway: "18 months"
    },
    
    market: {
      tam: "$780B Global Design & Prototyping Market",
      sam: "$125B Spatial Computing & 3D Design Tools",
      som: "$18B (Holographic design & spatial collaboration by 2028)",
      targetCustomers: "Product designers, Architects, Engineers, Creative studios, Educational institutions, Enterprise R&D teams",
      competitiveAdvantage: ["True holographic display technology", "AI-powered design assistance", "Natural gesture control", "Real-time collaborative spaces", "Zero learning curve interface"],
      marketGrowth: "Spatial computing: 42.8% CAGR, 3D design tools: 18.7% CAGR through 2028",
      marketTrends: ["Spatial computing revolution", "Remote collaboration demand", "AI-assisted creativity", "Immersive design workflows", "Holographic display adoption"],
      competitors: [
        {
          name: "Traditional CAD Software (AutoCAD, SolidWorks)",
          weakness: "2D interfaces for 3D work, steep learning curves, limited collaboration, no spatial visualization",
          ourAdvantage: "Native 3D holographic workspace, intuitive gesture controls, real-time collaboration, instant visualization"
        },
        {
          name: "VR Design Tools (Gravity Sketch, Tilt Brush)",
          weakness: "Requires headsets, limited precision, isolation, eye strain, bulky hardware",
          ourAdvantage: "Glasses-free holograms, sub-millimeter precision, shared workspace, comfortable extended use"
        }
      ],
      customerSegments: [
        {
          segment: "Product Design Studios",
          size: "150K design firms globally",
          characteristics: "Need rapid prototyping, client visualization, creative collaboration, premium tool adoption"
        },
        {
          segment: "Enterprise R&D Teams",
          size: "50K+ innovation labs",
          characteristics: "Complex product development, cross-functional collaboration, budget for cutting-edge tools"
        }
      ]
    },
    
    technology: {
      coretech: ["Volumetric holographic displays", "AI-powered design assistance", "Spatial gesture recognition", "Real-time ray tracing", "Cloud-based collaborative rendering", "Natural language to 3D conversion"],
      patents: ["Volumetric holographic projection system", "AI-assisted spatial design algorithms", "Multi-user holographic collaboration platform", "Gesture-based 3D manipulation interface"],
      competitive_edge: ["True glasses-free holographic displays", "Sub-millimeter spatial precision", "Real-time photorealistic rendering", "Natural language design input", "Unlimited collaborative workspaces"],
      roadmap: ["Mobile holographic projectors Q2 2025", "AI design co-pilot Q3 2025", "Neural interface integration Q1 2026", "Global holographic telepresence Q4 2026"],
      technicalSpecs: [
        {
          specification: "Holographic Display",
          detail: "360-degree viewing angle, 4K resolution per eye, 120Hz refresh rate, 8-meter viewing distance"
        },
        {
          specification: "Spatial Tracking",
          detail: "Sub-millimeter hand tracking, 6DOF head tracking, multi-user spatial awareness"
        },
        {
          specification: "AI Engine",
          detail: "GPT-4 based design assistant, real-time rendering optimization, predictive design suggestions"
        }
      ],
      developmentStage: "Production platform with 2,500+ enterprise customers and 25,000+ active creators",
      scalability: "Cloud-native architecture supporting unlimited concurrent holographic sessions"
    },
    
    team: {
      ceo: "Dr. Alexandra Rivera (ex-Apple ARKit Lead Engineer, MIT PhD Spatial Computing, 15+ years AR/VR)",
      cto: "Marcus Chen (ex-Industrial Light & Magic Holographic Specialist, Stanford MS, 12+ years visual effects)",
      cfo: "Jennifer Park (ex-Magic Leap Finance, scaled hardware startup to $2B valuation)",
      keyMembers: ["Dr. Sarah Kim (AI Research Director)", "David Rodriguez (Hardware Engineering)", "Lisa Zhang (Spatial UX Design)", "Dr. Michael Torres (Computer Vision)"],
      advisors: ["Former VP of Engineering at Pixar", "Ex-Microsoft HoloLens Product Director", "Stanford Virtual Human Interaction Lab Director"],
      teamSize: 105,
      keyHires: ["VP Enterprise Sales", "Head of Global Partnerships", "Director of Developer Relations"]
    },
    
    products: [
      {
        name: "PRO'S Studio",
        description: "Professional holographic design workstation for creative studios",
        pricing: "$25,000 hardware + $499/month software",
        features: ["Large-scale holographic displays", "Multi-user collaboration", "AI design assistant", "Enterprise integrations"],
        targetMarket: "Design studios, architecture firms, creative agencies",
        stage: "Production"
      },
      {
        name: "PRO'S Enterprise",
        description: "Holographic collaboration platform for distributed teams",
        pricing: "$15,000 per workstation + $299/month per user",
        features: ["Remote holographic presence", "Real-time design review", "Version control", "Enterprise security"],
        targetMarket: "Enterprise R&D teams, engineering firms, product development",
        stage: "Production"
      },
      {
        name: "PRO'S Creator",
        description: "Personal holographic design tool for individual creators",
        pricing: "$2,999 hardware + $99/month software",
        features: ["Desktop holographic display", "AI-powered assistance", "Cloud library access", "Community features"],
        targetMarket: "Individual designers, artists, educators, students",
        stage: "Beta Testing"
      }
    ],
    
    businessModel: {
      revenueStreams: [
        {
          stream: "Hardware Sales",
          description: "Holographic display systems and spatial computing hardware",
          percentage: 60,
          pricing: "$2,999-$25,000 per system"
        },
        {
          stream: "Software Subscriptions",
          description: "Monthly subscription for software platform and cloud services",
          percentage: 35,
          pricing: "$99-$499/month per user"
        },
        {
          stream: "Professional Services",
          description: "Custom implementation, training, and design consulting",
          percentage: 5,
          pricing: "$500-$2,000/hour"
        }
      ],
      customerAcquisition: "Direct enterprise sales, design conference demonstrations, influencer partnerships, educational programs",
      retentionStrategy: "Continuous platform improvements, AI model updates, community building, exclusive content library",
      partnerships: ["Autodesk", "Adobe", "NVIDIA", "Microsoft", "Apple", "Leading design schools"]
    },
    
    risks: [
      {
        risk: "Holographic display technology adoption curve",
        impact: "Medium",
        probability: "Medium",
        mitigation: "Comprehensive demo programs, ROI case studies, gradual market education, enterprise pilot programs",
        timeline: "Technology adoption typically 18-36 months"
      },
      {
        risk: "Competition from tech giants (Apple, Meta, Microsoft)",
        impact: "High",
        probability: "High",
        mitigation: "First-mover advantage, patent portfolio, exclusive partnerships, rapid innovation cycles",
        timeline: "Competitive pressure expected 2025-2027"
      }
    ],
    
    metrics: [
      {
        label: "Active Holographic Sessions",
        value: "45.2K",
        trend: "up",
        description: "Monthly active holographic design sessions across all platforms"
      },
      {
        label: "Design Creation Speed",
        value: "87%",
        trend: "up",
        description: "Average reduction in design iteration time vs traditional tools"
      },
      {
        label: "Customer Satisfaction",
        value: "96.8%",
        trend: "up",
        description: "Net Promoter Score from enterprise customers"
      }
    ],
    
    milestones: [
      {
        milestone: "Series B Funding",
        date: "Q1 2025",
        status: "In Progress",
        description: "$35M Series B led by Sequoia Capital"
      },
      {
        milestone: "10K Enterprise Workstations",
        date: "Q3 2025",
        status: "Planned",
        description: "Deploy 10,000+ holographic workstations globally"
      },
      {
        milestone: "Consumer Market Launch",
        date: "Q4 2025",
        status: "Planned",
        description: "Launch PRO'S Creator for individual consumers and educators"
      }
    ],
    
    sustainability: {
      environmentalImpact: "Reduced physical prototyping waste, lower material consumption, efficient holographic displays",
      socialImpact: "Democratized access to advanced design tools, enhanced remote collaboration, educational accessibility",
      governance: "Ethical AI development, open creator economy, transparent development process",
      sdgs: ["Quality Education", "Industry Innovation", "Responsible Consumption"],
      carbonFootprint: "Carbon neutral operations with 45% reduction in customer prototyping emissions"
    },
    
    futureVision: [
      "Universal holographic design standard across all industries",
      "AI co-creation that amplifies human creativity",
      "Seamless physical-digital design integration",
      "Global collaborative holographic workspaces"
    ],
    
    exitStrategy: [
      "Strategic acquisition by Apple, Microsoft, or Meta ($8-15B valuation)",
      "IPO at $1B+ annual revenue with spatial computing market leadership",
      "Technology licensing to hardware manufacturers and software platforms"
    ],
    
    useOfFunds: [
      {
        category: "R&D & Technology",
        amount: "$14M",
        percentage: 40,
        description: "Next-generation holographic displays, AI model advancement, spatial computing research"
      },
      {
        category: "Manufacturing & Hardware",
        amount: "$10.5M",
        percentage: 30,
        description: "Production scaling, supply chain optimization, hardware cost reduction"
      },
      {
        category: "Sales & Market Expansion",
        amount: "$7M",
        percentage: 20,
        description: "Enterprise sales team, global partnerships, market education programs"
      },
      {
        category: "Working Capital",
        amount: "$3.5M",
        percentage: 10,
        description: "Operations and strategic reserves"
      }
    ],
    
    media: {
      pressReleases: ["MIT Technology Review: 'PRO'S Brings Science Fiction Holograms to Reality'", "Fast Company: 'The Future of Design is Holographic'"],
      awards: ["CES Innovation Award 2024", "Red Dot Design Award", "TIME Best Inventions 2024"],
      testimonials: [
        {
          quote: "PRO'S transformed our entire design workflow. We can now prototype in hours what used to take weeks, and our clients are amazed by the holographic presentations.",
          author: "Sarah Johnson",
          position: "Creative Director, IDEO"
        }
      ]
    }
  }
];