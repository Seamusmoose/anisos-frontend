import parseCookies from "@/helpers/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
import ImageUpload from "@/components/ImageUpload";
import Modal from "@/components/Modal";
// import styles from '@/styles/Form.module.css'

export default function AddClothingWomen({ token }) {
  const [imagePreview, setImagePreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    // brand: "",
    // category: "",
    // image: "",
  });

  const router = useRouter();

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

    const res = await fetch(`${API_URL}/api/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      // body: JSON.stringify(values),
      body: JSON.stringify({ data: values }),
    });

    console.log(res.body.data);

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error("No token included");
        return;
      }
      toast.error("Something Went Wrong");
    } else {
      const evt = await res.json();
      router.push(`/women/clothing/${evt.data.id}`);
      console.log(evt, "t");
    }

    // const imageUploaded = async (e) => {
    //   try {
    //     const res = await fetch(
    //       `${API_URL}/api/products/${product.data.id}?populate=*`
    //     );
    //     const data = await res.json();
    //     // console.log(data, "data");
    //     setImagePreview(
    //       data.data.attributes.image.data.attributes.formats.medium.url
    //     );
    //     setShowModal(false);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };
  };

  return (
    <Layout>
      <Link href="/women/clothing">Go Back</Link>
      <h1>create product</h1>
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
          {/* <div>
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
            <label htmlFor="category"> category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            />
          </div> */}
        </div>

        <input type="submit" value="create product" className="btn" />
      </form>

      <h2>Event Image</h2>
      {/* <div onClick={() => setShowModal(true)}>
        <button>set Image</button>
      </div> */}

      {/* {imagePreview ? (
        <Image src={imagePreview} height={100} width={170} alt="thumb" />
      ) : (
        <div>
          <p>No Photo Provided</p>
        </div>
      )} */}

      {/* <Modal show={showModal} onClose={() => setShowModal(false)}>
        <ImageUpload prodId={product.data.id} imageUploaded={imageUploaded} />
      </Modal> */}
    </Layout>
  );
}

export async function getServerSideProps({ req }) {
  const { token } = parseCookies(req);

  return {
    props: {
      token,
    },
  };
}
