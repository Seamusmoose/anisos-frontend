import { API_URL } from "@/config/index";
import { useRouter } from "next/router";

export default function ClothingItemWomen({ evt, id }) {
  const router = useRouter();
  return (
    <div>
      <h1>{evt.data.attributes.name}</h1>
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`http://localhost:1337/api/products/${id}`);

  const event = await res.json();

  console.log(event, "ev");

  return {
    props: {
      evt: event,
      id,
    },
  };
}
