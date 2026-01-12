import { ethers } from "hardhat";

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    // 1. Deploy Mock MNEE
    const mnee = await ethers.deployContract("MockMNEE");
    await mnee.waitForDeployment();
    const mneeAddress = await mnee.getAddress();
    console.log(`MockMNEE deployed to: ${mneeAddress}`);

    // 2. Deploy VetoVault
    const vetoVault = await ethers.deployContract("VetoVault", [mneeAddress]);
    await vetoVault.waitForDeployment();
    const vaultAddress = await vetoVault.getAddress();
    console.log(`VetoVault deployed to: ${vaultAddress}`);

    // 3. Output for Frontend
    console.log("\n--- FRONTEND CONFIG ---");
    console.log(`export const MNEE_ADDRESS = "${mneeAddress}";`);
    console.log(`export const VETO_VAULT_ADDRESS = "${vaultAddress}";`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
