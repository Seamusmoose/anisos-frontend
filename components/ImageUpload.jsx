import { useEffect, useState } from "react";
import { API_URL } from "../config";
import styles from "@/styles/Form.module.css";

export default function ImageUpload({ prodId, imageUploaded, test }) {
  const [image, setImage] = useState(null);

console.log(prodId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("files", image);
    formData.append("ref", "api::product.product");
    formData.append("refId", prodId);
    formData.append("field", "image");
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      imageUploaded();
    }
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div>
      <button type="button" onClick={test}>
        test
      </button>
      <h1>upload Image</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input type="file" onChange={handleFileChange} />
          <input type="submit" value="Upload" className="btn" />
        </div>
      </form>
    </div>
  );
}
