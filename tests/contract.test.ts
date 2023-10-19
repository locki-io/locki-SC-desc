import { test, beforeEach, afterEach, describe, assert } from "vitest";
import { SWorld, SWallet, SContract, e } from "xsuite";

let world: SWorld;
let deployer: SWallet;
let contract: SContract;

beforeEach(async () => {
  world = await SWorld.start();
  deployer = await world.createWallet();
  ({ contract } = await deployer.deployContract({
    code: "file:output/contract.wasm",
    codeMetadata: [],
    gasLimit: 10_000_000,
  }));
});

afterEach(async () => {
  await world.terminate();
});

describe('Creators Description',async () => {
  test("store and get creators description",async () => {
    await deployer.callContract({
      callee: contract,
      gasLimit: 5_000_000,
      funcName: "storeCreatorDescription",
      funcArgs: [e.U8(1), e.Str("First Description")]
    });

    const lengthResult = await deployer.callContract({
      callee: contract,
      gasLimit: 5_000_000,
      funcName: "getCretorsDescription",
      funcArgs: [e.U8(1)]
    });
    console.log('lengthResult', lengthResult.returnData);

    const result = await deployer.callContract({
      callee: contract,
      gasLimit: 5_000_000,
      funcName: "getCretorsDescription",
      funcArgs: [e.U8(1)]
    });
    console.log('result.returnData', result.returnData);

    assert(result.returnData.includes("First Description"), "contract did not save the description");
  });
})
