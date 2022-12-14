const { API_URL } = require("@/config/index");
import cookie from "cookie";

export default async (req, res) => {
  if (req.method === "POST") {
    const { identifier, password } = req.body;

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier,
        password,
      }),
    });

    const data = await strapiRes.json();
    console.log(data.jwt);

    if (strapiRes.ok) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: "strict",
          path: "/",
        })
      );
      res.status(200).json({ user: data.user });
      console.log("logged in");
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }

    // console.log(req.body);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.setHeader(405).json({ message: `Method: ${req.method} not allowed` });
  }
};
