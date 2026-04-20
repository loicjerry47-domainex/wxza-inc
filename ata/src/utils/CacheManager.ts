interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
  accessCount: number;
  lastAccessed: number;
}

interface CacheOptions {
  ttl?: number; // Time to live in ms
  maxSize?: number; // Maximum cache size
  persistToStorage?: boolean; // Persist to localStorage
  compressionEnabled?: boolean; // Enable data compression
}

export class CacheManager {
  private cache = new Map<string, CacheEntry<any>>();
  private maxSize: number;
  private defaultTTL: number;
  private persistToStorage: boolean;
  private compressionEnabled: boolean;
  private cleanupInterval: NodeJS.Timeout | null = null;

  constructor(options: CacheOptions = {}) {
    this.maxSize = options.maxSize ?? 100;
    this.defaultTTL = options.ttl ?? 300000; // 5 minutes default
    this.persistToStorage = options.persistToStorage ?? false;
    this.compressionEnabled = options.compressionEnabled ?? false;

    // Start cleanup interval
    this.startCleanup();

    // Load from storage if enabled
    if (this.persistToStorage && typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  set<T>(key: string, data: T, options: { ttl?: number } = {}): void {
    const ttl = options.ttl ?? this.defaultTTL;
    const entry: CacheEntry<T> = {
      data: this.compressionEnabled ? this.compress(data) : data,
      timestamp: Date.now(),
      ttl,
      accessCount: 0,
      lastAccessed: Date.now(),
    };

    // Evict if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictLeastUsed();
    }

    this.cache.set(key, entry);

    // Persist to storage if enabled
    if (this.persistToStorage) {
      this.saveToStorage(key, entry);
    }
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }

    // Check if expired
    if (this.isExpired(entry)) {
      this.delete(key);
      return null;
    }

    // Update access statistics
    entry.accessCount++;
    entry.lastAccessed = Date.now();

    const data = this.compressionEnabled ? this.decompress(entry.data) : entry.data;
    return data as T;
  }

  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) return false;
    
    if (this.isExpired(entry)) {
      this.delete(key);
      return false;
    }
    
    return true;
  }

  delete(key: string): boolean {
    const deleted = this.cache.delete(key);
    
    if (deleted && this.persistToStorage && typeof window !== 'undefined') {
      try {
        localStorage.removeItem(`cache_${key}`);
      } catch (error) {
        console.warn('Failed to remove from storage:', error);
      }
    }
    
    return deleted;
  }

  clear(): void {
    this.cache.clear();
    
    if (this.persistToStorage && typeof window !== 'undefined') {
      try {
        const keys = Object.keys(localStorage).filter(key => key.startsWith('cache_'));
        keys.forEach(key => localStorage.removeItem(key));
      } catch (error) {
        console.warn('Failed to clear storage:', error);
      }
    }
  }

  size(): number {
    return this.cache.size;
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    const totalSize = entries.length;
    const expired = entries.filter(entry => this.isExpired(entry)).length;
    const totalAccess = entries.reduce((sum, entry) => sum + entry.accessCount, 0);
    const avgAccess = totalSize > 0 ? totalAccess / totalSize : 0;

    return {
      totalSize,
      expired,
      avgAccess,
      hitRate: this.calculateHitRate(),
      memoryUsage: this.estimateMemoryUsage(),
    };
  }

  // Batch operations for better performance
  setBatch<T>(entries: Array<{ key: string; data: T; ttl?: number }>): void {
    entries.forEach(({ key, data, ttl }) => {
      this.set(key, data, { ttl });
    });
  }

  getBatch<T>(keys: string[]): Map<string, T | null> {
    const results = new Map<string, T | null>();
    keys.forEach(key => {
      results.set(key, this.get<T>(key));
    });
    return results;
  }

  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.ttl;
  }

  private evictLeastUsed(): void {
    let leastUsedKey: string | null = null;
    let leastUsedEntry: CacheEntry<any> | null = null;

    for (const [key, entry] of this.cache.entries()) {
      if (!leastUsedEntry || entry.accessCount < leastUsedEntry.accessCount) {
        leastUsedKey = key;
        leastUsedEntry = entry;
      }
    }

    if (leastUsedKey) {
      this.delete(leastUsedKey);
    }
  }

  private startCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const expiredKeys: string[] = [];
      
      for (const [key, entry] of this.cache.entries()) {
        if (this.isExpired(entry)) {
          expiredKeys.push(key);
        }
      }
      
      expiredKeys.forEach(key => this.delete(key));
    }, 60000); // Cleanup every minute
  }

  private stopCleanup(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  private compress(data: any): string {
    if (!this.compressionEnabled) return data;
    try {
      return JSON.stringify(data);
    } catch {
      return data;
    }
  }

  private decompress(data: any): any {
    if (!this.compressionEnabled) return data;
    try {
      return JSON.parse(data);
    } catch {
      return data;
    }
  }

  private saveToStorage(key: string, entry: CacheEntry<any>): void {
    if (typeof window === 'undefined') return;
    
    try {
      const storageKey = `cache_${key}`;
      const storageData = {
        ...entry,
        timestamp: Date.now(), // Reset timestamp for storage
      };
      localStorage.setItem(storageKey, JSON.stringify(storageData));
    } catch (error) {
      console.warn('Failed to save to storage:', error);
    }
  }

  private loadFromStorage(): void {
    if (typeof window === 'undefined') return;
    
    try {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('cache_'));
      
      keys.forEach(storageKey => {
        try {
          const key = storageKey.replace('cache_', '');
          const data = localStorage.getItem(storageKey);
          
          if (data) {
            const entry: CacheEntry<any> = JSON.parse(data);
            
            // Check if still valid
            if (!this.isExpired(entry)) {
              this.cache.set(key, entry);
            } else {
              localStorage.removeItem(storageKey);
            }
          }
        } catch (error) {
          console.warn('Failed to load cache entry:', error);
          localStorage.removeItem(storageKey);
        }
      });
    } catch (error) {
      console.warn('Failed to load from storage:', error);
    }
  }

  private calculateHitRate(): number {
    // This would need to be tracked separately in a real implementation
    return 0; // Placeholder
  }

  private estimateMemoryUsage(): number {
    try {
      const serialized = JSON.stringify(Array.from(this.cache.entries()));
      return new Blob([serialized]).size;
    } catch {
      return 0;
    }
  }

  destroy(): void {
    this.stopCleanup();
    this.clear();
  }
}

// Global cache instance
export const globalCache = new CacheManager({
  maxSize: 200,
  ttl: 300000, // 5 minutes
  persistToStorage: true,
  compressionEnabled: true,
});

// Specialized caches for different data types
export const ventureCache = new CacheManager({
  maxSize: 50,
  ttl: 600000, // 10 minutes
  persistToStorage: true,
});

export const analyticsCache = new CacheManager({
  maxSize: 100,
  ttl: 180000, // 3 minutes
  persistToStorage: false,
});

export const imageCache = new CacheManager({
  maxSize: 500,
  ttl: 3600000, // 1 hour
  persistToStorage: true,
});