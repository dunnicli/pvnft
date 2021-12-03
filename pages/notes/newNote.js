import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import { toast, ToastContainer } from "react-nextjs-toast";

export default function NewNote() {
  const [formData, setFormData] = useState({});

  async function saveNote(e) {
    toast.notify(`Note is saving!`);
    e.preventDefault();
    const response = await fetch("/api/notes/newnote", {
      method: "POST",
      body: JSON.stringify(formData),
    });
    toast.remove();
    return await response.json(), await Router.push("/notes");
  }

  return (
    <div>
      <Head>
        <title>New Note</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <h3>New Note</h3>
        </div>

        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p>
            <b>Title</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Title"
              name="title"
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </p>
          <p>
            <b>Note</b>
            <br />
            <textarea
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              name="notebody"
              id=""
              cols="40"
              rows="5"
              placeholder="Note Body"
              onChange={(e) =>
                setFormData({ ...formData, notebody: e.target.value })
              }
            />
          </p>
          <p>
            <b>Author</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Author"
              name="author"
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </p>
          <p>&nbsp;</p>
          <ToastContainer />
          <p>
            <button
              onClick={saveNote}
              className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
            >
              Add Note
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
