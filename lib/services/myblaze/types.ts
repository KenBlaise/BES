import type { MyBlazeAccount, PriceRangeId, StyleProfile } from "@/lib/types";

export interface MyBlazeService {
  getAccount(accountId: string): Promise<MyBlazeAccount | undefined>;
  getAccountByEmail(email: string): Promise<MyBlazeAccount | undefined>;
  createAccount(input: {
    firstName: string;
    email: string;
    phoneOptional?: string;
  }): Promise<MyBlazeAccount>;
  saveFrame(accountId: string, frameId: string): Promise<MyBlazeAccount>;
  removeFrame(accountId: string, frameId: string): Promise<MyBlazeAccount>;
  addRecentlyViewed(accountId: string, frameId: string): Promise<void>;
  addTryAtBlaze(accountId: string, frameId: string): Promise<void>;
  saveStyleProfile(
    accountId: string,
    profile: StyleProfile,
  ): Promise<MyBlazeAccount>;
  updatePreferences(
    accountId: string,
    prefs: {
      favoriteColors?: string[];
      favoriteShapes?: string[];
      favoriteBrands?: string[];
      preferredPriceRange?: PriceRangeId;
    },
  ): Promise<MyBlazeAccount>;
  searchByEmailOrPhone(query: string): Promise<MyBlazeAccount[]>;
}
