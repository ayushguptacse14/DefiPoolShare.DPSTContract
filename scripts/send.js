const hre = require("hardhat")
const tokenHash = "0x5FbDB2315678afecb367f032d93F642f64180aa3"

async function sendTo(to, amount)
{
  const dpstToken = await ethers.getContractFactory("KryxiviaCoin");
  const contract = await dpstToken.attach(tokenHash)
  return await contract.transfer(to, amount)
}

async function main()
{
    const dpstToken = await ethers.getContractFactory("DPSTERC20Contract");
    const contract = await dpstToken.attach(tokenHash)

    const [deployer] = await ethers.getSigners();

    const signers = await ethers.getSigners();
    signers.push({address: "0xf953b3A269d80e3eB0F2947630Da976B896A8C5b"})
    for (const signer of signers) {
        if (signer.address == deployer.address) { continue; }
        const result = await sendTo(signer.address, "750000000000000000000000")
        if (result) { 
            console.log(`${signer.address} have now ${(await contract.balanceOf(signer.address))/1e18} dpst`)
        }
    }
    console.log(`Deployer still have: ${(await contract.balanceOf(deployer.address))/1e18} dpst`)
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});