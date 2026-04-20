export const contacts = [
  {
    id: 'sarah-chen',
    name: 'Sarah Chen',
    title: 'VP Product at Stripe',
    relationshipScore: 94,
    lastContact: '2 days ago',
    nextAction: 'Follow up on Q1 roadmap discussion',
    priority: 'high',
    tags: ['key-client', 'product'],
    avatar: 'SC',
    connectionStrength: 'strong',
    preferredChannel: 'email',
    responseRate: 87,
    avgResponseTime: '2.3 hours'
  },
  {
    id: 'mike-rodriguez',
    name: 'Mike Rodriguez',
    title: 'CTO at TechStart',
    relationshipScore: 78,
    lastContact: '1 week ago',
    nextAction: 'Send technical whitepaper',
    priority: 'medium',
    tags: ['prospect', 'technical'],
    avatar: 'MR',
    connectionStrength: 'medium',
    preferredChannel: 'linkedin',
    responseRate: 73,
    avgResponseTime: '4.7 hours'
  },
  {
    id: 'alex-kim',
    name: 'Alex Kim',
    title: 'Founder at DataFlow',
    relationshipScore: 87,
    lastContact: '3 days ago',
    nextAction: 'Schedule coffee meeting',
    priority: 'high',
    tags: ['investor', 'mentor'],
    avatar: 'AK',
    connectionStrength: 'strong',
    preferredChannel: 'phone',
    responseRate: 91,
    avgResponseTime: '1.8 hours'
  }
];

export const aiSuggestions = [
  {
    type: 'timing',
    contact: 'Sarah Chen',
    suggestion: 'Best time to reach out: Tuesday 2-4 PM (87% response rate)',
    confidence: 'high',
    action: 'Schedule Send'
  },
  {
    type: 'content',
    contact: 'Mike Rodriguez',
    suggestion: 'Mention recent Series B funding - high engagement topic',
    confidence: 'medium',
    action: 'Use Template'
  },
  {
    type: 'channel',
    contact: 'Alex Kim',
    suggestion: 'LinkedIn message performs 40% better than email',
    confidence: 'high',
    action: 'Switch Channel'
  }
];

export const relationshipInsights = {
  totalContacts: 1247,
  activeRelationships: 89,
  responseRate: 67,
  networkGrowth: 12,
  strongConnections: 34,
  weeklyInteractions: 52
};