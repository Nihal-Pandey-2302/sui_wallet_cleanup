export interface BurnRecord {
  id: string;
  txDigest: string;
  objectIds: string[];
  timestamp: number;
  network: string;
  objectCount: number;
}

const STORAGE_KEY = 'sui_cleanup_burn_history';

export const BurnHistory = {
  getAll(): BurnRecord[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  add(record: Omit<BurnRecord, 'id' | 'timestamp'>): void {
    const records = this.getAll();
    const newRecord: BurnRecord = {
      ...record,
      id: crypto.randomUUID(),
      timestamp: Date.now(),
    };
    records.unshift(newRecord); // Add to beginning
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records.slice(0, 100))); // Keep last 100
  },

  clear(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
