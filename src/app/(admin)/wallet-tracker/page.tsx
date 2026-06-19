import type { Metadata } from "next";
import { trackedWallets } from "@/data/trackedWallets";

export const metadata: Metadata = {
  title: "Scientist Wallet Tracker | Web3 Radar",
  description: "Track selected smart money and scientist wallets",
};

export default function WalletTrackerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Scientist Wallet Tracker
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Track selected Web3 wallets, monitor activity, and prepare risk signals.
        </p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Tracked Wallets
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Data source: src/data/trackedWallets.ts
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                <th className="px-4 py-3 font-medium text-gray-500">Label</th>
                <th className="px-4 py-3 font-medium text-gray-500">Address</th>
                <th className="px-4 py-3 font-medium text-gray-500">Chain</th>
                <th className="px-4 py-3 font-medium text-gray-500">Risk</th>
                <th className="px-4 py-3 font-medium text-gray-500">Note</th>
                <th className="px-4 py-3 font-medium text-gray-500">DeBank</th>
              </tr>
            </thead>
            <tbody>
              {trackedWallets.map((wallet) => (
                <tr key={wallet.address} className="border-b border-gray-100 dark:border-gray-800">
                  <td className="px-4 py-3 text-gray-800 dark:text-white/90">{wallet.label}</td>
                  <td className="px-4 py-3 font-mono text-xs">
                    <a
                      href={`https://etherscan.io/address/${wallet.address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-500 hover:underline"
                    >
                      {wallet.address}
                    </a>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{wallet.chain}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{wallet.risk}</td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-300">{wallet.note}</td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://debank.com/profile/${wallet.address}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-500 hover:underline"
                    >
                      View
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
