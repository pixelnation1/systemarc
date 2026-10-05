import Image from "next/image";
import Link from "next/link";
import type { TeamMember } from "@/lib/team";

export function TeamRoster({ members }: { members: readonly TeamMember[] }) {
  if (members.length === 0) return null;

  return (
    <ul className="mt-12 grid gap-6 lg:grid-cols-2">
      {members.map((member) => (
        <li key={member.name} className="border border-steel bg-carbon p-6 sm:p-8">
          {member.image ? (
            <Image
              src={member.image}
              alt=""
              width={96}
              height={96}
              className="mb-6 size-24 object-cover"
            />
          ) : null}
          <h3 className="font-serif text-2xl tracking-[-0.02em] text-warm-white">
            {member.name}
          </h3>
          <p className="mt-2 font-mono text-[0.68rem] tracking-[0.16em] text-electric-cobalt uppercase">
            {member.role}
          </p>
          <p className="mt-4 text-base leading-7 text-silver">{member.biography}</p>
          {member.links && member.links.length > 0 ? (
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
              {member.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-flex min-h-11 items-center text-sm text-warm-white underline decoration-steel underline-offset-4 transition-colors duration-150 hover:text-electric-cobalt hover:decoration-cobalt"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
