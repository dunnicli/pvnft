const ABI = [`function safeMint(address to, string uri) public`];

const URI =
  "https://ipfs.infura.io/ipfs/QmdjktWvjtrqjJdkmbkUokpmQzMZaJnrEVRWBmBUy3TbRi";
const ADDRESS = "0xb56C22a246F39ac92fAFae8EAA82996f00ef5F19";
const RECIPIENT = "0x69858424642a19eb0C9cb68D8FC8985cF3070045";

const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");

/**   Mint an NFT for the recipient */

async function main(signer, recipient) {
  const nft = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient, URI);
  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

exports.handler = async function (params) {
  const provider = new DefenderRelayProvider(params);
  const signer = new DefenderRelaySigner(params, provider, { speed: "fast" });
  console.log(`Using relayer ${await signer.getAddress()}`);
  await main(signer, RECIPIENT);
};
