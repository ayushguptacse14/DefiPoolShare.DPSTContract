const hre = require("hardhat")

async function getBalance()
{
  const dpstToken = await ethers.getContractFactory("DPSTERC20Contract");
  const contract = await dpstToken.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3")
  const [deployer] = await ethers.getSigners();
  const balance = await contract.balanceOf(deployer.address)
  return (balance / 1e18)
}

async function main()
{
  const balance = await getBalance()
  console.log(balance)
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});