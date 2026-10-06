import type { Paragraph } from "@/lib/services";

export type SolutionItem = {
  title: string;
  body: string;
};

export type SolutionWork = {
  slug: string;
  note: string;
};

export type SolutionLayout =
  | "handoff"
  | "visibility"
  | "operations"
  | "movement"
  | "constraints"
  | "job"
  | "followup"
  | "participation";

export type SolutionPage = {
  slug: string;
  number: string;
  name: string;
  hubSummary: string;
  flow: {
    problem: string;
    system: string;
    outcome: string;
  };
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: readonly Paragraph[];
  definition: {
    question: string;
    answer: readonly Paragraph[];
  };
  signsHeading: string;
  signs: readonly SolutionItem[];
  includesHeading: string;
  includesIntro?: string;
  includes: readonly SolutionItem[];
  approachHeading: string;
  approach: readonly SolutionItem[];
  useCasesHeading: string;
  useCases: readonly SolutionItem[];
  aside?: {
    heading: string;
    body: readonly Paragraph[];
    columns?: readonly { title: string; points: readonly string[] }[];
  };
  services: readonly string[];
  relatedSolutions: readonly string[];
  relatedWork: readonly SolutionWork[];
  faq: readonly { question: string; answer: string }[];
  layout: SolutionLayout;
};

export function solutionPath(slug: string) {
  return `/solutions/${slug}`;
}

