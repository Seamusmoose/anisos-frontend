import DashboardEvent from "@/components/dashboardEvent";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import parseCookies from "@/helpers/index";
import { useAuth } from "hooks/useAuth";
import { useRouter } from "next/router";

export default function DashboardPage({ products, token }) {
  const router = useRouter();
  const { user } = useAuth();
  // const dashProducts = products.data.attributes.data;

  const deleteEvent = async (id) => {
    if (confirm("Are you sure?")) {
      const res = await fetch(`${API_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message);
      } else {
        router.reload();
      }
    }
  };

  if (!user) {
    return null;
  }

  return (
    <Layout>
      <div>Dashboard</div>
      <h1>my products</h1>
      {products.map((product) => (
        <DashboardEvent
          key={product.id}
          product={product}
          handleDelete={deleteEvent}
        />
      ))}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);
  console.log(token);

  const res = await fetch(`${API_URL}/api/products/me`, {
    method: "GET",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });

  const products = await res.json();
  return {
    props: { products, token },
  };
}
