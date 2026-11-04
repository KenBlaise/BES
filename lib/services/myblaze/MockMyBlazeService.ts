import { recordAudit } from "@/lib/audit";
import { getState, setState } from "@/lib/store/prototype-db";
import type { MyBlazeAccount, StyleProfile } from "@/lib/types";
import { nowIso, normalizePhone, randomId, simulateLatency } from "@/lib/utils";
import type { MyBlazeService } from "./types";

function upsertAccount(account: MyBlazeAccount) {
  setState((state) => ({
    ...state,
    accounts: state.accounts.some((item) => item.accountId === account.accountId)
      ? state.accounts.map((item) =>
          item.accountId === account.accountId ? account : item,
        )
      : [...state.accounts, account],
  }));
}

export const mockMyBlazeService: MyBlazeService = {
  async getAccount(accountId) {
    await simulateLatency(200);
    return getState().accounts.find((item) => item.accountId === accountId);
  },

  async getAccountByEmail(email) {
    await simulateLatency(200);
    return getState().accounts.find(
      (item) => item.email.toLowerCase() === email.toLowerCase(),
    );
  },

  async createAccount(input) {
    await simulateLatency();
    const existing = getState().accounts.find(
      (item) => item.email.toLowerCase() === input.email.toLowerCase(),
    );
    if (existing) return existing;

    const account: MyBlazeAccount = {
      accountId: randomId("MB"),
      firstName: input.firstName,
      email: input.email,
      phoneOptional: input.phoneOptional,
      savedFrameIds: [],
      recentlyViewedFrameIds: [],
      tryAtBlazeIds: [],
      favoriteColors: [],
      favoriteShapes: [],
      favoriteBrands: [],
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    upsertAccount(account);
    recordAudit({
      type: "MY_BLAZE_ACCOUNT_CREATED",
      actorName: account.firstName,
      actorRole: "CUSTOMER",
      accountId: account.accountId,
    });
    return account;
  },

  async saveFrame(accountId, frameId) {
    await simulateLatency(250);
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) throw new Error("My Blaze account not found");
    const next: MyBlazeAccount = {
      ...account,
      savedFrameIds: account.savedFrameIds.includes(frameId)
        ? account.savedFrameIds
        : [...account.savedFrameIds, frameId],
      updatedAt: nowIso(),
    };
    upsertAccount(next);
    recordAudit({
      type: "FRAME_SAVED",
      actorName: account.firstName,
      actorRole: "CUSTOMER",
      accountId,
      detail: frameId,
    });
    return next;
  },

  async removeFrame(accountId, frameId) {
    await simulateLatency(250);
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) throw new Error("My Blaze account not found");
    const next: MyBlazeAccount = {
      ...account,
      savedFrameIds: account.savedFrameIds.filter((id) => id !== frameId),
      tryAtBlazeIds: account.tryAtBlazeIds.filter((id) => id !== frameId),
      updatedAt: nowIso(),
    };
    upsertAccount(next);
    recordAudit({
      type: "FRAME_REMOVED",
      actorName: account.firstName,
      actorRole: "CUSTOMER",
      accountId,
      detail: frameId,
    });
    return next;
  },

  async addRecentlyViewed(accountId, frameId) {
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) return;
    const nextIds = [frameId, ...account.recentlyViewedFrameIds.filter((id) => id !== frameId)].slice(0, 12);
    upsertAccount({ ...account, recentlyViewedFrameIds: nextIds, updatedAt: nowIso() });
  },

  async addTryAtBlaze(accountId, frameId) {
    await simulateLatency(200);
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) throw new Error("My Blaze account not found");
    upsertAccount({
      ...account,
      tryAtBlazeIds: account.tryAtBlazeIds.includes(frameId)
        ? account.tryAtBlazeIds
        : [...account.tryAtBlazeIds, frameId],
      updatedAt: nowIso(),
    });
  },

  async saveStyleProfile(accountId, profile: StyleProfile) {
    await simulateLatency();
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) throw new Error("My Blaze account not found");
    const next: MyBlazeAccount = {
      ...account,
      styleProfile: { ...profile, savedAt: nowIso() },
      favoriteColors: profile.colors,
      favoriteShapes: profile.shapes,
      preferredPriceRange: profile.priceRange,
      updatedAt: nowIso(),
    };
    upsertAccount(next);
    recordAudit({
      type: "STYLE_PROFILE_UPDATED",
      actorName: account.firstName,
      actorRole: "CUSTOMER",
      accountId,
    });
    return next;
  },

  async updatePreferences(accountId, prefs) {
    await simulateLatency(200);
    const account = getState().accounts.find((item) => item.accountId === accountId);
    if (!account) throw new Error("My Blaze account not found");
    const next = { ...account, ...prefs, updatedAt: nowIso() };
    upsertAccount(next);
    return next;
  },

  async searchByEmailOrPhone(query) {
    await simulateLatency(300);
    const q = query.trim().toLowerCase();
    const digits = normalizePhone(query);
    return getState().accounts.filter((account) => {
      if (account.email.toLowerCase() === q) return true;
      if (digits && account.phoneOptional && normalizePhone(account.phoneOptional) === digits) {
        return true;
      }
      return account.firstName.toLowerCase() === q;
    });
  },
};
