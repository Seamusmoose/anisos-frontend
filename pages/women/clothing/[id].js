import { API_URL } from "@/config/index";
import Image from "next/image";
import { useRouter } from "next/router";


export default function ClothingItemWomen({ evt, id }) {
  const router = useRouter();
  console.log(evt);
  return (
    <div>
      <h1>{evt.data.attributes.name}</h1>
      <Image
        src={evt.data.attributes.Carousel.data[0].attributes.formats.medium.url}
        height={200}
        width={270}
        alt="product-Image-med"
      />
    </div>
  );
}

export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`http://${API_URL}/api/products/${id}?populate=*`);

  const event = await res.json();

  console.log(event, "ev");

  return {
    props: {
      evt: event,
      id,
    },
  };
}
