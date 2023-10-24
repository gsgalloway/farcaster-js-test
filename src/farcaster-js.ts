import { HubRestAPIClient, NeynarAPIClient, NeynarV2 } from "@standard-crypto/farcaster-js";

const client = new HubRestAPIClient();
const info = await client.getHubInfo();
console.log(info.nickname);

const neynarClient = new NeynarAPIClient("");
neynarClient.v2.reactToCast("", NeynarV2.ReactionType.Like, "");
