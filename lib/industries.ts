import type { Paragraph } from "@/lib/services";

export type IndustryItem = {
  title: string;
  body: string;
};

export type IndustryStage = {
  label: string;
  detail?: string;
};

export type IndustryReference = {
  slug: string;
  note: string;
};

export type IndustryWork = {
  slug: string;
  note: string;
};

export type IndustryLayout = "job" | "participation" | "extension" | "coordination";

export type IndustryPage = {
  slug: string;
  number: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  intro: readonly Paragraph[];
  hubReality: string;
  hubStages: readonly IndustryStage[];
  hubGaps: readonly string[];
  hubSystems: readonly string[];
  hubCapability: string;
  relevance: {
    question: string;
    answer: readonly Paragraph[];
  };
  operationHeading: string;
  operationIntro: readonly Paragraph[];
  stages: readonly IndustryStage[];
  problemsHeading: string;
  problemsIntro?: string;
  problems: readonly IndustryItem[];
  systemsHeading: string;
  systemsIntro?: string;
  systems: readonly IndustryItem[];
  positioning?: {
    heading: string;
    body: readonly Paragraph[];
    columns?: readonly { title: string; points: readonly string[] }[];
  };
  solutions: readonly IndustryReference[];
  services: readonly IndustryReference[];
  relatedWork: readonly IndustryWork[];
  relatedIndustries: readonly IndustryReference[];
  faq: readonly { question: string; answer: string }[];
  layout: IndustryLayout;
};

export function industryPath(slug: string) {
  return `/industries/${slug}`;
}

