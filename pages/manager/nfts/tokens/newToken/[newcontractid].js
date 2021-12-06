import Head from "next/head";
import { useState, useRef } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
//import { getSession } from "next-auth/react"

// SET BOOLEAN AND HIDDEN FIELDS
// import contract id from query

export default function NewToken() {
  const formRef = useRef();
  const [disable, setDisable] = useState(false);
  const [session] = useSession();
  const router = useRouter();
  const thecontractId = router.query.newcontractid;

  async function editToken() {
    setDisable(true);
    const {
      //editContractId,
      editTokenId,
      editMetaName,
      editMetaDescription,
      editMetaImageUrl,
      editTokenJsonUri,
      editOwnerAddress,
      editOwnerId,
      editNotes,
      editDisplay,
      editForSale,
      editSalePrice,
    } = formRef.current;
    const contractId = parseInt(thecontractId);
    const createdBy = parseInt(session.user.uid);
    const tokenId = editTokenId.value;
    const metaName = editMetaName.value;
    const metaDescription = editMetaDescription.value;
    const metaImageUrl = editMetaImageUrl.value;
    const tokenJsonUri = editTokenJsonUri.value;
    const ownerAddress = editOwnerAddress.value;
    const ownerId = editOwnerId.value;
    const notes = editNotes.value;
    const display = editDisplay.checked;
    const forSale = editForSale.checked;
    const salePrice = editSalePrice.value;

    //const id = parseInt(contract.id);

    //
    let formData = {
      contractId,
      createdBy,
      tokenId,
      metaName,
      metaDescription,
      metaImageUrl,
      tokenJsonUri,
      ownerAddress,
      ownerId,
      notes,
      display,
      forSale,
      salePrice,
    };

    await fetch(`/api/manager/nfts/tokens/newtoken`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    setDisable(false);
    Router.push("/manager/nfts/tokens");
  }

  return (
    <div>
      <Head>
        <title>Add New Token</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <h1>Add New Token</h1>
        </div>

        <form
          ref={formRef}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <p>
            <b>Token ID Int* on Network</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token ID"
              defaultValue=""
              name="editTokenId"
              required
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Meta Name *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token Type - ie EC721"
              name="editMetaName"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Meta Description *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Meta Description"
              name="editMetaDescription"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Meta Image URL *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Meta Image URL"
              name="editMetaImageUrl"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Token JSON URI *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token JSON URI"
              name="editTokenJsonUri"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Owner Wallet Address *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Owner Wallet Address"
              name="editOwnerAddress"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Owner User ID - DB *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Owner User ID - DB"
              name="editOwnerId"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Notes</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Notes"
              name="editNotes"
              defaultValue=""
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Display Token in Collection</b>
            <br />
            <input
              type="checkbox"
              className="form-checkbox"
              name="editDisplay"
              defaultChecked={false}
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <b>For Sale</b>
            <br />
            <input
              type="checkbox"
              className="form-checkbox"
              name="editForSale"
              defaultChecked={false}
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <b>Selling Price - in ETH</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Selling Price - in ETH"
              name="editSalePrice"
              defaultValue=""
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={disable}
              onClick={() => editToken()}
            >
              Add New Token
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
