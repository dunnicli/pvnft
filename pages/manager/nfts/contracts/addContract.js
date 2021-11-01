import Head from "next/head";
import { useState } from "react";
import Router from "next/router";

export default function AddContract() {
  const [formData, setFormData] = useState({});

  async function saveContract(e) {
    e.preventDefault();
    const response = await fetch("/api/manager/nfts/contracts/addcontract", {
      method: "POST",
      body: JSON.stringify(formData),
    });

    return await response.json(), await Router.push("/manager/nfts/contracts");
  }

  return (
    <div>
      <Head>
        <title>Add New Contract</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <p>&nbsp;</p>
        <div className="page-nav">
          <h3>New Contract</h3>
        </div>

        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={saveContract}
        >
          <p>
            <b>Contract Name *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Contract Name"
              name="contractName"
              onChange={(e) =>
                setFormData({ ...formData, contractName: e.target.value })
              }
            />
          </p>
          <p>
            <b>Token Type *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token Type - ie EC721"
              name="tokenType"
              onChange={(e) =>
                setFormData({ ...formData, tokenType: e.target.value })
              }
            />
          </p>
          <p>
            <b>Contract Address *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Contract Blockchain Address"
              name="address"
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
            />
          </p>
          <p>
            <b>Token Name *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token Name - ie Metaverse"
              name="tokenName"
              onChange={(e) =>
                setFormData({ ...formData, tokenName: e.target.value })
              }
            />
          </p>
          <p>
            <b>Token Symbol *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Token Symbol - ie SPCAPV"
              name="tokenSymbol"
              onChange={(e) =>
                setFormData({ ...formData, tokenSymbol: e.target.value })
              }
            />
          </p>
          <p>
            <b>Network Name *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Network Name ie ETH Mainnet"
              name="network"
              onChange={(e) =>
                setFormData({ ...formData, network: e.target.value })
              }
            />
          </p>
          <p>
            <b>Etherscan Address *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Etherscan Contract URL"
              name="scanUrl"
              onChange={(e) =>
                setFormData({ ...formData, scanUrl: e.target.value })
              }
            />
          </p>
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
          <p>
            <b>Owner User ID - Int *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Owner User ID - Int"
              name="ownerId"
              onChange={(e) =>
                setFormData({ ...formData, ownerId: e.target.value })
              }
            />
          </p>
          <p>
            <b>Description</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Description"
              name="description"
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />
          </p>
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
          <p>
            <b>Created By - Int *</b>
            <br />
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Created By - User ID"
              name="createdBy"
              onChange={(e) =>
                setFormData({ ...formData, createdBy: e.target.value })
              }
            />
          </p>

          <p>&nbsp;</p>
          <p>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Add New Contract
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}
