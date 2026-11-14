import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { JsonLd } from "@/components/json-ld";
import { Section, SectionHeading } from "@/components/section";
import { pageGraph, serviceNode } from "@/lib/schema";
import { contactEmail, createMetadata, siteUrl } from "@/lib/site";

const path = "/cybersecurity";
const title = "Cybersecurity Services for People & Small Businesses | SystemArc";
const description = "Practical cybersecurity reviews, account hardening, backup readiness, and security planning for small businesses and individuals. Scoping and authorization come first.";

export const metadata = createMetadata({
  title,
  description,
  path,
  absoluteTitle: true,
  index: true,
});

const offerings = [
  {
    number: "01",
    name: "Business Security Assessment",
    copy: "A defined review of account access, MFA, business devices, network settings, backups, and selected cloud configurations. You receive a prioritized findings report.",
    detail: "Assessment scope and pricing agreed before any work.",
  },
  {
    number: "02",
    name: "Security Hardening",
    copy: "Practical improvements to account protection, device settings, patch processes, backup recovery, and user permissions.",
    detail: "Changes are reviewed and approved before implementation.",
  },
  {
    number: "03",
    name: "Website & Application Security Review",
    copy: "Review authentication, authorization, application configuration, API exposure, and secure development practices for systems you own or are authorized to test.",
    detail: "Active testing requires separate written authorization.",
  },
  {
    number: "04",
    name: "Personal Digital Safety",
    copy: "Help with account security, scam awareness, device security, safer backups, and steps to take after a suspected account compromise.",
    detail: "We never ask you to share passwords through a website inquiry.",
  },
] as const;

const steps = [
  { number: "01", title: "Understand the risk", copy: "We discuss the devices, accounts, systems, or concerns you want addressed without collecting passwords or sensitive access details in the inquiry." },
  { number: "02", title: "Agree on scope", copy: "We set boundaries, written permission, deliverables, timing, and pricing before inspecting or testing any system." },
  { number: "03", title: "Review and document", copy: "We use non-disruptive assessment methods appropriate to the agreed scope and record findings without exposing confidential information." },
  { number: "04", title: "Prioritize improvements", copy: "We explain the important risks in plain language and provide a practical remediation plan and optional follow-up review." },
] as const;

const questions = [
  ["Will you try to break into our systems?", "Not as part of an initial security conversation. Intrusive testing is separately scoped and requires the system owner's explicit written approval, rules of engagement, and appropriate safeguards."],
  ["Can you guarantee we won't be hacked?", "No service can eliminate every risk. The goal is to identify weaknesses, improve protections, and help you respond more effectively if something goes wrong."],
  ["Do you help individuals?", "Yes. We can discuss account safety, device security, backup habits, scam awareness, and recovery planning for personal technology."],
  ["What should I share when I contact you?", "Describe the concern and the general type of device or business system. Never send passwords, recovery codes, API keys, customer exports, or sensitive incident evidence through an inquiry form."],
] as const;

