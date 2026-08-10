/**
 * truffle-config.js — BlockVerify
 *
 * This file tells Truffle:
 *   1. Which network to deploy to (Ganache locally, Sepolia for testnet)
 *   2. Which version of Solidity to use to compile your contracts
 *
 * HOW TO USE:
 *   - For local development: open Ganache GUI → Quickstart Ethereum
 *     then run: truffle migrate --reset
 *   - For Sepolia testnet (Week 15 only): fill in your .env file first
 *
 * IMPORTANT: never put private keys directly in this file.
 *            Use the .env file instead (see .env.example).
 */

require("dotenv").config(); // loads your .env file
const { INFURA_PROJECT_ID, DEPLOYER_PRIVATE_KEY } = process.env;

module.exports = {
  networks: {

    // ── LOCAL DEVELOPMENT (Ganache GUI) ──────────────────────────────
    // This is the network you will use for Weeks 1–14.
    // Open Ganache GUI → Quickstart Ethereum → it runs on port 7545.
    development: {
      host: "127.0.0.1", // localhost — your own computer
      port: 7545,         // default Ganache GUI port (change to 8545 if using Ganache CLI)
      network_id: "*",    // "*" means "match any network ID" — works with any Ganache
    },

    // ── SEPOLIA TESTNET (Week 15 only) ────────────────────────────────
    // You will not need this until Week 15.
    // Requires: INFURA_PROJECT_ID and DEPLOYER_PRIVATE_KEY in your .env file
    // Get free Sepolia ETH from: https://sepoliafaucet.com/
    //
    // Uncomment the block below only in Week 15:
    //
    // sepolia: {
    //   provider: () => {
    //     const HDWalletProvider = require("@truffle/hdwallet-provider");
    //     return new HDWalletProvider(
    //       DEPLOYER_PRIVATE_KEY,
    //       `https://sepolia.infura.io/v3/${INFURA_PROJECT_ID}`
    //     );
    //   },
    //   network_id: 11155111, // Sepolia's official network ID
    //   gas: 5500000,
    //   confirmations: 2,
    //   timeoutBlocks: 200,
    //   skipDryRun: true,
    // },

  },

  // ── SOLIDITY COMPILER ──────────────────────────────────────────────
  compilers: {
    solc: {
      version: "0.8.20",  // Must match the pragma in your .sol files
      settings: {
        optimizer: {
          enabled: true,  // Reduces gas cost of deployed contracts
          runs: 200,      // 200 = optimise for contracts called ~200 times
        },
      },
    },
  },

  // ── PLUGINS (optional, activate in Week 15) ───────────────────────
  // plugins: ["solidity-coverage"],
};
