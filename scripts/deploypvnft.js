const hre = require("hardhat");
const fs = require("fs");

async function main() {
  const PVNFT = await hre.ethers.getContractFactory("PVNFT");
  const pvnft = await PVNFT.deploy();
  await pvnft.deployed();
  console.log("pvnft deployed to:", pvnft.address);

  let configpvnft = `
  export const pvnftaddress = "${pvnft.address}"
  `;

  let data = JSON.stringify(configpvnft);
  fs.writeFileSync("configpvnft.js", JSON.parse(data));
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
