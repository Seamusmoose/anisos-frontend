import { Item } from "@/components/Item";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function ClothingIndexWomen({ clothing }) {
  return (
    <Layout>
      <h1>Clothing</h1>

      {clothing.data.map((clothing) => {
        return <Item key={clothing.id} clothing={clothing.attributes} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/clothing?populate=*`);
  const clothing = await res.json();
  return {
    props: { clothing },
  };
}
