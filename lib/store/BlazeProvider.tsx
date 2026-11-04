"use client";

import { services } from "@/lib/services";
import { getState, setState } from "@/lib/store/prototype-db";
import { usePrototypeState } from "@/lib/store/usePrototypeState";
import type { StyleProfile } from "@/lib/types";
import { createContext, useCallback, useContext, useMemo, useState } from "react";

interface BlazeContextValue {
  ready: boolean;
  account: ReturnType<typeof usePrototypeState>["accounts"][number] | null;
  customer: ReturnType<typeof usePrototypeState>["customers"][number] | null;
  isConnectedCustomer: boolean;
  savePromptFrameId: string | null;
  closeSavePrompt: () => void;
  isSaved: (frameId: string) => boolean;
  toggleHeart: (frameId: string) => Promise<void>;
  saveFrame: (frameId: string) => Promise<void>;
  removeFrame: (frameId: string) => Promise<void>;
  markViewed: (frameId: string) => void;
  addTryAtBlaze: (frameId: string) => Promise<void>;
  requestCode: (email: string) => Promise<void>;
  completeAuth: (input: {
    email: string;
    code: string;
    firstName?: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
  saveStyle: (profile: StyleProfile) => Promise<void>;
  setPendingStyle: (profile: StyleProfile | null) => void;
}

const BlazeContext = createContext<BlazeContextValue | null>(null);

export function BlazeProvider({ children }: { children: React.ReactNode }) {
  const state = usePrototypeState();
  const [savePromptFrameId, setSavePromptFrameId] = useState<string | null>(null);

  const session = state.customerSession;
  const account =
    session?.role === "CUSTOMER"
      ? (state.accounts.find((item) => item.accountId === session.accountId) ?? null)
      : null;
  const customer = account
    ? (state.customers.find((item) => item.myBlazeAccountId === account.accountId) ?? null)
    : null;

  const isSaved = useCallback(
    (frameId: string) => Boolean(account?.savedFrameIds.includes(frameId)),
    [account],
  );

  const saveFrame = useCallback(
    async (frameId: string) => {
      if (!account) {
        setState((current) => ({ ...current, pendingSaveFrameId: frameId }));
        setSavePromptFrameId(frameId);
        return;
      }
      await services.myBlaze.saveFrame(account.accountId, frameId);
    },
    [account],
  );

  const removeFrame = useCallback(
    async (frameId: string) => {
      if (!account) return;
      await services.myBlaze.removeFrame(account.accountId, frameId);
    },
    [account],
  );

  const toggleHeart = useCallback(
    async (frameId: string) => {
      if (!account) {
        await saveFrame(frameId);
        return;
      }
      if (account.savedFrameIds.includes(frameId)) {
        await removeFrame(frameId);
      } else {
        await saveFrame(frameId);
      }
    },
    [account, removeFrame, saveFrame],
  );

  const markViewed = useCallback(
    (frameId: string) => {
      if (!account) {
        const raw = window.sessionStorage.getItem("blaze-recent") ?? "[]";
        const ids = JSON.parse(raw) as string[];
        window.sessionStorage.setItem(
          "blaze-recent",
          JSON.stringify([frameId, ...ids.filter((id) => id !== frameId)].slice(0, 12)),
        );
        return;
      }
      void services.myBlaze.addRecentlyViewed(account.accountId, frameId);
    },
    [account],
  );

  const addTryAtBlaze = useCallback(
    async (frameId: string) => {
      if (!account) {
        await saveFrame(frameId);
        return;
      }
      await services.myBlaze.addTryAtBlaze(account.accountId, frameId);
      if (!account.savedFrameIds.includes(frameId)) {
        await services.myBlaze.saveFrame(account.accountId, frameId);
      }
    },
    [account, saveFrame],
  );

  const requestCode = useCallback(async (email: string) => {
    await services.auth.requestCustomerCode(email);
  }, []);

  const completeAuth = useCallback(
    async (input: { email: string; code: string; firstName?: string }) => {
      await services.auth.verifyCustomerCode(input.email, input.code, input.firstName);
      const pendingFrame = getState().pendingSaveFrameId;
      const pendingStyle = getState().pendingStyleSave;
      const nextSession = services.auth.getCustomerSession();
      if (nextSession?.role === "CUSTOMER" && pendingFrame) {
        await services.myBlaze.saveFrame(nextSession.accountId, pendingFrame);
        setState((current) => ({ ...current, pendingSaveFrameId: null }));
      }
      if (nextSession?.role === "CUSTOMER" && pendingStyle) {
        const raw = window.sessionStorage.getItem("blaze-pending-style");
        if (raw) {
          await services.myBlaze.saveStyleProfile(
            nextSession.accountId,
            JSON.parse(raw) as StyleProfile,
          );
          window.sessionStorage.removeItem("blaze-pending-style");
        }
        setState((current) => ({ ...current, pendingStyleSave: false }));
      }
      setSavePromptFrameId(null);
    },
    [],
  );

  const logout = useCallback(async () => {
    await services.auth.logoutCustomer();
  }, []);

  const saveStyle = useCallback(
    async (profile: StyleProfile) => {
      if (!account) {
        window.sessionStorage.setItem("blaze-pending-style", JSON.stringify(profile));
        setState((current) => ({ ...current, pendingStyleSave: true }));
        setSavePromptFrameId("style");
        return;
      }
      await services.myBlaze.saveStyleProfile(account.accountId, profile);
    },
    [account],
  );

  const setPendingStyle = useCallback((profile: StyleProfile | null) => {
    if (profile) {
      window.sessionStorage.setItem("blaze-pending-style", JSON.stringify(profile));
      setState((current) => ({ ...current, pendingStyleSave: true }));
    }
  }, []);

  const value = useMemo<BlazeContextValue>(
    () => ({
      ready: true,
      account,
      customer,
      isConnectedCustomer: Boolean(customer),
      savePromptFrameId,
      closeSavePrompt: () => setSavePromptFrameId(null),
      isSaved,
      toggleHeart,
      saveFrame,
      removeFrame,
      markViewed,
      addTryAtBlaze,
      requestCode,
      completeAuth,
      logout,
      saveStyle,
      setPendingStyle,
    }),
    [
      account,
      addTryAtBlaze,
      completeAuth,
      customer,
      isSaved,
      logout,
      markViewed,
      removeFrame,
      requestCode,
      saveFrame,
      savePromptFrameId,
      saveStyle,
      setPendingStyle,
      toggleHeart,
    ],
  );

  return <BlazeContext.Provider value={value}>{children}</BlazeContext.Provider>;
}

export function useBlaze() {
  const context = useContext(BlazeContext);
  if (!context) throw new Error("useBlaze must be used within BlazeProvider");
  return context;
}
