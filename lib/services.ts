export type TextPart = string | { text: string; href: string };

export type Paragraph = readonly TextPart[];

export type ServiceLayout =
  | "stack"
  | "caution"
  | "contrast"
  | "connect"
  | "review"
  | "path"
  | "operations";

export type ServiceItem = {
  title: string;
  body: string;
};

export type ServiceWork = {
  slug: string;
  note: string;
};

export type ServicePage = {
  slug: string;
  number: string;
  name: string;
  hubSummary: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: readonly Paragraph[];
  definition: {
    question: string;
    answer: readonly Paragraph[];
  };
  problemsHeading: string;
  problems: readonly ServiceItem[];
  buildsHeading: string;
  buildsIntro?: string;
  builds: readonly ServiceItem[];
  approachHeading: string;
  approach: readonly ServiceItem[];
  useCasesHeading: string;
  useCases: readonly ServiceItem[];
  aside?: {
    heading: string;
    body: readonly Paragraph[];
    columns?: readonly { title: string; points: readonly string[] }[];
  };
  relatedServices: readonly string[];
  relatedWork: readonly ServiceWork[];
  faq: readonly { question: string; answer: string }[];
  layout: ServiceLayout;
};

export function servicePath(slug: string) {
  return `/services/${slug}`;
}

export const services: readonly ServicePage[] = [
  {
    slug: "custom-software-development",
    number: "01",
    name: "Custom Software Development",
    hubSummary:
      "Purpose-built software designed around workflows, operations, customers, and teams when off-the-shelf products do not fit.",
    metaTitle: "Custom Software Development | SystemArc",
    metaDescription:
      "SystemArc designs and develops custom software around your business workflows, operations, customers, teams, and existing technology.",
    eyebrow: "Custom software",
    headline: "Custom software built around your business.",
    layout: "stack",
    intro: [
      [
        "Off-the-shelf software works when your operation fits the assumptions built into the product.",
      ],
      [
        "When it does not, businesses often compensate with spreadsheets, manual processes, duplicate data entry, workarounds, and disconnected tools.",
      ],
      ["SystemArc builds software around the operation instead."],
    ],
    definition: {
      question: "What is custom software development?",
      answer: [
        [
          "Custom software development is the process of designing and building software for the specific requirements, workflows, users, and systems of a particular business rather than relying entirely on an off-the-shelf product.",
        ],
      ],
    },
    problemsHeading: "Problems custom software is meant to solve",
    problems: [
      {
        title: "Software that almost fits",
        body: "The product covers most of a job, and the rest is handled in files, messages, and memory.",
      },
      {
        title: "Disconnected business systems",
        body: "Each tool holds part of the record, and no one system is responsible for the whole workflow.",
      },
      {
        title: "Spreadsheet-dependent operations",
        body: "A spreadsheet has become the real system because nothing else matches the way the work moves.",
      },
      {
        title: "Manual administrative processes",
        body: "People retype, reconcile, and chase information that the operation already produced somewhere else.",
      },
      {
        title: "Unique business workflows",
        body: "The sequence of tasks, approvals, or exceptions is specific enough that a generic product keeps forcing a compromise.",
      },
      {
        title: "Legacy systems",
        body: "An older system still holds the work, but it is difficult to change or to connect to anything the business needs now.",
      },
      {
        title: "Missing customer or employee tools",
        body: "Customers or staff have no proper place to see status, make a request, or complete their part of the job.",
      },
    ],
    buildsHeading: "What SystemArc can build",
    builds: [
      {
        title: "Operational platforms",
        body: "A home for the work itself, not only a record of it after the fact.",
      },
      {
        title: "Custom business applications",
        body: "Software shaped around one company's customers, team, and rules.",
      },
      {
        title: "Workflow systems",
        body: "Software that follows a real sequence of tasks, handoffs, and exceptions.",
      },
      {
        title: "Customer portals",
        body: "A place for customers to see what is theirs and ask for what they need.",
      },
      {
        title: "Internal systems",
        body: "Tools for the people running the operation day to day.",
      },
      {
        title: "Dashboards",
        body: "A clear view of the work already in progress, not a separate reporting project.",
      },
      {
        title: "Administrative tools",
        body: "Screens for the setup, exceptions, and corrections a business actually performs.",
      },
      {
        title: "Industry-specific software",
        body: "Applications that use the language and constraints of the operation, rather than a generic template.",
      },
      {
        title: "Data systems",
        body: "A reliable place for the information the workflow depends on.",
      },
      {
        title: "API-connected applications",
        body: "New software that works with the systems the company already uses.",
      },
    ],
    approachHeading: "How a custom software project proceeds",
    approach: [
      {
        title: "Discovery",
        body: "Learn the workflow, the people, the current tools, and the outcome the software has to produce before deciding what to build.",
      },
      {
        title: "Architecture",
        body: "Define the system, the data, the integrations, and the boundaries of the first release.",
      },
      {
        title: "Build",
        body: "Design and develop the software in phases that can be reviewed against the operation, not only against a specification.",
      },
      {
        title: "Launch & Support",
        body: "Put the system into real use, watch where it differs from the work, and keep improving it.",
      },
    ],
    useCasesHeading: "When custom software is the right conversation",
    useCases: [
      {
        title: "The workaround is now the process",
        body: "People can describe the real steps only by explaining what they do outside the official software.",
      },
      {
        title: "Customers and staff see different versions of the truth",
        body: "Status, history, or next steps depend on who is asked, because the information has no single home.",
      },
      {
        title: "A product would have to be heavily bent",
        body: "Making an off-the-shelf system fit would cost more in process change than building the missing piece.",
      },
    ],
    aside: {
      heading: "Build the system. Keep what already works.",
      body: [
        [
          "Custom software does not have to replace every tool. It often becomes the place where the operation is coordinated, while payments, accounting, or communication stay where they are.",
        ],
        [
          "That is why this work sits next to ",
          { text: "web application development", href: "/services/web-application-development" },
          ", ",
          { text: "customer portals", href: "/services/customer-portal-development" },
          ", and ",
          { text: "internal tools", href: "/services/internal-tools-development" },
          ".",
        ],
      ],
    },
    relatedServices: [
      "web-application-development",
      "customer-portal-development",
      "internal-tools-development",
    ],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "is a SystemArc platform for structured customer feedback and reputation workflows. It was built because follow-up depended on disconnected manual work, not because a generic review tool matched the operation.",
      },
      {
        slug: "repairforge",
        note: "is a SystemArc platform for repair workflow and customer communication. The repair is the record. Customers and the shop see different views of that same job.",
      },
      {
        slug: "pixelnation-systems",
        note: "are custom operational systems built around a gaming and technology retail business: communities, check-in, support points, events, and the work those activities require. They sit alongside transaction software.",
      },
    ],
    faq: [
      {
        question: "How do I know if my business needs custom software?",
        answer:
          "Look at the work people do around the current software. If a normal job requires a spreadsheet, a copied step, or a rule the product cannot represent, the operation has outgrown a generic tool. Custom software is worth considering when that workaround is regular and specific to how the business runs. It is the wrong first step when the process itself is still unclear.",
      },
      {
        question: "Should I automate a process or build custom software?",
        answer:
          "Automate when the work is already understood and the missing piece is moving information or triggering a step. Build software when the business needs a place for the work itself: the record, the decisions, and the people. Many systems need both. SystemArc separates those before proposing either.",
      },
      {
        question: "Can SystemArc integrate software we already use?",
        answer:
          "Yes. A custom system often has to read from and write to the tools a company already pays for. The integration is part of the design, not an afterthought, so people are not left copying information into the new software.",
      },
      {
        question: "Can you replace spreadsheets with a custom system?",
        answer:
          "When a spreadsheet is acting as the system of record, it can often be replaced by software that keeps the same rules and makes the handoffs explicit. The first job is to understand which parts of the sheet are data, which are process, and which are one-off notes.",
      },
      {
        question: "How much does custom software cost?",
        answer:
          "SystemArc does not publish a standard price. Scope depends on the requirements, the integrations, the complexity of the workflow, who uses the system, the data it has to handle, the security requirements, and how the work is phased. A conversation about the operation comes before a proposal.",
      },
    ],
  },
  {
    slug: "business-process-automation",
    number: "02",
    name: "Business Process Automation",
    hubSummary:
      "Automate repetitive work, data movement, notifications, handoffs, approvals, and administrative processes.",
    metaTitle: "Business Process Automation | SystemArc",
    metaDescription:
      "SystemArc automates repetitive business processes, handoffs, data movement, notifications, approvals, and workflows across the tools your company uses.",
    eyebrow: "Automation",
    headline: "Stop paying people to move information between systems.",
    layout: "caution",
    intro: [
      [
        "A large amount of office work is not judgment. It is copying a status, sending the same notice, routing a request, or checking that one system matches another.",
      ],
      [
        "Automation should remove that mechanical work. It should not hide a broken process behind a faster version of the same failure.",
      ],
    ],
    definition: {
      question: "What is business process automation?",
      answer: [
        [
          "Business process automation is software that carries a defined step from one part of the operation to the next: moving data, notifying a person, updating a status, or collecting an approval, without someone retyping the same information.",
        ],
      ],
    },
    problemsHeading: "Repetitive work automation can take off a team",
    problems: [
      {
        title: "Repeated data entry",
        body: "The same customer, job, or order is typed into more than one system.",
      },
      {
        title: "Manual status updates",
        body: "Someone has to remember to change a status so the next person knows the work moved.",
      },
      {
        title: "Email-based handoffs",
        body: "The process advances only when a message is seen, forwarded, and interpreted.",
      },
      {
        title: "Copying information between systems",
        body: "People are the integration, moving fields from one product to another by hand.",
      },
      {
        title: "Manual notifications",
        body: "Customers or teammates wait because a notice depends on someone remembering to send it.",
      },
      {
        title: "Approval bottlenecks",
        body: "A request sits until the right person is chased, even though the rule for approval is already known.",
      },
      {
        title: "Repetitive administrative work",
        body: "Skilled people spend the day on steps that do not require their judgment.",
      },
      {
        title: "Disconnected workflows",
        body: "Each tool completes its own task, and the sequence between them is informal.",
      },
    ],
    buildsHeading: "What SystemArc automates",
    buildsIntro:
      "The list is the mechanical layer of an operation. If a step requires a decision the business has not defined, it stays with a person.",
    builds: [
      { title: "Data movement", body: "Fields travel from the system that created them to the system that needs them." },
      { title: "Notifications", body: "The right person hears about a change because the change happened, not because someone remembered." },
      { title: "Status changes", body: "A record moves forward when the condition for the next state is actually met." },
      { title: "Approvals", body: "A request is routed to the person who is allowed to decide, with the information they need." },
      { title: "Document workflows", body: "A file is requested, received, stored, and attached to the work it belongs to." },
      { title: "Lead routing", body: "An inquiry reaches the right queue instead of a shared inbox." },
      { title: "Customer follow-up", body: "A known next step with a customer happens without a manual reminder list." },
      { title: "Internal handoffs", body: "Work passes between roles with the context the next person needs." },
      { title: "Reporting workflows", body: "A recurring report is assembled from the systems that already hold the numbers." },
      { title: "Cross-platform processes", body: "A single business step is allowed to touch more than one product." },
    ],
    approachHeading: "How SystemArc approaches automation",
    approach: [
      {
        title: "Watch the work",
        body: "Follow one real item through the process, including the exceptions, before drawing a happy-path diagram.",
      },
      {
        title: "Separate judgment from motion",
        body: "Mark the steps a person must decide and the steps that are only transport, formatting, or notification.",
      },
      {
        title: "Automate the mechanical steps",
        body: "Connect the systems and make the handoff visible, including what happens when a step fails.",
      },
      {
        title: "Leave a trail",
        body: "Someone should be able to see what ran, what waited, and what needs a person.",
      },
    ],
    useCasesHeading: "Automation is a fit when the step is already defined",
    useCases: [
      {
        title: "A status changes in one place and must appear in another",
        body: "The rule is stable. The delay is the person who copies it.",
      },
      {
        title: "Follow-up depends on a calendar and a memory",
        body: "The next message is known at the moment the previous step finishes.",
      },
      {
        title: "Approvals have a real rule",
        body: "The business can say who decides, on what information, and what happens after a yes or a no.",
      },
    ],
    aside: {
      heading: "When automation is the wrong move",
      body: [
        [
          "Do not automate a process that is different every time, or a decision the business has not actually defined. Automating that only makes the confusion faster and harder to see.",
        ],
        [
          "Automation is also the wrong project when the volume is too low to matter, when the source data is unreliable, or when the real fix is to change the process before any software is introduced.",
        ],
        [
          "Where the systems themselves need to talk, the work continues into ",
          { text: "software integrations", href: "/services/software-integrations" },
          ". Where a defined task can be assisted by a model, it may continue into ",
          { text: "AI automation", href: "/services/ai-automation" },
          ". AI is not a default part of an automation project.",
        ],
      ],
    },
    relatedServices: ["software-integrations", "ai-automation"],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "includes review workflows that structure customer follow-up instead of leaving it as a manual, disconnected task. The platform is the system. The workflow is the automation.",
      },
      {
        slug: "repairforge",
        note: "keeps repair status, communication, and the next step on one workflow, so the shop is working from the job instead of reconciling disconnected notes.",
      },
      {
        slug: "pixelnation-systems",
        note: "include a check-in path that connects a visit to a community, participation, and Support Points.",
      },
    ],
    faq: [
      {
        question: "Does every automation project need AI?",
        answer:
          "No. Most repetitive business steps are rules: when this changes, update that, or notify this person. A model is useful only when the step requires interpretation, such as reading an unstructured document. Adding AI to a rule-based handoff does not make the handoff better.",
      },
      {
        question: "Should we automate a messy process?",
        answer:
          "Not until the messy part is understood. If people cannot agree on the steps, the exceptions, or what a finished item looks like, automation will preserve the disagreement. Map the work first. Then automate the parts that are stable.",
      },
      {
        question: "Can SystemArc automate work between tools we already use?",
        answer:
          "Yes. That is the usual shape of this work. The systems stay. The copying, the missed status change, and the inbox handoff are what get replaced.",
      },
      {
        question: "How is automation different from custom software?",
        answer:
          "Automation moves a defined step between systems or people. Custom software is a place where the work itself lives. If there is nowhere for the work to live, automation alone will not create it.",
      },
    ],
  },
  {
    slug: "web-application-development",
    number: "03",
    name: "Web Application Development",
    hubSummary:
      "Secure, modern web applications for customers, employees, partners, and business operations.",
    metaTitle: "Web Application Development | SystemArc",
    metaDescription:
      "SystemArc builds modern web applications, operational platforms, dashboards, portals, and browser-based software around real business requirements.",
    eyebrow: "Web applications",
    headline: "Web applications designed for real operations.",
    layout: "contrast",
    intro: [
      [
        "SystemArc builds software that people use in a browser. The application is where work happens: someone signs in, sees their information, and takes an action that moves the operation forward.",
      ],
      [
        "That is a different job from a marketing website, which explains a business to a visitor. A website can introduce the company. A web application has to carry the work.",
      ],
    ],
    definition: {
      question: "What is web application development?",
      answer: [
        [
          "Web application development is the design and building of browser-based software: the screens, the rules, the data, and the permissions people need to do a job or to interact with a business.",
        ],
      ],
    },
    problemsHeading: "What a web application has to get right",
    problems: [
      {
        title: "The public site is being asked to do the job of software",
        body: "Forms and pages have piled up where a signed-in application should hold the record and the next step.",
      },
      {
        title: "Customers and staff have no shared place to work",
        body: "Each group keeps its own view, and the business reconciles them later.",
      },
      {
        title: "Access is informal",
        body: "People can see more than they should, or they cannot see the one thing their job requires.",
      },
      {
        title: "The browser tool does not match the operation",
        body: "A generic app is close, but the workflow, the language, or the roles are wrong.",
      },
    ],
    buildsHeading: "Web applications SystemArc builds",
    builds: [
      { title: "Operational platforms", body: "The system a company uses to run a workflow from start to finish." },
      { title: "SaaS applications", body: "Software a business offers to its own customers through the browser, when that product is the operation." },
      { title: "Customer systems", body: "Applications a customer uses to see, request, or manage something that belongs to them." },
      { title: "Employee systems", body: "Applications staff use to do the job, not only to read a report about the job." },
      { title: "Dashboards", body: "Views of live operational information, tied to the actions people take next." },
      { title: "Administrative interfaces", body: "The controls for setup, correction, and exceptions." },
      { title: "Scheduling systems", body: "Booking and capacity tools shaped around how appointments actually run." },
      { title: "Data platforms", body: "A browser application for information the business has to trust and reuse." },
      { title: "Community platforms", body: "Spaces where members or customers stay connected to a business and its events." },
    ],
    approachHeading: "How SystemArc builds a web application",
    approach: [
      {
        title: "Name the users and the job",
        body: "Identify who signs in and what they must be able to finish. A screen that does not complete a job is not the application.",
      },
      {
        title: "Design the information and the actions",
        body: "Decide what the application remembers, what it changes, and who is allowed to do each thing.",
      },
      {
        title: "Build in reviewable parts",
        body: "Deliver a slice the real users can try, then widen it. The operation is the test, not a slide.",
      },
      {
        title: "Connect it to the rest of the business",
        body: "A browser application that cannot see the systems around it becomes another island.",
      },
    ],
    useCasesHeading: "A web application is the right form when people need to work in it",
    useCases: [
      {
        title: "Staff need a daily tool",
        body: "The work is repeated, shared, and too important to live in a spreadsheet or an inbox.",
      },
      {
        title: "Customers need to do more than read",
        body: "They check a status, send a request, book a time, or manage an account.",
      },
      {
        title: "Partners need a limited door into the operation",
        body: "Someone outside the company must see or submit a defined part of the work, and nothing else.",
      },
    ],
    aside: {
      heading: "A website and a web application do different jobs",
      columns: [
        {
          title: "Marketing website",
          points: [
            "Explains the business to a visitor",
            "Publishes pages, stories, and contact paths",
            "Succeeds when the right person understands the company",
          ],
        },
        {
          title: "Web application",
          points: [
            "Carries a workflow for a signed-in person",
            "Stores state, permissions, and history",
            "Succeeds when the work moves forward inside it",
          ],
        },
      ],
      body: [
        [
          "SystemArc builds the application. When the application is for customers, it often becomes a ",
          { text: "customer portal", href: "/services/customer-portal-development" },
          ". When it is for the team, it is often an ",
          { text: "internal tool", href: "/services/internal-tools-development" },
          ". Both are custom software delivered through the browser.",
        ],
      ],
    },
    relatedServices: [
      "custom-software-development",
      "customer-portal-development",
      "internal-tools-development",
    ],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "is a SystemArc web application for structured customer feedback, review workflows, reputation management, and customer engagement.",
      },
      {
        slug: "pixelnation-systems",
        note: "include community, check-in, and operational software used around a gaming and technology retail business.",
      },
    ],
    faq: [
      {
        question: "What is the difference between a website and a web application?",
        answer:
          "A website presents information. A web application is software. People sign in, see data that belongs to them or their job, and take actions that change the state of the work. A company can need both. They should not be forced into one set of pages.",
      },
      {
        question: "Can a web application connect to software we already use?",
        answer:
          "Yes. Payments, scheduling, accounting, and other systems can remain in place while the web application coordinates the workflow and shows people the information they need.",
      },
      {
        question: "Is a web application only for customers?",
        answer:
          "No. Customers, employees, and partners can each have a view of the same operation, with different permissions. The application is defined by the work, not by which audience sees the first screen.",
      },
      {
        question: "Do we need a custom web application?",
        answer:
          "Not if an existing product already matches the workflow and the people using it. A custom web application is for the case where the browser software has to follow rules, roles, or data that a generic product does not represent.",
      },
    ],
  },
  {
    slug: "software-integrations",
    number: "04",
    name: "Software Integrations",
    hubSummary:
      "Connect APIs, platforms, databases, and existing tools so information can move through the business without unnecessary manual work.",
    metaTitle: "Software Integration & API Development | SystemArc",
    metaDescription:
      "SystemArc connects APIs, software platforms, databases, and business systems so information can move reliably across your operation.",
    eyebrow: "Integrations",
    headline: "Make the software you already use work together.",
    layout: "connect",
    intro: [
      [
        "Many businesses do not need another application. They need the applications they already pay for to communicate.",
      ],
      [
        "Until those systems share information on purpose, people become the connection. They export, retype, and reconcile. Integration is the work of replacing that manual bridge with a reliable one.",
      ],
    ],
    definition: {
      question: "What is a software integration?",
      answer: [
        [
          "A software integration is a connection that lets two or more systems exchange information or request an action from each other, so a person does not have to carry that information between them.",
        ],
        [
          "An API is the defined way one system accepts that request. It is an agreed door: what may be asked, what must be sent, and what comes back. A webhook is the reverse direction: one system notifies another when something happens, instead of waiting to be asked.",
        ],
      ],
    },
    problemsHeading: "The gap integration is meant to close",
    problems: [
      {
        title: "The same fact is entered twice",
        body: "A customer, payment, or job exists in one system and has to be created again in another.",
      },
      {
        title: "Reports disagree",
        body: "Two products describe the same day differently because they were never given the same updates.",
      },
      {
        title: "Work waits on an export",
        body: "Someone downloads a file, edits it, and uploads it somewhere else before the next step can start.",
      },
      {
        title: "A new tool made the gap wider",
        body: "The business added software and also added another place for people to copy from.",
      },
    ],
    buildsHeading: "Connections SystemArc builds",
    builds: [
      { title: "CRM integrations", body: "Customer and pipeline records stay aligned with the systems that create or change them." },
      { title: "Payment integrations", body: "A payment event updates the job, order, or account it belongs to." },
      { title: "E-commerce integrations", body: "Orders, products, and customers move between the store and the operation behind it." },
      { title: "Scheduling integrations", body: "A booking creates or updates the work it implies, and a change in the work can update the booking." },
      { title: "Communication platforms", body: "A message or ticket is tied to the record it is about, instead of living only in an inbox." },
      { title: "Accounting systems", body: "The operational event and the financial record stay related without a manual journal of both." },
      { title: "Inventory systems", body: "Stock and job information move together when a part or product is used." },
      { title: "Custom APIs", body: "A system that has no suitable door gets one, so other software can work with it on purpose." },
      { title: "Webhooks", body: "An event in one system starts the correct next step in another." },
      { title: "Data synchronization", body: "Shared records are kept current, with a clear rule for which system wins when they differ." },
    ],
    approachHeading: "How SystemArc designs an integration",
    approach: [
      {
        title: "Find the human bridge",
        body: "Start with the export, the spreadsheet, or the retyping. That is the integration the business already has.",
      },
      {
        title: "Learn what each system can actually do",
        body: "An integration can only move what a system is willing to send or receive. The limit is part of the design.",
      },
      {
        title: "Define failure",
        body: "Decide what happens when the other system is down, rejects a record, or changes its API. Silent failure is not a connection.",
      },
      {
        title: "Prove the meaning stayed the same",
        body: "A field that arrives is not enough. The receiving system has to interpret it the way the operation intends.",
      },
    ],
    useCasesHeading: "Integration is enough when the tools are fine and the handoff is not",
    useCases: [
      {
        title: "A sale, booking, or payment should create work",
        body: "The front system already captured the event. The operation should not hear about it through a person.",
      },
      {
        title: "Two teams trust two different totals",
        body: "They are not looking at a shared update. They are looking at copies that drifted.",
      },
      {
        title: "A vendor system is staying",
        body: "Replacing it would be wasteful. Connecting it removes the manual work around it.",
      },
    ],
    aside: {
      heading: "Plain language for a technical connection",
      body: [
        [
          "Think of an API as a service window. Another system may ask for a record or hand one over, but only in the shape the window accepts. An integration is the agreement to use that window every time a specific business event happens.",
        ],
        [
          "If the event also needs a new place to live, the project is no longer only an integration. It becomes ",
          { text: "custom software", href: "/services/custom-software-development" },
          " or ",
          { text: "automation", href: "/services/business-process-automation" },
          " with the connection inside it.",
        ],
      ],
    },
    relatedServices: ["business-process-automation", "custom-software-development"],
    relatedWork: [
      {
        slug: "repairforge",
        note: "is a SystemArc repair workflow platform. Where a shop already has software that should remain, connecting it is separate work from the workflow itself.",
      },
      {
        slug: "pixelnation-systems",
        note: "cover community, check-in, event, and support-point workflows for a gaming and technology retailer, while established transaction platforms can remain in place.",
      },
    ],
    faq: [
      {
        question: "What is an API?",
        answer:
          "An API is a defined way for one piece of software to request information or an action from another. It specifies what can be asked, what must be included, and what the answer looks like. It is not the business process. It is the door the process can use.",
      },
      {
        question: "Can SystemArc integrate software we already use?",
        answer:
          "Yes, when those products expose an API, a webhook, a file exchange, or another supported door. The first check is what each system allows. SystemArc does not assume every product can be connected in every direction.",
      },
      {
        question: "What happens if a connected system changes or goes down?",
        answer:
          "A serious integration expects that. Requests can fail, be retried, or wait. Someone should be able to see the failure. The design names which system is the source for each fact, so a temporary outage does not create two conflicting records.",
      },
      {
        question: "Is an integration the same as automation?",
        answer:
          "An integration is the connection. Automation is the rule for when information moves and what should happen next. A useful project often includes both, but connecting two systems does not by itself decide the workflow.",
      },
    ],
  },
  {
    slug: "ai-automation",
    number: "05",
    name: "AI Automation",
    hubSummary:
      "Use AI where it provides practical operational value: classification, extraction, assistance, routing, analysis, and workflow support.",
    metaTitle: "AI Automation for Business | SystemArc",
    metaDescription:
      "SystemArc integrates practical AI into business workflows for classification, extraction, assistance, analysis, routing, and automation.",
    eyebrow: "AI automation",
    headline: "Use AI where it actually improves the workflow.",
    layout: "review",
    intro: [
      [
        "SystemArc does not add AI because it is fashionable. A model belongs in a workflow only when there is a defined task, usable input, and a person who remains responsible for the result.",
      ],
      [
        "Used that way, AI can read, sort, summarize, or suggest. It should not be asked to invent a process the business has not defined, or to take an action nobody will review.",
      ],
    ],
    definition: {
      question: "What is AI automation?",
      answer: [
        [
          "AI automation is the use of a model inside a specific business step, such as extracting fields from a document, classifying a request, or drafting a summary, so a person spends time on the decision rather than on the preparation.",
        ],
      ],
    },
    problemsHeading: "Tasks where a model can do preparatory work",
    problems: [
      {
        title: "Unstructured documents",
        body: "The information a workflow needs is trapped in a PDF, an email, or a photo.",
      },
      {
        title: "Sorting a queue by hand",
        body: "Someone reads every incoming item only to decide which path it belongs on.",
      },
      {
        title: "Repeated summarization",
        body: "A person rewrites the same kind of history so someone else can decide.",
      },
      {
        title: "Answers locked in old threads",
        body: "Staff search inboxes and documents for an answer the company has already given.",
      },
    ],
    buildsHeading: "Practical uses SystemArc will consider",
    buildsIntro:
      "These are tasks, not a promise that a model will run the business. Each one still needs a boundary and, where the output matters, a person.",
    builds: [
      { title: "Document extraction", body: "Pull the fields a process needs out of an unstructured file." },
      { title: "Classification", body: "Label an incoming request so it reaches the right queue." },
      { title: "Summarization", body: "Condense a thread, a note, or a record for the person who has to act." },
      { title: "Internal knowledge assistance", body: "Help staff find an answer in material the company already maintains." },
      { title: "Customer support assistance", body: "Draft or retrieve a response a person can check before it is sent." },
      { title: "Content processing", body: "Turn raw material into a structured form the workflow can store." },
      { title: "Data analysis", body: "Help a person inspect operational data the business already produces." },
      { title: "Routing", body: "Suggest or apply a path when the routing rule depends on the content of the item." },
      { title: "Workflow decision support", body: "Prepare the context for a decision. Leave the decision with the person accountable for it." },
    ],
    approachHeading: "How SystemArc puts AI into a workflow",
    approach: [
      {
        title: "Name the task and the owner",
        body: "Say exactly which step the model performs and which person owns the outcome if it is wrong.",
      },
      {
        title: "Limit what it may do",
        body: "Decide whether it may only suggest, or whether it may write a record. High-impact actions stay behind review.",
      },
      {
        title: "Place it in the existing work",
        body: "The model reads from and writes to the workflow. It does not become a separate chat window people have to remember.",
      },
      {
        title: "Check whether the work improved",
        body: "Compare the step with and without the model. If a person still redoes the task, the automation is not finished.",
      },
    ],
    useCasesHeading: "A reasonable AI task has input, a boundary, and a reviewer",
    useCases: [
      {
        title: "Incoming paperwork",
        body: "A document arrives, the relevant fields are proposed, and a person confirms them before the record changes.",
      },
      {
        title: "A queue that is sorted by reading",
        body: "The model proposes a category. A person can correct it. The correction is how the business keeps control.",
      },
      {
        title: "Staff looking for a known answer",
        body: "Assistance points to the company's own material instead of asking someone to search from scratch.",
      },
    ],
    aside: {
      heading: "A person stays responsible",
      body: [
        [
          "SystemArc treats model output as proposed work, not as authority. The workflow should show what was suggested, what a person accepted, and what was changed.",
        ],
        [
          "AI is a poor fit when the cost of a wrong answer is high and nobody will review it, when the source material is missing or sensitive in a way the business has not decided how to handle, or when the step is already a simple rule. A rule should stay a rule. That kind of step belongs with ",
          { text: "business process automation", href: "/services/business-process-automation" },
          ", often beside an ",
          { text: "integration", href: "/services/software-integrations" },
          ".",
        ],
      ],
    },
    relatedServices: ["business-process-automation", "software-integrations"],
    relatedWork: [],
    faq: [
      {
        question: "Does every business need AI?",
        answer:
          "No. A business needs a workflow that works. AI is one tool for particular steps inside that workflow. If the operation is still held together by spreadsheets and unclear handoffs, a model will not repair that.",
      },
      {
        question: "Does every automation project need AI?",
        answer:
          "No. Notifications, status changes, and field mapping are ordinary software. AI is for steps that require reading or classifying unstructured information. SystemArc will say when a model is unnecessary.",
      },
      {
        question: "Will AI make decisions without a person?",
        answer:
          "Not by default. SystemArc designs these steps so a person can review the output before it changes a customer, a payment, or another high-impact record. Any step that writes without review has to be an explicit choice, with a visible record of what happened.",
      },
      {
        question: "What work is a poor fit for AI?",
        answer:
          "Work with no stable input, no definition of a correct result, or a consequence the business is unwilling to check. Also a poor fit: a step that is already a clear rule. Using a model there adds uncertainty without removing work.",
      },
    ],
  },
  {
    slug: "customer-portal-development",
    number: "06",
    name: "Customer Portal Development",
    hubSummary:
      "Give customers a dedicated place to view information, submit requests, check status, communicate, and interact with the business.",
    metaTitle: "Custom Customer Portal Development | SystemArc",
    metaDescription:
      "SystemArc builds custom customer portals for status tracking, requests, communication, documents, account information, and business-specific workflows.",
    eyebrow: "Customer portals",
    headline: "Give customers one place to interact with your business.",
    layout: "path",
    intro: [
      [
        "Customers ask the same questions because the answer lives in a shop, an inbox, or a system they cannot see. A portal gives them a place to look, request, and respond without starting over each time.",
      ],
      [
        "The portal has to show the same truth the business is working from. A status page that drifts from the real job creates a second problem.",
      ],
    ],
    definition: {
      question: "What is a customer portal?",
      answer: [
        [
          "A customer portal is a signed-in application where a customer can see the information, requests, documents, and messages that belong to their relationship with a business.",
        ],
      ],
    },
    problemsHeading: "What customers are forced to do without a portal",
    problems: [
      {
        title: "Status is a phone call",
        body: "The only way to learn where a job, order, or request stands is to ask a person who then looks it up.",
      },
      {
        title: "Requests arrive anywhere",
        body: "Email, text, and voicemail all start work, and none of them is the record.",
      },
      {
        title: "Documents are attachments",
        body: "Files the customer needs are buried in threads instead of attached to the account or the job.",
      },
      {
        title: "The website cannot hold the relationship",
        body: "A public page can explain the service. It cannot show one customer their own work.",
      },
    ],
    buildsHeading: "What a SystemArc portal can include",
    builds: [
      { title: "Service status", body: "A customer sees where their request stands, in the language the business actually uses." },
      { title: "Repair status", body: "A repair customer can check progress without calling the shop for a lookup." },
      { title: "Appointments", body: "Booking and upcoming visits sit with the rest of the customer's record." },
      { title: "Documents", body: "Estimates, invoices, photos, and instructions have a home on the job they belong to." },
      { title: "Requests", body: "A new ask starts in the portal and becomes work the team can see." },
      { title: "Messages", body: "Conversation about a job stays with the job, not only in a personal inbox." },
      { title: "Account information", body: "The customer can see and, where appropriate, update the details the business holds." },
      { title: "Order information", body: "What was requested, promised, or completed is visible without a separate lookup." },
      { title: "Payments", body: "A balance or payment action can sit next to the work it pays for, when that connection exists." },
      { title: "Project updates", body: "Longer work can show the current phase without a status meeting for every question." },
    ],
    approachHeading: "How SystemArc designs a portal",
    approach: [
      {
        title: "List the calls and emails",
        body: "The questions customers already ask are the first menu. If they ask it every week, the portal should be able to answer or accept it.",
      },
      {
        title: "Decide what they may see and do",
        body: "Not every internal note belongs in the portal. Status, requests, and documents are chosen on purpose.",
      },
      {
        title: "Connect it to the operation",
        body: "The customer view reads the same work the team is updating. Two statuses means the portal is wrong.",
      },
      {
        title: "Keep a path back to a person",
        body: "A portal reduces avoidable contact. It should not trap a customer who has a real exception.",
      },
    ],
    useCasesHeading: "Portals earn their place when customers are already asking",
    useCases: [
      {
        title: "A service business is interrupted by status calls",
        body: "The answer exists. The customer has no way to see it.",
      },
      {
        title: "Requests start in too many channels",
        body: "The team reconstructs the ask before the work can begin.",
      },
      {
        title: "A project or account has a long life",
        body: "The customer needs history and the current step, not another introduction to the company.",
      },
    ],
    aside: {
      heading: "The portal is the customer's side of the operation",
      body: [
        [
          "RepairForge is a SystemArc system for repair businesses. It gives customers a clearer view of an active repair and gives the shop a way to organize communication and workflow around that repair.",
        ],
        [
          "A portal is that customer-facing side: status, requests, and messages tied to the work. The team still needs its own tools, which is a different service from a ",
          { text: "web application", href: "/services/web-application-development" },
          " built only for staff, or from ",
          { text: "custom software", href: "/services/custom-software-development" },
          " that holds the whole operation.",
        ],
      ],
    },
    relatedServices: ["custom-software-development", "web-application-development"],
    relatedWork: [
      {
        slug: "repairforge",
        note: "is a SystemArc system designed around repair businesses. Customers get clearer service visibility. The shop organizes communication and workflow around active repairs. It is not presented here as an outside client's result. It shows the kind of customer and shop relationship a portal has to support.",
      },
    ],
    faq: [
      {
        question: "How is a portal different from a page on our website?",
        answer:
          "A website page is public. A portal is for a specific customer and shows their jobs, documents, or requests. It requires sign-in, permissions, and a connection to the system that tracks the work.",
      },
      {
        question: "Can customers see repair or service status?",
        answer:
          "Yes, when the business wants that status to be visible and the internal record is reliable enough to show. The portal should use the same state the team updates, so a customer is not told something the shop has already moved past.",
      },
      {
        question: "Does a portal replace phone and email?",
        answer:
          "It replaces the repetitive questions and the lost requests. It does not replace a person for an exception, a dispute, or a situation the screen was not built to handle.",
      },
      {
        question: "Can the portal include payments or documents?",
        answer:
          "It can, when those items belong to the same customer relationship and the source system can provide them. SystemArc connects the portal to the record. It does not invent a second set of balances or files.",
      },
    ],
  },
  {
    slug: "internal-tools-development",
    number: "07",
    name: "Internal Tools Development",
    hubSummary:
      "Build dashboards, administrative systems, operational tools, and interfaces specifically for the people running the business.",
    metaTitle: "Custom Internal Tools Development | SystemArc",
    metaDescription:
      "SystemArc builds internal dashboards, administrative systems, workflow tools, and operational software around the way teams actually work.",
    eyebrow: "Internal tools",
    headline: "Build better tools for the people running the business.",
    layout: "operations",
    intro: [
      [
        "Internal tools are the software staff use to run the operation: the queue, the exception, the approval, the count, and the correction. They are not a brochure, and they are not a report about work that happened somewhere else.",
      ],
      [
        "Off-the-shelf admin screens often miss the sequence a team actually follows. People then keep a spreadsheet beside the official system. That spreadsheet is the brief for the tool.",
      ],
    ],
    definition: {
      question: "What is internal tools development?",
      answer: [
        [
          "Internal tools development is the design and building of software for employees: dashboards, administrative screens, and workflow tools shaped around the jobs those people do every day.",
        ],
      ],
    },
    problemsHeading: "Signs the team is missing a tool",
    problems: [
      {
        title: "The official system is not where the work happens",
        body: "Staff update a sheet, a chat, or a notebook, and the product of record is filled in later.",
      },
      {
        title: "Every role shares one cramped screen",
        body: "A person has to ignore most of the interface to find the two actions their job requires.",
      },
      {
        title: "Exceptions have no place to go",
        body: "The normal path is supported. The case that needs a manager, a note, or a correction is improvised.",
      },
      {
        title: "Leaders ask for exports",
        body: "The numbers exist, but seeing today's work requires someone to assemble them.",
      },
    ],
    buildsHeading: "Internal tools SystemArc builds",
    builds: [
      { title: "Operations dashboards", body: "A view of the work in progress, built for the decisions the day requires." },
      { title: "Administrative interfaces", body: "Screens for the setup, edits, and corrections staff actually perform." },
      { title: "Inventory tools", body: "Tracking that follows how parts or products move through the operation." },
      { title: "Approval systems", body: "A request, the information needed to judge it, and a recorded decision." },
      { title: "Employee portals", body: "A place for staff to see what is assigned to them and what they need in order to finish it." },
      { title: "Workflow management", body: "The sequence of tasks and handoffs, including the steps generic software skipped." },
      { title: "Reporting systems", body: "Operational reading of data the business already creates, without a manual assembly step." },
      { title: "Scheduling tools", body: "Capacity and appointments arranged the way the team runs them, not only the way a calendar product assumes." },
      { title: "Customer management", body: "The customer context the team needs while doing the work, when the CRM stops short of the workflow." },
      { title: "Internal knowledge tools", body: "A maintained place for the procedures and answers staff currently keep in their heads or in old messages." },
    ],
    approachHeading: "How SystemArc builds an internal tool",
    approach: [
      {
        title: "Sit with the people who do the work",
        body: "The tool is wrong if it matches a manager's summary and misses the clicks, lookups, and exceptions of the actual job.",
      },
      {
        title: "Start from the side system",
        body: "The spreadsheet, the whiteboard, or the private checklist is evidence of what the official software failed to hold.",
      },
      {
        title: "Build the sequence they use",
        body: "Screens follow the order of the work. Staff should not have to translate their job into the software's job.",
      },
      {
        title: "Leave room for the operation to change",
        body: "A tool that can only represent today's exact process will be abandoned at the first new exception.",
      },
    ],
    useCasesHeading: "Internal tools are for the people accountable for the day",
    useCases: [
      {
        title: "A counter, shop, or desk has a repeated routine",
        body: "The routine is fast, shared, and full of small exceptions. A generic screen slows it down.",
      },
      {
        title: "Supervisors cannot see the queue without asking",
        body: "The work is happening. The view of it is a conversation.",
      },
      {
        title: "A business-specific rule has nowhere to live",
        body: "Points, approvals, check-ins, or job states are real, and no purchased product contains them.",
      },
    ],
    aside: {
      heading: "Tools for a real operation",
      body: [
        [
          "PixelNation Systems includes internal operational tools built around a gaming and technology business: customer check-in, support points, events, and the systems staff use to run the day. Those tools exist because the operation needed them, not as a template SystemArc copies onto another company.",
        ],
        [
          "The same standard applies elsewhere. An internal tool is ",
          { text: "custom software", href: "/services/custom-software-development" },
          " for the team. When customers need their own door into the same work, that is a ",
          { text: "customer portal", href: "/services/customer-portal-development" },
          ", usually delivered as a ",
          { text: "web application", href: "/services/web-application-development" },
          ".",
        ],
      ],
    },
    relatedServices: [
      "custom-software-development",
      "customer-portal-development",
      "web-application-development",
    ],
    relatedWork: [
      {
        slug: "pixelnation-systems",
        note: "is a set of SystemArc systems around a gaming and technology business, including community engagement, customer check-in, support points, events, and internal operational tools. The internal tools are the relevant part here: software for the people running the operation.",
      },
      {
        slug: "repairforge",
        note: "gives the shop an operational view of an active repair: workflow, communication, and the work still open. The customer sees a different view of that same job.",
      },
    ],
    faq: [
      {
        question: "How is an internal tool different from another SaaS product?",
        answer:
          "A SaaS product is built for a market. An internal tool is built for one team's workflow. Buy the product when it fits. Build the tool when the team is already maintaining a side process because the product cannot hold the work.",
      },
      {
        question: "Who should be involved in the design?",
        answer:
          "The people who perform the job, not only the person who sponsors the project. SystemArc needs to see the sequence, the exceptions, and the information they look up. A tool designed only from a requirements list tends to miss those.",
      },
      {
        question: "Can internal tools connect to systems we already use?",
        answer:
          "Yes. An internal tool often sits in front of, or beside, a CRM, accounting system, or industry product. It should not ask staff to retype what those systems already know.",
      },
      {
        question: "Will this replace our spreadsheets?",
        answer:
          "When the spreadsheet is the real operational system, the tool should take over that job and retire the double entry. Notes that are truly one-off do not all need software. The goal is to move the repeated work, not to ban every sheet.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}
