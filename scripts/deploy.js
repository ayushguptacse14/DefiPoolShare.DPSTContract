const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account ETH Balance:", (await deployer.getBalance()).toString());

  const Token = await ethers.getContractFactory("DPSTERC20Contract");
  const token = await Token.deploy("Defi Pool Share Token", "DPST");

  console.log("DPST contract deployed address:", token.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});