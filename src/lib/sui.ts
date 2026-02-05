import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';

export const getTransaction = async (client: SuiJsonRpcClient, digest: string) => {
  return await client.getTransactionBlock({
    digest,
    options: {
      showEffects: true,
      showInput: true,
      showEvents: true,
      showObjectChanges: true,
      showBalanceChanges: true,
    },
  });
};

export const isValidDigest = (digest: string) => {
  return /^[a-zA-Z0-9]{32,64}$/.test(digest);
};
