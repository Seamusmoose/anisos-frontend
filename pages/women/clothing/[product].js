import { API_URL } from "@/config/index";
import Image from "next/image";
import { useRouter } from "next/router";
const qs = require("qs");

export default function ClothingItemWomen({ product }) {
  const router = useRouter();
  console.log(product);
  return (
    <div>
      <h1>{product.data.attributes.name}</h1>
      <Image
        src={product.data.attributes.image.data.attributes.formats.medium.url}
        height={200}
        width={270}
        alt="product-Image-med"
      />
    </div>
  );
}

export async function getServerSideProps({ params: { product } }) {
  const res = await fetch(`${API_URL}/api/products/${product}`);

  const prod = await res.json();

  return {
    props: {
      product: prod,
    },
  };
}
