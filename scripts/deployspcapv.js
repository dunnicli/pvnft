const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const SPCAPV = await hre.ethers.getContractFactory("SPCAPV");
  const spcapv = await SPCAPV.deploy();
  await spcapv.deployed();
  console.log("spcapv deployed to:", spcapv.address);

  let configspcapv = `
  export const spcapvaddress = "${spcapv.address}"
  `;

  let data = JSON.stringify(configspcapv);
  fs.writeFileSync("configspcapv.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
