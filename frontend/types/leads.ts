export type LicenseState = "licensed" | "applicant" | "review";

export type AgentRole = "manager" | "agent";

export type LedgerAgent = {
  id: string;
  name: string;
  email: string;
  role: AgentRole;
  avatarSrc: string;
  avatarAlt: string;
  license: {
    state: LicenseState;
    statusLabel: string;
    statusClassName: string;
  };
};
