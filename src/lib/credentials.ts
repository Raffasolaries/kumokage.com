export interface Credential {
  name: string;
  kind: "certification" | "badge";
  badgeId: string;
}

/** Canonical Credly badge IDs, checked against credly.com/users/raffasolaries on 2026-10-23. */
export const CREDENTIALS: Credential[] = [
  { name: "AWS Certified Solutions Architect – Professional", kind: "certification", badgeId: "99577450-4c19-4e55-bdc6-40f0cce3d409" },
  { name: "AWS Certified Security – Specialty", kind: "certification", badgeId: "20256e01-69c8-48f0-b139-e3468b9f5837" },
  { name: "AWS Certified Solutions Architect – Associate", kind: "certification", badgeId: "444d562c-5309-4032-ba4a-69f5f7a9cb56" },
  { name: "AWS Certified Cloud Practitioner", kind: "certification", badgeId: "57bb249a-e5ea-42b1-a2b7-6c6c33f3bde4" },
  { name: "AWS Certification Subject Matter Expert – Associate", kind: "badge", badgeId: "4e97dcd1-25dc-4b26-8872-3a98899aef64" },
  { name: "AWS Partner: Technical Accredited", kind: "badge", badgeId: "5c9c82af-b374-4e72-971f-a9e576007cca" },
];

export const badgeUrl = (c: Credential) => `https://www.credly.com/badges/${c.badgeId}`;
