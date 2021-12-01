import Link from "next/link";
import React from "react";
import { ethers, BigNumber } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import { nftaddress } from "../../../config";
import NFT from "../../../artifacts/contracts/NFT.sol/NFT.json";
import { useRouter } from "next/router";

export default function NftDetails() {
  const [loadingState, setLoadingState] = useState("not-loaded");
  const router = useRouter();
  const finid = router.query.id;
  const [tokenUri, setTokenUri] = useState("");
  const [mymeta, setMymeta] = useState([]);

  useEffect(() => {
    LoadNft();
  }, []);

  async function LoadNft() {
    const web3Modal = new Web3Modal({
      network: process.env.WEB3_NETWORK,
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const mytcAddress = tokenContract.address;
    const myuri = await tokenContract.tokenURI(parseInt(finid)); //fix this
    //const myuri = await tokenContract.tokenUri;

    const meta = await axios.get(myuri);

    let items = {
      description: meta.data.description,
      image: meta.data.image,
      uri: myuri,
      name: meta.data.name,
      tokenId: finid,
      tcaddress: mytcAddress,
    };
    setMymeta(items);
    setLoadingState("loaded");
  }

  if (loadingState === "loaded" && !mymeta)
    return (
      <div>
        <div className="page-nav p-4">
          <Link href="/market">For Sale</Link> -
          <Link href="/market/create-item">Create Item</Link> -
          <Link href="/market/my-assets">My Assets</Link> -
          <Link href="/market/creator-dashboard">Dashboard</Link>
        </div>
        <h1 className="px-20 py-10 text-3xl">No Asset Found</h1>
      </div>
    );

  return (
    <div className="flex flex-col min-h-screen">
      <div className="page-nav p-4">
        <Link href="/market">For Sale</Link> -
        <Link href="/market/create-item">Create Item</Link> -
        <Link href="/market/my-assets">My Assets</Link> -
        <Link href="/market/creator-dashboard">Dashboard</Link>
      </div>
      <main className="main">
        <h1>NFT ERC-721 Token ID: {mymeta.tokenId}</h1>
        <div className="border shadow rounded-xl overflow-hidden">
          <a
            target="_blank"
            href={`${mymeta.image}`}
            alt="Open image in a new tab"
            title="Open image in a new tab"
            rel="noopener noreferrer"
          >
            <img src={mymeta.image} className="rounded" />
          </a>
          <div className="p-4 bg-black">
            <p className="text-2xl font-bold text-white">
              Description - {mymeta.description} Eth
            </p>
          </div>
        </div>
        <p>&nbsp;</p>
        <hr />
        <p>&nbsp;</p>
        <p>
          <a
            target="_blank"
            href={`${mymeta.uri}`}
            title="Open link in a new tab"
            rel="noopener noreferrer"
          >
            View IPFS JSON Details
          </a>
        </p>

        <p>
          <a
            target="_blank"
            rel="noopener noreferrer"
            title="Open link in a new tab"
            href={`https://ropsten.etherscan.io/address/${mymeta.tcaddress}`}
          >
            View Contract on Blockchain
          </a>
        </p>
        <p>Token Contract #: {mymeta.tcaddress}</p>
        <p>&nbsp;</p>
        <hr />
        <p>&nbsp;</p>
        <h2>Todo List</h2>
        <ul>
          <li>For Sale?</li>
          <li>Owner address</li>
          <li>Market address</li>
          <li>Price</li>
          <li>Blockchain Name</li>
          <li>BC Link</li>
          <li>Link to list for sale</li>
          <li>Link to delist sale</li>
          <li>Local DB - Maybe</li>
          <li>
            <strike>Image click to see big</strike>
          </li>
          <li>
            <strike>Link to json</strike>
          </li>
          <li>Show USD values</li>
        </ul>
        <p>&nbsp;</p>
        <p>&nbsp;</p>
      </main>
      <footer className="text-center font-bold text-xl">
        <b>Powered by John Dunnicliffe</b>
      </footer>
    </div>
  );
}
