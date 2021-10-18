import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

export default function NewNote() {
  const [formData, setFormData] = useState({});

  async function saveNote(e) {
    e.preventDefault();
    const response = await fetch("/api/notes/newnote", {
      method: "POST",
      body: JSON.stringify(formData),
    });

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

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={saveNote}
        >
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
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add Note
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
