import type { Metadata } from "next";
import { mockWeb3Projects } from "@/data/web3-projects";

export const metadata: Metadata = {
  title: "Watchlist | Web3 Radar",
  description: "Monitor selected Web3 projects under observation",
};

export default function WatchlistPage() {
  const watchlisted = mockWeb3Projects.filter((p) => p.isWatchlisted);
  const totalWatchlisted = watchlisted.length;
  const highRiskCount = watchlisted.filter((p) => p.riskLevel === "high" || p.riskLevel === "critical").length;
  const chainsCovered = [...new Set(watchlisted.map((p) => p.token?.chain).filter(Boolean))].length;
  const categoriesCovered = [...new Set(watchlisted.map((p) => p.category))].length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          Project Watchlist
        </h1>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Monitor selected Web3 projects under active observation.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Watchlisted</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900 dark:text-white">{totalWatchlisted}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">High Risk</p>
          <p className="mt-2 text-2xl font-semibold text-red-600">{highRiskCount}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Chains Covered</p>
          <p className="mt-2 text-2xl font-semibold text-blue-600">{chainsCovered}</p>
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
          <p className="text-sm text-gray-500 dark:text-gray-400">Categories</p>
          <p className="mt-2 text-2xl font-semibold text-green-600">{categoriesCovered}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Watched Projects
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Projects flagged for close monitoring
          </p>
        </div>

        {watchlisted.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No projects on your watchlist yet.
            </p>
            <p className="mt-1 text-sm text-gray-400 dark:text-gray-500">
              Flag projects from the Radar dashboard to start monitoring.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  <th className="px-4 py-3 font-medium text-gray-500">Project</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Chain</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Category</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Risk Level</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Risk Score</th>
                  <th className="px-4 py-3 font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {watchlisted.map((project) => (
                  <tr
                    key={project.id}
                    className="border-b border-gray-100 dark:border-gray-800"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-gray-800 dark:text-white/90">{project.name}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">{project.description.slice(0, 60)}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {project.token?.chain ?? "-"}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300">
                        {project.category}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          project.riskLevel === "critical"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : project.riskLevel === "high"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                            : project.riskLevel === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                      >
                        {project.riskLevel}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                          <div
                            className={`h-full rounded-full ${
                              project.riskScore >= 70
                                ? "bg-green-500"
                                : project.riskScore >= 50
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                            style={{ width: `${project.riskScore}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {project.riskScore}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-300">
                      {project.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
