/* pages/market/my-assets.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { nftmarketaddress, nftaddress } from "../../config";

import Market from "../../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../../artifacts/contracts/NFT.sol/NFT.json";

export default function MyAssets() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const web3Modal = new Web3Modal({
      network: process.env.WEB3_NETWORK,
      cacheProvider: true,
    });
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      signer
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const data = await marketContract.fetchMyNFTs();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length) return;
  <div>
    <div className="page-nav p-4">
      <Link href="/market">For Sale</Link> -
      <Link href="/market/create-item">Create Item</Link> -
      <Link href="/market/my-assets">My Assets</Link> -
      <Link href="/market/creator-dashboard">Dashboard</Link>
    </div>
    ;<h1 className="px-20 py-10 text-3xl">No Assets Owned</h1>
  </div>;
  return (
    <div>
      <div className="p-4 page-nav">
        <Link href="/market">For Sale</Link> -
        <Link href="/market/create-item">Create Item</Link> -
        <Link href="/market/my-assets">My Assets</Link> -
        <Link href="/market/creator-dashboard">Dashboard</Link>
      </div>
      <div className="p-4">
        <p>&nbsp;</p>
        <h1>My Assets</h1>
        <p>&nbsp;</p>
      </div>
      <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
