export type TeamMember = {
  name: string;
  role: string;
  biography: string;
  image?: string | null;
  links?: readonly { label: string; href: string }[];
};

/**
 * Leave this empty until a real name, role, and biography are confirmed.
 * Do not add placeholder people.
 */
export const teamMembers: readonly TeamMember[] = [];
