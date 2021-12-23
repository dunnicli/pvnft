/* pages/profile/createNewNft.js */

import { useState } from "react";
import { useSession } from "next-auth/client";
//import { ethers } from "ethers";
import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
//import Web3Modal from "web3modal";
import Link from "next/link";
import Router from "next/router";
import { toast, ToastContainer } from "react-nextjs-toast";

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

export default function CreateItem() {
  const [fileUrl, setFileUrl] = useState(null);
  const [session] = useSession();
  const router = useRouter();
  const thecontractId = 4;

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
    //toast.notify(`Hi, I am a toast!`);
    toast.notify(
      "Please wait for the blockchain operations to complete. This might take up to 2 minutes or more.",
      {
        duration: 20,
        title: "Creating NFT",
        type: "success",
      }
    );
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
      //const description = data.description;
      /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
      createSale(url);
    } catch (error) {
      console.log("Error uploading file: ", error);
    }
  }
  // End of upload to IPFS

  // Connect MetaMask

  async function createSale(url) {
    // Relay and Autotask Here
    // _________________________________________
    // _________________________________________
    // _________________________________________

    const webhook = process.env.NEXT_PUBLIC_AUTOTASK1;
    const uri = url;
    const recipient = "0x69858424642a19eb0c9cb68d8fc8985cf3070045";

    //
    let relayFormData = {
      uri,
      recipient,
    };

    // End new code

    const response = await fetch(webhook, {
      method: "POST",
      body: JSON.stringify(relayFormData),
      headers: { "Content-Type": "application/json" },
    });

    const added = await response.json();

    if (added) {
      console.log("JD JSON reply: ", added);

      const flog = Buffer.from(added.encodedLogs, "base64");
      const fflog = flog.toString();

      // 146 and 215
      // should be 148 and 214
      const firstat = fflog.indexOf("@@") + 2;
      const lastat = fflog.lastIndexOf("@@");

      // Put @ signs in my console log.
      var res = fflog.substring(firstat, lastat);

      var tokenId = parseInt(res, 16);
    } else {
      var tokenId = 9999;
    }

    // GET THE PAYMENT ID
    //const paymentId = pmtid;

    // GET THE PAYMENT STATUS

    // _________________________________________
    // _________________________________________
    // _________________________________________

    // End Relay and Autotask Here
    // _________________________________________
    // _________________________________________
    // _________________________________________

    // Next add to your database
    const contractId = thecontractId;
    const metaName = formInput.name;
    const metaDescription = formInput.description;
    const metaImageUrl = fileUrl;
    const tokenJsonUri = url;
    const ownerAddress = recipient;
    const ownerId = session.user.uid;
    const createdBy = session.user.uid;

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

    await fetch(`/api/manager/nfts/tokens/newtoken`, {
      method: "POST",
      body: JSON.stringify(formData),
    });
    //setDisable(false);
    toast.remove();
    Router.push(`/oz/success/${tokenId}`);
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

        <p>&nbsp;</p>
        <ToastContainer />
        <br />
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
