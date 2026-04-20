import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { 
  Shield, Lock, Key, FileCheck, AlertTriangle, CheckCircle,
  Clock, Eye, FileText, Download, Award, ChevronRight,
  Database, Server, Cloud, Users, Activity, Zap
} from "lucide-react";

interface SecurityComplianceTrackerProps {
  deviceView: 'desktop' | 'tablet' | 'mobile';
}

export function SecurityComplianceTracker({ deviceView }: SecurityComplianceTrackerProps) {
  const [selectedFramework, setSelectedFramework] = useState<string | null>("soc2");
  const [selectedControl, setSelectedControl] = useState<string | null>(null);
  
  const isMobile = deviceView === 'mobile';

  const frameworks = [
    {
      id: "soc2",
      name: "SOC 2 Type II",
      icon: Award,
      status: "certified",
      color: "from-green-500 to-emerald-500",
      compliance: 100,
      lastAudit: "August 2025",
      nextAudit: "August 2026",
      auditor: "Deloitte",
      controls: 67,
      findings: 0,
      description: "Service Organization Control 2 - Trust Services Criteria"
    },
    {
      id: "iso27001",
      name: "ISO 27001:2022",
      icon: Shield,
      status: "certified",
      color: "from-blue-500 to-cyan-500",
      compliance: 100,
      lastAudit: "June 2025",
      nextAudit: "June 2026",
      auditor: "BSI Group",
      controls: 114,
      findings: 0,
      description: "Information Security Management System"
    },
    {
      id: "gdpr",
      name: "GDPR",
      icon: Lock,
      status: "compliant",
      color: "from-purple-500 to-pink-500",
      compliance: 100,
      lastReview: "January 2025",
      nextReview: "Ongoing",
      auditor: "Internal + Legal",
      controls: 42,
      findings: 0,
      description: "General Data Protection Regulation (EU)"
    },
    {
      id: "ccpa",
      name: "CCPA",
      icon: FileCheck,
      status: "compliant",
      color: "from-yellow-500 to-orange-500",
      compliance: 100,
      lastReview: "March 2025",
      nextReview: "Ongoing",
      auditor: "Internal + Legal",
      controls: 28,
      findings: 0,
      description: "California Consumer Privacy Act"
    },
    {
      id: "pci-dss",
      name: "PCI DSS",
      icon: Key,
      status: "certified",
      color: "from-indigo-500 to-purple-500",
      compliance: 100,
      lastAudit: "May 2025",
      nextAudit: "May 2026",
      auditor: "QSA Approved",
      controls: 12,
      findings: 0,
      description: "Payment Card Industry Data Security Standard"
    },
    {
      id: "hipaa",
      name: "HIPAA",
      icon: Shield,
      status: "in-progress",
      color: "from-cyan-500 to-blue-500",
      compliance: 78,
      targetDate: "Q2 2026",
      auditor: "TBD",
      controls: 45,
      findings: 8,
      description: "Health Insurance Portability and Accountability Act"
    }
  ];

  const soc2Controls = [
    {
      id: "CC6.1",
      name: "Logical and Physical Access Controls",
      category: "Access Control",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "AWS IAM policies audit log",
        "MFA enforcement screenshots",
        "Badge access logs (data center)"
      ],
      implementation: "AWS IAM + Okta SSO + MFA + Badge access",
      effectiveness: 100,
      risk: "low"
    },
    {
      id: "CC6.6",
      name: "Logical Access Removal",
      category: "Access Control",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "Okta deprovisioning logs",
        "Exit checklist template",
        "Automated account suspension workflow"
      ],
      implementation: "Automated deprovisioning via Okta (triggered on termination)",
      effectiveness: 100,
      risk: "low"
    },
    {
      id: "CC6.7",
      name: "Audit Logs Reviewed",
      category: "Monitoring",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "SIEM alert configuration",
        "Weekly review sign-off sheets",
        "Incident response runbook"
      ],
      implementation: "Splunk SIEM + weekly security team reviews",
      effectiveness: 100,
      risk: "low"
    },
    {
      id: "CC7.2",
      name: "System Monitoring for Anomalies",
      category: "Monitoring",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "Prometheus alert rules",
        "PagerDuty incident history",
        "Runbook documentation"
      ],
      implementation: "Prometheus + Grafana + PagerDuty",
      effectiveness: 98,
      risk: "low"
    },
    {
      id: "CC8.1",
      name: "Change Management Process",
      category: "Change Management",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "GitHub PR approval logs",
        "ArgoCD deployment history",
        "Change advisory board meeting notes"
      ],
      implementation: "GitHub + ArgoCD + CAB approval for prod changes",
      effectiveness: 100,
      risk: "low"
    },
    {
      id: "A1.2",
      name: "Availability Monitoring and Response",
      category: "Availability",
      status: "implemented",
      lastTested: "November 2025",
      evidence: [
        "Uptime reports (99.97% YTD)",
        "Incident response logs",
        "SLA documentation"
      ],
      implementation: "Multi-region deployment + health checks + auto-failover",
      effectiveness: 99.97,
      risk: "low"
    }
  ];

  const securityMetrics = [
    {
      label: "Security Incidents (12mo)",
      value: "0",
      unit: "critical",
      target: "<5",
      status: "excellent",
      icon: Shield,
      color: "text-green-400"
    },
    {
      label: "Vulnerability Patching",
      value: "99.8%",
      unit: "within 7 days",
      target: ">95%",
      status: "excellent",
      icon: Activity,
      color: "text-green-400"
    },
    {
      label: "MFA Adoption",
      value: "100%",
      unit: "enforced",
      target: ">95%",
      status: "excellent",
      icon: Lock,
      color: "text-green-400"
    },
    {
      label: "Mean Time to Detect",
      value: "4.2",
      unit: "minutes",
      target: "<15min",
      status: "excellent",
      icon: Clock,
      color: "text-green-400"
    },
    {
      label: "Mean Time to Respond",
      value: "18",
      unit: "minutes",
      target: "<60min",
      status: "excellent",
      icon: Zap,
      color: "text-green-400"
    },
    {
      label: "Encryption Coverage",
      value: "100%",
      unit: "at rest + in transit",
      target: "100%",
      status: "excellent",
      icon: Key,
      color: "text-green-400"
    }
  ];

  const auditTrail = [
    {
      date: "2025-11-28 14:32:18",
      user: "admin@pros.io",
      action: "Control CC6.1 tested and passed",
      category: "Compliance Testing",
      severity: "info"
    },
    {
      date: "2025-11-27 09:15:42",
      user: "security@pros.io",
      action: "SOC 2 control evidence uploaded (Q4 2025)",
      category: "Evidence Collection",
      severity: "info"
    },
    {
      date: "2025-11-26 16:45:00",
      user: "system",
      action: "Automated vulnerability scan completed (0 critical, 3 medium)",
      category: "Security Scanning",
      severity: "success"
    },
    {
      date: "2025-11-25 11:20:33",
      user: "admin@pros.io",
      action: "GDPR data retention policy updated",
      category: "Policy Update",
      severity: "info"
    }
  ];

  const selectedFrameworkData = frameworks.find(f => f.id === selectedFramework);
  const controlData = selectedFramework === 'soc2' ? soc2Controls : [];

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
            <Shield className="w-8 h-8 text-green-400" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">Security & Compliance</h2>
            <p className="text-sm text-gray-400">Compliance frameworks · Security controls · Audit trails</p>
          </div>
        </div>

        {/* Overall Status */}
        <Card className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl border-green-500/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-green-400" />
                <div>
                  <p className="font-semibold text-white">Full Compliance Achieved</p>
                  <p className="text-xs text-gray-400">5 active certifications · 0 critical findings · Next audit: May 2026</p>
                </div>
              </div>
              <div className="flex gap-2">
                {frameworks.filter(f => f.status === 'certified').slice(0, 3).map((f, idx) => (
                  <Badge key={idx} className={`bg-gradient-to-r ${f.color} bg-opacity-20 text-white border-0`}>
                    {f.name.split(' ')[0]}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {securityMetrics.map((metric, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Card className="bg-white/5 backdrop-blur-xl border-white/10">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                  <CheckCircle className="w-3 h-3 text-green-400 ml-auto" />
                </div>
                <p className={`text-2xl font-bold ${metric.color}`}>{metric.value}</p>
                <p className="text-xs text-gray-400 mt-1">{metric.label}</p>
                <p className="text-xs text-gray-500 mt-1">{metric.unit}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {frameworks.map((framework, idx) => (
          <motion.div
            key={framework.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            onClick={() => setSelectedFramework(selectedFramework === framework.id ? null : framework.id)}
            className="cursor-pointer"
          >
            <Card className={`bg-white/5 backdrop-blur-xl border transition-all ${
              selectedFramework === framework.id
                ? 'border-purple-500 ring-2 ring-purple-500/50'
                : 'border-white/10 hover:border-white/30'
            }`}>
              <CardHeader className={`bg-gradient-to-r ${framework.color} bg-opacity-20 p-4`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${framework.color} bg-opacity-20`}>
                      <framework.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-white">{framework.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{framework.description}</p>
                    </div>
                  </div>
                  <Badge className={`${
                    framework.status === 'certified' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    framework.status === 'compliant' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                  }`}>
                    {framework.status === 'certified' ? '✓ Certified' :
                     framework.status === 'compliant' ? '✓ Compliant' :
                     'In Progress'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                {/* Compliance Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-400">Compliance</span>
                    <span className="text-sm font-semibold text-white">{framework.compliance}%</span>
                  </div>
                  <div className="h-2 bg-black/30 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${framework.compliance}%` }}
                      className={`h-full bg-gradient-to-r ${framework.color}`}
                      transition={{ duration: 0.8, delay: idx * 0.1 }}
                    />
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className="text-lg font-bold text-white">{framework.controls}</p>
                    <p className="text-xs text-gray-400">Controls</p>
                  </div>
                  <div className="text-center p-2 bg-white/5 rounded-lg">
                    <p className={`text-lg font-bold ${framework.findings === 0 ? 'text-green-400' : 'text-yellow-400'}`}>
                      {framework.findings}
                    </p>
                    <p className="text-xs text-gray-400">Findings</p>
                  </div>
                </div>

                {/* Audit Info */}
                <div className="mt-3 pt-3 border-t border-white/10 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Auditor</span>
                    <span className="text-white">{framework.auditor}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Audit</span>
                    <span className="text-white">{framework.lastAudit || framework.lastReview || '-'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Next Audit</span>
                    <span className="text-white">{framework.nextAudit || framework.nextReview || framework.targetDate || '-'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Control Details (SOC 2) */}
      <AnimatePresence mode="wait">
        {selectedFramework === 'soc2' && (
          <motion.div
            key="controls"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Card className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border-purple-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-white">
                  <FileCheck className="w-5 h-5 text-purple-400" />
                  SOC 2 Type II Controls
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {controlData.map((control, idx) => (
                  <motion.div
                    key={control.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    onClick={() => setSelectedControl(selectedControl === control.id ? null : control.id)}
                    className="cursor-pointer"
                  >
                    <Card className={`bg-white/5 backdrop-blur-xl border transition-all ${
                      selectedControl === control.id
                        ? 'border-purple-500'
                        : 'border-white/10 hover:border-white/30'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30">
                                {control.id}
                              </Badge>
                              <p className="font-semibold text-white text-sm">{control.name}</p>
                              <CheckCircle className="w-4 h-4 text-green-400 ml-auto" />
                            </div>
                            <p className="text-xs text-gray-400 mb-2">{control.category}</p>
                            
                            {/* Progress */}
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 bg-black/30 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                  style={{ width: `${control.effectiveness}%` }}
                                />
                              </div>
                              <span className="text-xs text-green-400 font-semibold">{control.effectiveness}%</span>
                            </div>
                          </div>
                          <ChevronRight className={`w-5 h-5 text-gray-400 ml-4 transition-transform ${
                            selectedControl === control.id ? 'rotate-90' : ''
                          }`} />
                        </div>

                        {/* Expanded Details */}
                        <AnimatePresence mode="wait">
                          {selectedControl === control.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 pt-4 border-t border-white/10 space-y-3"
                            >
                              <div>
                                <p className="text-xs text-gray-400 mb-1">Implementation</p>
                                <p className="text-xs text-white">{control.implementation}</p>
                              </div>

                              <div>
                                <p className="text-xs text-gray-400 mb-2">Evidence</p>
                                <div className="space-y-1">
                                  {control.evidence.map((evidence, eIdx) => (
                                    <div key={eIdx} className="flex items-center gap-2 text-xs">
                                      <FileText className="w-3 h-3 text-purple-400" />
                                      <span className="text-gray-300">{evidence}</span>
                                      <Button size="sm" variant="ghost" className="ml-auto">
                                        <Eye className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              <div className="flex items-center gap-4 text-xs">
                                <div>
                                  <span className="text-gray-400">Last Tested: </span>
                                  <span className="text-white">{control.lastTested}</span>
                                </div>
                                <div>
                                  <span className="text-gray-400">Risk Level: </span>
                                  <Badge className={`${
                                    control.risk === 'low' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                                    'bg-yellow-500/20 text-yellow-300 border-yellow-500/30'
                                  } text-xs`}>
                                    {control.risk}
                                  </Badge>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Audit Trail */}
      <Card className="bg-white/5 backdrop-blur-xl border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Audit Trail
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {auditTrail.map((entry, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-start gap-3 p-3 bg-white/5 rounded-lg border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-cyan-400 mt-2" />
                <div className="flex-1">
                  <p className="text-sm text-white">{entry.action}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-gray-400">{entry.date}</span>
                    <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 text-xs">
                      {entry.category}
                    </Badge>
                    <span className="text-xs text-gray-400">{entry.user}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
