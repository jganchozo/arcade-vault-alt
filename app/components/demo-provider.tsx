"use client";

import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";
import { emptyDemoState, normalizeName, readDemoState, writeDemoState } from "../lib/demo-storage";
import type { DemoScore, DemoState } from "../lib/demo-types";

type Snapshot = { state: DemoState; ready: boolean; storageError: boolean };
const INITIAL: Snapshot = { state: emptyDemoState(), ready: false, storageError: false };
let snapshot = INITIAL;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((listener) => listener());

function hydrate() {
  try {
    const { state, available } = readDemoState(window.localStorage);
    snapshot = { state, ready: true, storageError: !available };
  } catch {
    snapshot = { ...snapshot, ready: true, storageError: true };
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!snapshot.ready) hydrate();
  const onStorage = (event: StorageEvent) => {
    if (event.key === "arcade-vault:demo:v1" || event.key === null) hydrate();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function updateState(update: (state: DemoState) => DemoState) {
  if (!snapshot.ready) hydrate();
  const state = update(snapshot.state);
  let persisted = false;
  try { persisted = writeDemoState(window.localStorage, state); } catch { /* Keep this visit functional. */ }
  snapshot = { state, ready: true, storageError: !persisted };
  emit();
}

const actions = {
  signIn: (name: string) => updateState((state) => ({ ...state, profile: { name: normalizeName(name) } })),
  signOut: () => updateState((state) => ({ ...state, profile: null })),
  saveScore: (score: DemoScore) => updateState((state) => ({
    ...state,
    scores: state.scores.some((saved) => saved.id === score.id) ? state.scores : [...state.scores, score],
  })),
};

type DemoContextValue = Snapshot & typeof actions;
const DemoContext = createContext<DemoContextValue | null>(null);

export function DemoProvider({ children }: { children: ReactNode }) {
  const current = useSyncExternalStore(subscribe, () => snapshot, () => INITIAL);
  return (
    <DemoContext.Provider value={{ ...current, ...actions }}>
      {current.storageError && (
        <p className="storage-notice" role="status">
          Browser storage is unavailable. Changes stay in this visit and cannot be saved across refreshes.
        </p>
      )}
      {children}
    </DemoContext.Provider>
  );
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("useDemo must be used inside DemoProvider");
  return context;
}
