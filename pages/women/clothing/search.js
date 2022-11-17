import qs from "qs";
import { Item } from "@/components/Item";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

export default function BrandsSearchWomen({ clothing }) {
  const router = useRouter();
  //   console.log(clothing);
  return (
    <Layout>
      <h1>Search</h1>

      {clothing.data.map((clothing) => {
        return <Item key={clothing.id} clothing={clothing.attributes} />;
      })}
    </Layout>
  );
}

export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify({
    populate: "*",
    filters: {
      $or: [
        { title: { $contains: term } },
        { size: { $contains: term } },
        { description: { $contains: term } },
        { price: { $contains: term } },
      ],
    },
  });

  const res = await fetch(`${API_URL}/api/clothing?${query}`);
  const clothing = await res.json();

  console.log(clothing);

  return {
    props: { clothing },
  };
}
