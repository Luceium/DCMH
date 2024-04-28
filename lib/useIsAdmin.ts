import { useUser } from "@propelauth/nextjs/client";

export default function useIsAdmin() {
  const { loading, user } = useUser();
  return {
    loading,
    isAdmin: user?.getOrgByName("DCMH")?.isAtLeastRole("Admin") ?? false,
  };
}
