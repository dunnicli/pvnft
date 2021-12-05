import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

export default function NewUser() {
  const [formData, setFormData] = useState({});

  async function saveUser(e) {
    e.preventDefault();
    const response = await fetch("/api/users/newuser", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return await response.json(), await Router.push("/users");
  }

  return (
    <div>
      <Head>
        <title>New User</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <h3>New User</h3>
        </div>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={saveUser}
        >
          <p>
            <b>Name</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Name"
              name="name"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </p>
          <p>
            <b>Email</b>
            <br />
            <textarea
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              name="email"
              id=""
              cols="40"
              rows="1"
              placeholder="Email"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </p>
          <p>
            <b>Username</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Username"
              name="username"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </p>
          <p>
            <b>Password</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder="Password"
              name="password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Administrator</b>
            <br />
            <input
              type="checkbox"
              className="form-checkbox"
              name="admin"
              defaultChecked={false}
              onChange={(e) =>
                setFormData({ ...formData, admin: e.target.value })
              }
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add User
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
