import { Item } from "@/components/Item";
import Layout from "@/components/Layout";
import Pagination from "@/components/Pagination";
import { API_URL, Limit } from "@/config/index";
const qs = require("qs");

export default function ClothingIndexWomen({ page, products, lastPage }) {
  return (
    <Layout>
      <h1>products</h1>

      {products.data.map((products) => {
        return (
          <div key={products.id}>
            <Item products={products} />
          </div>
        );
      })}

      <Pagination page={page} products={products} lastPage={lastPage} />
    </Layout>
  );
}

export async function getServerSideProps({ query: { page = 1 } }) {
  const query = qs.stringify(
    {
      pagination: {
        start: [page],
        limit: [Limit],
      },
    },
    {
      encodeValuesOnly: true, // prettify URL
    }
  );

  const res = await fetch(`${API_URL}/api/products?${query}`);
  const products = await res.json();

  const limitPerPage = products.meta.pagination.limit;
  const totalProducts = products.meta.pagination.total;
  const lastPage = Math.ceil(totalProducts / limitPerPage);

  return {
    props: { products, page, lastPage },
  };
}
