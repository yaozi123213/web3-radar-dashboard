'use client';

import { useState, useCallback } from "react";
import { hermesChallenges, type HermesChallenge } from "@/data/hermesChallenges";

interface ArenaLogEntry {
  id: string;
  title: string;
  judge: string;
  timestamp: string;
}

function getJudgeColor(status: string) {
  if (status === "PASS") return "text-green-600";
  if (status === "PARTIAL") return "text-yellow-600";
  if (status === "FAIL") return "text-red-600";
  return "text-gray-500";
}

function getJudgeBg(status: string) {
  if (status === "PASS") return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
  if (status === "PARTIAL") return "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400";
  if (status === "FAIL") return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
  return "bg-gray-100 text-gray-500 dark:bg-white/[0.06] dark:text-gray-400";
}

function formatTimestamp(): string {
  const now = new Date();
  return now.toLocaleString("zh-CN", { hour12: false });
}

export default function HermesArenaPage() {
  const [challenges, setChallenges] = useState<HermesChallenge[]>(hermesChallenges);
  const [selectedChallengeId, setSelectedChallengeId] = useState(hermesChallenges[0].id);
  const [arenaLogs, setArenaLogs] = useState<ArenaLogEntry[]>([]);

  const currentChallenge = challenges.find(c => c.id === selectedChallengeId) || challenges[0];

  const totalChallenges = challenges.length;
  const pendingChallenges = challenges.filter(c => c.judge === "PENDING").length;
  const passedChallenges = challenges.filter(c => c.judge === "PASS").length;
  const partialChallenges = challenges.filter(c => c.judge === "PARTIAL").length;
  const failedChallenges = challenges.filter(c => c.judge === "FAIL").length;

  const updateJudge = useCallback((judge: "PASS" | "PARTIAL" | "FAIL") => {
    setChallenges(prev => prev.map(c =>
      c.id === selectedChallengeId ? { ...c, judge } : c
    ));
    setArenaLogs(prev => [
      {
        id: currentChallenge.id,
        title: currentChallenge.title,
        judge,
        timestamp: formatTimestamp(),
      },
      ...prev,
    ]);
  }, [selectedChallengeId, currentChallenge]);

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

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Challenges</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{totalChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Passed</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">{passedChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Partial</p>
          <p className="mt-2 text-2xl font-semibold text-yellow-600">{partialChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Failed</p>
          <p className="mt-2 text-2xl font-semibold text-red-600">{failedChallenges}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Pending</p>
          <p className="mt-2 text-2xl font-semibold text-yellow-600">{pendingChallenges}</p>
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
              {currentChallenge.id}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {currentChallenge.target}
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Mode</p>
              <p className="mt-1 font-semibold text-gray-900 dark:text-white">
                {currentChallenge.mode}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Judge</p>
              <p className={`mt-1 font-semibold ${getJudgeColor(currentChallenge.judge)}`}>
                {currentChallenge.judge}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 p-4 dark:border-gray-800">
              <p className="text-xs text-gray-400">Risk</p>
              <p className="mt-1 font-semibold text-green-600">
                {currentChallenge.risk}
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
              onClick={() => updateJudge("PASS")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                currentChallenge.judge === "PASS"
                  ? "bg-green-600 ring-2 ring-green-400 opacity-100"
                  : "bg-green-600 opacity-60 hover:opacity-80"
              }`}
            >
              PASS
            </button>
            <button
              onClick={() => updateJudge("PARTIAL")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                currentChallenge.judge === "PARTIAL"
                  ? "bg-yellow-500 ring-2 ring-yellow-300 opacity-100"
                  : "bg-yellow-500 opacity-60 hover:opacity-80"
              }`}
            >
              PARTIAL
            </button>
            <button
              onClick={() => updateJudge("FAIL")}
              className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white transition-opacity ${
                currentChallenge.judge === "FAIL"
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
            {challenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => setSelectedChallengeId(challenge.id)}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  selectedChallengeId === challenge.id
                    ? "border-blue-400 ring-1 ring-blue-400 dark:border-blue-500"
                    : "border-gray-100 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
                }`}
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
                  <span className={`rounded-md px-2 py-0.5 font-semibold ${getJudgeBg(challenge.judge)}`}>
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
            {currentChallenge.checks.map((check) => (
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
          {arenaLogs.length === 0 ? (
            <p className="mt-4 text-sm text-gray-400 dark:text-gray-500">
              No judge actions yet. Click PASS / PARTIAL / FAIL to log.
            </p>
          ) : (
            <div className="mt-4 space-y-2">
              {arenaLogs.map((entry, i) => (
                <div
                  key={`${entry.id}-${i}`}
                  className="flex items-center justify-between rounded-xl bg-gray-50 p-3 dark:bg-white/[0.04]"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {entry.title}
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      {entry.id}
                    </p>
                  </div>
                  <div className="ml-3 flex flex-col items-end gap-1">
                    <span className={`rounded-md px-2 py-0.5 text-xs font-semibold ${getJudgeBg(entry.judge)}`}>
                      {entry.judge}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {entry.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
