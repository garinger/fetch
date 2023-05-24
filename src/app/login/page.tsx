"use client";

async function TryLogin(formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");

  await fetch("https://frontend-take-home-service.fetch.com/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({ name: name, email: email }),
  }).then((res) => {
    if (res.status === 200) {
      self.location.href = "/";
    }
  });
}

export default function Login() {
  return (
    <form
      action={TryLogin}
      className="flex flex-col justify-center items-center m-4"
    >
      <input
        name="name"
        type="text"
        placeholder="Name"
        className="input input-bordered m-2"
      ></input>
      <input
        name="email"
        type="text"
        placeholder="Email"
        className="input input-bordered m-2"
      ></input>
      <button className="btn btn-primary m-2">Login</button>
    </form>
  );
}
