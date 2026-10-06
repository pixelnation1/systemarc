/**
 * Case studies for SystemArc work.
 *
 * These are SystemArc-built systems, not outside client engagements.
 * `tags` exist so the hub can filter later. The hub does not filter yet.
 * Add a verified RepairForge feature to `capabilities` when it is confirmed.
 * Do not describe unverified product behavior.
 */

export type StudyLink = {
  slug: string;
  note: string;
};

export type StudyCapability = {
  title: string;
  text: string;
};

export type StudyProse = {
  kind: "prose";
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
};

export type StudyCapabilities = {
  kind: "capabilities";
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  items: readonly StudyCapability[];
};

export type StudyDiagram = {
  kind: "diagram";
  id: string;
  variant: "feedback" | "repair" | "checkin";
  eyebrow: string;
  title: string;
  intro: string;
  caption: string;
};

export type StudyGallery = {
  kind: "gallery";
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
};

export type StudyIndustry = {
  kind: "industry";
  id: string;
  slug: string;
  anchor: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
};

export type StudyRelated = {
  kind: "related";
  services: readonly StudyLink[];
  solutions: readonly StudyLink[];
};

export type StudyDemonstrates = {
  kind: "demonstrates";
  id: string;
  eyebrow: string;
  title: string;
  paragraphs: readonly string[];
};

export type StudySection =
  | StudyProse
  | StudyCapabilities
  | StudyDiagram
  | StudyGallery
  | StudyIndustry
  | StudyRelated
  | StudyDemonstrates;

export type CaseStudy = {
  slug: string;
  href: string;
  imageDir: "reviewforge" | "repairforge" | "pixelnation";
  number: string;
  name: string;
  category: string;
  /** Reserved for a future work-hub filter. Not rendered as controls. */
  tags: readonly string[];
  seoTitle: string;
  description: string;
  headline: string;
  question: string;
  answer: string;
  /** SoftwareApplication schema, only when one product is actually described. */
  softwareApplication: boolean;
  overview: readonly string[];
  sections: readonly StudySection[];
};

const gallery = (intro: string): StudyGallery => ({
  kind: "gallery",
  id: "product-views",
  eyebrow: "The product",
  title: "Product views",
  intro,
});

