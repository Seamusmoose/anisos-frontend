import parseCookies from "@/helpers/index";
import { useAuth } from "hooks/useAuth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import Image from "next/image";
import Modal from "@/components/Modal";
import ImageUpload from "@/components/ImageUpload";

// import styles from '@/styles/Form.module.css'

export default function UpdateClothingWomen({ product, token }) {

  const { user } = useAuth();
  const router = useRouter();

  console.log(user, "userr");
  console.log(product);

  if (!user) {
    return null;
  }
  // const { name, description, price, brand, category } = product.data.attributes;

  const [values, setValues] = useState({
    // id: product.data.id,
    name: product.data.attributes.name,
    description: product.data.attributes.description,
    price: product.data.attributes.price,
    brand: product.data.attributes.brand.data.attributes.name,
    category: product.data.attributes.category.data.attributes.name,
    image: product.data.attributes.image.data.attributes.formats.medium.url,
  });

  // console.log(values, "v");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hasEmptyFields = Object.values(values).some((el) => el === "");

    if (hasEmptyFields) {
      toast.error("please fill in all fields");
      return;
    }

    const res = await fetch(`${API_URL}/api/products/${product.data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      //body: JSON.stringify(values),
      body: JSON.stringify({ data: { values } }),
    });

    console.log(res.body);

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const product = await res.json();
      router.push(`/women/clothing/${product.data.id}`);
    }
  };

  const [imagePreview, setImagePreview] = useState(
    product.data.attributes.image
      ? product.data.attributes.image.data.attributes.formats.medium.url
      : ""
  );
  const [showModal, setShowModal] = useState(false);

  const imageUploaded = async (e) => {
    try {
      const res = await fetch(
        `${API_URL}/api/products/${product.data.id}?populate=*`
      );
      const data = await res.json();
      // console.log(data, "data");
      setImagePreview(
        data.data.attributes.image.data.attributes.formats.medium.url
      );
      setShowModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Link href="/women/clothing">Go Back</Link>
      <h1>edit Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description"> Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              value={values.description}
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div>
            <label htmlFor="price">price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={values.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="brand">brand</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={values.brand}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="category">Event category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <input type="submit" value="edit product" className="btn" />
      </form>

      <h2>Event Image</h2>
      <div onClick={() => setShowModal(true)}>
        <button>set Image</button>
      </div>

      {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="thumb" />
      ) : (
        <div>
          <p>No Photo Provided</p>
        </div>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload prodId={product.data.id} token={token} imageUploaded={imageUploaded} />
      </Modal>
    </Layout>
  );
}

export async function getServerSideProps({ params: { id }, req }) {
  const { token } = parseCookies(req);
  const res = await fetch(`${API_URL}/api/products/${id}?populate=*`);
  const product = await res.json();

  return {
    props: {
      product,
      token: token || "",
    },
  };
}
