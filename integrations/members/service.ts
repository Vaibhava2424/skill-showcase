import { Member } from ".";

export const getCurrentMember = async (): Promise<Member | null> => {
  // No authentication required, return null
  return null;
};
