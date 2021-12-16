const ABI = [`function safeMint(address to, string uri) public`];

const ADDRESS = "0xb56C22a246F39ac92fAFae8EAA82996f00ef5F19";

const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
// const { data } = require("autoprefixer");

/**   Mint an NFT for the recipient */

async function main(signer, recipient, uri) {
  const nft = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient, uri);
  console.log(`Minted an NFT for ${recipient} in ${tx.hash}`);
}

exports.handler = async function (event) {
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" });
  const recipient = event.request.body.recipient;
  const uri = event.request.body.uri;
  console.log(`Using relayer ${await signer.getAddress()}`);
  await main(signer, recipient, uri);
};
