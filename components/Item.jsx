import Image from "next/image";

export const Item = ({
  //   title,
  //   size,
  //   description,
  //   Image_main,
  //   price,
  products,
}) => {
  // console.log(products);
  return (
    <div>
      {/* <h2>{products.id}</h2> */}
      <h1>{products.attributes.name}</h1>
      {/* <h2>{products.attributes.price}</h2>
      <h2>{products.attributes.brands}</h2> */}

      {/* <h2>{products.size}</h2> */}
      {/* <h2>{products.attributes.description}</h2> */}

      {/* <Image
        src={products.Image_main.data[0].attributes.formats.medium.url}
        width={170}
        height={100}
        alt="test"
        priority
      /> */}
    </div>
  );
};
