/* pages/manager/transferContractOwner.js */

import { useState } from "react";
import { useSession } from "next-auth/client";
import { ethers } from "ethers";
//import { create } from "ipfs-http-client";
import { useRouter } from "next/router";
import Web3Modal from "web3modal";
import Link from "next/link";
import Router from "next/router";
//import { toast, ToastContainer } from "react-nextjs-toast";

//

import { spcapvaddress } from "../../../../configspcapv";
import SPCAPV from "../../../../artifacts/contracts/Spcapv.sol/SPCAPV.json";

export default function TransferContractOwner() {
  const [session] = useSession();
  const router = useRouter();
  const newOwnerAddress = "0xd8d8f1eb72e809858af2eac37f6d0fe0c3043336";

  // Connect MetaMask

  async function createTransfer() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const owner = await signer.getAddress();

    if (!newOwnerAddress) return;

    //const newOwnerAddress = "0xd8d8f1eb72e809858af2eac37f6d0fe0c3043336";

    // End of connect MetaMask

    /* next, create the item */
    let contract = new ethers.Contract(spcapvaddress, SPCAPV.abi, signer);
    let transaction = await contract.transferOwnership(newOwnerAddress);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[0];
    console.log(value);

    //setDisable(false);
    Router.push("/manager");
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
        <p className="px-20 py-10 text-3xl font-black">
          Transfer Contract Owner
        </p>
        <p>&nbsp;</p>
        <p>Address: {newOwnerAddress}</p>
        <p>&nbsp;</p>
        <br />
        <button
          onClick={""}
          className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg"
        >
          Transfer Now!
        </button>
      </div>
    </div>
  );
}
