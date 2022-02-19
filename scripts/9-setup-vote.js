import { ethers } from "ethers";
import sdk from "./1-initialize-sdk.js";

// This is our governance contract.
const voteModule = sdk.getVoteModule(
  "0xa892bb45b97E8d10f7bCA63Da1cb29f59795c9b9",
);

// This is our ERC-20 contract.
const tokenModule = sdk.getTokenModule(
  "0xc27EA7dD409F459f08eE59566b62d6fc45D64cCa",
);

(async () => {
  try {
    // Give our treasury the power to mint additional token if needed.
    await tokenModule.grantRole("minter", voteModule.address);

    console.log(
      "✅ Successfully gave vote module permissions to act on token module"
    );
  } catch (error) {
    console.error(
      "failed to grant vote module permissions on token module",
      error
    );
    process.exit(1);
  }

  try {
    // Grab our wallet's token balance, remember -- we hold basically the entire supply right now!
    const ownedTokenBalance = await tokenModule.balanceOf(
      // The wallet address stored in your env file 
      process.env.WALLET_ADDRESS
    );

    // Grab 75% of the supply that we hold.
    const ownedAmount = ethers.BigNumber.from(ownedTokenBalance.value);
    const percent75 = ownedAmount.div(100).mul(75);

    // Transfer 75% of the supply to our voting contract.
    await tokenModule.transfer(
      voteModule.address,
      percent75
    );

    console.log("✅ Successfully transferred tokens to vote module");
  } catch (err) {
    console.error("failed to transfer tokens to vote module", err);
  }
})();