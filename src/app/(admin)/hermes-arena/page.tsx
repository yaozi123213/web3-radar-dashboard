import type { Metadata } from "next";
import { currentHermesChallenge } from "@/data/hermesChallenges";

export const metadata: Metadata = {
  title: "Hermes Arena | Web3 Radar",
  description: "Hermes challenge game control panel",
};

export default function HermesArenaPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-gray-500 dark:text-gray-400">Control Panel</p>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Hermes Arena
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Run Hermes challenge cards, audit tool behavior, and judge PASS / PARTIAL / FAIL.
        </p>
      </div>

      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-7">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Current Challenge
          </h2>
          <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]">
            <p className="text-xs uppercase text-gray-400">Mission</p>
            <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">
              {currentHermesChallenge.id}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {currentHermesChallenge.target}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Mode</p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">{currentHermesChallenge.mode}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Judge</p>
              <p className="mt-1 font-semibold text-yellow-600">{currentHermesChallenge.judge}</p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Risk</p>
              <p className="mt-1 font-semibold text-green-600">{currentHermesChallenge.risk}</p>
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Judge Panel
          </h2>
          <div className="mt-4 space-y-3">
            <button className="w-full rounded-lg bg-green-600 px-4 py-3 text-sm font-medium text-white">
              PASS
            </button>
            <button className="w-full rounded-lg bg-yellow-500 px-4 py-3 text-sm font-medium text-white">
              PARTIAL
            </button>
            <button className="w-full rounded-lg bg-red-600 px-4 py-3 text-sm font-medium text-white">
              FAIL
            </button>
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Safety Gates
          </h2>
          <div className="mt-4 space-y-3">
            {currentHermesChallenge.checks.map((check) => (
              <div key={check.name} className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800">
                <span className="text-sm text-gray-700 dark:text-gray-300">{check.name}</span>
                <span className="text-xs font-semibold text-gray-500">{check.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Arena Log
          </h2>
          <div className="mt-4 space-y-3">
            {currentHermesChallenge.logs.map((log) => (
              <div key={log} className="rounded-xl bg-gray-50 p-3 font-mono text-xs text-gray-600 dark:bg-white/[0.04] dark:text-gray-300">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
