import { Item } from "@/components/Item";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function ClothingIndexWomen({ products }) {
  return (
    <Layout>
      <h1>products</h1>

      {products.data.map((products) => {
        return <Item key={products.id} products={products} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/products?populate=*`);
  const products = await res.json();
  return {
    props: { products },
  };
}