export const caseStudies: readonly CaseStudy[] = [
  {
    slug: "reviewforge",
    href: "/work/reviewforge",
    imageDir: "reviewforge",
    number: "01",
    name: "ReviewForge",
    category: "Reputation & Customer Engagement Platform",
    tags: ["reputation", "customer-engagement", "feedback", "workflow"],
    seoTitle: "ReviewForge | Reputation & Customer Engagement Platform | SystemArc",
    description:
      "See how SystemArc designed ReviewForge as a structured platform for customer feedback, review workflows, reputation management, and customer engagement.",
    headline: "Turning customer feedback into a system.",
    question: "What is ReviewForge?",
    answer:
      "ReviewForge is a software platform SystemArc built for structured customer feedback, review workflows, reputation management, and customer engagement.",
    softwareApplication: true,
    overview: [
      "ReviewForge is a software platform built around structured customer feedback, review workflows, reputation management, and customer engagement.",
      "Customer feedback should not depend entirely on employees remembering to ask for it, manually following up, or piecing together information across disconnected tools.",
      "ReviewForge turns that process into a system.",
    ],
    sections: [
      {
        kind: "prose",
        id: "context",
        eyebrow: "The context",
        title: "A platform for a process that usually has no owner.",
        paragraphs: [
          "SystemArc built ReviewForge. It is a reputation and customer engagement platform, and it is SystemArc work rather than an engagement for an outside client.",
          "The useful part is the approach. A repeated business activity was given a workflow, a place to live, and a view for the people responsible for it.",
        ],
      },
      {
        kind: "prose",
        id: "problem",
        eyebrow: "The problem",
        title: "Reputation management is often treated like a task instead of a workflow.",
        paragraphs: [
          "Review requests often depend on an employee remembering to ask. When the day gets busy, the ask is easy to skip, and the next person has no record that it was skipped.",
          "Follow-up is inconsistent for the same reason. One customer hears back. Another does not. The difference is whoever happened to be free, not a process the business can see.",
          "Feedback can arrive through a review site, a message, a phone call, or a comment at the counter. Without a shared path, those channels stay disconnected. A business may have no structured way to understand customer sentiment. Engagement can stop when the transaction ends. Managers may have little visibility into whether the feedback process happened at all.",
          "These are ways the work commonly breaks down. They are not a description of every business.",
        ],
      },
      {
        kind: "prose",
        id: "system",
        eyebrow: "The system",
        title: "Feedback becomes a path with a result.",
        paragraphs: [
          "ReviewForge organizes customer feedback and reputation workflows into a repeatable system. The activity has a path, and the business can see whether the path was followed.",
          "A customer interaction can enter a feedback workflow. From there, the path can lead to a review request or to internal feedback. Follow-up continues the interaction. The business gets visibility into the process.",
          "Review requests are invitations to people who had the experience. The platform does not hide legitimate feedback, and it does not promise a rating.",
        ],
      },
      {
        kind: "capabilities",
        id: "built",
        eyebrow: "What we built",
        title: "The parts of the platform.",
        intro: "These are the capabilities ReviewForge is built around.",
        items: [
          {
            title: "Customer feedback workflows",
            text: "A defined path for collecting feedback, so the ask is part of the operation instead of a favor someone remembers.",
          },
          {
            title: "Review request workflows",
            text: "A repeatable way to invite a customer to leave a review after the experience, and to keep that invitation attached to the interaction.",
          },
          {
            title: "Customer engagement",
            text: "The relationship can continue after the transaction, as a structured interaction rather than a one-off reminder.",
          },
          {
            title: "Business dashboard",
            text: "A view of the feedback process for the people running it, so the work is visible beyond the person who sent the last message.",
          },
          {
            title: "Follow-up processes",
            text: "A next step after the first request, so a missed moment does not end the workflow.",
          },
          {
            title: "Automation",
            text: "Routing and follow-up can move with the workflow, instead of being rebuilt by hand each time.",
          },
          {
            title: "Structured customer interaction",
            text: "The conversation has a place to live, rather than being split across whoever happened to talk to the customer.",
          },
        ],
      },
      {
        kind: "diagram",
        id: "workflow",
        variant: "feedback",
        eyebrow: "How the pieces connect",
        title: "From the interaction to a view of the process.",
        intro:
          "The path below is the conceptual workflow ReviewForge is organized around.",
        caption:
          "Conceptual workflow. It shows how the activity is organized. It is not a diagram of servers, vendors, or integrations.",
      },
      gallery(
        "Screenshots of the working product belong in these frames. A frame stays empty until a real view is available.",
      ),
      {
        kind: "related",
        services: [
          {
            slug: "web-application-development",
            note: "ReviewForge is browser-based software with a workflow and a record, which is the kind of product this service describes.",
          },
          {
            slug: "business-process-automation",
            note: "The follow-up path is the process. Automation matters once that path is defined and has a place to live.",
          },
          {
            slug: "custom-software-development",
            note: "The platform exists because the workflow needed its own system, not a pile of reminders across other tools.",
          },
        ],
        solutions: [
          {
            slug: "reputation-customer-feedback",
            note: "The solution page describes the business problem. ReviewForge is a system built around that problem.",
          },
          {
            slug: "workflow-automation",
            note: "Asking, following up, and recording the result are one workflow. That is the connection.",
          },
          {
            slug: "business-dashboards",
            note: "The business dashboard is how the people running feedback see the process, not a separate report about it.",
          },
        ],
      },
      {
        kind: "demonstrates",
        id: "demonstrates",
        eyebrow: "What this demonstrates",
        title: "A repeated task can become a system.",
        paragraphs: [
          "ReviewForge demonstrates SystemArc's approach to taking a business activity that is often handled inconsistently and designing a structured workflow around it.",
          "The work is the system: a path for feedback, a way to follow up, and a view of the process for the business.",
        ],
      },
    ],
  },
  {
    slug: "repairforge",
    href: "/work/repairforge",
    imageDir: "repairforge",
    number: "02",
    name: "RepairForge",
    category: "Repair Workflow & Customer Communication Platform",
    tags: ["repair", "customer-communication", "workflow", "operations"],
    seoTitle:
      "RepairForge | Repair Workflow & Customer Communication Platform | SystemArc",
    description:
      "See how SystemArc designed RepairForge around repair workflow, customer status visibility, service communication, and repair-business operations.",
    headline: "Build the system around the repair.",
    question: "What is RepairForge?",
    answer:
      "RepairForge is a repair workflow and customer communication platform built by SystemArc. It is designed around customer status visibility, service communication, and the operation of a repair business.",
    softwareApplication: true,
    overview: [
      "RepairForge is a platform designed around repair-business workflow and customer communication.",
      "A repair moves through multiple stages. Intake, diagnosis, estimate, approval, parts, repair, testing, completion, and pickup are stages a job may pass through. Not every repair follows that full list, and not every shop names the stages the same way.",
      "Customers want visibility. Employees need operational clarity. RepairForge is designed around that shared workflow.",
    ],
    sections: [
      {
        kind: "prose",
        id: "context",
        eyebrow: "The context",
        title: "One job, seen from more than one role.",
        paragraphs: [
          "SystemArc built RepairForge. It is a repair workflow and customer communication platform, and it is SystemArc work rather than an engagement for an outside client.",
          "The repair is the object the software understands. Everyone involved is looking at that job from the role they actually have.",
        ],
      },
      {
        kind: "prose",
        id: "problem",
        eyebrow: "The problem",
        title: "The repair is one job. The information around it is often fragmented.",
        paragraphs: [
          "Customer intake, repair status, technician notes, approvals, parts status, customer communication, service history, and notifications are all part of the same job. They often live in different places.",
          "When they do, employees become responsible for manually keeping everything synchronized. A customer asks where the repair stands. Someone has to reconstruct the answer from notes, messages, and memory.",
        ],
      },
      {
        kind: "prose",
        id: "system",
        eyebrow: "The system",
        title: "The workflow is shared. The views are not identical.",
        paragraphs: [
          "RepairForge is organized around customer status visibility, the repair workflow, service communication, operational tools, and automation.",
          "The customer needs to know where the repair stands. The shop needs the notes, the approval, the parts, and the next action. Those are different views of one process, not two processes that someone has to reconcile at the counter.",
        ],
      },
      {
        kind: "diagram",
        id: "workflow",
        variant: "repair",
        eyebrow: "How the pieces connect",
        title: "Two views of the same repair.",
        intro:
          "Customer visibility and shop operations run alongside the workflow. They are not separate jobs.",
        caption:
          "Conceptual workflow. A repair may skip or rename a stage. This is not a diagram of shop equipment or of specific integrations.",
      },
      {
        kind: "prose",
        id: "operation",
        eyebrow: "The operation",
        title: "Software works better when the workflow is understood.",
        paragraphs: [
          "RepairForge reflects a broader SystemArc approach: understand the real operation before designing the software.",
          "Repair businesses coordinate customers, devices or equipment, technicians, approvals, parts, communication, and status changes around one ongoing service job. The software should understand that relationship.",
        ],
      },
      {
        kind: "capabilities",
        id: "built",
        eyebrow: "What we built",
        title: "What the platform is designed to hold.",
        intro: "These are the capabilities RepairForge is designed around.",
        items: [
          {
            title: "Customer status visibility",
            text: "The customer can see where the repair stands, from the same job the shop is working.",
          },
          {
            title: "Repair workflow",
            text: "The job moves through the stages the shop actually uses, with the record staying attached to the repair.",
          },
          {
            title: "Service communication",
            text: "Updates belong to the repair, so the message and the job stay together.",
          },
          {
            title: "Operational tools",
            text: "The shop has a working view of the same job: the status, the communication, and the work still open.",
          },
          {
            title: "Automation",
            text: "Status and the next communication can follow the workflow, instead of depending on someone remembering to send an update.",
          },
        ],
      },
      gallery(
        "Screenshots of the working product belong in these frames. A frame stays empty until a real view is available.",
      ),
      {
        kind: "industry",
        id: "industry",
        slug: "repair-service-businesses",
        anchor: "Software for repair and service businesses",
        eyebrow: "Industry",
        title: "Built around the repair business.",
        paragraphs: [
          "RepairForge is the working system behind SystemArc's view of repair and service businesses: one service job, shared information, and a workflow the customer and the shop can both follow.",
        ],
      },
      {
        kind: "related",
        services: [
          {
            slug: "custom-software-development",
            note: "The repair needed a system shaped around the job. That is custom software, built from the workflow rather than from a generic ticket list.",
          },
          {
            slug: "customer-portal-development",
            note: "Customer status visibility is the customer's door into the same repair the shop is already running.",
          },
          {
            slug: "business-process-automation",
            note: "Once the stages are defined, status and communication can move with the job instead of being copied between people.",
          },
          {
            slug: "internal-tools-development",
            note: "Shop operations are the internal view: notes, approvals, parts, and the next action on the repair.",
          },
          {
            slug: "software-integrations",
            note: "A shop may already have software that should stay. Connecting that software is a separate decision from the workflow itself.",
          },
        ],
        solutions: [
          {
            slug: "repair-service-management",
            note: "The solution page describes the operational problem. RepairForge is a platform designed around it.",
          },
          {
            slug: "customer-portals",
            note: "The customer view is a portal onto the repair, not a second record of it.",
          },
          {
            slug: "workflow-automation",
            note: "Intake through completion is one workflow, with communication attached to the stage the job is in.",
          },
          {
            slug: "business-dashboards",
            note: "The shop's operational view is how the open work stays visible: status, communication, and what is still unfinished.",
          },
        ],
      },
      {
        kind: "demonstrates",
        id: "demonstrates",
        eyebrow: "What this demonstrates",
        title: "One workflow. Different views. Shared information.",
        paragraphs: [
          "A well-designed operational system can give customers, technicians, front-counter staff, and management the information appropriate to their role, while the underlying workflow stays connected.",
          "RepairForge is built on that idea. The customer and the shop are looking at different views of the same repair.",
        ],
      },
    ],
  },
  {
    slug: "pixelnation-systems",
    href: "/work/pixelnation-systems",
    imageDir: "pixelnation",
    number: "03",
    name: "PixelNation Systems",
    category: "Community, Loyalty & Operational Systems",
    tags: ["community", "loyalty", "retail-operations", "check-in"],
    seoTitle: "PixelNation Systems | Community & Operational Software | SystemArc",
    description:
      "Explore SystemArc-built community, customer check-in, support-point, event, loyalty, and operational systems designed around PixelNation's gaming and technology retail operation.",
    headline: "Building software around the business itself.",
    question: "What are PixelNation Systems?",
    answer:
      "PixelNation Systems are custom operational systems SystemArc built around PixelNation's gaming and technology retail operation. They cover community, customer check-in, Support Points, events, loyalty concepts, and the work of running that operation.",
    softwareApplication: false,
    overview: [
      "PixelNation is a gaming and technology retail business whose operation extends beyond the transaction at the counter.",
      "SystemArc built custom systems around the operational needs that come with that: gaming communities, customer check-ins, events, participation, support points, loyalty concepts, and the retail operation itself.",
      "This page is about what that software demonstrates.",
    ],
    sections: [
      {
        kind: "prose",
        id: "context",
        eyebrow: "The context",
        title: "An operation that does not end at checkout.",
        paragraphs: [
          "SystemArc built custom operational systems around PixelNation's gaming and technology retail operation. PixelNation is part of that work. It is not presented here as an outside client result.",
          "The relevant operational areas are gaming communities, customer check-ins, events, customer participation, support points, loyalty concepts, and retail operations. The systems were designed around those needs.",
        ],
      },
      {
        kind: "prose",
        id: "problem",
        eyebrow: "The problem",
        title: "Traditional retail software sees the transaction.",
        paragraphs: [
          "Gaming and hobby retail can involve far more than checkout. Customers may participate in communities, events, leagues, organized play, trade nights, recurring activities, loyalty programs, and support programs.",
          "Traditional transaction systems may not represent those relationships well. The sale is recorded. The participation often is not. That is an opening for custom operational software.",
        ],
      },
      {
        kind: "prose",
        id: "system",
        eyebrow: "The system",
        title: "A community platform with participation attached.",
        paragraphs: [
          "PixelNation Systems includes a community platform supporting multiple gaming communities.",
          "It includes customer check-in concepts and Support Points tied to community participation. Event workflows, loyalty concepts, and internal operational tools are part of the same body of systems, built around how the operation actually runs.",
        ],
      },
      {
        kind: "diagram",
        id: "workflow",
        variant: "checkin",
        eyebrow: "How the pieces connect",
        title: "From a visit to recorded participation.",
        intro:
          "The path below is the conceptual check-in workflow. It uses only the relationships this page actually describes.",
        caption:
          "Conceptual workflow. A check-in can continue into a community, participation, and Support Points. It is not a diagram of store infrastructure.",
      },
      {
        kind: "prose",
        id: "operations",
        eyebrow: "The operation",
        title: "Activity that standard retail software may not model.",
        paragraphs: [
          "Custom systems can represent operational activity that a transaction platform was never asked to hold. Event participation, community membership, check-ins, support points, customer engagement, and the workflows staff use to run those activities are examples.",
          "PixelNation Systems were designed around that kind of activity. Event workflows and loyalty concepts sit with the community, the check-in, and Support Points as part of how the operation is represented.",
        ],
      },
      {
        kind: "prose",
        id: "between",
        eyebrow: "Connect before replacing",
        title: "The best software opportunities are often hiding between existing systems.",
        paragraphs: [
          "PixelNation can still use established platforms for transactions and commerce. Custom software does not necessarily replace those systems.",
          "It can represent the workflows and customer relationships those platforms were never designed to handle. The approach is connect before replacing.",
        ],
      },
      gallery(
        "Screenshots of the working product belong in these frames. A frame stays empty until a real view is available.",
      ),
      {
        kind: "industry",
        id: "industry",
        slug: "gaming-hobby-retail",
        anchor: "Operational software for gaming and hobby retail",
        eyebrow: "Industry",
        title: "Software around the retail operation.",
        paragraphs: [
          "The industry page describes gaming and hobby retail as an operation of communities, events, and repeat participation. PixelNation Systems are custom software SystemArc built around one business that works that way.",
        ],
      },
      {
        kind: "related",
        services: [
          {
            slug: "custom-software-development",
            note: "The systems exist because the operation needed records a standard retail product was not built to keep.",
          },
          {
            slug: "web-application-development",
            note: "Community, check-in, and participation are software people use, not pages that only describe the store.",
          },
          {
            slug: "internal-tools-development",
            note: "Staff still have to run the day. Internal operational tools are part of the same systems.",
          },
          {
            slug: "software-integrations",
            note: "Transaction and commerce platforms can stay. Integration is how a new system respects software that already does its job.",
          },
          {
            slug: "business-process-automation",
            note: "Check-in, participation, and Support Points are a path. Once that path is defined, it should not depend on someone remembering the next step.",
          },
        ],
        solutions: [
          {
            slug: "community-loyalty-platforms",
            note: "The solution page describes community and loyalty as an operational problem. PixelNation Systems are software built around that kind of operation.",
          },
          {
            slug: "workflow-automation",
            note: "A visit can continue into a community, participation, and Support Points. That continuation is a workflow.",
          },
          {
            slug: "business-dashboards",
            note: "Check-ins, participation, and Support Points are operational records. They are the kind of information a business needs in view while the day is still open.",
          },
        ],
      },
      {
        kind: "demonstrates",
        id: "demonstrates",
        eyebrow: "What this demonstrates",
        title: "Software can represent what makes a business different.",
        paragraphs: [
          "PixelNation Systems demonstrates SystemArc's ability to identify operational needs that are specific to how a business actually works, and to build software around those needs.",
          "Established platforms can stay when they already perform their jobs. The custom systems cover the relationships those platforms were not designed to represent.",
        ],
      },
    ],
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
