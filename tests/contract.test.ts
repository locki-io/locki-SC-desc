import { test, beforeEach, afterEach, describe, assert, expect } from "vitest";
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

    const result = await world.query({
      callee: contract,
      funcName: "you_mint_lucky_you",
      funcArgs: [e.U8(1)]
    });
    const descriptionBuffer = Buffer.from(result.returnData?.[0] || '', 'hex');
    const description = descriptionBuffer.toString();

    expect(description).toContain("First Description");
  });
})
