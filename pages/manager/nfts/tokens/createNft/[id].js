/* pages/manager/nfts/tokens/createNft/[id].js */

import { useState } from "react";
import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Link from "next/link";
import Router from "next/router";

const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECTID;
const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECTSECRET;
const auth =
  "Basic " + Buffer.from(projectId + ":" + projectSecret).toString("base64");

const client = create({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
  headers: {
    authorization: auth,
  },
});

//

import { nftaddress } from "../../../../../config";
import NFT from "../../../../../artifacts/contracts/NFT.sol/NFT.json";

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [session] = useSession();
  const router = useRouter();
  const thecontractId = router.query.id;

  const [formInput, updateFormInput] = useState({
    //price: "",
    name: "",
    description: "",
  });

  async function onChange(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      });
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      setFileUrl(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  async function createMarket() {
    // Upload the file to IPFS

    const { name, description } = formInput;
    if (!name || !description || !fileUrl) return;
    /* first, upload to IPFS */
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    });
    try {
      const added = await client.add(data);
      const url = `https://ipfs.infura.io/ipfs/${added.path}`;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url, name, description);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  // End of upload to IPFS

  // Connect MetaMask

  async function createSale(url, name, description) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    // End of connect MetaMask

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    // End of create the item

    // Next add to your database
    const contractId = parseInt(thecontractId);
    //const tokenId = parseInt(tokenId);
    const metaName = name;
    const metaDescription = description;
    const metaImageUrl = fileUrl;
    const tokenJsonUri = url;
    const ownerAddress = signer.address;
    const ownerId = parseInt(session.user.uid);
    const createdBy = parseInt(session.user.uid);

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
    };

    await fetch(`/api/manager/nfts/tokens/addtoken`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    //setDisable(false);
    Router.push("/manager/nfts/tokens");
  }

  return (
    <div className="flex p-4">
      <div className="w-1/2 flex flex-col pb-12">
        <div className="page-nav p-2">
          <Link href="/market">For Sale</Link> -
          <Link href="/market/create-item">Create Item</Link> -
          <Link href="/market/my-assets">My Assets</Link> -
          <Link href="/market/creator-dashboard">Dashboard</Link>
        </div>
        <p className="px-20 py-10 text-3xl font-black">Create New NFT</p>
        <input
          placeholder="NFT Name - Title"
          className="mt-8 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, name: e.target.value })
          }
        />
        <textarea
          placeholder="NFT Description"
          className="mt-2 border rounded p-4"
          onChange={(e) =>
            updateFormInput({ ...formInput, description: e.target.value })
          }
        />

        <input type="file" name="Asset" className="my-4" onChange={onChange} />
        {fileUrl && <img className="rounded mt-4" width="350" src={fileUrl} />}
        <button
          onClick={createMarket}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Create NFT
        </button>
      </div>
    </div>
  );
}
