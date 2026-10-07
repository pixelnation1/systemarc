import Link from "next/link";
import { LegalDocument, LegalList, LegalSection } from "@/components/legal-document";
import { contactEmail, createMetadata } from "@/lib/site";

const title = "Privacy Policy";
const description =
  "Learn how SystemArc collects, uses, stores, and protects information submitted through the SystemArc website.";

export const metadata = createMetadata({
  title,
  description,
  path: "/privacy",
});

const textLink =
  "text-warm-white underline decoration-steel underline-offset-4 transition-colors hover:text-electric-cobalt hover:decoration-cobalt";

export default function PrivacyPage() {
  return (
    <LegalDocument
      path="/privacy"
      title={title}
      description={description}
      breadcrumb="Privacy Policy"
      updated="October 2026"
    >
      <LegalSection id="introduction" title="Introduction">
        <p>
          SystemArc respects the privacy of people who visit this website or
          contact SystemArc about potential work.
        </p>
        <p>
          This policy explains what information the website collects, why it is
          collected, how it is used, and the choices a visitor may have. It
          describes the website as it operates today. If those practices change
          in a material way, this policy will be updated.
        </p>
      </LegalSection>

      <LegalSection id="information-you-provide" title="Information you provide">
        <p>
          You may choose to send information through{" "}
          <Link href="/start-a-project" className={textLink}>
            Start a Project
          </Link>, or through another contact method SystemArc publishes later.
        </p>
        <p>The information you provide can include:</p>
        <LegalList
          items={[
            "Contact information, such as your name, work email, a phone number if you choose to provide one, and how you prefer to be reached.",
            "Business and organization information, such as the organization name, what the business does, the type of business, and an approximate size.",
            "Operational and workflow information, such as the problem you want to solve, how the work happens today, who is affected, and how often the problem occurs.",
            "Existing software and system information, such as the tools involved, whether information is moved by hand, and systems you want to keep.",
            "Project requirements, such as the outcome you want, possible areas of work, a timeline, and an approximate budget range.",
            "Communications with SystemArc about a possible project.",
          ]}
        />
        <p>
          An inquiry also records the page it was sent from and, when that
          information is available, the page that referred you.
        </p>
        <p>
          Do not send highly sensitive personal information unless SystemArc has
          specifically asked for it and it is necessary for the conversation.
          That includes government identification numbers, financial account
          numbers, and health information.
        </p>
      </LegalSection>

      <LegalSection id="automatic-information" title="Information collected automatically">
        <p>
          The systems that serve and protect this website may process technical
          information needed to deliver pages and keep the site operating. That
          information can include an IP address, browser and device details,
          information about the request, the referring page, the time of the
          request, and security or server logs.
        </p>
        <p>
          SystemArc does not use that technical information to build a profile
          of visitors. No third-party analytics provider is intentionally
          configured on the production website today. If SystemArc later uses
          analytics or a similar technology, this policy will be updated to
          describe that change.
        </p>
      </LegalSection>

      <LegalSection id="how-information-is-used" title="How information is used">
        <p>SystemArc uses information for purposes such as:</p>
        <LegalList
          items={[
            "Reviewing a project inquiry.",
            "Responding to a prospective client.",
            "Understanding the business and the project requirements.",
            "Considering whether SystemArc may be able to help.",
            "Communicating about services you asked about.",
            "Maintaining the security of the website and its systems.",
            "Limiting spam and other abuse.",
            "Operating and improving SystemArc's services and systems.",
            "Keeping records of business inquiries.",
          ]}
        />
        <p>
          Submitting Start a Project does not add you to a promotional email
          list. SystemArc does not treat that submission as consent to receive
          marketing email.
        </p>
      </LegalSection>

      <LegalSection id="storage" title="Where inquiry information is stored">
        <p>
          Project inquiry information is stored in SystemArc&apos;s database.
          SystemArc currently uses Supabase to provide that database
          infrastructure.
        </p>
        <p>
          Inquiry records are not published on the website. Visitors using the
          public site do not have direct access to read, add, change, or delete
          those records.
        </p>
      </LegalSection>

      <LegalSection id="service-providers" title="Service providers">
        <p>
          SystemArc uses service providers to operate the website and its
          infrastructure. Providers currently involved include:
        </p>
        <LegalList
          items={[
            "Vercel, for website hosting and deployment.",
            "Supabase, for database infrastructure.",
            "Cloudflare, for DNS, domain infrastructure, and related network services as currently configured.",
          ]}
        />
        <p>
          Naming a provider does not mean that company endorses SystemArc, or
          that SystemArc endorses the provider. A provider may process limited
          information as needed to perform its service. This policy does not
          describe the private terms of those service arrangements.
        </p>
      </LegalSection>

      <LegalSection id="sharing" title="When information may be shared">
        <p>SystemArc does not sell personal information.</p>
        <p>SystemArc may disclose information when it is reasonably necessary to:</p>
        <LegalList
          items={[
            "Operate the website through the infrastructure providers described above.",
            "Comply with a law, regulation, or legal process.",
            "Protect the rights, security, users, or systems of SystemArc or others.",
            "Carry out a business transaction, such as a merger or acquisition, if one occurs.",
          ]}
        />
        <p>
          SystemArc does not publish project inquiries. This website does not
          offer public accounts, public comments, or payment processing.
        </p>
      </LegalSection>

      <LegalSection id="retention" title="How long information is kept">
        <p>
          SystemArc keeps information for as long as it is reasonably needed to
          respond to an inquiry, consider possible work, maintain business
          records, handle a dispute, protect the website, or meet a legal
          obligation.
        </p>
        <p>
          How long a record is kept can depend on the information and on
          whether a working relationship develops. This policy does not set one
          retention period for every kind of information.
        </p>
      </LegalSection>

      <LegalSection id="security" title="Security">
        <p>
          SystemArc uses reasonable technical and organizational measures
          intended to protect the information it holds. No method of storing or
          transmitting information can guarantee absolute security.
        </p>
      </LegalSection>

      <LegalSection id="children" title="Children">
        <p>
          This website and the project inquiry process are intended for
          businesses and professionals. They are not directed toward children.
        </p>
      </LegalSection>

      <LegalSection id="choices" title="Access, correction, and deletion">
        <p>
          If you have submitted information, you may contact SystemArc to ask
          about accessing it, correcting it, or requesting deletion where that
          is appropriate. SystemArc may need to keep some information when a
          record is still required for business operations, security, or a legal
          obligation.
        </p>
        <p>
          Send privacy-related requests to{" "}
          <a href={`mailto:${contactEmail}`} className={textLink}>
            {contactEmail}
          </a>.
        </p>
      </LegalSection>

      <LegalSection id="changes" title="Changes to this policy">
        <p>
          SystemArc may update this policy when the website changes, when
          analytics or a similar technology is introduced, when service
          providers change, when data practices change, or when legal
          requirements change. The date at the top of this page will be updated
          when the policy is revised.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
