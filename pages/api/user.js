const { API_URL } = require("@/config/index");
import cookie from "cookie";
export default async (req, res) => {
  if (req.method === "GET") {
    if (!req.headers.cookie) {
      res.status(403).json({ message: "Not Authorised" });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    // console.log(token, "t");

    const strapiRes = await fetch(`${API_URL}/api/products`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes) {
      res.status(200).json({ user });
    } else {
      res.status(403).json({ message: "user forbidden" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.setHeader(405).json({ message: `Method: ${req.method} not allowed` });
  }
};
