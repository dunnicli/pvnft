import Head from "next/head";
import { useState, useRef } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
//import { getSession } from "next-auth/react"

export async function getServerSideProps(context) {
  const { id } = context.params;
  const token = await prisma.token.findUnique({
    where: { id: parseInt(id) },
  });
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
    const {
      editContractId,
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
    const contractId = editContractId.value;
    const updatedBy = session.user.uid;
    const tokenId = editTokenId.value;
    const metaName = editMetaName.value;
    const metaDescription = editMetaDescription.value;
    const metaImageUrl = editMetaImageUrl.value;
    const tokenJsonUri = editTokenJsonUri.value;
    const ownerAddress = editOwnerAddress.value;
    const ownerId = editOwnerId.value;
    const notes = editNotes.value;
    const display = editDisplay.value;
    const forSale = editForSale.value;
    const salePrice = editSalePrice.value;

    //
    let formData = {
      contractId,
      updatedBy,
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

    await fetch(`/api/manager/nfts/tokens/updateToken/${token.id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
    });
    setDisable(false);
    Router.push("/manager/nfts/tokens");
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
          <h1>Edit Token: {token.metaName}</h1>
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
              defaultValue={token?.tokenId}
              name="editTokenId"
              required
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Contract ID Int* DB -- </b>
            <br />
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Contract ID"
              name="editContractId"
              defaultValue={token?.contractId}
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
              defaultValue={token?.metaName}
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
              defaultValue={token?.metaDescription}
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
              defaultValue={token?.metaImageUrl}
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
              defaultValue={token?.tokenJsonUri}
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
              defaultValue={token?.ownerAddress}
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
              defaultValue={token?.ownerId}
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
              defaultValue={token?.notes}
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <b>Display Token in Collections?</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="true or false"
              name="editDisplay"
              defaultValue={token?.display}
            />
          </p>
          <p>&nbsp;</p>

          <p>&nbsp;</p>
          <p>
            <b>List Token For Sale?</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="true or false"
              name="editForSale"
              defaultValue={token?.forSale}
            />
          </p>
          <p>&nbsp;</p>

          <p>&nbsp;</p>
          <p>
            <b>Selling Price - in ETH</b>
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
          <p>
            <b>Created By - Int DB * --</b>
            <br />
          </p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={disable}
              onClick={() => editToken()}
            >
              Update Token
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
