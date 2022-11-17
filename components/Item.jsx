import Image from "next/image";

export const Item = ({
  //   title,
  //   size,
  //   description,
  //   Image_main,
  //   price,
  clothing,
}) => {
  return (
    <div>
      <h1>{clothing.title}</h1>
      <h2>{clothing.price}</h2>
      <h2>{clothing.size}</h2>
      <h2>{clothing.description}</h2>

      <Image
        src={clothing.Image_main.data[0].attributes.formats.medium.url}
        width={170}
        height={100}
        alt="test"
        priority
      />
    </div>
  );
};
