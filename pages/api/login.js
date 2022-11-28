const { API_URL } = require("@/config/index");

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

    if (strapiRes.ok) {
      res.status(200).json({ user: data.user });
      console.log("logged in");
    } else {
      res.status(data.error.status).json({ message: data.error.message });
    }

    console.log(req.body);
  } else {
    res.setHeader("Allow", ["POST"]);
    res.setHeader(405).json({ message: `Method: ${req.method} not allowed` });
  }
};