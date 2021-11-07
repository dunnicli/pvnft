import Head from "next/head";
import { useState } from "react";
import Router from "next/router";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";
//import { getSession } from "next-auth/react"

// SET BOOLEAN AND HIDDEN FIELDS
// import contract id from query

export default function AddToken() {
  const [session] = useSession();
  const [formData, setFormData] = useState({});
  const router = useRouter();
  const contractId = router.query.contractid;

  async function saveToken(e) {
    e.preventDefault();
    const response = await fetch("/api/manager/nfts/tokens/addtoken", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return await response.json(), await Router.push("/manager/nfts/tokens");
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
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={saveToken}
        >
          <p>
            <b>Token ID Int* on Network</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token ID"
              name="tokenId"
              onChange={(e) =>
                setFormData({ ...formData, tokenId: e.target.value })
              }
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Contract ID Int* DB</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              defaultValue={contractId}
              name="contractId"
              onLoad={(e) =>
                setFormData({ ...formData, contractId: e.target.defaultValue })
              }
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
              name="metaName"
              onChange={(e) =>
                setFormData({ ...formData, metaName: e.target.value })
              }
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
              name="metaDescription"
              onChange={(e) =>
                setFormData({ ...formData, metaDescription: e.target.value })
              }
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
              name="metaImageUrl"
              onChange={(e) =>
                setFormData({ ...formData, metaImageUrl: e.target.value })
              }
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
              name="tokenJsonUri"
              onChange={(e) =>
                setFormData({ ...formData, tokenJsonUri: e.target.value })
              }
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
              name="ownerAddress"
              onChange={(e) =>
                setFormData({ ...formData, ownerAddress: e.target.value })
              }
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
              name="ownerId"
              onChange={(e) =>
                setFormData({ ...formData, ownerId: e.target.value })
              }
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
              name="notes"
              onChange={(e) =>
                setFormData({ ...formData, notes: e.target.value })
              }
            />
          </p>
          <p>&nbsp;</p>
          <b>Display Token in Collections?</b>
          <br />
          <p>
            <input
              type="radio"
              className="form-radio"
              name="display"
              defaultValue="true"
              id="displaytrue"
              onChange={(e) =>
                setFormData({ ...formData, display: e.target.defaultValue })
              }
            />
            <label htmlFor="yes">Yes!</label>
          </p>
          <p>
            <input
              type="radio"
              className="form-radio"
              name="display"
              defaultValue="false"
              id="displayfalse"
              onChange={(e) =>
                setFormData({ ...formData, display: e.target.defaultValue })
              }
            />
            <label htmlFor="no">No</label>
          </p>
          <p>&nbsp;</p>

          <b>List Token For Sale?</b>
          <br />
          <p>
            <input
              type="radio"
              className="form-radio"
              name="forSale"
              defaultValue="true"
              id="saletrue"
              onChange={(e) =>
                setFormData({ ...formData, forSale: e.target.defaultValue })
              }
            />
            <label htmlFor="yes">Yes!</label>
          </p>
          <p>
            <input
              type="radio"
              className="form-radio"
              name="forSale"
              defaultValue="false"
              id="displayfalse"
              onChange={(e) =>
                setFormData({ ...formData, forSale: e.target.defaultValue })
              }
            />
            <label htmlFor="no">No</label>
          </p>

          <p>&nbsp;</p>
          <p>
            <b>Selling Price - in ETH</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Selling Price - in ETH"
              name="salePrice"
              onChange={(e) =>
                setFormData({ ...formData, salePrice: e.target.value })
              }
            />
          </p>
          <p>&nbsp;</p>
          <p>
            <b>Created By - Int DB *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              //defaultValue={session.user.uid}
              name="createdBy"
              onLoad={(e) =>
                setFormData({
                  ...formData,
                  createdBy: e.target.value.parseInt(`session.user.uid`),
                })
              }
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add New Token
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
