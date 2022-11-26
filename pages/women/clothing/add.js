// import { parseCookies } from '@/helpers/index'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";
// import styles from '@/styles/Form.module.css'

export default function AddClothingWomen() {
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    // brand: "",
    // category: "",
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
      },
      // body: JSON.stringify(values),
      body: JSON.stringify({ data: values }),
    });

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
  };

  return (
    <Layout>
      <Link href="/women/clothing">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={values.name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Event Description</label>
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
              type="text"
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
            <label htmlFor="category">Event category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={values.category}
              onChange={handleInputChange}
            />
          </div> */}
        </div>

        <input type="submit" value="Add product" className="btn" />
      </form>
    </Layout>
  );
}
