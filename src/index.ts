import {
    CastAdd,
    CastAddBody,
    FarcasterEpochTimestamp,
    HubRestAPIClient 
} from '@standard-crypto/farcaster-js-hub-rest';

const client = new HubRestAPIClient();
const castAdd: CastAdd | null = await client.getCastById({fid: 1, hash: ''});
const body: CastAddBody | undefined = undefined;
const timestamp = FarcasterEpochTimestamp.parse(castAdd?.data.timestamp ?? 0);
console.log(timestamp);


import { ReactionType } from '@standard-crypto/farcaster-js-neynar/v1';
import { ActiveStatus } from '@standard-crypto/farcaster-js-neynar/v2';

const like = ReactionType.Like;
const activeStatus = ActiveStatus.Active;
