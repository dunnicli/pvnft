const ABI = [`function safeMint(address to, string uri) public`];

const ADDRESS = "0xb56C22a246F39ac92fAFae8EAA82996f00ef5F19";

const { ethers } = require("ethers");
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require("defender-relay-client/lib/ethers");
// const { data } = require("autoprefixer");

/**   Mint an NFT for the recipient */
// getTransactionReceipt

async function main(signer, recipient, uri) {
  const nft = new ethers.Contract(ADDRESS, ABI, signer);
  const tx = await nft.safeMint(recipient, uri);
  const mytx = await tx.wait();
  // or mytx = await tx.wait(tx.hash);
  const myevent = mytx.logs[0];
  myvalue = myevent.topics[3];
  var mytid = "Ghost";
  return {
    "Token ID": `${mytid}`,
  };

  //await exports.handler(myvalue);
}

exports.handler = async function (event, context) {
  const provider = new DefenderRelayProvider(event);
  const signer = new DefenderRelaySigner(event, provider, { speed: "fast" });
  const recipient = event.request.body.recipient;
  const uri = event.request.body.uri;
  //const myvalue = MYVALUE;
  //const myvalue = main.myvalue;
  console.log(`Using relayer ${await signer.getAddress()}`);
  await main(signer, recipient, uri);
  return {
    hello: `Minted an NFT for ${recipient} in ${tx.hash}`,
    "Token ID": `${context.mytid}`,
    // JSON-serialized and included in the `result` field of the response
  };
};
