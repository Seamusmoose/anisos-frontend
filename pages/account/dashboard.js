import Layout from "@/components/Layout";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";

export default function DashboardPage({ products, token }) {
  const router = useRouter();
  const { user } = useAuth();

console.log(user, 'uzer');

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div>Dash</div>
    </Layout>
  );
}
