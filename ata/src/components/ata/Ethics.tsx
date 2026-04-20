export function Ethics() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-950 to-black relative">
      {/* Background Effect */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30" />
      
      <div className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        {/* Back Button */}
        <a 
          href="/" 
          className="inline-flex items-center gap-2 text-amber-400/60 hover:text-amber-400 transition-colors font-mono text-xs mb-12 group"
        >
          <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </a>

        {/* Header */}
        <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl p-12 mb-8">
          <div className="text-4xl tracking-widest text-white font-mono mb-4">
            WXZA<span className="text-amber-400">.</span>
          </div>
          <h1 className="text-white/90 mb-2">Ethics Code</h1>
          <p className="text-white/40 font-mono text-xs">
            Last Updated: October 24, 2025 • Living Framework
          </p>
        </div>

        {/* Content */}
        <div className="relative bg-white/[0.02] backdrop-blur-sm border border-white/[0.05] rounded-3xl p-12 space-y-8">
          
          {/* Introduction */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">Preamble</h2>
            <p className="text-white/70 leading-relaxed">
              At WXZA Inc., we believe that breakthrough technologies carry profound responsibilities. As stewards 
              of innovations spanning Cognitive Systems, Quantum Computing, Molecular Engineering, and Energy 
              Paradigms, we commit to developing and deploying technologies that serve humanity's collective advancement 
              while safeguarding individual dignity, planetary health, and intergenerational equity.
            </p>
            <p className="text-white/70 leading-relaxed">
              This Ethics Code articulates the principles, frameworks, and commitments that guide our early-stage 
              technology venture concepts. It is a living document, evolving alongside our understanding of 
              technology's impact and society's needs.
            </p>
          </section>

          {/* Core Principles */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">1. Core Ethical Principles</h2>
            
            <div className="space-y-6">
              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-white/90 font-mono text-sm mb-3">1.1 Human-Centric Innovation</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Technology must enhance human capabilities, not replace human judgment. Every venture in our 
                  portfolio operates on the principle that artificial intelligence, quantum systems, and advanced 
                  technologies should augment human potential while preserving autonomy, creativity, and decision-making authority.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Preserve human agency in critical decisions</li>
                  <li>Design for human understanding and control</li>
                  <li>Prioritize human welfare over efficiency gains</li>
                  <li>Ensure meaningful human oversight of autonomous systems</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-white/90 font-mono text-sm mb-3">1.2 Transparency & Explainability</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  We commit to making our technologies understandable to those they affect. Complex systems 
                  require complex explanations, but opacity should never be a shield against accountability.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Provide clear explanations of how our technologies work</li>
                  <li>Disclose known limitations and potential failure modes</li>
                  <li>Make algorithmic decision-making processes auditable</li>
                  <li>Communicate uncertainty and confidence levels honestly</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-white/90 font-mono text-sm mb-3">1.3 Privacy & Data Sovereignty</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Personal data is personal. Individuals retain sovereignty over their information, and we serve 
                  as temporary stewards bound by strict fiduciary duties.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Minimize data collection to what's necessary</li>
                  <li>Obtain explicit, informed consent for data use</li>
                  <li>Enable data portability and deletion rights</li>
                  <li>Implement privacy-by-design in all systems</li>
                  <li>Resist surveillance capitalism models</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-white/90 font-mono text-sm mb-3">1.4 Equity & Accessibility</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Breakthrough technologies should reduce inequality, not amplify it. Our innovations must be 
                  accessible across socioeconomic, geographic, and demographic boundaries.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Design for diverse user populations and contexts</li>
                  <li>Address bias in training data and algorithms</li>
                  <li>Ensure affordability and accessibility</li>
                  <li>Consider impact on marginalized communities</li>
                  <li>Create pathways for equitable technology distribution</li>
                </ul>
              </div>

              <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6">
                <h3 className="text-white/90 font-mono text-sm mb-3">1.5 Environmental Stewardship</h3>
                <p className="text-white/70 leading-relaxed mb-4">
                  Technology development must not compromise planetary health. We acknowledge our responsibility 
                  to future generations and commit to sustainable practices across our ventures.
                </p>
                <ul className="list-disc list-inside text-white/70 space-y-2 ml-4">
                  <li>Measure and minimize carbon footprint of computation</li>
                  <li>Prioritize renewable energy for infrastructure</li>
                  <li>Design for circularity and resource efficiency</li>
                  <li>Consider full lifecycle environmental impact</li>
                  <li>Invest in technologies that address climate challenges</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Safety & Security */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">2. Safety & Security Framework</h2>
            
            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">2.1 Robust Testing & Validation</h3>
              <p className="text-white/70 leading-relaxed">
                We subject all technologies to rigorous testing before deployment, with particular scrutiny for 
                systems that could impact human safety, security, or fundamental rights. Red-teaming, adversarial 
                testing, and external audits are standard practice.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">2.2 Fail-Safe Design</h3>
              <p className="text-white/70 leading-relaxed">
                Our systems incorporate multiple layers of safety mechanisms. When autonomous systems encounter 
                uncertainty, they default to safe states and request human intervention. We design for graceful 
                degradation rather than catastrophic failure.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">2.3 Security-First Architecture</h3>
              <p className="text-white/70 leading-relaxed">
                Security is embedded at the architectural level, not added as an afterthought. We follow 
                zero-trust principles, implement defense-in-depth strategies, and maintain continuous security 
                monitoring across our portfolio.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">2.4 Responsible Disclosure</h3>
              <p className="text-white/70 leading-relaxed">
                When vulnerabilities are discovered, we commit to rapid response, transparent communication, 
                and coordinated disclosure. We maintain responsible disclosure policies and work collaboratively 
                with security researchers.
              </p>
            </div>
          </section>

          {/* Research Ethics */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">3. Research & Development Ethics</h2>
            
            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">3.1 Open Science Commitment</h3>
              <p className="text-white/70 leading-relaxed">
                We believe in contributing to the scientific commons. When possible, we publish research findings, 
                share datasets (with appropriate privacy protections), and release open-source tools to accelerate 
                collective progress.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">3.2 Research Integrity</h3>
              <p className="text-white/70 leading-relaxed">
                Scientific honesty is non-negotiable. We maintain rigorous standards for reproducibility, resist 
                publication bias, acknowledge limitations, and correct errors promptly.
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                <li>Maintain detailed documentation and version control</li>
                <li>Share negative results to prevent duplicated failures</li>
                <li>Acknowledge all contributors appropriately</li>
                <li>Avoid cherry-picking favorable results</li>
                <li>Submit to peer review and external validation</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">3.3 Dual-Use Considerations</h3>
              <p className="text-white/70 leading-relaxed">
                We actively assess potential dual-use implications of our research. Technologies with military, 
                surveillance, or harmful applications require special scrutiny, additional safeguards, and in 
                some cases, decisions not to proceed.
              </p>
            </div>
          </section>

          {/* Governance */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">4. Governance & Accountability</h2>
            
            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">4.1 Ethics Review Board</h3>
              <p className="text-white/70 leading-relaxed">
                Major technological decisions undergo review by our Ethics Board, composed of internal experts 
                and external advisors representing diverse perspectives including ethicists, social scientists, 
                affected community representatives, and technical specialists.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">4.2 Impact Assessments</h3>
              <p className="text-white/70 leading-relaxed">
                We conduct comprehensive impact assessments for significant deployments, examining potential 
                effects across multiple dimensions:
              </p>
              <ul className="list-disc list-inside text-white/70 space-y-2 ml-4 mt-3">
                <li>Social and cultural impact</li>
                <li>Economic and employment effects</li>
                <li>Environmental consequences</li>
                <li>Privacy and civil liberties implications</li>
                <li>Equity and accessibility considerations</li>
                <li>Long-term systemic effects</li>
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">4.3 Stakeholder Engagement</h3>
              <p className="text-white/70 leading-relaxed">
                We engage meaningfully with stakeholders—including users, affected communities, regulators, 
                civil society organizations, and domain experts—throughout the development lifecycle, not just 
                at launch.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">4.4 Continuous Monitoring</h3>
              <p className="text-white/70 leading-relaxed">
                Deployment is not the end of our ethical responsibility. We maintain ongoing monitoring systems 
                to detect unintended consequences, emerging risks, and misuse patterns, with mechanisms to 
                intervene when necessary.
              </p>
            </div>
          </section>

          {/* Venture-Specific Commitments */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">5. Domain-Specific Commitments</h2>
            
            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 space-y-4">
              <div>
                <h3 className="text-white/90 font-mono text-sm mb-2">Cognitive Systems & AI</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  We commit to developing AI systems that are interpretable, auditable, and aligned with human 
                  values. We actively work to mitigate bias, prevent manipulation, and ensure AI augments rather 
                  than replaces human judgment in critical decisions.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-mono text-sm mb-2">Quantum Computing</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Quantum technologies pose unique challenges for cryptography and security. We prioritize 
                  post-quantum cryptography development, responsible disclosure of vulnerabilities, and 
                  equitable access to quantum capabilities.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-mono text-sm mb-2">Molecular Engineering & Biotechnology</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Biotechnologies require special care given potential biosafety and biosecurity implications. 
                  We adhere to international biosafety protocols, conduct thorough risk assessments, and 
                  maintain containment protocols for experimental work.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-mono text-sm mb-2">Energy Systems</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Energy innovations must prioritize sustainability, grid stability, and equitable access. 
                  We commit to lifecycle analysis of energy solutions and transparent reporting of environmental impact.
                </p>
              </div>

              <div>
                <h3 className="text-white/90 font-mono text-sm mb-2">Augmented Reality & Mixed Reality</h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  AR/MR technologies affect perception and cognition. We design with awareness of psychological 
                  effects, addiction potential, privacy implications of persistent sensing, and the importance 
                  of maintaining connection to physical reality.
                </p>
              </div>
            </div>
          </section>

          {/* Enforcement */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">6. Enforcement & Compliance</h2>
            
            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">6.1 Binding Commitments</h3>
              <p className="text-white/70 leading-relaxed">
                This Ethics Code is not aspirational language—it represents binding commitments incorporated 
                into employment agreements, vendor contracts, and partnership terms throughout our portfolio.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">6.2 Reporting Mechanisms</h3>
              <p className="text-white/70 leading-relaxed">
                We maintain confidential channels for reporting ethical concerns, with protections for 
                whistleblowers and guarantees of investigation. Ethics violations are treated with the same 
                seriousness as financial or legal violations.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">6.3 Consequences</h3>
              <p className="text-white/70 leading-relaxed">
                Violations of this Code result in proportionate consequences ranging from corrective action 
                plans to project termination to employment termination, depending on severity and intent.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-white/90 font-mono text-sm">6.4 Public Accountability</h3>
              <p className="text-white/70 leading-relaxed">
                We commit to publishing annual ethics reports detailing our adherence to these principles, 
                challenges encountered, and improvements made. Transparency builds trust and enables external accountability.
              </p>
            </div>
          </section>

          {/* Living Document */}
          <section className="space-y-4">
            <h2 className="text-amber-400 font-mono text-xs uppercase tracking-widest">7. Evolution of This Code</h2>
            
            <p className="text-white/70 leading-relaxed">
              Technology evolves, and so must our ethical frameworks. This Code is reviewed annually and 
              updated as we learn from experience, engage with stakeholders, and encounter new ethical challenges.
            </p>

            <p className="text-white/70 leading-relaxed">
              We welcome input from the broader community. If you have suggestions for improving this Ethics 
              Code or questions about its application, please contact us through our{' '}
              <a href="/#contact" className="text-amber-400 hover:underline">contact form</a>.
            </p>

            <div className="bg-white/[0.03] border border-white/[0.05] rounded-2xl p-6 mt-6">
              <div className="text-amber-400 font-mono text-xs mb-3">VERSION HISTORY</div>
              <div className="space-y-2 text-sm text-white/70">
                <div className="flex items-start justify-between">
                  <span>Version 1.0</span>
                  <span className="text-white/40">October 24, 2025</span>
                </div>
                <div className="text-white/50 text-xs">
                  Initial publication of WXZA Inc. Ethics Code
                </div>
              </div>
            </div>
          </section>

          {/* Closing Statement */}
          <section className="space-y-4 pt-8 border-t border-white/[0.05]">
            <p className="text-white/70 leading-relaxed italic">
              "If two opposites can be right, how many opposites can be at the same time? This question 
              drives our ethical framework. We carry forward the responsibility to ensure that technological 
              progress—built from the synthesis of paradoxes—serves humanity's highest aspirations while 
              defining value that guards against our darkest risks."
            </p>
            <p className="text-white/90 font-mono text-sm">
              — WXZA Inc. Leadership Team
            </p>
          </section>
        </div>

        {/* Footer Links */}
        <div className="mt-12 flex flex-wrap gap-6 justify-center text-center">
          <a href="/privacy" className="text-amber-400/60 hover:text-amber-400 transition-colors font-mono text-xs">
            Privacy Policy
          </a>
          <span className="text-white/20">•</span>
          <a href="/terms" className="text-amber-400/60 hover:text-amber-400 transition-colors font-mono text-xs">
            Terms of Service
          </a>
          <span className="text-white/20">•</span>
          <a href="/#contact" className="text-amber-400/60 hover:text-amber-400 transition-colors font-mono text-xs">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}