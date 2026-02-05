import { useCurrentAccount, useSuiClient } from '@mysten/dapp-kit';
import { useQuery } from '@tanstack/react-query';

export function useScanner() {
  const account = useCurrentAccount();
  const client = useSuiClient();

  return useQuery({
    queryKey: ['scanner', account?.address],
    enabled: !!account,
    queryFn: async () => {
      if (!account?.address) return [];

      let hasNextPage = true;
      let nextCursor: string | null = null;
      let allObjects = [];

      while (hasNextPage) {
        const response = await client.getOwnedObjects({
          owner: account.address,
          options: {
            showDisplay: true,
            showType: true,
            showContent: true,
          },
          cursor: nextCursor,
        });

        const filtered = response.data.filter(
          (obj) => obj.data?.type && !obj.data.type.startsWith('0x2::coin::Coin')
        );

        allObjects.push(...filtered);
        hasNextPage = response.hasNextPage;
        nextCursor = response.nextCursor ?? null;
      }

      return allObjects;
    },
  });
}
