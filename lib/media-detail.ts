import type { ProjectArea } from "@/lib/inquiry/model";

export const mediaDetails = [
  {
    id: "strategy", area: "Brand / Content Strategy" as ProjectArea,
    title: "Brand & content strategy", headline: "Find your angle. Own your story.",
    intro: "Turn what makes your business valuable into a clear message, a relevant content plan, and a reason for people to choose you.",
    fit: "For a brand entering a new market, sharpening its positioning, or publishing without a clear direction.",
    outputs: [
      ["Audience & channel review", "Review your existing content, customer questions, competitors, and the channels where your audience spends time."],
      ["Positioning & messaging", "Define the audience, core promise, supporting proof, tone of voice, and the objections your content needs to answer."],
      ["Content pillars & formats", "Build repeatable themes and platform-specific formats around customer needs, product value, and brand perspective."],
      ["Activation roadmap", "Prioritize channels, production needs, approval responsibilities, and the first set of content tests."],
    ],
    inputs: "Your business goals, customer insights, existing brand materials, past content, and any available performance data.",
    measures: "Clarity of messaging, audience response, qualified traffic, and the performance of agreed content tests. Strategy establishes the baseline for execution.",
    example: ["A service business with an unclear offer", "Turn recurring customer questions into educational videos, proof-led service pages, and a clearer call to book a consultation."],
  },
  {
    id: "creative", area: "Content / Video Production" as ProjectArea,
    title: "Content & creative production", headline: "Give people something worth watching.",
    intro: "Build a repeatable supply of useful, distinctive content from the people, products, and expertise already inside your business.",
    fit: "For businesses that need consistent short-form video, a product launch, stronger ad creative, or a recognizable brand voice.",
    outputs: [
      ["Creative concepts & shot plan", "Agree on the message, hooks, formats, locations, talent, and footage needed before production starts."],
      ["Content production", "Plan a content session or work from approved client footage. Capture product demonstrations, founder perspectives, customer questions, and behind-the-scenes stories."],
      ["Editing & platform versions", "Shape the story with captions, sound, framing, and aspect ratios appropriate to the agreed platforms."],
      ["Asset handoff & iteration", "Deliver approved exports and organize creative variations for publishing or testing. Revision rounds and source-file access are defined in the scope."],
    ],
    inputs: "Brand guidelines, access to products and approved people or locations, production availability, and any footage you already own the rights to use.",
    measures: "Watch time, retention, saves, shares, clicks, and conversion signals where tracking is available. We compare creative variations against the objective, not just view counts.",
    example: ["One product, several reasons to care", "Develop a demonstration, an answer to a common objection, and a maker story. Each becomes a distinct creative angle instead of three copies of the same ad."],
  },
  {
    id: "social", area: "Social Media Management" as ProjectArea,
    title: "Social media management", headline: "Show up like your brand means it.",
    intro: "Connect your day-to-day social presence to a clear editorial direction, a reliable publishing rhythm, and the conversations your customers are having.",
    fit: "For teams with inconsistent posting, scattered approvals, or a social presence that does not reflect the quality of the business.",
    outputs: [
      ["Channel & editorial plan", "Choose channels based on audience and available resources. Agree on themes, posting cadence, and the role of each platform."],
      ["Copy & publishing calendar", "Prepare platform-specific copy, assemble approved assets, and give your team a clear review schedule."],
      ["Publishing & response workflow", "Schedule approved content and define who handles comments, questions, complaints, and sensitive issues. Community coverage is agreed in the scope."],
      ["Monthly learning review", "Review what resonated, what drove useful actions, and what to change in the next content cycle."],
    ],
    inputs: "Appropriate account access, an authorized approver, brand guidelines, customer-service escalation contacts, and an agreed source of content.",
    measures: "Audience engagement, meaningful conversations, profile actions, qualified website traffic, and inquiries where attributable. Content production and response coverage are scoped explicitly.",
    example: ["A store with more happening than people realize", "Turn product arrivals, staff expertise, events, and customer questions into recurring series with a consistent path to shop, attend, or ask for help."],
  },
  {
    id: "paid-media", area: "Paid Media / Advertising" as ProjectArea,
    title: "Paid media & creative testing", headline: "Make every test teach you something.",
    intro: "Connect the offer, audience, creative, and landing experience in a campaign plan built around a business objective.",
    fit: "For businesses with a defined offer that need to test demand, generate qualified inquiries, or improve an existing campaign.",
    outputs: [
      ["Campaign & measurement plan", "Agree on the offer, audience, platform, budget, conversion event, and reporting baseline before launching."],
      ["Creative test matrix", "Test distinct messages, hooks, and formats with a manageable budget. Give each test a clear question to answer."],
      ["Launch & optimization", "Check destinations and available tracking, launch within the approved budget, and adjust based on performance and business feedback."],
      ["Business-focused reporting", "Review spend, conversion signals, lead quality, and next actions. Separate observed results from estimates and attribution limits."],
    ],
    inputs: "An offer, approved advertising budget, appropriate ad-account access, landing pages, brand assets, and a way to evaluate lead or purchase quality.",
    measures: "Cost per qualified inquiry or purchase, conversion rate, and revenue where reliably attributable. Ad spend is separate from agency fees; platforms and production are agreed before launch.",
    example: ["A campaign that gets clicks but few inquiries", "Review the offer and landing page, test clearer messages, and evaluate lead quality alongside cost per lead before increasing spend."],
  },
] as const;

export function mediaBriefHref(service?: string) {
  return `/start-a-project?type=media${service ? `&service=${encodeURIComponent(service)}` : ""}`;
}
