import { useState, useRef } from "react";
import Head from "next/head";
import Router from "next/router";
import prisma from "../../../lib/prisma.ts";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const note = await prisma.note.findUnique({ where: { id: parseInt(id) } });
  return {
    props: {
      note,
    },
  };
}

export default function EditNote({ note }) {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);

  async function editNote() {
    setDisable(true);
    const { editNoteTitle, editNoteNotebody, editNoteAuthor } = formRef.current;
    const title = editNoteTitle.value;
    const notebody = editNoteNotebody.value;
    const author = editNoteAuthor.value;
    const id = parseInt(note.id);

    //
    let formData = {
      title,
      notebody,
      author,
    };

    // {name:"John Smith",age:30,hobbies:["Programming","Video Games"]}
    //let miny = JSON.stringify(data);

    //

    await fetch(`/api/notes/updatenote/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      //id: parseInt(id),
      //title: title,
      //notebody: notebody,
      //author: author
    });
    setDisable(false);
    Router.push("/notes");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Head>
        <title>Edit: {note?.title} </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <div>
          <div>
            <p>&nbsp;</p>
            <div className="page-nav">
              <h3>Edit Note</h3>
            </div>
          </div>
          <form
            ref={formRef}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="label">
              <label>Title</label>
              <br />
            </div>
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={note?.title}
                name="editNoteTitle"
                type="text"
              />
              <p>&nbsp;</p>
            </div>

            <div className="label">
              <label>Notebody</label>
              <br />
            </div>
            <div>
              <textarea
                defaultValue={note?.notebody}
                name="editNoteNotebody"
                type="textarea"
                rows="4"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none"
              ></textarea>
              <p>&nbsp;</p>
            </div>

            <div className="label">
              <label>Author</label>
              <br />
            </div>
            <div>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                defaultValue={note?.author}
                name="editNoteAuthor"
                type="text"
              />
              <p>&nbsp;</p>
            </div>
          </form>
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={disable}
            onClick={() => editNote()}
          >
            Save
          </button>
        </div>
      </main>
      <footer className="text-center font-bold text-xl">
        <b>Powered by John Dunnicliffe</b>
      </footer>
    </div>
  );
}
