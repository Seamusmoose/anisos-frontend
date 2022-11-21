import { useRouter } from "next/router";
import { useState } from "react";

export const Search = () => {
  const [term, setTerm] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefaut();
    router.push(`/clothing/search?term=${term}`);
    setTerm("");
  };

  return (
    <div>
      <h1>Search</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="search events"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
        />
        {/* <button onClick={onSubmit}>Submit</button> */}
      </form>
    </div>
  );
};
