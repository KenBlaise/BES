"use client";

import { getState, subscribe, type PrototypeState } from "@/lib/store/prototype-db";
import { useSyncExternalStore } from "react";

export function usePrototypeState(): PrototypeState {
  return useSyncExternalStore(subscribe, getState, getState);
}
