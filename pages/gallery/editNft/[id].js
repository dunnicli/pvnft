import Head from "next/head";
import { useState, useRef } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
//import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma.ts";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const token = await prisma.token.findUnique({
    where: { id: parseInt(id) },
  });
  if (token.display == true) {
    token.display = "on";
  }
  if (token.forSale == true) {
    token.forSale = "on";
  }
  return {
    props: {
      token,
    },
  };
}

export default function EditToken({ token }) {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);
  const [session] = useSession();

  async function editToken() {
    setDisable(true);
    const { editNotes, editDisplay, editForSale, editSalePrice } =
      formRef.current;
    const updatedBy = session.user.uid;
    const notes = editNotes.value;
    const display = editDisplay.checked;
    const forSale = editForSale.checked;
    const salePrice = editSalePrice.value;

    //
    let formData = {
      updatedBy,
      notes,
      display,
      forSale,
      salePrice,
    };

    await fetch(`/api/gallery/updateNft/${token.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    setDisable(false);
    Router.push(`/gallery/nftDetails/${token.id}`);
  }

  return (
    <div>
      <Head>
        <title>Edit: {token.metaName} </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <h1>Edit NFT: {token.metaName}</h1>
        </div>

        <form
          ref={formRef}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p>&nbsp;</p>
          <p>
            <b>Notes</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Notes"
              name="editNotes"
              defaultValue={token?.notes}
            />
          </p>

          <p>&nbsp;</p>
          <b>Display in NFT Gallery?</b>
          <br />

          <div>
            <input
              className="form-checkbox"
              defaultChecked={token?.display}
              name="editDisplay"
              type="checkbox"
            />
            <p>&nbsp;</p>
          </div>
          <p>&nbsp;</p>
          <b>List NFT For Sale?</b>
          <br />
          <div>
            <input
              className="form-checkbox"
              defaultChecked={token?.forSale}
              name="editForSale"
              type="checkbox"
            />
            <p>&nbsp;</p>
          </div>
          <p>&nbsp;</p>
          <p>
            <b>Selling Price - in USD</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Selling Price - in ETH"
              name="editSalePrice"
              defaultValue={token?.salePrice}
            />
          </p>
          <p>&nbsp;</p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={disable}
              onClick={() => editToken()}
            >
              Update NFT
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
