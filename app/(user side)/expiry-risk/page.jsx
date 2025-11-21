import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import ExpiryRiskWidget from "@/app/components/ui/ExpiryRiskWidget";
import { getServerSession } from "next-auth";

export default async function ExpiryRiskPage() {
  const { user } = await getServerSession(authOptions);
  return (
    <div className="max-w-2xl min-h-screen mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">Expiration Risk Dashboard</h1>

      {/* COMPONENT USED HERE */}
      <ExpiryRiskWidget user={user} />
    </div>
  );
}