export const solutions: readonly SolutionPage[] = [
  {
    slug: "workflow-automation",
    number: "01",
    name: "Workflow Automation",
    hubSummary:
      "For operations where repetitive work, handoffs, notifications, approvals, or data movement are still handled manually.",
    flow: {
      problem: "Manual handoffs",
      system: "Workflow automation",
      outcome: "A process that moves without constant human coordination",
    },
    metaTitle: "Workflow Automation Solutions | SystemArc",
    metaDescription:
      "SystemArc designs workflow automation around real business processes, reducing repetitive data entry, manual handoffs, status updates, notifications, and administrative work.",
    eyebrow: "Workflow automation",
    headline: "Move the work without manually pushing every step.",
    layout: "handoff",
    intro: [
      [
        "A workflow breaks down when someone has to notice a change, copy it, and tell the next person. The business already knows the step. A person is being used as the connection.",
      ],
      [
        "SystemArc builds custom software for workflow automation when that connection should happen because the work moved, not because someone remembered to push it.",
      ],
    ],
    definition: {
      question: "What is workflow automation?",
      answer: [
        [
          "Workflow automation uses software and integrations to move information, trigger actions, update systems, notify people, and coordinate repeatable business processes without requiring someone to manually initiate every step.",
        ],
      ],
    },
    signsHeading: "Signs the workflow is still being pushed by hand",
    signs: [
      {
        title: "Copying between systems",
        body: "People copy information between systems.",
      },
      {
        title: "Manual status",
        body: "Status updates are sent manually.",
      },
      {
        title: "Remembered approvals",
        body: "Approvals depend on someone remembering.",
      },
      {
        title: "The same email",
        body: "The same email gets written repeatedly.",
      },
      {
        title: "A side spreadsheet",
        body: "Employees maintain spreadsheets because systems do not connect.",
      },
      {
        title: "Message handoffs",
        body: "Handoffs happen through messages.",
      },
      {
        title: "Routine follow-up",
        body: "Customers require manual follow-up for routine updates.",
      },
    ],
    includesHeading: "What a workflow system could include",
    includesIntro:
      "These are pieces of a defined process. A step that is still a judgment call stays with a person.",
    includes: [
      { title: "Triggers", body: "A real event starts the next step: a status, a form, a payment, or a time." },
      { title: "Rules", body: "The business can say what should happen when that event is true." },
      { title: "Approvals", body: "A request reaches the person allowed to decide, with the information they need." },
      { title: "Notifications", body: "The right person hears about a change because it happened." },
      { title: "Data synchronization", body: "Shared facts stay aligned across the tools that already hold them." },
      { title: "Document processing", body: "A file is requested, received, and attached to the work it belongs to." },
      { title: "Status changes", body: "A record moves when the condition for the next state is met." },
      { title: "Task creation", body: "The next piece of work appears for the role that owns it." },
      { title: "Routing", body: "An item reaches the queue that matches the kind of work it is." },
      { title: "Exception handling", body: "A failed or unusual step is visible instead of disappearing." },
      { title: "Human review", body: "A person still confirms the steps the business is not willing to run unattended." },
    ],
    approachHeading: "How SystemArc approaches a workflow problem",
    approach: [
      {
        title: "Follow one real item",
        body: "Watch a job, order, or request move, including the point where someone has to intervene.",
      },
      {
        title: "Name the handoff",
        body: "Separate the steps that are transport from the steps that are decisions.",
      },
      {
        title: "Connect what already exists",
        body: "Use the systems the company already pays for before proposing a new place for the work.",
      },
      {
        title: "Leave the exception visible",
        body: "Automation that hides a failure is not a finished workflow.",
      },
    ],
    useCasesHeading: "When this is the problem to start with",
    useCases: [
      {
        title: "The next step is known at the moment the last one finishes",
        body: "The delay is the person who has to notice and forward it.",
      },
      {
        title: "Several tools each hold part of the same process",
        body: "No single product is wrong. The gap is the movement between them.",
      },
      {
        title: "A new application would only recreate the handoff",
        body: "The business needs the existing steps to carry themselves, not another screen to update.",
      },
    ],
    aside: {
      heading: "Automation is the wrong first move when the process is not real yet",
      body: [
        [
          "If people cannot agree on the steps, the exceptions, or what finished looks like, software will preserve the disagreement. Map that before connecting anything.",
        ],
        [
          "This work usually sits with ",
          { text: "business process automation", href: "/services/business-process-automation" },
          ", ",
          { text: "software integrations", href: "/services/software-integrations" },
          ", and, only when a step requires reading unstructured information, ",
          { text: "AI automation", href: "/services/ai-automation" },
          ". A model is not the default. When the work has nowhere to live, the answer may be ",
          { text: "custom software", href: "/services/custom-software-development" },
          " instead of a faster handoff.",
        ],
      ],
    },
    services: [
      "business-process-automation",
      "software-integrations",
      "ai-automation",
      "custom-software-development",
    ],
    relatedSolutions: ["business-dashboards", "reputation-customer-feedback"],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "turns customer feedback and review follow-up into a repeatable workflow, with a business view of that process.",
      },
      {
        slug: "repairforge",
        note: "is built around one repair workflow. Customers and the shop look at different views of the same job, from intake through completion.",
      },
      {
        slug: "pixelnation-systems",
        note: "include a check-in workflow that records a visit against a community, participation, and Support Points.",
      },
    ],
    faq: [
      {
        question: "What is the difference between workflow automation and new software?",
        answer:
          "Workflow automation moves a defined step between people and systems. New software is a place where the work itself lives. If the record, the rules, and the next action have no home, automation alone will not create one. SystemArc separates those before recommending either.",
      },
      {
        question: "Should every repeated step be automated?",
        answer:
          "No. Low volume, unreliable source data, and decisions the business has not defined are poor candidates. Automating those makes the confusion faster. A stable, mechanical step is the part worth connecting.",
      },
      {
        question: "Can SystemArc automate work between tools we already use?",
        answer:
          "Yes, when those tools can send or receive the information the step needs. SystemArc develops integrations that connect existing business software. The first check is what each system actually allows.",
      },
      {
        question: "Does workflow automation require AI?",
        answer:
          "No. Notifications, status changes, and field mapping are ordinary rules. AI belongs only where the step requires reading or classifying unstructured information, and a person should remain responsible for the result.",
      },
    ],
  },
  {
    slug: "customer-portals",
    number: "02",
    name: "Customer Portals",
    hubSummary:
      "For businesses that need to give customers one place to check status, submit information, communicate, view documents, or interact with an ongoing service.",
    flow: {
      problem: "Status lives in a phone call",
      system: "A customer portal",
      outcome: "Customers can see their own work without asking someone to look it up",
    },
    metaTitle: "Custom Customer Portal Solutions | SystemArc",
    metaDescription:
      "SystemArc builds customer portals for service status, requests, documents, communication, appointments, payments, and business-specific customer workflows.",
    eyebrow: "Customer portals",
    headline: "Give customers a place to see what is happening.",
    layout: "visibility",
    intro: [
      [
        "Customers should not have to call, email, or message simply to retrieve information the business already has.",
      ],
      [
        "A portal is the customer's side of an operation that already exists. SystemArc builds customer portals so status, requests, and documents come from the same work the team is updating.",
      ],
    ],
    definition: {
      question: "What is a customer portal?",
      answer: [
        [
          "A customer portal is a signed-in place where a customer can see and act on the information that belongs to their relationship with a business: status, requests, documents, messages, and the next step.",
        ],
      ],
    },
    signsHeading: "Signs customers are locked out of information you already have",
    signs: [
      {
        title: "Status is a phone call",
        body: "The answer exists in the shop or the office. The customer has to ask a person to read it.",
      },
      {
        title: "Requests arrive anywhere",
        body: "Email, text, and voicemail all start work, and none of them is the record.",
      },
      {
        title: "Documents are attachments",
        body: "Files the customer needs are buried in threads instead of attached to the job.",
      },
      {
        title: "The website cannot hold the relationship",
        body: "A public page can explain the service. It cannot show one customer their own work.",
      },
      {
        title: "Staff repeat the same lookup",
        body: "The interruption is not a new decision. It is retrieving something the system already stored.",
      },
    ],
    includesHeading: "What the customer might be able to do there",
    includes: [
      { title: "Status tracking", body: "The customer sees where a request stands, in the language the business uses." },
      { title: "Requests", body: "A new ask starts in the portal and becomes work the team can see." },
      { title: "Messages", body: "Conversation about a job stays with the job." },
      { title: "Documents", body: "Estimates, invoices, photos, and instructions have a home on the work they belong to." },
      { title: "Appointments", body: "Upcoming visits sit with the rest of the customer's record." },
      { title: "Payments", body: "A balance or payment action can sit next to the work it pays for, when that connection exists." },
      { title: "Order information", body: "What was requested, promised, or completed is visible without a separate lookup." },
      { title: "Repair status", body: "A repair customer can check progress without calling for a readout." },
      { title: "Project updates", body: "Longer work can show the current phase without a meeting for every question." },
      { title: "Account information", body: "The customer can see, and where appropriate update, details the business holds." },
      { title: "Notifications", body: "A change can reach the customer because the record changed." },
    ],
    approachHeading: "How SystemArc designs the customer's side of the work",
    approach: [
      {
        title: "List the calls",
        body: "The questions customers already ask are the first menu.",
      },
      {
        title: "Choose what they may see",
        body: "Internal notes do not automatically belong in the portal. Status, requests, and documents are selected on purpose.",
      },
      {
        title: "Read the same record",
        body: "Two statuses, one for the team and one for the customer, means the portal is wrong.",
      },
      {
        title: "Keep a path to a person",
        body: "A portal reduces avoidable contact. It should not trap someone with a real exception.",
      },
    ],
    useCasesHeading: "A portal earns its place when the answer already exists",
    useCases: [
      {
        title: "A service business is interrupted by status calls",
        body: "The work is moving. The customer cannot see it.",
      },
      {
        title: "An ongoing account has history",
        body: "The customer needs the current step and the record, not another introduction to the company.",
      },
      {
        title: "Requests start in too many channels",
        body: "The team reconstructs the ask before the work can begin.",
      },
    ],
    aside: {
      heading: "The portal is not a second website",
      body: [
        [
          "RepairForge is a SystemArc repair workflow and customer communication platform. It gives customers a clearer view of an active repair and gives the shop a way to organize communication around that repair. It is not presented here as an outside client's result.",
        ],
        [
          "The customer-facing part of that kind of system is ",
          { text: "customer portal development", href: "/services/customer-portal-development" },
          ", usually delivered as a ",
          { text: "web application", href: "/services/web-application-development" },
          ". The team still needs its own tools. A portal that is not connected to them will drift.",
        ],
      ],
    },
    services: ["customer-portal-development", "web-application-development"],
    relatedSolutions: ["repair-service-management", "scheduling-systems"],
    relatedWork: [
      {
        slug: "repairforge",
        note: "is a SystemArc system for repair businesses. Customers get clearer service visibility. The shop organizes communication and workflow around active repairs. The relevant part here is the customer view of work the business is already doing.",
      },
    ],
    faq: [
      {
        question: "How is a portal different from a page on our website?",
        answer:
          "A website page is public and explains the business. A portal is for a specific customer and shows their jobs, documents, or requests. It needs sign-in, permissions, and a connection to the system that tracks the work.",
      },
      {
        question: "Can customers see service or repair status?",
        answer:
          "Yes, when the business wants that status to be visible and the internal record is reliable enough to show. The portal should use the same state the team updates.",
      },
      {
        question: "Does a portal replace phone and email?",
        answer:
          "It replaces the repetitive questions and the lost requests. It does not replace a person for an exception, a dispute, or a situation the screen was not built to handle.",
      },
      {
        question: "What if the information customers want is in another system?",
        answer:
          "Then the portal is not only a screen. SystemArc develops integrations that connect existing business software so the portal can show a payment, a booking, or a job the company already tracks somewhere else.",
      },
    ],
  },
  {
    slug: "business-dashboards",
    number: "03",
    name: "Business Dashboards",
    hubSummary:
      "For teams that need a clear operational view of work, status, activity, exceptions, and business information without assembling reports manually.",
    flow: {
      problem: "The day is assembled by asking people",
      system: "An operational dashboard",
      outcome: "The team can see the work, the exceptions, and what needs a person",
    },
    metaTitle: "Custom Business Dashboard Solutions | SystemArc",
    metaDescription:
      "SystemArc builds operational dashboards that give teams a clear view of work, status, exceptions, activity, and business data without manual reporting.",
    eyebrow: "Business dashboards",
    headline: "See the operation without chasing the information.",
    layout: "operations",
    intro: [
      [
        "A dashboard is useful when it changes what someone does next. A chart that restates last month, after someone exported it, is a report. The team still has to ask around to know what is stuck today.",
      ],
      [
        "SystemArc builds operational dashboards for the people running the work: queues, exceptions, and the status of things already in motion.",
      ],
    ],
    definition: {
      question: "What is an operational dashboard?",
      answer: [
        [
          "An operational dashboard is a live view of the work a team is responsible for, tied to the actions they take next, rather than a static report assembled after the fact.",
        ],
      ],
    },
    signsHeading: "Signs the business cannot see itself",
    signs: [
      {
        title: "Leaders ask for an export",
        body: "The numbers exist, but seeing today's work requires someone to assemble them.",
      },
      {
        title: "Status is a conversation",
        body: "Knowing what is late means asking the person who has the list.",
      },
      {
        title: "Exceptions have no view",
        body: "The normal path is visible. The case that needs a person is not.",
      },
      {
        title: "Each role keeps a private picture",
        body: "The counter, the floor, and the office are not looking at the same queue.",
      },
    ],
    includesHeading: "What an operational view can hold",
    includesIntro:
      "The point is the work in progress. A number belongs here when someone uses it to act.",
    includes: [
      { title: "Work queues", body: "What is waiting, who it is with, and what is blocked." },
      { title: "Status", body: "The state of the job, order, or request the team is actually moving." },
      { title: "Exceptions", body: "The items that broke the normal path and need a person." },
      { title: "Alerts", body: "A condition the business already cares about, surfaced when it becomes true." },
      { title: "Activity", body: "What changed, not only the current total." },
      { title: "Capacity", body: "How much work the day can still hold." },
      { title: "Inventory", body: "Stock or parts when they affect the work on the queue." },
      { title: "Scheduling", body: "Appointments and load when the day is organized around them." },
      { title: "Customer activity", body: "Requests, messages, or visits that change what the team should do." },
      { title: "Operational metrics", body: "Counts the operation uses to run, not a separate reporting project." },
      { title: "Drill-down views", body: "A way to open the item behind the summary and do something with it." },
    ],
    approachHeading: "How SystemArc decides what belongs on the screen",
    approach: [
      {
        title: "Start from the question people ask",
        body: "If the team asks it every morning, the view should be able to answer it.",
      },
      {
        title: "Tie the number to an action",
        body: "A figure that does not change the next step is a candidate to leave off.",
      },
      {
        title: "Read the systems that already know",
        body: "The dashboard should not require a fresh export to be true.",
      },
      {
        title: "Give each role the slice they use",
        body: "A shared record can have more than one view. It should not have more than one truth.",
      },
    ],
    useCasesHeading: "A dashboard is the right form when the day depends on seeing the queue",
    useCases: [
      {
        title: "Supervisors cannot see the work without asking",
        body: "The operation is happening. The picture of it is a conversation.",
      },
      {
        title: "A spreadsheet is the morning meeting",
        body: "Someone assembles it so everyone else can decide.",
      },
      {
        title: "Exceptions are discovered late",
        body: "The normal report looks fine. The stuck item was never a column.",
      },
    ],
    aside: {
      heading: "An operational dashboard and a static report do different jobs",
      columns: [
        {
          title: "Static report",
          points: [
            "Looks backward at a period that already closed",
            "Is assembled, exported, or emailed",
            "Succeeds when someone can explain what happened",
          ],
        },
        {
          title: "Operational dashboard",
          points: [
            "Looks at work that is still open",
            "Reads the systems where that work lives",
            "Succeeds when someone can act on what they see",
          ],
        },
      ],
      body: [
        [
          "SystemArc will not dress a vanity chart up as an operating tool. This work usually belongs with ",
          { text: "internal tools", href: "/services/internal-tools-development" },
          " and ",
          { text: "custom software", href: "/services/custom-software-development" },
          ", connected to the records the business already trusts.",
        ],
      ],
    },
    services: ["internal-tools-development", "custom-software-development"],
    relatedSolutions: ["workflow-automation", "inventory-systems"],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "includes a business dashboard so the feedback process is visible to the people running it.",
      },
      {
        slug: "repairforge",
        note: "gives the shop and the customer different views of one repair. The shop view is operational: status, communication, and what is still open.",
      },
      {
        slug: "pixelnation-systems",
        note: "record community participation, check-ins, and Support Points as operational information beside the retail transaction.",
      },
    ],
    faq: [
      {
        question: "What is the difference between a dashboard and a report?",
        answer:
          "A report explains a period that has passed. An operational dashboard shows work that is still open so someone can act. SystemArc builds the second when the problem is running the day, not reviewing it later.",
      },
      {
        question: "Where does the information come from?",
        answer:
          "From the systems that already hold the work, when they can provide it. If the only source is a spreadsheet someone maintains, the first question is whether that sheet is the real system and should be replaced or connected.",
      },
      {
        question: "Will this be a wall of charts?",
        answer:
          "No. A chart belongs on the screen when it helps someone see a queue, an exception, or a capacity problem. Decorative graphs are not the goal.",
      },
      {
        question: "Can different people see different views?",
        answer:
          "Yes. A person at the desk and a person running the day do not need the same first screen. They do need to be looking at the same underlying work.",
      },
    ],
  },
  {
    slug: "inventory-systems",
    number: "04",
    name: "Inventory Systems",
    hubSummary:
      "For operations that need inventory tracking designed around how products, parts, materials, or assets actually move through the business.",
    flow: {
      problem: "Stock is tracked beside the real movement",
      system: "Inventory that follows the operation",
      outcome: "Products, parts, and locations stay tied to the work that uses them",
    },
    metaTitle: "Custom Inventory Management Systems | SystemArc",
    metaDescription:
      "SystemArc builds inventory systems around how products, parts, materials, and assets actually move through a business.",
    eyebrow: "Inventory systems",
    headline: "Inventory software should understand how your inventory moves.",
    layout: "movement",
    intro: [
      [
        "Generic inventory software assumes a warehouse, a sku, and a sale. Many operations are not that. A part is reserved for a job. A product sits in more than one place. A count changes because work happened, not because someone sold a unit.",
      ],
      [
        "SystemArc builds inventory systems around that movement. The record should change when the business uses, receives, or transfers something, not only when a person remembers to adjust a total.",
      ],
    ],
    definition: {
      question: "What is a custom inventory system?",
      answer: [
        [
          "A custom inventory system is software that tracks products, parts, materials, or assets according to the locations, jobs, and states a particular business actually uses, instead of a generic stock model.",
        ],
      ],
    },
    signsHeading: "Signs the stock record does not match the operation",
    signs: [
      {
        title: "Generic inventory assumptions",
        body: "The product's idea of a unit, a location, or a sale does not match how the business moves things.",
      },
      {
        title: "Multiple locations",
        body: "The same item exists in more than one place, and the count people trust is local.",
      },
      {
        title: "Parts tied to service jobs",
        body: "Something is used on a repair or a job, and the inventory system never hears about it.",
      },
      {
        title: "Inventory tied to workflow stages",
        body: "An item is not simply in or out. It is received, reserved, in use, or waiting.",
      },
      {
        title: "Manual adjustments",
        body: "The official count is corrected after the fact because the real movement happened elsewhere.",
      },
      {
        title: "Disconnected purchasing",
        body: "Buying more is a separate conversation from what the work consumed.",
      },
      {
        title: "Poor visibility",
        body: "Knowing what is available means asking the person who last touched it.",
      },
      {
        title: "Specialized product states",
        body: "Condition, configuration, or commitment matters, and a simple on-hand number hides it.",
      },
    ],
    includesHeading: "What an inventory system could track",
    includes: [
      { title: "Stock tracking", body: "What the business has, in the units it actually uses." },
      { title: "Locations", body: "Where an item is, including more than one site or bin." },
      { title: "Transfers", body: "Movement between those places, with a record of the move." },
      { title: "Receiving", body: "What arrived, against what was expected." },
      { title: "Usage", body: "What a job, sale, or process consumed." },
      { title: "Reservations", body: "What is promised to work that has not consumed it yet." },
      { title: "Adjustments", body: "Corrections that are visible, not silent edits to a total." },
      { title: "Reorder workflows", body: "A signal when the operation's own rule says more is needed." },
      { title: "Audit history", body: "Who changed a count, and why, when that matters to the business." },
      { title: "Job-linked inventory", body: "Parts or materials attached to the job that uses them." },
      { title: "Integrations", body: "A connection to purchasing, accounting, or the system that creates demand." },
    ],
    approachHeading: "How SystemArc starts an inventory problem",
    approach: [
      {
        title: "Walk the movement",
        body: "Follow one item from arrival to use, including the places the official system never sees.",
      },
      {
        title: "Name the states that matter",
        body: "On hand, reserved, consumed, and transferred are different facts. A single number often collapses them.",
      },
      {
        title: "Attach inventory to the work",
        body: "If a job uses a part, the job and the stock should know about each other.",
      },
      {
        title: "Connect purchasing where it is separate",
        body: "Reordering is part of the operation when running out stops the work.",
      },
    ],
    useCasesHeading: "Custom inventory is worth discussing when the generic model keeps losing",
    useCases: [
      {
        title: "Parts belong to jobs",
        body: "A repair or a project consumes stock, and the shelf count is updated later, if at all.",
      },
      {
        title: "More than one place holds the same thing",
        body: "People trust the local pile more than the system.",
      },
      {
        title: "The item has a life before it is sold",
        body: "It is received, staged, reserved, or configured. A retail on-hand count is not the whole story.",
      },
    ],
    aside: {
      heading: "Buy a stock product when the warehouse model already fits",
      body: [
        [
          "SystemArc does not rebuild ordinary warehouse software for its own sake. A custom inventory system is for movement, states, or job links that the current product cannot represent without a side spreadsheet.",
        ],
        [
          "That system is ",
          { text: "custom software", href: "/services/custom-software-development" },
          ", often with ",
          { text: "integrations", href: "/services/software-integrations" },
          " to purchasing or accounting, and sometimes an ",
          { text: "internal tool", href: "/services/internal-tools-development" },
          " for the people who actually move the stock.",
        ],
      ],
    },
    services: [
      "custom-software-development",
      "software-integrations",
      "internal-tools-development",
    ],
    relatedSolutions: ["repair-service-management", "business-dashboards"],
    relatedWork: [],
    faq: [
      {
        question: "When is generic inventory software the wrong fit?",
        answer:
          "When the business keeps a second record because the product cannot represent locations, job usage, reservations, or states that matter. If a standard warehouse workflow already matches the operation, replacing it is usually the wrong project.",
      },
      {
        question: "Can inventory stay tied to a job or repair?",
        answer:
          "Yes. That is a common reason to build rather than buy. Using a part on a job should be able to change what is available, and the job should show what it consumed.",
      },
      {
        question: "Can this connect to purchasing or accounting?",
        answer:
          "When those systems expose a way to exchange the facts that matter. SystemArc does not assume every product can be connected in every direction. The design names which system owns each fact.",
      },
      {
        question: "Do we have to replace the spreadsheet on day one?",
        answer:
          "The spreadsheet is evidence of the movement the official system missed. The useful project takes over the repeated counts and leaves truly one-off notes alone.",
      },
    ],
  },
  {
    slug: "scheduling-systems",
    number: "05",
    name: "Scheduling Systems",
    hubSummary:
      "For businesses whose scheduling, appointments, capacity, staff availability, resources, or booking rules do not fit generic scheduling software.",
    flow: {
      problem: "The calendar cannot hold the real rules",
      system: "Scheduling built around the operation",
      outcome: "Bookings follow staff, resources, and the constraints of the business",
    },
    metaTitle: "Custom Scheduling Systems | SystemArc",
    metaDescription:
      "SystemArc builds scheduling and booking systems around staff, capacity, resources, services, locations, availability, and business-specific rules.",
    eyebrow: "Scheduling systems",
    headline: "Scheduling gets complicated when the business is not generic.",
    layout: "constraints",
    intro: [
      [
        "A generic calendar assumes one person, one slot, and one appointment length. Real scheduling often depends on who is qualified, which room or piece of equipment is free, how long this service actually takes, and what else the day already promised.",
      ],
      [
        "SystemArc builds scheduling systems around those rules. The goal is a booking the operation can keep, not a slot that looks open and is not.",
      ],
    ],
    definition: {
      question: "What is a custom scheduling system?",
      answer: [
        [
          "A custom scheduling system is software that books time, people, and resources according to the availability, capacity, and rules of a particular business rather than a generic appointment model.",
        ],
      ],
    },
    signsHeading: "Signs a normal calendar is not the system",
    signs: [
      {
        title: "Multiple resources",
        body: "A booking needs a person and something else: a bay, a room, or a piece of equipment.",
      },
      {
        title: "Different appointment lengths",
        body: "Services do not share one duration, and the calendar pretends they do.",
      },
      {
        title: "Capacity rules",
        body: "The limit is not one event. It is how much the day, the staff, or the place can hold.",
      },
      {
        title: "Staff qualifications",
        body: "Not every person can do every appointment, and the tool does not know that.",
      },
      {
        title: "Location constraints",
        body: "The same service is not available in every place.",
      },
      {
        title: "Equipment requirements",
        body: "The person is free and the tool they need is not.",
      },
      {
        title: "Service dependencies",
        body: "One appointment only makes sense after another, or alongside it.",
      },
      {
        title: "Manual rescheduling",
        body: "A change means someone rebuilding the day by hand.",
      },
      {
        title: "Complex availability",
        body: "Hours, exceptions, and blackout rules live in a person's memory.",
      },
    ],
    includesHeading: "What a scheduling system could handle",
    includes: [
      { title: "Appointments", body: "A booking with the duration and the service the business actually offers." },
      { title: "Resource scheduling", body: "Rooms, bays, equipment, or other things that can be double-booked by accident." },
      { title: "Staff availability", body: "Who can work, when, and which services they can perform." },
      { title: "Capacity", body: "How many of a given kind of booking the operation can hold." },
      { title: "Waitlists", body: "A place for demand that does not fit the current day." },
      { title: "Notifications", body: "The customer or the team hears about a booking or a change." },
      { title: "Booking rules", body: "Lead time, buffers, dependencies, and the exceptions the business already uses." },
      { title: "Customer scheduling", body: "A customer books into rules the business defined, not into an empty grid." },
      { title: "Internal scheduling", body: "Staff arrange work the customer never sees, using the same capacity." },
      { title: "Calendar integrations", body: "A connection to a calendar the company already relies on, when that calendar should stay." },
    ],
    approachHeading: "How SystemArc approaches a scheduling problem",
    approach: [
      {
        title: "Write down a day that worked",
        body: "The real constraints show up in a full day, not in a settings screen.",
      },
      {
        title: "Separate people, places, and things",
        body: "A booking fails when any one of them was assumed to be free.",
      },
      {
        title: "Encode the rules people already enforce",
        body: "Buffers, qualifications, and dependencies should be the system's job if they are stable.",
      },
      {
        title: "Plan for the change",
        body: "Rescheduling and exceptions are part of the system, not a failure of it.",
      },
    ],
    useCasesHeading: "Custom scheduling is the conversation when the rules are the product",
    useCases: [
      {
        title: "Staff keep a shadow calendar",
        body: "The official tool is wrong often enough that people do not trust it.",
      },
      {
        title: "Customers can book something the business cannot perform",
        body: "The slot was open. The qualified person, the room, or the equipment was not.",
      },
      {
        title: "One change ripples through the day",
        body: "Moving an appointment means a person reconstructing everything that depended on it.",
      },
    ],
    aside: {
      heading: "A booking page is not a scheduling system",
      body: [
        [
          "Letting someone pick a time is the last step. The system is the set of rules that decide which times are real. If those rules are simple, a product you already pay for may be enough.",
        ],
        [
          "When they are not, the work is ",
          { text: "custom software", href: "/services/custom-software-development" },
          ", often a ",
          { text: "web application", href: "/services/web-application-development" },
          " for staff or customers, with ",
          { text: "integrations", href: "/services/software-integrations" },
          " to the calendar or CRM that should remain in place.",
        ],
      ],
    },
    services: [
      "custom-software-development",
      "web-application-development",
      "software-integrations",
    ],
    relatedSolutions: ["customer-portals", "repair-service-management"],
    relatedWork: [],
    faq: [
      {
        question: "Why not use a normal booking tool?",
        answer:
          "Use one when a single calendar and a single duration match the business. Build a scheduling system when bookings depend on staff qualifications, shared resources, capacity, locations, or dependencies a generic tool cannot represent.",
      },
      {
        question: "Can customers book their own time?",
        answer:
          "Yes, into rules the business defined. Customer scheduling and internal scheduling can share the same capacity so a public booking cannot take a slot the team already promised.",
      },
      {
        question: "Can it connect to a calendar we already use?",
        answer:
          "When that calendar can share availability or accept events. SystemArc checks what the existing tool allows before treating it as the source of truth.",
      },
      {
        question: "What happens when someone needs to reschedule?",
        answer:
          "The system should show what else the change affects: the person, the resource, and the customer. A reschedule that only moves one block and leaves the rest of the day inconsistent is not finished.",
      },
    ],
  },
  {
    slug: "repair-service-management",
    number: "06",
    name: "Repair & Service Management",
    hubSummary:
      "For repair and service businesses that need better workflow, customer communication, job status, intake, service history, and operational visibility.",
    flow: {
      problem: "The repair lives in people's heads",
      system: "A repair workflow",
      outcome: "Intake, status, parts, and customer communication stay on the job",
    },
    metaTitle: "Repair & Service Management Software Solutions | SystemArc",
    metaDescription:
      "SystemArc builds repair and service management systems around intake, job workflow, customer status, communication, service history, and shop operations.",
    eyebrow: "Repair and service",
    headline: "Repair software should follow the repair.",
    layout: "job",
    intro: [
      [
        "A repair is a job with a life: it is received, diagnosed, approved, worked, waiting on a part, and returned. Generic job software often stops at a ticket. The shop then keeps the real status at the counter, in a text, or in someone's memory.",
      ],
      [
        "SystemArc builds repair and service management systems around that life. The job, the customer, and the people doing the work should be looking at the same repair.",
      ],
    ],
    definition: {
      question: "What is repair management software?",
      answer: [
        [
          "Repair management software is a system that tracks a repair or service job from intake through status changes, communication, parts, approvals, and history, so the shop and the customer are not reconstructing the job from memory.",
        ],
      ],
    },
    signsHeading: "Signs the repair is not in the system",
    signs: [
      {
        title: "Status lives in people's heads",
        body: "Asking where a repair stands means asking a person, not opening the job.",
      },
      {
        title: "Customers repeatedly call for updates",
        body: "The shop knows. The customer has no place to see it.",
      },
      {
        title: "Intake information is incomplete",
        body: "The job starts without the details the next person will need.",
      },
      {
        title: "The counter and the bench disagree",
        body: "Technicians and front counter staff see different information.",
      },
      {
        title: "Communication is off the job",
        body: "Messages about the repair live in personal inboxes and texts.",
      },
      {
        title: "Parts, approvals, and status are separate",
        body: "Parts, approvals, and status changes are difficult to coordinate.",
      },
    ],
    includesHeading: "What a repair system could hold on the job",
    includes: [
      { title: "Repair intake", body: "The device, the problem, and the details captured when the job starts." },
      { title: "Job status", body: "A state the shop and, where you choose, the customer can both understand." },
      { title: "Customer portal", body: "A place for the customer to see that status without calling." },
      { title: "Technician workflow", body: "The bench's view of what to do next." },
      { title: "Internal notes", body: "Notes that stay on the job and are not all shown to the customer." },
      { title: "Customer communication", body: "Messages tied to the repair they are about." },
      { title: "Approvals", body: "A recorded yes or no before work or cost moves forward." },
      { title: "Parts status", body: "Whether a part is needed, ordered, or on the job." },
      { title: "Service history", body: "What this customer or device has already been through." },
      { title: "Notifications", body: "A status change can reach the person who needs it." },
      { title: "Documents", body: "Estimates and paperwork attached to the repair." },
      { title: "Photos", body: "Images of the device or the work, stored with the job." },
      { title: "Payments and integrations", body: "A connection to payment or other tools the shop already uses, when those should stay." },
    ],
    approachHeading: "How SystemArc follows a repair before building software",
    approach: [
      {
        title: "Walk one device through the shop",
        body: "Intake, diagnosis, approval, parts, work, and pickup are the system. The software has to survive that path.",
      },
      {
        title: "Separate the counter from the bench",
        body: "They share the job. They do not need the same screen.",
      },
      {
        title: "Decide what the customer may see",
        body: "Status can be visible without exposing every internal note.",
      },
      {
        title: "Attach parts and approvals to the job",
        body: "A repair that waits on a part or a yes should show that wait.",
      },
    ],
    useCasesHeading: "This is the problem when the ticket is not the repair",
    useCases: [
      {
        title: "The front counter is the status system",
        body: "Customers call, and someone looks up a job that is really a conversation.",
      },
      {
        title: "Technicians and the counter keep different notes",
        body: "The work moved. The record the customer hears about did not.",
      },
      {
        title: "History disappears between visits",
        body: "The next repair starts as if the last one never happened.",
      },
    ],
    aside: {
      heading: "RepairForge is the kind of system this problem asks for",
      body: [
        [
          "RepairForge is a SystemArc repair workflow and customer communication platform. It is designed around repair businesses so customers can see service more clearly and the shop can organize communication and workflow around active repairs.",
        ],
        [
          "That does not mean every shop receives RepairForge unchanged. It means SystemArc has built in this domain. A shop's system may still involve ",
          { text: "custom software", href: "/services/custom-software-development" },
          ", a ",
          { text: "customer portal", href: "/services/customer-portal-development" },
          ", and ",
          { text: "integrations", href: "/services/software-integrations" },
          " to payments or other tools the shop keeps. No performance numbers are claimed here.",
        ],
      ],
    },
    services: [
      "custom-software-development",
      "customer-portal-development",
      "software-integrations",
    ],
    relatedSolutions: ["customer-portals", "inventory-systems", "scheduling-systems"],
    relatedWork: [
      {
        slug: "repairforge",
        note: "is a SystemArc system designed around repair businesses. Customers get clearer service visibility. The shop organizes communication and workflow around active repairs. It shows the relationship a repair system has to support. It is not an outside client result, and no outcome numbers are attached to it.",
      },
    ],
    faq: [
      {
        question: "How is this different from a generic job tracker?",
        answer:
          "A generic tracker stores a ticket. Repair work also has intake, customer-visible status, approvals, parts, photos, and a counter that is not the bench. The system has to follow that repair, not only record that a ticket exists.",
      },
      {
        question: "Can customers see status without calling?",
        answer:
          "Yes, when the shop wants that status visible and updates the same record the customer reads. A portal that has its own status will drift from the shop.",
      },
      {
        question: "Does every repair business need a custom system?",
        answer:
          "No. If a product already matches intake, status, and how the shop communicates, use it. Custom software is for the workflow the current tool keeps forcing into texts, whiteboards, and side notes.",
      },
      {
        question: "What is RepairForge?",
        answer:
          "RepairForge is a SystemArc repair workflow and customer communication platform. It is relevant experience, not a promise that another shop will get the same screens or any particular result.",
      },
    ],
  },
  {
    slug: "reputation-customer-feedback",
    number: "07",
    name: "Reputation & Customer Feedback",
    hubSummary:
      "For businesses that need a structured system for collecting customer feedback, managing follow-up, and supporting reputation workflows.",
    flow: {
      problem: "Feedback depends on someone remembering",
      system: "A reputation workflow",
      outcome: "Requests and follow-up happen as part of the operation",
    },
    metaTitle: "Customer Feedback & Reputation Workflow Solutions | SystemArc",
    metaDescription:
      "SystemArc builds customer feedback and reputation workflows that organize review requests, follow-up, feedback collection, and customer engagement.",
    eyebrow: "Feedback and reputation",
    headline: "Turn customer feedback into a system, not an occasional task.",
    layout: "followup",
    intro: [
      [
        "Asking a customer what they thought should not depend on who remembered at the end of a busy day. When it does, follow-up is uneven, unhappy feedback arrives late, and the business cannot see the pattern.",
      ],
      [
        "SystemArc builds customer feedback systems that make the request, the response, and the follow-up part of the operation. The point is a reliable workflow. It is not a promise about ratings.",
      ],
    ],
    definition: {
      question: "What is a customer feedback system?",
      answer: [
        [
          "A customer feedback system is software that organizes when a business asks for feedback, where the response goes, and what follow-up happens next, instead of leaving those steps to memory.",
        ],
      ],
    },
    signsHeading: "Signs reputation work is still an occasional task",
    signs: [
      {
        title: "Requests depend on memory",
        body: "Review requests depend on employees remembering.",
      },
      {
        title: "Unhappy feedback arrives late",
        body: "The business hears about a problem after it has already left the building.",
      },
      {
        title: "Follow-up is inconsistent",
        body: "Some customers hear back. Others do not. The difference is who was working.",
      },
      {
        title: "Feedback lives in different places",
        body: "Customer feedback lives in inboxes, public reviews, and side notes.",
      },
      {
        title: "No structured workflow",
        body: "Businesses have no structured reputation workflow.",
      },
    ],
    includesHeading: "What a feedback workflow could include",
    includesIntro:
      "None of this hides a legitimate review or manufactures a rating. It organizes asking, listening, and following up.",
    includes: [
      { title: "Feedback requests", body: "A request goes out because a job or visit finished, not because someone remembered." },
      { title: "Review workflows", body: "The path from a completed service to a request is defined and visible." },
      { title: "Follow-up", body: "A response, especially an unhappy one, creates a next step a person owns." },
      { title: "Customer segmentation", body: "The business can treat different kinds of customers or jobs differently, on purpose." },
      { title: "Internal feedback", body: "A private response can reach the team before it is only a public review." },
      { title: "Notifications", body: "The person who should respond hears that feedback arrived." },
      { title: "Dashboard", body: "The team can see requests, responses, and what is waiting." },
      { title: "Engagement workflows", body: "Follow-up continues as part of the customer relationship, not as a one-off blast." },
      { title: "Integrations", body: "The workflow can start from the system that already knows a job is complete." },
    ],
    approachHeading: "How SystemArc treats feedback as an operation",
    approach: [
      {
        title: "Start from the completed job",
        body: "The moment the business could ask is usually already known. The miss is that nobody is assigned to ask.",
      },
      {
        title: "Separate public reviews from private response",
        body: "A customer should be able to tell the business something directly. That is not the same thing as gating a public review.",
      },
      {
        title: "Give unhappy feedback an owner",
        body: "A workflow that only celebrates positive responses is incomplete.",
      },
      {
        title: "Keep a record",
        body: "The team should be able to see what was asked, what came back, and what was done.",
      },
    ],
    useCasesHeading: "This fits when follow-up is real work and currently informal",
    useCases: [
      {
        title: "The request happens only on slow days",
        body: "Busy days, which are the ones customers remember, produce no ask.",
      },
      {
        title: "A complaint is a surprise",
        body: "The customer had no structured way to tell the business first.",
      },
      {
        title: "Nobody can say what happened after a review",
        body: "The public comment and the internal follow-up are not connected.",
      },
    ],
    aside: {
      heading: "A feedback system does not manufacture a reputation",
      body: [
        [
          "SystemArc will not build a workflow whose purpose is to suppress legitimate reviews, filter out unhappy customers from a public platform, or guarantee a rating. Those are not operational improvements. They misrepresent customers.",
        ],
        [
          "ReviewForge is a SystemArc reputation and customer engagement platform. It exists so businesses can run structured feedback and follow-up instead of disconnected manual work. It is not a claim about ratings.",
        ],
        [
          "The surrounding services are often ",
          { text: "business process automation", href: "/services/business-process-automation" },
          " and a ",
          { text: "web application", href: "/services/web-application-development" },
          " the team uses to see and answer what came back.",
        ],
      ],
    },
    services: ["business-process-automation", "web-application-development"],
    relatedSolutions: ["workflow-automation", "customer-portals"],
    relatedWork: [
      {
        slug: "reviewforge",
        note: "is a SystemArc platform for structured customer feedback and reputation workflows. It was built so follow-up does not depend on disconnected manual work. It is not described here as an outside client project, and it is not evidence of any particular rating.",
      },
    ],
    faq: [
      {
        question: "Will this improve our ratings?",
        answer:
          "SystemArc does not guarantee ratings. A workflow can make requests and follow-up consistent. What customers say is still what customers say.",
      },
      {
        question: "Can the system hide negative reviews?",
        answer:
          "No. SystemArc does not build tools to suppress or manipulate legitimate reviews. Private feedback and public reviews are different paths, and a negative public review is not something the system should bury.",
      },
      {
        question: "What should happen when feedback is unhappy?",
        answer:
          "A person should see it and own the follow-up. The system can route and record that step. It should not pretend the issue was resolved because a message was sent.",
      },
      {
        question: "What is ReviewForge?",
        answer:
          "ReviewForge is a SystemArc reputation and customer engagement platform for structured feedback workflows. It shows the kind of system this problem asks for. It is not a promise of results for another business.",
      },
    ],
  },
  {
    slug: "community-loyalty-platforms",
    number: "08",
    name: "Community & Loyalty Platforms",
    hubSummary:
      "For businesses and organizations that need customer communities, check-ins, participation tracking, loyalty concepts, events, engagement, or support systems.",
    flow: {
      problem: "Participation has no system",
      system: "A community and loyalty platform",
      outcome: "Check-ins, events, and engagement have a place to live",
    },
    metaTitle: "Community & Loyalty Platform Development | SystemArc",
    metaDescription:
      "SystemArc builds community, loyalty, check-in, event, participation, and engagement systems around real customer communities.",
    eyebrow: "Community and loyalty",
    headline: "Build systems for customers who do more than buy.",
    layout: "participation",
    intro: [
      [
        "Some businesses operate around communities, recurring participation, events, leagues, memberships, loyalty, or customer engagement that conventional retail software does not represent well.",
      ],
      [
        "A point of sale can record a purchase. It does not know who checked in, who attended, who participates every week, or how the business recognizes that. SystemArc builds systems for that layer of the relationship.",
      ],
    ],
    definition: {
      question: "What is a community platform?",
      answer: [
        [
          "A community platform is software for an ongoing relationship with customers or members: participation, events, profiles, and recognition, rather than a single transaction.",
        ],
      ],
    },
    signsHeading: "Signs the community is being run beside the software",
    signs: [
      {
        title: "Check-in is a clipboard",
        body: "Attendance is real, and the system of record is a list at the door.",
      },
      {
        title: "Loyalty is a concept without a record",
        body: "The business talks about recognition, and staff keep it in their heads.",
      },
      {
        title: "Events live in messages",
        body: "Who is coming, and who came, is reconstructed from chats.",
      },
      {
        title: "Retail software stops at the sale",
        body: "The purchase is recorded. The participation that defines the business is not.",
      },
      {
        title: "Members have no profile that matches the relationship",
        body: "The customer exists as a buyer, not as someone who shows up.",
      },
    ],
    includesHeading: "What a community system could include",
    includesIntro:
      "Only the pieces the community actually uses. Points and leaderboards are not required decoration.",
    includes: [
      { title: "Customer communities", body: "A place for the people who participate, not only the people who purchase." },
      { title: "Check-ins", body: "A record that someone was there." },
      { title: "Participation tracking", body: "Recurring involvement over time, in the terms the community uses." },
      { title: "Points", body: "A balance or recognition the business has actually defined." },
      { title: "Loyalty", body: "A structured way to acknowledge continued participation." },
      { title: "Events", body: "What is happening, who it is for, and what attendance meant." },
      { title: "Leaderboards", body: "A public or internal ordering, only when the community wants one." },
      { title: "Achievements", body: "Markers for participation the business chooses to recognize." },
      { title: "Membership concepts", body: "Access or status that is not the same thing as a receipt." },
      { title: "Customer profiles", body: "The relationship, not only the last transaction." },
      { title: "Event attendance", body: "Who came, tied to the event and the person." },
      { title: "Community activity", body: "The actions that matter between purchases." },
    ],
    approachHeading: "How SystemArc approaches a community that software does not see",
    approach: [
      {
        title: "Name the participation",
        body: "Check-in, event, league, visit, or membership. The system starts from the action that is real.",
      },
      {
        title: "Leave retail software in its lane",
        body: "If the point of sale already handles the sale, do not rebuild it to store attendance.",
      },
      {
        title: "Define recognition before points",
        body: "A points balance with no meaning is not loyalty. The rule comes first.",
      },
      {
        title: "Give staff an operational view",
        body: "The people running the day need check-in and exceptions, not only a public profile.",
      },
    ],
    useCasesHeading: "This is the problem when showing up is the business",
    useCases: [
      {
        title: "A venue or club runs on repeat visits",
        body: "The relationship is participation. The software only sees purchases.",
      },
      {
        title: "Events are organized in side tools",
        body: "Attendance, announcements, and follow-up do not meet.",
      },
      {
        title: "Recognition is informal",
        body: "Staff know the regulars. A new employee, and the customer, cannot see that history.",
      },
    ],
    aside: {
      heading: "PixelNation Systems is operational experience, not a template",
      body: [
        [
          "PixelNation Systems includes SystemArc-built community and operational systems around a gaming and technology business: community engagement, customer check-in, support points, events, and the tools staff use to run the day.",
        ],
        [
          "Those systems exist because that operation needed them. They are not a kit SystemArc copies onto another company, and no participation or revenue figures are claimed. Another community still needs ",
          { text: "custom software", href: "/services/custom-software-development" },
          ", usually as a ",
          { text: "web application", href: "/services/web-application-development" },
          ", shaped around its own events and rules.",
        ],
      ],
    },
    services: ["custom-software-development", "web-application-development"],
    relatedSolutions: ["customer-portals", "business-dashboards"],
    relatedWork: [
      {
        slug: "pixelnation-systems",
        note: "includes SystemArc-built community and operational systems: community engagement, customer check-in, support points, events, and internal tools for the people running the day. It is relevant here because participation, not only a sale, had to live in software. No metrics are attached.",
      },
    ],
    faq: [
      {
        question: "How is this different from a store or a social network?",
        answer:
          "A store records a purchase. A social network is a general place to post. A community platform records the participation a specific business already runs: check-ins, events, membership, or recognition. It should use that business's rules.",
      },
      {
        question: "Do we need points and leaderboards?",
        answer:
          "Only if they mean something the community already understands. SystemArc will not add them because they are common. Check-in, events, or membership may be the whole system.",
      },
      {
        question: "What does PixelNation Systems demonstrate?",
        answer:
          "It shows SystemArc building community, check-in, support-point, event, and operational tools around one gaming and technology business. It is not a template, and it is not a set of results another organization should expect.",
      },
      {
        question: "Can this connect to the system that already takes payment?",
        answer:
          "Often the payment system should stay. The community system records participation and can refer to a customer the business already knows, when that connection is available.",
      },
    ],
  },
];

export function getSolution(slug: string) {
  return solutions.find((solution) => solution.slug === slug);
}
