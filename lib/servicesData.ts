export const services = [
  {
    category: "OSHA General Industry Training",
    description:
      "Comprehensive OSHA-authorized training programs designed specifically for manufacturing and general industry environments.",
    items: [
      {
        slug: "osha-10-general-industry",
        title: "OSHA 10-Hour – General Industry",
        summary:
          "Entry-level safety training covering hazard recognition, PPE, machine guarding, and electrical safety. OSHA 10 card issued.",
        details: {
          format: "In-person (on-site)",
          duration: "10 hours (typically 1–2 days)",
          audience: [
            "New hires and entry-level employees",
            "General industry workers in manufacturing, warehousing, and operations",
            "Teams that need baseline OSHA awareness and safety fundamentals",
          ],
          topics: [
            "Introduction to OSHA, worker rights, and employer responsibilities",
            "Hazard recognition and incident prevention basics",
            "Personal Protective Equipment (PPE) selection and safe use",
            "Walking-working surfaces (slips, trips, and falls)",
            "Electrical safety fundamentals",
            "Machine guarding awareness and safe work practices",
            "Material handling and basic ergonomics",
            "Emergency action plans, fire safety, and reporting procedures",
          ],
          deliverables: [
            "OSHA 10-hour completion card (issued upon successful completion)",
            "Attendance and training records for compliance documentation",
            "Certificate of completion (digital or print)",
          ],
        },
      },
      {
        slug: "osha-30-general-industry",
        title: "OSHA 30-Hour – General Industry",
        summary:
          "Advanced safety training for supervisors and managers focused on OSHA standards and safety program leadership. OSHA 30 card issued.",
        details: {
          format: "In-person (on-site)",
          duration: "30 hours (typically 3–4 days)",
          audience: [
            "Supervisors and team leads",
            "Safety managers and compliance personnel",
            "Employees responsible for overseeing workplace safety programs",
          ],
          topics: [
            "In-depth review of OSHA standards for general industry (29 CFR 1910)",
            "Hazard identification, risk assessment, and mitigation strategies",
            "Safety program development and implementation",
            "Incident investigation and root cause analysis",
            "Machine guarding and electrical safety standards",
            "Lockout/Tagout (LOTO) requirements and enforcement",
            "Hazard communication and chemical safety",
            "Walking-working surfaces and fall protection requirements",
            "Recordkeeping, reporting, and OSHA inspection procedures",
            "Leadership responsibilities in maintaining a safety culture",
          ],
          deliverables: [
            "OSHA 30-hour completion card (issued upon successful completion)",
            "Attendance and training documentation for compliance records",
            "Certificate of completion (digital or print)",
          ],
        },
      },
      {
        slug: "osha-recordkeeping",
        title: "OSHA Recordkeeping & Reporting (29 CFR 1904)",
        summary:
          "Training on OSHA 300 logs, incident documentation, reporting requirements, and compliance audits.",
        details: {
          format: "In-person (on-site)",
          duration: "2–4 hours (customizable based on team size and needs)",
          audience: [
            "HR managers and compliance officers",
            "Safety managers and supervisors",
            "Administrative staff responsible for OSHA documentation",
          ],
          topics: [
            "Overview of OSHA recordkeeping requirements (29 CFR 1904)",
            "OSHA 300, 300A, and 301 forms — when and how to complete them",
            "Determining recordable vs. non-recordable incidents",
            "Privacy cases and sensitive injury reporting",
            "Severe injury and fatality reporting requirements",
            "Common recordkeeping errors and enforcement trends",
            "Preparing for OSHA inspections and documentation reviews",
            "Best practices for maintaining accurate and audit-ready records",
          ],
          deliverables: [
            "Step-by-step recordkeeping guidance materials",
            "Sample completed OSHA 300/301 documentation",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "osha-1910-standards",
        title: "OSHA Standards for General Industry (29 CFR 1910)",
        summary:
          "In-depth regulatory training explaining how OSHA standards apply to manufacturing facilities.",
        details: {
          format: "In-person (on-site)",
          duration: "4–6 hours (customizable based on scope and industry)",
          audience: [
            "Safety managers and compliance officers",
            "Operations managers and supervisors",
            "HR and administrative personnel responsible for OSHA compliance",
          ],
          topics: [
            "Overview and structure of 29 CFR 1910 (General Industry standards)",
            "Employer responsibilities under OSHA regulations",
            "Machine guarding, electrical, and walking-working surface standards",
            "Hazard communication and chemical safety requirements",
            "Lockout/Tagout (LOTO) regulatory obligations",
            "Training, documentation, and compliance requirements",
            "Common violations cited in manufacturing facilities",
            "Preparing for OSHA inspections and regulatory reviews",
          ],
          deliverables: [
            "Regulatory overview materials tailored to your industry",
            "Checklist for general industry OSHA compliance review",
            "Attendance documentation and certificate of completion",
          ],
        },
      },
    ],
  },
  {
    category: "Equipment & Operational Safety",
    description:
      "Hands-on safety training focused on machinery, equipment, and operational compliance within industrial environments.",
    items: [
      {
        slug: "forklift-certification",
        title: "Forklift / Powered Industrial Truck Certification",
        summary:
          "Operator certification, refresher courses, and train-the-trainer programs with OSHA-compliant evaluation.",
        details: {
          format: "In-person (on-site, classroom + hands-on evaluation)",
          duration: "4–6 hours for certification (customizable based on equipment and group size)",
          audience: [
            "New forklift operators requiring initial certification",
            "Experienced operators needing 3-year recertification",
            "Supervisors and trainers responsible for PIT oversight",
          ],
          topics: [
            "OSHA Powered Industrial Truck standard (29 CFR 1910.178)",
            "Types of forklifts and equipment classifications",
            "Pre-operation inspections and maintenance checks",
            "Safe operating procedures and load handling",
            "Workplace-specific hazard awareness",
            "Pedestrian safety and warehouse traffic management",
            "Refueling/recharging procedures",
            "Hands-on driving evaluation and performance assessment",
          ],
          deliverables: [
            "OSHA-compliant operator evaluation and documentation",
            "Forklift certification card (valid per OSHA requirements)",
            "Attendance records and employer documentation for audits",
          ],
        },
      },
      {
        slug: "lockout-tagout",
        title: "Lockout/Tagout (LOTO)",
        summary:
          "Energy control procedures and hands-on training to ensure safe machine shutdown and compliance.",
        details: {
          format: "In-person (on-site)",
          duration: "2–3 hours (customizable)",
          audience: [
            "Maintenance teams",
            "Operators working around energized equipment",
            "Supervisors and safety leads",
          ],
          topics: [
            "Purpose of LOTO and responsibilities",
            "Identifying hazardous energy sources",
            "Shutdown, isolation, lockout, and verification steps",
            "Group LOTO, shift changes, and affected employees",
            "Common violations and real-world scenarios",
          ],
          deliverables: [
            "Attendance records",
            "Completion certificates",
            "Site-specific Q&A and recommendations",
          ],
        },
      },
      {
        slug: "machine-guarding",
        title: "Machine Guarding & Equipment Safety",
        summary:
          "Point-of-operation hazard awareness and machine guarding compliance training.",
        details: {
          format: "In-person (on-site, classroom + equipment walk-through)",
          duration: "2–4 hours (customizable based on facility and equipment)",
          audience: [
            "Machine operators and production employees",
            "Maintenance personnel",
            "Supervisors and safety managers responsible for equipment oversight",
          ],
          topics: [
            "Overview of OSHA machine guarding requirements (29 CFR 1910 Subpart O)",
            "Point-of-operation hazards and common injury risks",
            "Types of guards: fixed, interlocked, adjustable, and self-adjusting",
            "Safeguarding methods for rotating and moving parts",
            "Lockout/Tagout coordination with guarding systems",
            "Inspection and maintenance of guarding systems",
            "Common OSHA citations related to machine guarding",
            "Conducting facility walk-through hazard assessments",
          ],
          deliverables: [
            "Machine guarding compliance checklist",
            "Guidance on corrective action and risk mitigation",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "confined-space-awareness",
        title: "Confined Space Awareness (General Industry)",
        summary:
          "Awareness training for permit and non-permit confined spaces in manufacturing environments.",
        details: {
          format: "In-person (on-site, classroom + scenario-based discussion)",
          duration: "3–4 hours (customizable based on facility risk level)",
          audience: [
            "Employees working in or around confined spaces",
            "Entry supervisors and attendants",
            "Maintenance and safety personnel",
          ],
          topics: [
            "OSHA Confined Space standard (29 CFR 1910.146)",
            "Definitions: confined space vs. permit-required confined space",
            "Atmospheric hazards (oxygen deficiency, toxic gases, flammables)",
            "Physical hazards (engulfment, mechanical, electrical, heat)",
            "Entry procedures and permit system requirements",
            "Roles and responsibilities (entrant, attendant, supervisor)",
            "Rescue planning and emergency response coordination",
            "Common violations and incident case studies",
          ],
          deliverables: [
            "Confined space awareness training documentation",
            "Permit system overview and compliance checklist",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "fall-protection-general-industry",
        title: "Fall Protection (General Industry)",
        summary:
          "Training on ladder safety, mezzanine protection, and warehouse fall hazard prevention.",
        details: {
          format: "In-person (on-site, classroom + facility walk-through)",
          duration: "2–4 hours (customizable based on facility layout)",
          audience: [
            "Warehouse and distribution employees",
            "Maintenance personnel",
            "Supervisors responsible for elevated work areas",
          ],
          topics: [
            "Overview of OSHA Walking-Working Surfaces standards (29 CFR 1910 Subpart D)",
            "Fall hazards in warehouses and manufacturing facilities",
            "Ladder safety and safe climbing practices",
            "Mezzanine, platform, and guardrail requirements",
            "Use and inspection of personal fall protection systems (PFAS)",
            "Fall hazard assessments and prevention strategies",
            "Common OSHA fall-related citations in general industry",
            "Employer responsibilities for fall protection programs",
          ],
          deliverables: [
            "Fall hazard awareness materials tailored to your facility",
            "Guidance on guardrail and ladder compliance checks",
            "Attendance documentation and certificate of completion",
          ],
        },
      },
    ],
  },
  {
    category: "Food & Manufacturing Compliance",
    description:
      "Compliance-focused training programs for food production and regulated manufacturing environments.",
    items: [
      {
        slug: "haccp-training",
        title: "HACCP Training",
        summary:
          "Hazard Analysis & Critical Control Points training focused on food manufacturing risk prevention.",
        details: {
          format: "In-person (on-site, classroom + facility-based discussion)",
          duration: "4–6 hours (customizable based on production complexity)",
          audience: [
            "Quality assurance and food safety teams",
            "Production supervisors and plant managers",
            "Employees involved in food handling and processing operations",
          ],
          topics: [
            "Principles of HACCP and preventive food safety systems",
            "Conducting hazard analysis (biological, chemical, physical hazards)",
            "Identifying and establishing Critical Control Points (CCPs)",
            "Setting critical limits and monitoring procedures",
            "Corrective actions and deviation management",
            "Verification, validation, and documentation practices",
            "Integration of HACCP with GMP and regulatory requirements",
            "Preparing for third-party audits and inspections",
          ],
          deliverables: [
            "HACCP framework overview and implementation guidance",
            "Sample hazard analysis and CCP documentation templates",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "gmp-training",
        title: "Good Manufacturing Practices (GMP)",
        summary:
          "Hygiene, workflow control, and documentation systems to maintain manufacturing compliance.",
        details: {
          format: "In-person (on-site, classroom + production area walkthrough)",
          duration: "2–4 hours (customizable based on facility type)",
          audience: [
            "Production and line employees",
            "Quality assurance personnel",
            "Supervisors and plant management",
          ],
          topics: [
            "Overview of GMP requirements and regulatory expectations",
            "Personal hygiene and employee health standards",
            "Cross-contamination prevention and workflow control",
            "Sanitation procedures and housekeeping practices",
            "Facility layout, zoning, and material flow",
            "Documentation and recordkeeping best practices",
            "Equipment cleaning and maintenance protocols",
            "Common GMP audit findings and corrective actions",
          ],
          deliverables: [
            "GMP compliance checklist tailored to your operation",
            "Employee hygiene and workflow guidance materials",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "sqf-awareness",
        title: "SQF Awareness & Audit Preparation",
        summary:
          "Safe Quality Food program overview and audit readiness preparation.",
        details: {
          format: "In-person (on-site, classroom + audit simulation discussion)",
          duration: "4–6 hours (customizable based on certification level)",
          audience: [
            "Quality assurance and food safety teams",
            "Plant managers and production supervisors",
            "Employees involved in audit preparation and documentation",
          ],
          topics: [
            "Overview of the Safe Quality Food (SQF) Code structure",
            "SQF certification levels and program requirements",
            "Management responsibility and food safety culture",
            "Documentation control and recordkeeping systems",
            "Internal audit programs and corrective action processes",
            "Risk assessment and preventive control expectations",
            "Preparing for third-party audits and auditor interviews",
            "Common non-conformances and how to address them",
          ],
          deliverables: [
            "SQF program overview materials tailored to your facility",
            "Audit readiness checklist and gap review guidance",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "brc-standards",
        title: "BRC Standards Overview",
        summary:
          "Brand Reputation Compliance training with focus on audit preparation and standards compliance.",
        details: {
          format: "In-person (on-site, classroom + audit readiness workshop)",
          duration: "4–6 hours (customizable based on facility scope)",
          audience: [
            "Quality assurance and food safety managers",
            "Operations leadership and plant managers",
            "Teams responsible for maintaining BRC certification",
          ],
          topics: [
            "Overview of BRC Global Standards framework and structure",
            "Management commitment and food safety culture requirements",
            "Risk-based hazard analysis and preventive controls",
            "Documentation control and traceability systems",
            "Internal audit processes and corrective action management",
            "Supplier approval and verification programs",
            "Preparing for BRC third-party audits",
            "Common non-conformities and scoring impacts",
          ],
          deliverables: [
            "BRC compliance overview materials tailored to your facility",
            "Audit readiness checklist and gap assessment guidance",
            "Attendance documentation and certificate of completion",
          ],
        },
      },
      {
        slug: "allergen-control",
        title: "Allergen Control Programs",
        summary:
          "Cross-contamination prevention and labeling compliance training.",
        details: {
          format: "In-person (on-site, classroom + production area discussion)",
          duration: "2–4 hours (customizable based on product complexity)",
          audience: [
            "Quality assurance and food safety teams",
            "Production and sanitation employees",
            "Supervisors responsible for labeling and changeovers",
          ],
          topics: [
            "Overview of major food allergens and regulatory requirements",
            "Allergen cross-contact risks in manufacturing environments",
            "Production scheduling and changeover controls",
            "Cleaning validation and verification procedures",
            "Labeling accuracy and ingredient declaration compliance",
            "Storage, segregation, and material handling controls",
            "Recall preparedness and traceability considerations",
            "Common allergen-related audit findings and corrective actions",
          ],
          deliverables: [
            "Allergen control program checklist",
            "Cross-contact prevention guidance materials",
            "Attendance records and certificate of completion",
          ],
        },
      },
      {
        slug: "food-defense",
        title: "Food Defense & Safety Culture",
        summary:
          "Employee awareness training focused on intentional contamination prevention and safety culture development.",
        details: {
          format: "In-person (on-site, classroom + scenario-based workshop)",
          duration: "2–4 hours (customizable based on facility risk profile)",
          audience: [
            "All food manufacturing employees",
            "Supervisors and plant leadership",
            "Food safety and quality assurance teams",
          ],
          topics: [
            "Overview of food defense principles and regulatory expectations",
            "Intentional adulteration and vulnerability awareness",
            "Access control and facility security best practices",
            "Employee reporting procedures and suspicious activity recognition",
            "Developing and maintaining a food defense plan",
            "Food safety culture and leadership responsibility",
            "Communication strategies for reinforcing accountability",
            "Common audit findings related to food defense programs",
          ],
          deliverables: [
            "Food defense awareness materials tailored to your facility",
            "Vulnerability assessment discussion framework",
            "Attendance records and certificate of completion",
          ],
        },
      },
    ],
  },
  {
    category: "Workplace Safety & Management Programs",
    description:
      "Strategic safety consulting and leadership development programs to build strong internal safety systems.",
    items: [
      {
        slug: "safety-management-systems",
        title: "Safety & Health Management Systems Development",
        summary:
          "Development of structured safety programs, committees, and KPI tracking systems.",
        details: {
          format: "In-person (on-site workshops + leadership planning sessions)",
          duration: "Half-day to multi-day engagement (customized per facility)",
          audience: [
            "Executive leadership and plant management",
            "Safety managers and compliance officers",
            "HR and operations leadership teams",
          ],
          topics: [
            "Frameworks for building effective safety management systems",
            "Establishing safety committees and defined leadership roles",
            "Setting measurable safety KPIs and performance indicators",
            "Incident reporting and corrective action tracking systems",
            "Root cause analysis processes and preventive strategies",
            "Safety communication and workforce engagement methods",
            "Regulatory compliance integration within management systems",
            "Continuous improvement and audit readiness planning",
          ],
          deliverables: [
            "Custom safety management system framework outline",
            "KPI tracking and reporting guidance",
            "Committee structure and role recommendations",
            "Engagement summary and implementation roadmap",
          ],
        },
      },
      {
        slug: "employee-safety-onboarding",
        title: "New Employee Safety Onboarding Programs",
        summary:
          "Structured safety orientation, job hazard analysis training, and workforce mentoring systems.",
        details: {
          format: "In-person (on-site workshop + onboarding framework development)",
          duration: "Half-day to full-day program design session (customizable)",
          audience: [
            "HR managers and onboarding coordinators",
            "Supervisors and department leads",
            "Safety managers responsible for workforce integration",
          ],
          topics: [
            "Designing structured safety orientation programs",
            "Job Hazard Analysis (JHA) fundamentals for new hires",
            "Standardized training documentation and recordkeeping",
            "Mentorship and buddy system development",
            "Progressive safety competency milestones",
            "Integrating OSHA compliance into onboarding workflows",
            "Tracking onboarding KPIs and performance metrics",
            "Continuous improvement of orientation programs",
          ],
          deliverables: [
            "Custom onboarding safety framework outline",
            "Sample JHA templates for role-based training",
            "Orientation checklist and documentation tools",
            "Implementation roadmap for supervisors and HR teams",
          ],
        },
      },
      {
        slug: "supervisor-safety-leadership",
        title: "Supervisor Safety Leadership Training",
        summary:
          "Coaching supervisors on corrective action processes and incident prevention strategies.",
        details: {
          format: "In-person (on-site workshop + interactive leadership exercises)",
          duration: "3–6 hours (customizable based on leadership level)",
          audience: [
            "Front-line supervisors and team leads",
            "Department managers and shift managers",
            "Emerging leaders responsible for safety oversight",
          ],
          topics: [
            "The supervisor’s role in workplace safety performance",
            "Proactive hazard recognition and intervention techniques",
            "Conducting effective safety conversations and coaching",
            "Incident response and corrective action leadership",
            "Accountability systems and performance reinforcement",
            "Leading by example to strengthen safety culture",
            "Communication strategies for workforce engagement",
            "Measuring and improving team-level safety metrics",
          ],
          deliverables: [
            "Supervisor safety leadership framework guide",
            "Corrective action process templates",
            "Safety conversation and coaching tools",
            "Attendance documentation and certificate of completion",
          ],
        },
      },
      {
        slug: "safety-audits",
        title: "Safety Audits & Gap Assessments",
        summary:
          "Facility walkthroughs and customized compliance reporting with actionable improvement plans.",
        details: {
          format: "On-site facility audit + leadership review session",
          duration: "Half-day to multi-day engagement (based on facility size)",
          audience: [
            "Plant managers and executive leadership",
            "Safety managers and compliance officers",
            "HR and operations teams responsible for regulatory oversight",
          ],
          topics: [
            "Comprehensive facility walkthrough and hazard identification",
            "Review of OSHA compliance documentation and training records",
            "Evaluation of safety management systems and policies",
            "Assessment of machine guarding, LOTO, fall protection, and PPE programs",
            "Employee interviews and safety culture observations",
            "Identification of high-risk areas and regulatory exposure",
            "Prioritization of corrective actions based on risk level",
            "Development of short-term and long-term improvement strategies",
          ],
          deliverables: [
            "Written audit report with categorized findings",
            "Compliance gap analysis and risk ranking summary",
            "Actionable corrective action roadmap",
            "Executive briefing and follow-up consultation",
          ],
        },
      },
      {
        slug: "incident-investigation",
        title: "Incident Investigation & Root Cause Analysis",
        summary:
          "Structured documentation processes and corrective action development to prevent repeat incidents.",
        details: {
          format: "In-person (on-site workshop + case study analysis)",
          duration: "3–6 hours (customizable based on complexity and team size)",
          audience: [
            "Supervisors and department managers",
            "Safety managers and compliance personnel",
            "HR and operations leadership",
          ],
          topics: [
            "Principles of effective incident investigation",
            "Immediate response and scene preservation procedures",
            "Interview techniques and fact-finding methods",
            "Root cause analysis methodologies (e.g., 5 Whys, Fishbone diagrams)",
            "Identifying systemic vs. individual contributing factors",
            "Developing corrective and preventive action plans",
            "Documentation standards and regulatory considerations",
            "Tracking corrective actions and measuring effectiveness",
          ],
          deliverables: [
            "Incident investigation template and documentation tools",
            "Root cause analysis worksheet examples",
            "Corrective action tracking framework",
            "Attendance documentation and certificate of completion",
          ],
        },
      },
    ],
  },
];

export default services;