export default function CybersecurityPage() {
  return (
    <>
      <JsonLd data={pageGraph({
        path,
        name: title,
        description,
        breadcrumbs: [
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Cybersecurity", path },
        ],
        mainEntityId: siteUrl + path + "#service",
        extra: [serviceNode({ name: "SystemArc Cybersecurity", description, url: siteUrl + path })],
      })} />
      <article>
        <header className="border-b border-steel bg-[#111e32]">
          <Container className="py-16 sm:py-24">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-electric-cobalt">SystemArc / Cybersecurity</p>
            <h1 className="mt-5 max-w-4xl font-serif text-4xl leading-[1.08] tracking-[-0.03em] text-warm-white sm:text-6xl">
              Protection that starts with people. And the systems they depend on.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-silver">
              A security problem does not have to become a business disaster. We help people and growing businesses understand their digital risks and take practical steps to reduce them.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <ButtonLink href="/start-a-project?scenario=security">Request a Security Conversation</ButtonLink>
              <ButtonLink href="#services" variant="secondary">Explore Services</ButtonLink>
            </div>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-silver">No security testing begins from a form submission. Every assessment requires a defined scope and appropriate authorization.</p>
          </Container>
        </header>

        <Section id="services" labelledBy="cyber-offerings" className="bg-carbon">
          <SectionHeading id="cyber-offerings" eyebrow="Where we help" title="Security work that solves real problems.">
            <p>Start with the risks that matter to your family, your staff, your customers, and your operations.</p>
          </SectionHeading>
          <div className="mt-12 grid gap-px border border-steel bg-steel md:grid-cols-2">
            {offerings.map((service) => (
              <div key={service.number} className="flex flex-col bg-graphite p-7 sm:p-9">
                <p className="font-mono text-xs text-electric-cobalt">{service.number} / Security service</p>
                <h3 className="mt-5 font-serif text-2xl text-warm-white">{service.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-silver sm:text-base">{service.copy}</p>
                <p className="mt-6 border-t border-steel pt-4 text-xs leading-6 text-silver">{service.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section labelledBy="cyber-approach" className="bg-graphite">
          <SectionHeading id="cyber-approach" eyebrow="Our approach" title="Understand. Secure. Improve.">
            <p>No scare tactics or mystery scores. Just clear scope, documented findings, and a plan you can act on.</p>
          </SectionHeading>
          <ol className="mt-12 grid gap-5 md:grid-cols-2">
            {steps.map((step) => (
              <li key={step.number} className="border border-steel bg-carbon p-7">
                <p className="font-mono text-xs text-electric-cobalt">{step.number}</p>
                <h3 className="mt-4 text-xl font-semibold text-warm-white">{step.title}</h3>
                <p className="mt-3 text-sm leading-7 text-silver">{step.copy}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section labelledBy="cyber-scope" className="bg-carbon">
          <SectionHeading id="cyber-scope" eyebrow="Clear boundaries" title="Responsible security work is permission-based.">
            <p>We only assess systems we own or are expressly authorized to review. More advanced penetration testing or forensic services are scoped separately based on qualifications, risk, and applicable legal requirements.</p>
            <p>Security findings are sensitive. We avoid collecting unnecessary information, limit access, and agree on reporting and data-handling expectations before work begins.</p>
          </SectionHeading>
        </Section>

        <Section labelledBy="cyber-faq" className="bg-graphite">
          <SectionHeading id="cyber-faq" eyebrow="Questions" title="Straight answers about security assessments." />
          <div className="mt-10 divide-y divide-steel border-y border-steel">
            {questions.map(([question, answer]) => (
              <details key={question} className="group py-6">
                <summary className="cursor-pointer text-lg font-medium text-warm-white">{question}</summary>
                <p className="mt-3 max-w-3xl leading-7 text-silver">{answer}</p>
              </details>
            ))}
          </div>
        </Section>

        <Section labelledBy="cyber-contact" className="bg-carbon">
          <div className="max-w-3xl">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-electric-cobalt">Take the first step</p>
            <h2 id="cyber-contact" className="mt-5 font-serif text-3xl text-warm-white sm:text-5xl">Protect what you've worked to build.</h2>
            <p className="mt-5 text-base leading-8 text-silver">Tell us what you want to protect and what concerns you. We'll discuss the appropriate next step and scope before making any commitments.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/start-a-project?scenario=security">Discuss Your Security Needs</ButtonLink>
              <Link href={"mailto:" + contactEmail + "?subject=SystemArc%20Cybersecurity%20Inquiry"} className="inline-flex min-h-12 items-center text-sm text-warm-white underline underline-offset-4">
                Email us directly
              </Link>
            </div>
            <p className="mt-5 text-sm text-silver">Please don't send account credentials, access tokens, or sensitive incident files through initial inquiries.</p>
          </div>
        </Section>
      </article>
    </>
  );
}
