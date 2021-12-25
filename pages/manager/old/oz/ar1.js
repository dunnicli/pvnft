import {
    DefenderRelayProvider,
    DefenderRelaySigner,
  } from "defender-relay-client";

  
  async function createSale(url) {
    //const web3Modal = new Web3Modal();
    //const connection = await web3Modal.connect();
    //const provider = new ethers.providers.Web3Provider(connection);
    //const signer = provider.getSigner();

    const credentials = { apiKey: ozApiKey, apiSecret: ozApiSecret };
    const provider = new DefenderRelayProvider(credentials);
    const signer = new DefenderRelaySigner(credentials, provider, {
      speed: "fast",
    });
    const owner = await signer.getAddress();

    // End of connect MetaMask

    /* next, create the item */
    let contract = new ethers.Contract(spcapvaddress, SPCAPV.abi, signer);
    let transaction = await contract.safeMint(owner, url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    // End of create the item

    