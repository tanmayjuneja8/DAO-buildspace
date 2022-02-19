import sdk from "./1-initialize-sdk.js";
import { readFileSync } from "fs";

const bundleDrop = sdk.getBundleDropModule(
  "0x0173BaFF4d6B5f258a1b850165017353EE571609",
);

(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: "Mind Blowing Fuck!",
        description: "This NFT will give you access to SmartDAO!",
        image: readFileSync("scripts/assets/download.jpeg"),
      },
    ]);
    console.log("✅ Successfully created a new NFT in the drop!");
  } catch (error) {
    console.error("failed to create the new NFT", error);
  }
})()