/* pages/market/creator-dashboard.js */
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";
import Link from "next/link";

import { nftmarketaddress, nftaddress } from "../../../../config";

import Market from "../../../../artifacts/contracts/Market.sol/NFTMarket.json";
import NFT from "../../../../artifacts/contracts/NFT.sol/NFT.json";

export default function CreatorDashboard() {
  const [nfts, setNfts] = useState([]);
  const [sold, setSold] = useState([]);
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
    const data = await marketContract.fetchItemsCreated();

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
          sold: i.sold,
          image: meta.data.image,
          uri: tokenUri,
        };
        return item;
      })
    );
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter((i) => i.sold);
    setSold(soldItems);
    setNfts(items);
    setLoadingState("loaded");
  }
  if (loadingState === "loaded" && !nfts.length)
    <div>
      return <h1 className="py-10 px-20 text-3xl">No assets created</h1>;
      <div className="page-nav">
        <Link href="/market">For Sale</Link> -
        <Link href="/market/create-item">Create Item</Link> -
        <Link href="/market/my-assets">My Assets</Link> -
        <Link href="/market/creator-dashboard">Dashboard</Link>
      </div>
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
        <h1>DASHBOARD</h1>
        <p>&nbsp;</p>
      </div>
      <div className="p-4">
        <p className="text-2xl py-2 text-red-600 font-black">Items Created</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {nfts.map((nft, i) => (
            <div key={i} className="border shadow rounded-xl overflow-hidden">
              <img src={nft.image} className="rounded" />
              <div className="p-4 bg-black">
                <p className="text-2xl font-bold text-white">
                  Price - {nft.price} Eth
                </p>
                <p>
                  <a
                    target="_blank"
                    href={`${nft.uri}`}
                    title="Open link in a new tab"
                    rel="noopener noreferrer"
                  >
                    View JSON
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-4">
        {Boolean(sold.length) && (
          <div>
            <p className="text-2xl py-2 text-red-600">Items sold</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {sold.map((nft, i) => (
                <div
                  key={i}
                  className="border shadow rounded-xl overflow-hidden"
                >
                  <img src={nft.image} className="rounded" />
                  <div className="p-4 bg-black">
                    <p className="text-2xl font-bold text-white">
                      Price - {nft.price} Eth
                    </p>
                    <p>
                      <a
                        target="_blank"
                        href={`${nft.uri}`}
                        title="Open link in a new tab"
                        rel="noopener noreferrer"
                      >
                        View JSON
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
