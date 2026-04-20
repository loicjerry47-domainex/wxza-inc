import React, { useState } from 'react';
import { Shield, CheckCircle2, Clock, AlertTriangle, FileText, Award, Lock, Eye } from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  category: 'environmental' | 'security' | 'privacy' | 'industry';
  status: 'certified' | 'in-progress' | 'pending';
  issuer: string;
  validFrom?: string;
  validUntil?: string;
  nextAudit?: string;
  score?: number;
  description: string;
}

interface ComplianceMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  status: 'compliant' | 'warning' | 'non-compliant';
}

const SecurityComplianceTracker: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);

  const categories = [
    { id: 'all', name: 'All Certifications', icon: Shield },
    { id: 'environmental', name: 'Environmental', icon: Award },
    { id: 'security', name: 'Security', icon: Lock },
    { id: 'privacy', name: 'Privacy', icon: Eye },
    { id: 'industry', name: 'Industry', icon: FileText }
  ];

  const certifications: Certification[] = [
    // Environmental
    {
      id: 'iso-14001',
      name: 'ISO 14001:2015',
      category: 'environmental',
      status: 'certified',
      issuer: 'BSI Group',
      validFrom: '2025-08-01',
      validUntil: '2026-08-01',
      nextAudit: '2026-08-01',
      description: 'Environmental Management Systems certification. Demonstrates commitment to reducing carbon emissions by 8 GT CO₂/year through AI-powered optimization.'
    },
    {
      id: 'leed',
      name: 'LEED Automation Support',
      category: 'environmental',
      status: 'certified',
      issuer: 'USGBC',
      description: 'Automated data collection for LEED v4.1 certification (EA Credits: Energy Performance, Advanced Metering, EQ Credits: IAQ Assessment).'
    },
    {
      id: 'well',
      name: 'WELL Building Standard',
      category: 'environmental',
      status: 'certified',
      issuer: 'IWBI',
      description: 'Support for WELL v2 certification (Air Quality Standards, Ventilation Effectiveness, Thermal Performance compliance tracking).'
    },
    {
      id: 'energy-star',
      name: 'ENERGY STAR Integration',
      category: 'environmental',
      status: 'certified',
      issuer: 'EPA',
      description: 'Automated sync with EPA Portfolio Manager for ENERGY STAR score tracking and certification eligibility.'
    },

    // Security
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      category: 'security',
      status: 'certified',
      issuer: 'Deloitte & Touche LLP',
      validFrom: '2024-12-01',
      validUntil: '2025-12-01',
      nextAudit: '2025-12-01',
      description: 'Security, Availability, and Confidentiality controls audit (6-month period: Dec 2024 - May 2025). Zero control deficiencies.'
    },
    {
      id: 'iso-27001',
      name: 'ISO 27001:2022',
      category: 'security',
      status: 'in-progress',
      issuer: 'BSI Group',
      nextAudit: '2026-06-01',
      description: 'Information Security Management System certification (in progress, target Q2 2026). 93/93 Annex A controls implemented.'
    },
    {
      id: 'penetration-test',
      name: 'Penetration Testing',
      category: 'security',
      status: 'certified',
      issuer: 'External Security Firm',
      validFrom: '2025-11-01',
      nextAudit: '2026-02-01',
      description: 'Quarterly penetration testing with zero critical vulnerabilities. Bug bounty program active ($50K+ paid to researchers).'
    },

    // Privacy
    {
      id: 'gdpr',
      name: 'GDPR Compliance',
      category: 'privacy',
      status: 'certified',
      issuer: 'Internal DPO + Legal',
      description: 'General Data Protection Regulation compliance for EU operations. Standard Contractual Clauses for cross-border transfers.'
    },
    {
      id: 'ccpa',
      name: 'CCPA Compliance',
      category: 'privacy',
      status: 'certified',
      issuer: 'Internal Legal',
      description: 'California Consumer Privacy Act compliance. Data subject rights (access, deletion, portability) implemented.'
    },
    {
      id: 'hipaa',
      name: 'HIPAA Compliance',
      category: 'privacy',
      status: 'pending',
      issuer: 'N/A',
      description: 'Not applicable (no Protected Health Information collected). Occupancy data is anonymized (no individual tracking).'
    },

    // Industry
    {
      id: 'ashrae',
      name: 'ASHRAE 55/62.1',
      category: 'industry',
      status: 'certified',
      issuer: 'ASHRAE',
      description: 'Thermal comfort (ASHRAE 55) and ventilation (ASHRAE 62.1) standards compliance monitoring. 95%+ compliance rate.'
    },
    {
      id: 'ul',
      name: 'UL Certification',
      category: 'industry',
      status: 'certified',
      issuer: 'Underwriters Laboratories',
      description: 'Sensor hardware safety certification (UL 2043 for fire safety in air-handling spaces).'
    }
  ];

  const complianceMetrics: ComplianceMetric[] = [
    { id: 'uptime', name: 'API Uptime', value: 99.97, target: 99.95, unit: '%', status: 'compliant' },
    { id: 'patching', name: 'Vulnerability Patching (7 days)', value: 99.8, target: 95, unit: '%', status: 'compliant' },
    { id: 'mfa', name: 'MFA Adoption', value: 100, target: 100, unit: '%', status: 'compliant' },
    { id: 'encryption', name: 'Encryption Coverage', value: 100, target: 100, unit: '%', status: 'compliant' },
    { id: 'incidents', name: 'Security Incidents (12mo)', value: 0, target: 5, unit: '', status: 'compliant' },
    { id: 'ashrae', name: 'ASHRAE 55 Compliance', value: 95.2, target: 90, unit: '%', status: 'compliant' }
  ];

  const filteredCerts = selectedCategory === 'all'
    ? certifications
    : certifications.filter(c => c.category === selectedCategory);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'certified': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'pending': return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'certified': return <CheckCircle2 className="w-4 h-4 text-green-400" />;
      case 'in-progress': return <Clock className="w-4 h-4 text-yellow-400" />;
      case 'pending': return <AlertTriangle className="w-4 h-4 text-gray-400" />;
      default: return <FileText className="w-4 h-4 text-gray-400" />;
    }
  };

  const getMetricStatus = (metric: ComplianceMetric) => {
    if (metric.id === 'incidents') {
      return metric.value <= metric.target ? 'compliant' : 'non-compliant';
    }
    if (metric.value >= metric.target) return 'compliant';
    if (metric.value >= metric.target * 0.9) return 'warning';
    return 'non-compliant';
  };

  const getMetricColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'non-compliant': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
            <h2 className="text-xl font-medium text-white">Security & Compliance</h2>
          </div>
          <p className="text-sm text-gray-400">
            Certifications, audit status, and compliance metrics
          </p>
        </div>

        {/* Overall Compliance Score */}
        <div className="text-right">
          <div className="text-xs text-gray-400 mb-1">Overall Compliance</div>
          <div className="text-2xl font-medium text-green-400">98.5%</div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg border whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-white/10 border-white/20 text-white'
                  : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/8'
              }`}
            >
              <Icon className="w-4 h-4" />
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-4 h-4 text-green-400" />
            <div className="text-xs text-gray-400">Certified</div>
          </div>
          <div className="text-2xl font-medium text-white">10</div>
        </div>

        <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-400" />
            <div className="text-xs text-gray-400">In Progress</div>
          </div>
          <div className="text-2xl font-medium text-white">1</div>
        </div>

        <div className="p-4 rounded-lg bg-gray-500/10 border border-gray-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-gray-400" />
            <div className="text-xs text-gray-400">Pending</div>
          </div>
          <div className="text-2xl font-medium text-white">1</div>
        </div>

        <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <div className="text-xs text-gray-400">Next Audit</div>
          </div>
          <div className="text-sm font-medium text-white">Feb 2026</div>
        </div>
      </div>

      {/* Certifications Grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredCerts.map((cert) => (
          <button
            key={cert.id}
            onClick={() => setSelectedCert(cert)}
            className={`p-4 rounded-lg border text-left transition-all ${
              selectedCert?.id === cert.id
                ? 'bg-white/10 border-white/20'
                : 'bg-white/5 border-white/10 hover:bg-white/8'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="text-sm font-medium text-white mb-1">{cert.name}</div>
                <div className="text-xs text-gray-400">{cert.issuer}</div>
              </div>
              <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${getStatusColor(cert.status)}`}>
                {getStatusIcon(cert.status)}
                {cert.status}
              </span>
            </div>

            {cert.validUntil && (
              <div className="flex items-center gap-4 text-xs">
                <div>
                  <div className="text-gray-500">Valid Until</div>
                  <div className="text-white">{new Date(cert.validUntil).toLocaleDateString()}</div>
                </div>
                {cert.nextAudit && (
                  <div>
                    <div className="text-gray-500">Next Audit</div>
                    <div className="text-white">{new Date(cert.nextAudit).toLocaleDateString()}</div>
                  </div>
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Selected Certification Details */}
      {selectedCert && (
        <div className="p-6 rounded-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-lg font-medium text-white">{selectedCert.name}</h3>
                <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded border ${getStatusColor(selectedCert.status)}`}>
                  {getStatusIcon(selectedCert.status)}
                  {selectedCert.status}
                </span>
              </div>
              <div className="text-sm text-gray-400">{selectedCert.issuer}</div>
            </div>
          </div>

          <p className="text-sm text-gray-300 mb-4">{selectedCert.description}</p>

          {selectedCert.validFrom && selectedCert.validUntil && (
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Valid From</div>
                <div className="text-sm text-white">{new Date(selectedCert.validFrom).toLocaleDateString()}</div>
              </div>
              <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                <div className="text-xs text-gray-400 mb-1">Valid Until</div>
                <div className="text-sm text-white">{new Date(selectedCert.validUntil).toLocaleDateString()}</div>
              </div>
              {selectedCert.nextAudit && (
                <div className="p-3 rounded-lg bg-white/5 border border-white/10">
                  <div className="text-xs text-gray-400 mb-1">Next Audit</div>
                  <div className="text-sm text-white">{new Date(selectedCert.nextAudit).toLocaleDateString()}</div>
                </div>
              )}
            </div>
          )}

          {selectedCert.id === 'soc2' && (
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-medium text-white mb-2">Audit Findings</div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <CheckCircle2 className="w-4 h-4" />
                  0 control deficiencies
                </div>
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <CheckCircle2 className="w-4 h-4" />
                  0 significant deficiencies
                </div>
                <div className="flex items-center gap-2 text-sm text-green-300">
                  <CheckCircle2 className="w-4 h-4" />
                  0 material weaknesses
                </div>
              </div>
            </div>
          )}

          {selectedCert.id === 'iso-14001' && (
            <div className="pt-4 border-t border-white/10">
              <div className="text-sm font-medium text-white mb-2">Environmental Objectives (2026)</div>
              <div className="space-y-2 text-sm text-gray-300">
                <div>• Deploy to 10,000 buildings (4× current)</div>
                <div>• Achieve 1.2M tons CO₂ reduction (customer buildings)</div>
                <div>• Carbon-neutral operations (Scope 1+2)</div>
                <div>• 90% sensor recycling rate (end-of-life)</div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Compliance Metrics */}
      <div>
        <h3 className="text-sm font-medium text-white mb-3">Compliance Metrics</h3>
        <div className="grid grid-cols-3 gap-4">
          {complianceMetrics.map((metric) => {
            const status = getMetricStatus(metric);
            const percentage = metric.id === 'incidents'
              ? 100
              : (metric.value / metric.target) * 100;

            return (
              <div key={metric.id} className="p-4 rounded-lg bg-white/5 border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <div className="text-xs text-gray-400">{metric.name}</div>
                  <span className={`text-xs ${getMetricColor(status)}`}>
                    {status}
                  </span>
                </div>

                <div className="text-lg font-medium text-white mb-1">
                  {metric.value}{metric.unit}
                </div>

                <div className="text-xs text-gray-500 mb-2">
                  Target: {metric.target}{metric.unit}
                </div>

                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      status === 'compliant'
                        ? 'bg-green-500'
                        : status === 'warning'
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Security Posture */}
      <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30">
        <h3 className="text-sm font-medium text-white mb-4">Security Posture</h3>
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-xs text-gray-400 mb-1">Critical Incidents (12mo)</div>
            <div className="text-2xl font-medium text-green-400">0</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Vulnerability Patching</div>
            <div className="text-2xl font-medium text-green-400">99.8%</div>
            <div className="text-xs text-gray-500 mt-1">Within 7 days</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">MFA Adoption</div>
            <div className="text-2xl font-medium text-green-400">100%</div>
            <div className="text-xs text-gray-500 mt-1">Enforced</div>
          </div>
          <div>
            <div className="text-xs text-gray-400 mb-1">Encryption Coverage</div>
            <div className="text-2xl font-medium text-green-400">100%</div>
            <div className="text-xs text-gray-500 mt-1">At rest + in transit</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityComplianceTracker;
