'use client';

import { useState } from "react";
import { currentHermesChallenge, hermesChallenges } from "@/data/hermesChallenges";

function getJudgeColor(status: string) {
  if (status === "PASS") return "text-green-600";
  if (status === "PARTIAL") return "text-yellow-600";
  if (status === "FAIL") return "text-red-600";
  return "text-gray-500";
}

export default function HermesArenaPage() {
  const [judge, setJudge] = useState<"PASS" | "PARTIAL" | "FAIL" | "PENDING">(currentHermesChallenge.judge);
  const totalChallenges = hermesChallenges.length;
  const pendingChallenges = hermesChallenges.filter(
    (challenge) => challenge.judge === "PENDING"
  ).length;
  const passedChallenges = hermesChallenges.filter(
    (challenge) => challenge.judge === "PASS"
  ).length;

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

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Challenges</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{totalChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-yellow-600">{pendingChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Passed</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">{passedChallenges}</p>
        </div>
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
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {currentHermesChallenge.mode}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Judge</p>
              <p className={`mt-1 font-semibold ${getJudgeColor(judge)}`}>
                {judge}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Risk</p>
              <p className="mt-1 font-semibold text-green-600">
                {currentHermesChallenge.risk}
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Judge Panel
          </h2>
          <div className="mt-4 space-y-3">
            <button
              onClick={() => setJudge("PASS")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                judge === "PASS"
                  ? "bg-green-600 ring-2 ring-green-400 opacity-100"
                  : "bg-green-600 opacity-60 hover:opacity-80"
              }`}
            >
              PASS
            </button>
            <button
              onClick={() => setJudge("PARTIAL")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                judge === "PARTIAL"
                  ? "bg-yellow-500 ring-2 ring-yellow-300 opacity-100"
                  : "bg-yellow-500 opacity-60 hover:opacity-80"
              }`}
            >
              PARTIAL
            </button>
            <button
              onClick={() => setJudge("FAIL")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                judge === "FAIL"
                  ? "bg-red-600 ring-2 ring-red-400 opacity-100"
                  : "bg-red-600 opacity-60 hover:opacity-80"
              }`}
            >
              FAIL
            </button>
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Challenge List
          </h2>

          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {hermesChallenges.map((challenge) => (
              <div
                key={challenge.id}
                className="rounded-xl border border-gray-100 p-4 dark:border-gray-800"
              >
                <p className="text-xs font-medium text-gray-400">{challenge.id}</p>
                <h3 className="mt-2 font-semibold text-gray-900 dark:text-white">
                  {challenge.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {challenge.target}
                </p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-600 dark:bg-white/[0.06] dark:text-gray-300">
                    {challenge.mode}
                  </span>
                  <span className={`font-semibold ${getJudgeColor(challenge.judge)}`}>
                    {challenge.judge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-12 rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] xl:col-span-6">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Safety Gates
          </h2>
          <div className="mt-4 space-y-3">
            {currentHermesChallenge.checks.map((check) => (
              <div
                key={check.name}
                className="flex items-center justify-between rounded-xl border border-gray-100 p-3 dark:border-gray-800"
              >
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  {check.name}
                </span>
                <span className={`text-xs font-semibold ${getJudgeColor(check.status)}`}>
                  {check.status}
                </span>
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
              <div
                key={log}
                className="rounded-xl bg-gray-50 p-3 font-mono text-xs text-gray-600 dark:bg-white/[0.04] dark:text-gray-300"
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
