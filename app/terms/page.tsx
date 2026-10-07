import Link from "next/link";
import { LegalDocument, LegalList, LegalSection } from "@/components/legal-document";
import { contactEmail, createMetadata } from "@/lib/site";

const title = "Website Terms of Use";
const description =
  "Review the terms governing use of the SystemArc website, project inquiries, website content, and communications.";

export const metadata = createMetadata({
  title,
  description,
  path: "/terms",
});

const textLink =
  "text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt";

export default function TermsPage() {
  return (
    <LegalDocument
      path="/terms"
      title={title}
      description={description}
      breadcrumb="Website Terms of Use"
      updated="October 2026"
    >
      <LegalSection id="scope" title="These terms cover the website">
        <p>
          These terms govern use of the public SystemArc website at{" "}
          <a href="https://www.systemarchq.com" className={textLink}>
            systemarchq.com
          </a>. Using the public website means these website terms apply to that
          use.
        </p>
        <p>
          These are website terms. They are not the contract for paid software
          development or any other client engagement. Work that SystemArc agrees
          to perform is governed by a separate proposal, statement of work,
          services agreement, or other written agreement.
        </p>
      </LegalSection>

      <LegalSection id="content" title="Website content is general information">
        <p>
          The website describes SystemArc&apos;s capabilities, approach,
          services, solutions, industries, and examples of work. That content is
          general information.
        </p>
        <p>Website content is not:</p>
        <LegalList
          items={[
            "A binding proposal.",
            "A project estimate.",
            "A guarantee of a result.",
            "Legal advice.",
            "Financial advice.",
          ]}
        />
      </LegalSection>

      <LegalSection id="inquiries" title="A project inquiry starts a conversation">
        <p>
          Submitting{" "}
          <Link href="/start-a-project" className={textLink}>
            Start a Project
          </Link>{" "}
          begins a conversation. It does not:
        </p>
        <LegalList
          items={[
            "Create a client relationship.",
            "Require SystemArc to accept the project.",
            "Reserve development capacity.",
            "Create a binding estimate.",
            "Create a services agreement.",
            "Guarantee a response.",
            "Guarantee that a project is feasible.",
          ]}
        />
        <p>
          If both sides decide to proceed, that engagement requires a separate
          agreement.
        </p>
      </LegalSection>

      <LegalSection id="pricing" title="Estimates and pricing">
        <p>
          SystemArc does not publish a standard price for custom software.
          Scope can depend on requirements, complexity, integrations, data,
          security, the people who will use the system, and how the work is
          phased.
        </p>
        <p>
          An estimate or proposal, if SystemArc provides one later, is subject
          to its own terms.
        </p>
      </LegalSection>

      <LegalSection id="intellectual-property" title="Intellectual property">
        <p>
          SystemArc&apos;s branding, design, written content, graphics,
          software, and other original material on this website may be protected
          by intellectual-property rights.
        </p>
        <p>
          These terms do not claim ownership of third-party trademarks,
          screenshots, or other materials that do not belong to SystemArc.
        </p>
        <p>
          Who owns the intellectual property in a client project is decided by
          the agreement for that project, not by these website terms.
        </p>
      </LegalSection>

      <LegalSection id="acceptable-use" title="Acceptable use">
        <p>Do not use the website to:</p>
        <LegalList
          items={[
            "Attempt to access systems or data you are not authorized to access.",
            "Disrupt or interfere with the website.",
            "Send malicious automated traffic.",
            "Introduce malware.",
            "Abuse the forms.",
            "Impersonate another person or business.",
            "Use the website for an unlawful purpose.",
          ]}
        />
      </LegalSection>

      <LegalSection id="third-parties" title="Third-party services">
        <p>
          The website may mention or connect to services that SystemArc does
          not operate. SystemArc does not control those services, and their own
          terms may apply when you use them.
        </p>
        <p>SystemArc remains responsible for the website it operates.</p>
      </LegalSection>

      <LegalSection id="availability" title="Availability">
        <p>
          SystemArc may change, suspend, or discontinue website functionality.
          SystemArc does not guarantee that the website will be available
          without interruption.
        </p>
      </LegalSection>

      <LegalSection id="warranty" title="No warranty for website content">
        <p>
          The website is provided on an as-available basis. SystemArc does not
          guarantee that every part of the website will always be current or
          free of errors.
        </p>
      </LegalSection>

      <LegalSection id="liability" title="Limitation of liability">
        <p>
          To the extent applicable law allows, SystemArc is not liable for
          indirect or consequential damages arising only from use of this public
          website.
        </p>
        <p>
          These website terms do not limit liability that a later signed client
          agreement addresses. They also do not exclude liability that
          applicable law does not allow to be limited or excluded.
        </p>
      </LegalSection>

      <LegalSection id="client-agreements" title="Client agreements control client work">
        <p>
          If you become a SystemArc client, the applicable proposal, services
          agreement, statement of work, or other signed agreement governs that
          project.
        </p>
        <p>
          If these website terms conflict with a signed client agreement about
          that project, the signed client agreement controls for that project.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to these terms">
        <p>
          SystemArc may update these terms. The date at the top of this page
          will change when the terms are revised in a material way.
        </p>
      </LegalSection>

      <LegalSection id="questions" title="Questions about these terms">
        <p>
          Questions about these website terms can be sent to{" "}
          <a href={`mailto:${contactEmail}`} className={textLink}>
            {contactEmail}
          </a>.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
