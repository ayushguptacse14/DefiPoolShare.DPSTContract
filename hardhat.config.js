require("@nomiclabs/hardhat-waffle");
require('@nomiclabs/hardhat-ethers');
require("@nomiclabs/hardhat-etherscan");

const fs = require('fs');
var mnemonic = fs.readFileSync('./secrets.txt').toString();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});


module.exports = {
  solidity: "0.8.4",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545"
    },
    hardhat: {
    },
    testnet_bsc: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [`0x${mnemonic}`]
    },
    goerli: {
      url: "https://goerli.infura.io/v3/4f1a24ed50654f56b6ccf068bc54d64c",
      chainId: 5,
      gasPrice: 20000000000,
      accounts: [`0x${mnemonic}`]
    },
    mainnet_bsc: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${mnemonic}`]
    },
    mainnet_eth: {
      url: "",
      chainId: 1,
      gasPrice: 350000000000,
      accounts: [`0x${mnemonic}`]
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/25c8886f32444a94b1ae285588f6bacd",
      //chainId: 5,
      //gasPrice: 20000000000,
      accounts: [`0x${mnemonic}`]
    },
  },
  bscscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ""
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ""
  }
};
