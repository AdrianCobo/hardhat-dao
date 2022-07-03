import * as fs from "fs";
import { ethers, network } from "hardhat";
import { proposalsFile, VOTING_PERIOD, developmentChains } from "../helper-hardhat-config";
import { moveBlocks } from "../utils/move-blocks";

const index = 0;//indice de las propuestas de proposals.json

async function main(proposalIndex: number) {
    const proposals = JSON.parse(fs.readFileSync(proposalsFile, "utf8"));
    const proposalId = proposals[network.config.chainId!][proposalIndex];
    //0 = Against, 1 = For, 2 = Abstain
    const voteWey = 1;
    const governor = await ethers.getContract("GovernorContract");
    const reason = "I like a do da cha cha";
    const voteTxResponse = await governor.castVoteWithReason(proposalId, voteWey, reason);
    await voteTxResponse.wait(1);
    if(developmentChains.includes(network.companionNetworks.name)){
        await moveBlocks(VOTING_PERIOD + 1);
    }

    console.log("Voted! Ready to go!");
}

main(index)
.then(() => process.exit(0)).catch((error) => {
    console.log(error);
    process.exit(1);
});