export const industries: readonly IndustryPage[] = [
  {
    slug: "repair-service-businesses",
    number: "01",
    name: "Repair & Service Businesses",
    metaTitle: "Custom Software for Repair & Service Businesses | SystemArc",
    metaDescription:
      "SystemArc builds custom software, customer portals, workflow automation, integrations, and operational systems for repair and service businesses.",
    eyebrow: "Repair and service",
    headline: "Software built around the repair workflow.",
    intro: [
      [
        "Repair businesses coordinate customers, devices or equipment, diagnostics, approvals, parts, technicians, communication, payments, and status changes through one ongoing job.",
      ],
      [
        "When those pieces live in disconnected systems, employees become the integration layer.",
      ],
      ["SystemArc builds systems around the repair itself."],
    ],
    hubReality:
      "A repair is one job that has to carry the customer, the device, the approval, the parts, and the status. When those live apart, the people at the counter become the connection.",
    hubStages: [
      { label: "Intake" },
      { label: "Diagnosis" },
      { label: "Approval" },
      { label: "Parts" },
      { label: "Return" },
    ],
    hubGaps: [
      "Status exists in employee memory.",
      "Customers repeatedly call for updates.",
      "Parts status is separate from repair status.",
    ],
    hubSystems: [
      "Repair workflow",
      "Customer repair portal",
      "Parts on the job",
      "Service history",
    ],
    hubCapability:
      "SystemArc builds custom software, customer portals, workflow automation, integrations, and operational systems around that job.",
    relevance: {
      question: "What software can be built for a repair business?",
      answer: [
        [
          "SystemArc builds custom software for repair and service businesses. The useful pieces are the ones the repair already requires: intake, workflow, a customer view of status, technician tools, approvals, parts, history, and notifications.",
        ],
        [
          { text: "RepairForge", href: "/work/repairforge" },
          " is a SystemArc repair workflow and customer communication platform. It is operational experience in this domain. It is not a shop count, a revenue figure, or a result another business should expect to inherit.",
        ],
      ],
    },
    operationHeading: "A repair is one job with several moments",
    operationIntro: [
      [
        "The device or equipment is received, diagnosed, approved, held for a part, worked, and returned. The customer, the front counter, and the technician meet that job at different moments. A useful system keeps one version of it.",
      ],
    ],
    stages: [
      {
        label: "Intake",
        detail: "The customer, the item, and the reported problem enter together.",
      },
      {
        label: "Diagnosis",
        detail: "Someone determines what is wrong and what the work will take.",
      },
      {
        label: "Approval",
        detail: "Cost or scope waits on a yes that should stay on the job.",
      },
      {
        label: "Parts and work",
        detail: "The repair proceeds, waits, or both, and the status should say which.",
      },
      {
        label: "Return",
        detail: "The customer gets the result. The shop keeps the history.",
      },
    ],
    problemsHeading: "Where repair operations break down",
    problemsIntro:
      "These are operational observations. A shop may have two of them or most of them. The system starts from the ones that are actually true.",
    problems: [
      {
        title: "Incomplete intake",
        body: "Customer intake is incomplete, so the next person starts without the details the job needs.",
      },
      {
        title: "Status in memory",
        body: "Status exists in employee memory. Asking where a repair stands means asking a person.",
      },
      {
        title: "Status calls",
        body: "Customers repeatedly call for updates the shop already has.",
      },
      {
        title: "Split communication",
        body: "Technician notes and customer communication are disconnected.",
      },
      {
        title: "Message approvals",
        body: "Approvals happen through messages, and the job does not show the answer.",
      },
      {
        title: "Parts beside the job",
        body: "Parts status is separate from repair status.",
      },
      {
        title: "Re-entered information",
        body: "Employees re-enter information that another system, or another person, already captured.",
      },
      {
        title: "Hard-to-find history",
        body: "Service history is difficult to retrieve the next time that customer or device comes in.",
      },
      {
        title: "No customer view",
        body: "Customers cannot see what is happening without contacting the shop.",
      },
      {
        title: "More than one truth",
        body: "Different employees have different versions of the truth.",
      },
    ],
    systemsHeading: "Systems SystemArc can build around a repair",
    systemsIntro:
      "Not every shop needs every piece. The list is the set of systems that can sit on the repair when the current tools do not.",
    systems: [
      {
        title: "Repair intake systems",
        body: "Capture the customer, the device or equipment, and the problem when the job starts.",
      },
      {
        title: "Repair workflow management",
        body: "Move the job through the states the shop actually uses.",
      },
      {
        title: "Customer repair portals",
        body: "Give the customer a place to see status without calling for a readout.",
      },
      {
        title: "Technician dashboards",
        body: "Show the bench the next repair, the notes, and what is blocking it.",
      },
      {
        title: "Status tracking",
        body: "Keep one status the counter and the technician can both read.",
      },
      {
        title: "Automated customer communication",
        body: "Send a status or a question because the job changed, not because someone remembered.",
      },
      {
        title: "Estimate and approval workflows",
        body: "Record the scope and the customer's yes before work or cost moves.",
      },
      {
        title: "Parts workflows",
        body: "Show whether a part is needed, ordered, or on the job.",
      },
      {
        title: "Service history",
        body: "Keep what this customer or device has already been through.",
      },
      {
        title: "Photo and document systems",
        body: "Attach images and paperwork to the repair they belong to.",
      },
      {
        title: "Internal notes",
        body: "Keep shop notes on the job without showing all of them to the customer.",
      },
      {
        title: "Notifications",
        body: "Tell the person who needs to act when a status, approval, or part changes.",
      },
      {
        title: "Reporting and operational dashboards",
        body: "Show open work, exceptions, and what is waiting, for the people running the day.",
      },
      {
        title: "Integrations with existing business software",
        body: "Connect payments, suppliers, or other tools the shop already uses, when those should stay.",
      },
    ],
    solutions: [
      {
        slug: "repair-service-management",
        note: "The repair solution starts from the job: intake, status, communication, and history.",
      },
      {
        slug: "customer-portals",
        note: "A portal is how a customer sees status and documents the shop already has.",
      },
      {
        slug: "workflow-automation",
        note: "Handoffs, approvals, and notifications can move when the job changes.",
      },
      {
        slug: "business-dashboards",
        note: "The counter and the bench need a shared view of open repairs and exceptions.",
      },
      {
        slug: "inventory-systems",
        note: "Parts used on a repair should stay tied to that repair.",
      },
    ],
    services: [
      {
        slug: "custom-software-development",
        note: "Custom software is for the part of the repair a current product keeps forcing into texts and side notes.",
      },
      {
        slug: "customer-portal-development",
        note: "The customer-facing status view is a portal, reading the same job the shop updates.",
      },
      {
        slug: "business-process-automation",
        note: "Repeatable status changes, requests, and notifications are automation once the steps are defined.",
      },
      {
        slug: "software-integrations",
        note: "Payments, suppliers, and other existing tools can stay if the job can exchange the facts it needs.",
      },
      {
        slug: "internal-tools-development",
        note: "Technician and counter views are internal tools. They do not need to be the same screen.",
      },
    ],
    relatedWork: [
      {
        slug: "repairforge",
        note: "is a SystemArc repair-business platform focused on customer status visibility, communication, and repair workflow. It is related work in this domain. It is not a count of shops, and it does not imply a result for another business.",
      },
    ],
    relatedIndustries: [
      {
        slug: "local-service-businesses",
        note: "Local service businesses share the job, the customer, and the handoffs. A repair is a specific version of that operation, with a device or piece of equipment at the center.",
      },
    ],
    faq: [
      {
        question: "What software can be built for a repair business?",
        answer:
          "Intake, repair workflow, a customer portal, technician views, estimate and approval handling, parts tied to the job, service history, notifications, dashboards, and integrations with software the shop already uses. The set depends on where that shop's repair actually breaks.",
      },
      {
        question: "Does a repair shop have to replace its current software?",
        answer:
          "No. If a tool already holds payments, accounting, or supplier orders, the useful work is often to connect it to the job. Custom software is for the part of the repair those tools do not carry.",
      },
      {
        question: "What is RepairForge?",
        answer:
          "RepairForge is a SystemArc repair workflow and customer communication platform. It is experience in this domain. It is not a promise that another shop receives the same screens or any particular result.",
      },
      {
        question: "Can customers check repair status without calling?",
        answer:
          "Yes, when the shop wants that status visible and the portal reads the same job the team updates. A separate customer status will drift from the shop.",
      },
    ],
    layout: "job",
  },
  {
    slug: "gaming-hobby-retail",
    number: "02",
    name: "Gaming & Hobby Retail",
    metaTitle: "Software for Gaming & Hobby Retail Businesses | SystemArc",
    metaDescription:
      "SystemArc builds community, event, loyalty, check-in, inventory, customer engagement, and operational systems for gaming and hobby retail businesses.",
    eyebrow: "Gaming and hobby retail",
    headline: "Gaming stores operate on more than transactions.",
    intro: [
      [
        "A modern gaming or hobby store may combine retail, trading cards, events, tournaments, leagues, communities, loyalty, trade-ins, preorders, repairs, memberships, and recurring customer participation.",
      ],
      [
        "Traditional retail software usually represents the transaction. It often does not represent the community around it.",
      ],
      ["SystemArc builds systems around both."],
    ],
    hubReality:
      "The store sells products and also runs events, leagues, check-ins, and repeat participation. The transaction system usually sees only the sale.",
    hubStages: [
      { label: "Visit" },
      { label: "Event" },
      { label: "Participation" },
      { label: "Purchase" },
    ],
    hubGaps: [
      "Events live in lists and messages.",
      "Check-in is separate from the customer record.",
      "Loyalty depends on staff remembering.",
    ],
    hubSystems: [
      "Community platform",
      "Check-in",
      "Events",
      "Loyalty and support points",
    ],
    hubCapability:
      "SystemArc builds community, event, loyalty, check-in, inventory, and operational systems around both the sale and the participation.",
    relevance: {
      question: "Can a gaming store build its own community or loyalty platform?",
      answer: [
        [
          "Yes, when participation is part of how the store operates. SystemArc builds operational systems for gaming and hobby retail businesses: community tools, check-in, events, loyalty, and the staff views required to run them.",
        ],
        [
          { text: "PixelNation Systems", href: "/work/pixelnation-systems" },
          " includes SystemArc-built community and operational software used around gaming and technology retail operations. It is not a template, and no participation or revenue figures are claimed.",
        ],
      ],
    },
    operationHeading: "A visit is more than a receipt",
    operationIntro: [
      [
        "A customer may check in, attend an event, pick up a preorder, trade something in, and buy a product in the same visit. The purchase can stay in the retail system. The rest of the visit still needs a record if the store runs on it.",
      ],
    ],
    stages: [
      {
        label: "Arrival",
        detail: "Check-in, if the store uses it, is the start of the visit rather than a clipboard.",
      },
      {
        label: "Participation",
        detail: "An event, a league night, or time in the store is activity, not a line item.",
      },
      {
        label: "Release or trade",
        detail: "A preorder, a new release, or a trade-in changes what the customer and the shelf are waiting on.",
      },
      {
        label: "Purchase",
        detail: "The sale can remain in the system that already handles it.",
      },
    ],
    problemsHeading: "What falls outside the transaction",
    problemsIntro:
      "These are parts of the operation a point-of-sale record often never sees. They are not a claim that every store runs all of them.",
    problems: [
      {
        title: "Community participation",
        body: "People come back to take part, and the system of record still only shows what they bought.",
      },
      {
        title: "Events and tournaments",
        body: "Events and tournaments are organized in side lists instead of on the customer.",
      },
      {
        title: "Customer check-ins",
        body: "Check-in proves someone was there, and then the list stays at the door.",
      },
      {
        title: "Loyalty and support programs",
        body: "Recognition and support programs depend on staff remembering who participates.",
      },
      {
        title: "Preorders",
        body: "A preorder is a promise before the product exists. It is easy to lose outside the daily sale.",
      },
      {
        title: "Product releases",
        body: "Release day is an operation: who is waiting, what arrived, and what can be picked up.",
      },
      {
        title: "Inventory",
        body: "Stock for events, singles, or held product does not always match a standard retail count.",
      },
      {
        title: "Trade-ins",
        body: "A trade-in has a condition and a destination. The shelf count updates late, if at all.",
      },
      {
        title: "Customer profiles",
        body: "The same person may be a buyer, a player, and a member, with no profile that holds all three.",
      },
      {
        title: "League participation",
        body: "A league is recurring. A receipt is not a season.",
      },
      {
        title: "Attendance",
        body: "Who came is reconstructed from messages after the event.",
      },
      {
        title: "Community rankings",
        body: "Rankings only work when the store has a rule. Otherwise they are a number with no meaning.",
      },
      {
        title: "Membership concepts",
        body: "Access or status is not the same thing as a purchase, and retail software often has nowhere to put it.",
      },
      {
        title: "Multi-category communities",
        body: "One store may host several games or hobbies. One generic customer type does not describe them.",
      },
      {
        title: "Retail and service together",
        body: "Repairs or other service work at the same counter are jobs, not transactions.",
      },
    ],
    systemsHeading: "What SystemArc can build for this operation",
    systemsIntro:
      "Points, leaderboards, and tournaments are included only when the store already runs them. A check-in and an event record may be the whole system.",
    systems: [
      {
        title: "Community platforms",
        body: "A place for the people who participate, not only the people who purchase.",
      },
      {
        title: "Customer check-in systems",
        body: "A record that someone was in the store or at the event.",
      },
      {
        title: "Event participation systems",
        body: "Who an event is for, who registered, and who attended.",
      },
      {
        title: "Loyalty systems",
        body: "Recognition for continued participation, using a rule the store has defined.",
      },
      {
        title: "Points and support systems",
        body: "A balance that means something in that community, such as support points.",
      },
      {
        title: "Tournament and event tools",
        body: "The operational side of a tournament or event, kept separate from the sale.",
      },
      {
        title: "Customer profiles",
        body: "Play, attendance, trade-ins, and purchases, where seeing them together helps the store.",
      },
      {
        title: "Preorder systems",
        body: "What a customer is waiting on, and whether it has arrived.",
      },
      {
        title: "Inventory workflow extensions",
        body: "Stock states a standard retail count does not represent, without replacing the register.",
      },
      {
        title: "Trade-in workflow tools",
        body: "Condition, offer, and what the trade-in becomes in inventory.",
      },
      {
        title: "Operational dashboards",
        body: "What staff need to run the day: check-ins, events, holds, and exceptions.",
      },
      {
        title: "Community leaderboards",
        body: "A ranking only when the community wants one and the rule is real.",
      },
      {
        title: "Customer communication workflows",
        body: "A message about an event, a release, or a pickup, tied to the reason it was sent.",
      },
    ],
    positioning: {
      heading: "The community is part of the operation.",
      body: [
        [
          "For many gaming stores, events and community participation are not simply marketing activities. They are part of customer retention, product discovery, repeat visits, and the overall store experience.",
        ],
        [
          "Systems should be able to represent that activity instead of treating every customer interaction as only a transaction. That is an operational description. It is not a claim about revenue or about how every store should be run.",
        ],
      ],
    },
    solutions: [
      {
        slug: "community-loyalty-platforms",
        note: "Community, check-in, events, loyalty, and participation are the subject of this solution.",
      },
      {
        slug: "inventory-systems",
        note: "Preorders, trade-ins, and held product need inventory states a standard count may not have.",
      },
      {
        slug: "business-dashboards",
        note: "Staff need a view of the day: who is here, what event is running, and what is waiting.",
      },
    ],
    services: [
      {
        slug: "custom-software-development",
        note: "The participation layer is custom when retail software has no place for it.",
      },
      {
        slug: "web-application-development",
        note: "Check-in, events, and customer profiles are usually a web application the store and the customer can both open.",
      },
    ],
    relatedWork: [
      {
        slug: "pixelnation-systems",
        note: "includes custom community, customer check-in, support-point, event, loyalty, and operational systems built around the needs of a gaming and technology retail business. It is SystemArc work. No performance results are claimed.",
      },
    ],
    relatedIndustries: [
      {
        slug: "retail-businesses",
        note: "The sale can still live in ordinary retail systems. The retail page is about the operational gaps around checkout. This page is about the community those gaps often sit beside.",
      },
    ],
    faq: [
      {
        question: "Can a gaming store build its own loyalty or community platform?",
        answer:
          "Yes. SystemArc builds community, check-in, event, loyalty, and support-point systems when participation is part of how the store operates. Points and leaderboards belong only when the store has defined what they mean.",
      },
      {
        question: "What does PixelNation Systems include?",
        answer:
          "PixelNation Systems includes SystemArc-built community and operational software used around gaming and technology retail operations: community engagement, customer check-in, support points, events, loyalty concepts, and internal tools. It is not a template, and it is not a set of results.",
      },
      {
        question: "Will this replace the store's point of sale?",
        answer:
          "Not by default. The sale can stay in the retail system. The community system records participation and can refer to a customer the store already knows, when that connection is available.",
      },
      {
        question: "Do events have to include tournaments and rankings?",
        answer:
          "No. A store might need check-in and attendance without leagues or leaderboards. The system should match the participation that already happens.",
      },
    ],
    layout: "participation",
  },
  {
    slug: "retail-businesses",
    number: "03",
    name: "Retail Businesses",
    metaTitle: "Custom Software & Automation for Retail Businesses | SystemArc",
    metaDescription:
      "SystemArc builds custom operational software, automation, dashboards, integrations, inventory workflows, and customer systems for retail businesses.",
    eyebrow: "Retail",
    headline: "Build around the operation behind the transaction.",
    intro: [
      ["POS and e-commerce platforms handle transactions well."],
      [
        "Retail operations often extend beyond checkout: inventory exceptions, preorders, customer communication, special orders, trade-ins, service workflows, loyalty, internal approvals, reporting, and multi-system data.",
      ],
      ["SystemArc works on those operational gaps."],
    ],
    hubReality:
      "Checkout can be settled while preorders, special orders, trade-ins, and exceptions still move by hand. The transaction is not the whole operation.",
    hubStages: [
      { label: "Sale" },
      { label: "Exception" },
      { label: "Handoff" },
      { label: "Record" },
    ],
    hubGaps: [
      "Preorders live outside the daily system.",
      "Special orders wait on a person.",
      "Reporting is assembled by hand.",
    ],
    hubSystems: [
      "Inventory workflows",
      "Integrations",
      "Operational dashboards",
      "Customer communication",
    ],
    hubCapability:
      "SystemArc connects or extends the systems a retailer already uses, and builds software only for the gap those systems do not cover.",
    relevance: {
      question: "When should a retail business build custom software?",
      answer: [
        [
          "When a repeated job does not fit the POS or commerce platform: a preorder, a special order, a trade-in, an approval, or a report someone assembles by hand. If connecting the current tools still leaves that job without a home, custom software is worth discussing.",
        ],
        [
          "SystemArc provides ",
          { text: "software integration", href: "/services/software-integrations" },
          " and ",
          { text: "automation", href: "/services/business-process-automation" },
          " for retail businesses so checkout can stay where it is. Replacing an established POS or e-commerce system is not the default.",
        ],
      ],
    },
    operationHeading: "The sale ends. The operation often does not.",
    operationIntro: [
      [
        "A transaction has a start and an end at the register or the checkout page. A preorder is promised before the product exists. A special order waits on a person. A trade-in has a condition. A service job at the same counter has a status. Those still have to be operated.",
      ],
    ],
    stages: [
      {
        label: "Sale",
        detail: "The transaction stays in the POS or commerce platform that already handles it.",
      },
      {
        label: "Exception",
        detail: "A preorder, special order, trade-in, or service job leaves the standard sale.",
      },
      {
        label: "Handoff",
        detail: "Someone has to approve, order, message, or move the exception.",
      },
      {
        label: "Record",
        detail: "The result has to land back in the systems the business already trusts.",
      },
    ],
    problemsHeading: "Operational work that sits past checkout",
    problemsIntro:
      "POS and e-commerce platforms are built for the transaction. The strain shows up in the work around it.",
    problems: [
      {
        title: "Inventory exceptions",
        body: "A count is reserved, split, damaged, or held, and the standard on-hand number hides that.",
      },
      {
        title: "Preorders",
        body: "Customers are waiting on product the business does not have yet.",
      },
      {
        title: "Customer communication",
        body: "Updates about an order or an exception go out from inboxes instead of the record.",
      },
      {
        title: "Special orders",
        body: "A one-off request depends on a person remembering to place it and to close it.",
      },
      {
        title: "Trade-ins",
        body: "Something comes in, is assessed, and should change inventory. The path is informal.",
      },
      {
        title: "Service workflows",
        body: "Work done at the counter after the sale is a job, and the receipt is not the job.",
      },
      {
        title: "Loyalty",
        body: "A loyalty idea exists, and the daily system does not represent it.",
      },
      {
        title: "Internal approvals",
        body: "A discount, a return, or an exception waits on a message.",
      },
      {
        title: "Reporting",
        body: "Someone exports and assembles the picture the operation needed this morning.",
      },
      {
        title: "Multi-system data",
        body: "The commerce platform, the POS, and a spreadsheet each hold part of the same fact.",
      },
    ],
    systemsHeading: "Systems that can sit beside checkout",
    systemsIntro:
      "These extend or connect the retail stack. They are not a replacement POS.",
    systems: [
      {
        title: "Inventory workflow extensions",
        body: "States and movements the current stock record does not represent.",
      },
      {
        title: "Preorder management",
        body: "Who is waiting, what was promised, and what has arrived.",
      },
      {
        title: "Special-order systems",
        body: "A request, the order placed for it, and the moment it is fulfilled.",
      },
      {
        title: "Customer portals",
        body: "A place for the customer to see an order, a hold, or a request.",
      },
      {
        title: "Internal dashboards",
        body: "Open exceptions, approvals, and work the floor still has to finish.",
      },
      {
        title: "Trade-in workflows",
        body: "Condition, offer, and the inventory result of a trade.",
      },
      {
        title: "Loyalty systems",
        body: "Recognition the retailer has actually defined, not a points balance with no rule.",
      },
      {
        title: "Staff tools",
        body: "The screen the people running the exception need, separate from the register.",
      },
      {
        title: "Product intake",
        body: "What arrived, against what was expected, including product that is not a normal receipt.",
      },
      {
        title: "Operational reporting",
        body: "The view used to run the day, read from the systems that already know.",
      },
      {
        title: "E-commerce integrations",
        body: "A connection to the commerce platform when orders or catalog data should move.",
      },
      {
        title: "POS integrations",
        body: "A connection to the point of sale when the sale should remain the source of the transaction.",
      },
      {
        title: "Customer communication",
        body: "Messages tied to the order or exception they are about.",
      },
      {
        title: "Automation",
        body: "A defined handoff, notification, or status change that no longer needs a person to push it.",
      },
    ],
    positioning: {
      heading: "Sometimes the best solution is to connect what already works.",
      body: [
        [
          "SystemArc does not replace an established POS or e-commerce system by default. Sometimes the best solution is to connect or extend the systems the retailer already uses.",
        ],
        [
          "Custom software is for the operational gap that remains after that connection is honest about what each system can do.",
        ],
      ],
      columns: [
        {
          title: "Leave this in place when it fits",
          points: [
            "The sale and the payment",
            "Standard product and stock records",
            "The commerce catalog customers already use",
            "Accounting that already receives the transaction",
          ],
        },
        {
          title: "Build or connect the gap",
          points: [
            "Preorders, special orders, and trade-ins",
            "Approvals and internal handoffs",
            "Customer updates about an exception",
            "Facts that have to move between systems",
          ],
        },
      ],
    },
    solutions: [
      {
        slug: "inventory-systems",
        note: "Inventory extensions belong here when products move in ways a standard retail count does not show.",
      },
      {
        slug: "workflow-automation",
        note: "Notifications, approvals, and status changes around an order can move without a person pushing each one.",
      },
      {
        slug: "business-dashboards",
        note: "The floor needs open exceptions and today's work, not only a report of what sold.",
      },
      {
        slug: "customer-portals",
        note: "A customer can see a preorder, a special order, or a held item without calling the store.",
      },
    ],
    services: [
      {
        slug: "software-integrations",
        note: "The usual first move is to connect the POS, commerce platform, or other system that should keep its job.",
      },
      {
        slug: "business-process-automation",
        note: "Defined handoffs and messages around those systems are automation, once the step is real.",
      },
      {
        slug: "custom-software-development",
        note: "Custom software is for the workflow the current retail products still cannot represent.",
      },
      {
        slug: "internal-tools-development",
        note: "Staff handling exceptions need a tool. They do not need a second register.",
      },
    ],
    relatedWork: [],
    relatedIndustries: [
      {
        slug: "gaming-hobby-retail",
        note: "When repeat visits are events, leagues, or check-ins, the operation is retail plus a community. That is a different page, with its own systems.",
      },
    ],
    faq: [
      {
        question: "When should a retail business build custom software?",
        answer:
          "When a repeated operational job does not fit the POS or commerce platform, and connecting those tools still leaves the work without a home. A preorder, a special order, a trade-in, an approval, or a hand-built report are common examples.",
      },
      {
        question: "Can custom software integrate with an existing POS?",
        answer:
          "Often yes. SystemArc provides software integration and automation for retail businesses so checkout can stay where it is. The first check is what that POS or commerce platform allows another system to read or update.",
      },
      {
        question: "Does SystemArc replace a POS or e-commerce platform?",
        answer:
          "No. The default is to keep a system that already handles the transaction and to build or connect the operational gap around it.",
      },
      {
        question: "What is an inventory workflow extension?",
        answer:
          "Software for a stock movement the current retail system does not represent well: a reservation, a transfer, a trade-in state, or a count tied to a job. It is not a second warehouse product unless the business actually needs one.",
      },
    ],
    layout: "extension",
  },
  {
    slug: "local-service-businesses",
    number: "04",
    name: "Local Service Businesses",
    metaTitle: "Custom Software for Local Service Businesses | SystemArc",
    metaDescription:
      "SystemArc builds scheduling, customer communication, workflow automation, portals, dashboards, integrations, and operational software for local service businesses.",
    eyebrow: "Local service",
    headline: "Less administration. Better operational flow.",
    intro: [
      [
        "Service businesses often depend on people coordinating appointments, customers, staff, jobs, estimates, approvals, communication, payments, and follow-up.",
      ],
      [
        "As the business grows, those handoffs can become the bottleneck.",
      ],
      ["SystemArc builds systems around the service workflow."],
    ],
    hubReality:
      "Appointments, estimates, jobs, and follow-up depend on people passing work along. The service itself is moving. The administration around it is the strain.",
    hubStages: [
      { label: "Request" },
      { label: "Schedule" },
      { label: "Job" },
      { label: "Follow-up" },
    ],
    hubGaps: [
      "Scheduling depends on someone who knows the day.",
      "Customers call for routine status.",
      "Follow-up depends on memory.",
    ],
    hubSystems: [
      "Scheduling",
      "Customer portal",
      "Job tracking",
      "Follow-up",
    ],
    hubCapability:
      "SystemArc builds scheduling, communication, portals, dashboards, and workflow systems around the service itself.",
    relevance: {
      question: "What can a customer portal do for a service business?",
      answer: [
        [
          "It can give a customer one place to see an appointment or a job, send information the business asked for, read a document, or approve an estimate. The portal should read the record the team already updates.",
        ],
        [
          "It reduces routine calls. It does not replace a person when the situation is an exception the screen was not built to handle.",
        ],
      ],
    },
    operationHeading: "The job starts before the appointment",
    operationIntro: [
      [
        "Someone takes the request, finds a time the business can keep, does the work, gets an approval when the scope changes, and follows up. The service is the job. The bottleneck is usually the handoff between those moments.",
      ],
    ],
    stages: [
      {
        label: "Request",
        detail: "The customer asks, and the details have to land in one place.",
      },
      {
        label: "Schedule",
        detail: "The time has to respect staff, capacity, and the rules of the work.",
      },
      {
        label: "Job",
        detail: "Estimates, approvals, notes, and status belong on the work, not in a thread.",
      },
      {
        label: "Follow-up",
        detail: "The next message or the next visit should not depend on who remembered.",
      },
    ],
    problemsHeading: "Where service administration piles up",
    problems: [
      {
        title: "Manual scheduling",
        body: "Scheduling depends on manual coordination, often on one person who knows the day.",
      },
      {
        title: "Routine status calls",
        body: "Customers call for routine status information the business already has.",
      },
      {
        title: "Repeated entry",
        body: "Staff repeatedly enter the same information into more than one place.",
      },
      {
        title: "Disconnected estimates",
        body: "Estimates and approvals are disconnected from the job they change.",
      },
      {
        title: "Memory follow-up",
        body: "Customer follow-up depends on memory.",
      },
      {
        title: "Scattered information",
        body: "Information lives across email, text messages, spreadsheets, and software.",
      },
      {
        title: "No shared view",
        body: "Managers cannot see the operation without asking employees.",
      },
      {
        title: "Almost the right software",
        body: "Existing software handles most — but not all — of the workflow.",
      },
    ],
    systemsHeading: "Systems that can carry the service workflow",
    systemsIntro:
      "A generic calendar or a generic inbox may already cover part of this. The build is the part they do not.",
    systems: [
      {
        title: "Scheduling systems",
        body: "Appointments that follow staff, capacity, locations, and the rules of the service.",
      },
      {
        title: "Customer portals",
        body: "Status, documents, requests, and approvals in one place for the customer.",
      },
      {
        title: "Estimate and approval workflows",
        body: "A scope and a yes or no, recorded on the job before the work changes.",
      },
      {
        title: "Job tracking",
        body: "One record of what was asked, what was agreed, and where the work stands.",
      },
      {
        title: "Internal dashboards",
        body: "Open jobs, today's schedule, and the exceptions a manager would otherwise ask about.",
      },
      {
        title: "Customer communication",
        body: "Messages tied to the appointment or the job, instead of a personal inbox.",
      },
      {
        title: "Document workflows",
        body: "Estimates, photos, and paperwork attached to the work they describe.",
      },
      {
        title: "Automated follow-up",
        body: "A defined next message after a job, sent because the job finished.",
      },
      {
        title: "CRM extensions",
        body: "The customer record the business already keeps, extended when it does not hold the job.",
      },
      {
        title: "Payment integrations",
        body: "A connection to payment when the invoice should stay in the system that already takes it.",
      },
      {
        title: "Reporting",
        body: "A view of work and follow-up, read from the job rather than assembled for a meeting.",
      },
      {
        title: "Staff tools",
        body: "The screen the person doing the work needs, which may not match the customer's view.",
      },
      {
        title: "AI-assisted administrative workflows",
        body: "Classification or extraction when a request arrives as unstructured text. A person stays responsible for the decision. This is not the default for scheduling or follow-up.",
      },
    ],
    solutions: [
      {
        slug: "scheduling-systems",
        note: "Scheduling is the constraint when staff, capacity, or resources do not fit a generic calendar.",
      },
      {
        slug: "customer-portals",
        note: "A portal answers the routine status and document questions customers currently call about.",
      },
      {
        slug: "workflow-automation",
        note: "Handoffs, reminders, and follow-up can move when the job reaches a known step.",
      },
      {
        slug: "reputation-customer-feedback",
        note: "A finished job can start a feedback request. That workflow does not guarantee a rating, and it does not hide a legitimate review.",
      },
    ],
    services: [
      {
        slug: "business-process-automation",
        note: "The repeated coordination — reminders, status, follow-up — is the automation, once the step is defined.",
      },
      {
        slug: "custom-software-development",
        note: "Custom software is for the job record the current tools keep splitting across inboxes and sheets.",
      },
      {
        slug: "customer-portal-development",
        note: "The customer's view of the appointment, the estimate, or the job is a portal.",
      },
      {
        slug: "software-integrations",
        note: "A CRM, a calendar, or a payment tool can stay when the workflow can use what it already knows.",
      },
      {
        slug: "ai-automation",
        note: "Only where a step is reading unstructured requests. Rules and notifications do not require it.",
      },
    ],
    relatedWork: [],
    relatedIndustries: [
      {
        slug: "repair-service-businesses",
        note: "A repair business is a local service operation with a device or piece of equipment at the center of the job. The repair page is that more specific workflow.",
      },
    ],
    faq: [
      {
        question: "What can a customer portal do for a service business?",
        answer:
          "It can show appointment or job status, collect information, share a document, or record an approval, using the record the business already keeps. It does not replace a person for an exception.",
      },
      {
        question: "When is ordinary scheduling software not enough?",
        answer:
          "When a booking depends on staff, capacity, locations, or resources a generic calendar cannot hold, or when the appointment is only the start of a job that still needs estimates, approvals, and follow-up.",
      },
      {
        question: "Can follow-up be part of the workflow?",
        answer:
          "Yes. A completed job can create a defined next step, including a request for feedback. That is an operational workflow. It is not a guarantee about ratings, and it is not a tool for suppressing legitimate reviews.",
      },
      {
        question: "Does every local service business need custom software?",
        answer:
          "No. If the current tools already cover scheduling, communication, and the job, use them. Custom software is for the handoff the business keeps doing by memory, email, and spreadsheets.",
      },
    ],
    layout: "coordination",
  },
];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}
