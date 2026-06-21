"use client";

import { useState, type ReactNode } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useWeb3Projects, ProjectSortOrder } from "@/hooks/useWeb3Projects";
import type { Web3Project } from "@/types/web3-project";
import { Modal } from "@/components/ui/modal";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface ProjectScan {
  id: string;
  name: string;
  summary: string;
  category: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  status: "Reviewed" | "Watching" | "Flagged";
  riskScore: number;
}

function getProjectRiskScore(project: Web3Project): number {
  return project.riskScore ?? 0;
}

function formatCurrency(value?: number): string {
  if (typeof value !== "number") return "N/A";
  return `$${value.toLocaleString()}`;
}

function formatNumber(value?: number): string {
  if (typeof value !== "number") return "N/A";
  return value.toLocaleString();
}

function formatStatus(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function mapWeb3ProjectToProjectScan(project: Web3Project): ProjectScan {
  const statusMap: Record<Web3Project["status"], ProjectScan["status"]> = {
    active: "Watching",
    testing: "Watching",
    launching: "Flagged",
    deprecated: "Reviewed",
  };

  const riskMap: Record<Web3Project["riskLevel"], ProjectScan["risk"]> = {
    low: "Low",
    medium: "Medium",
    high: "High",
    critical: "Critical",
  };

  return {
    id: project.id,
    name: project.name,
    summary: project.description,
    category: project.category,
    risk: riskMap[project.riskLevel],
    status: statusMap[project.status],
    riskScore: getProjectRiskScore(project),
  };
}

function DetailItem({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <h4 className="mb-1 text-sm font-medium text-gray-500 dark:text-gray-400">
        {label}
      </h4>
      <div className="text-gray-800 dark:text-white/90">{value}</div>
    </div>
  );
}

type RiskLevelType = Web3Project["riskLevel"];
const RISK_OPTIONS: { label: string; value: RiskLevelType | "" }[] = [
  { label: "All risks", value: "" },
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];

const CHAIN_OPTIONS = [
  { label: "All chains", value: "" },
  { label: "Ethereum", value: "ethereum" },
  { label: "Optimism", value: "optimism" },
  { label: "Polygon", value: "polygon" },
];

export default function RecentOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<ProjectSortOrder>("desc");
  const [selectedRisk, setSelectedRisk] = useState<RiskLevelType | "">("");
  const [selectedChain, setSelectedChain] = useState<string>("");
  const [selectedProject, setSelectedProject] = useState<Web3Project | null>(null);

  const riskLevels = selectedRisk ? [selectedRisk as RiskLevelType] : undefined;
  const chains = selectedChain ? [selectedChain] : undefined;

  const { projects, isLoading, error } = useWeb3Projects({
    searchQuery,
    sortBy: "riskScore",
    sortOrder,
    riskLevels,
    chains,
  });

  const tableData = projects.map(mapWeb3ProjectToProjectScan);
  const highRiskCount = projects.filter(
    (project) => project.riskLevel === "high" || project.riskLevel === "critical"
  ).length;
  const topRiskProject = [...projects].sort((a, b) => a.riskScore - b.riskScore)[0];

  if (isLoading) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-gray-500 dark:text-gray-400">Loading project scans...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="flex items-center justify-center py-8">
          <div className="text-error-600 dark:text-error-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-error-200 bg-error-50 p-5 dark:border-error-500/30 dark:bg-error-500/10 sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="mb-2 inline-flex rounded-full bg-error-100 px-3 py-1 text-xs font-semibold text-error-600 dark:bg-error-500/20 dark:text-error-400">
              Critical Alert Banner
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Web3 Risk Radar is monitoring {highRiskCount} high / critical signal{highRiskCount === 1 ? "" : "s"}
            </h3>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Highest risk project: <span className="font-semibold">{topRiskProject?.name ?? "N/A"}</span> · Last scan status: mock data
            </p>
          </div>
          <div className="rounded-xl bg-white px-4 py-3 text-sm text-gray-700 shadow-sm dark:bg-gray-900 dark:text-gray-300">
            Web3 Risk Radar · API: not connected
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Web3 项目雷达
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Search and sort read-only research snapshots for Web3 projects.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search projects..."
            className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm text-gray-700 shadow-theme-xs outline-none transition placeholder:text-gray-400 focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-500 sm:w-64"
          />

          <select
            value={selectedRisk}
            onChange={(event) => setSelectedRisk(event.target.value as RiskLevelType | "")}
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {RISK_OPTIONS.map((opt) => (
              <option key={opt.value || "all-risks"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={selectedChain}
            onChange={(event) => setSelectedChain(event.target.value)}
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            {CHAIN_OPTIONS.map((opt) => (
              <option key={opt.value || "all-chains"} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <select
            value={sortOrder}
            onChange={(event) => setSortOrder(event.target.value as ProjectSortOrder)}
            className="h-11 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs outline-none transition focus:border-brand-300 focus:ring-3 focus:ring-brand-500/10 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200"
          >
            <option value="desc">Risk score: high to low</option>
            <option value="asc">Risk score: low to high</option>
          </select>
        </div>
      </div>

      <div className="mb-3 text-sm text-gray-500 dark:text-gray-400">
        Showing {tableData.length} matched project{tableData.length === 1 ? "" : "s"}.
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-y border-gray-100 dark:border-gray-800">
            <TableRow>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Project
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Category
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Risk
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Risk Score
              </TableCell>
              <TableCell isHeader className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.length === 0 ? (
              <TableRow>
                <TableCell className="py-6 text-center text-gray-500 text-theme-sm dark:text-gray-400">
                  No Web3 projects match your search.
                </TableCell>
              </TableRow>
            ) : (
              tableData.map((project, index) => {
                const sourceProject = projects[index];

                return (
                  <TableRow key={project.id}>
                    <TableCell className="py-3">
                      <button
                        type="button"
                        className="text-left"
                        onClick={() => setSelectedProject(sourceProject)}
                      >
                        <p className="font-medium text-gray-800 text-theme-sm hover:text-brand-500 dark:text-white/90">
                          {project.name}
                        </p>
                        <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                          {project.summary}
                        </span>
                      </button>
                    </TableCell>

                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.category}
                    </TableCell>

                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          project.risk === "Low"
                            ? "success"
                            : project.risk === "Medium"
                            ? "warning"
                            : "error"
                        }
                      >
                        {project.risk}
                      </Badge>
                    </TableCell>

                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {project.riskScore}
                    </TableCell>

                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <Badge
                        size="sm"
                        color={
                          project.status === "Reviewed"
                            ? "success"
                            : project.status === "Watching"
                            ? "warning"
                            : "error"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      <Modal
        isOpen={selectedProject !== null}
        onClose={() => setSelectedProject(null)}
        showCloseButton={true}
        className="max-w-4xl"
      >
        {selectedProject && (
          <div className="p-6">
            <div className="mb-6">
              <h3 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                {selectedProject.name}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedProject.description}
              </p>
            </div>

            <div className="mb-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              <DetailItem label="Category" value={selectedProject.category} />
              <DetailItem label="Status" value={formatStatus(selectedProject.status)} />
              <DetailItem label="Risk Level" value={formatStatus(selectedProject.riskLevel)} />
              <DetailItem label="Risk Score" value={selectedProject.riskScore} />
              <DetailItem label="TVL" value={formatCurrency(selectedProject.tvl)} />
              <DetailItem label="Users" value={formatNumber(selectedProject.users)} />
              <DetailItem label="24h Volume" value={formatCurrency(selectedProject.volume24h)} />
              <DetailItem
                label="Website"
                value={
                  selectedProject.websiteUrl ? (
                    <a
                      href={selectedProject.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-500 hover:text-brand-600"
                    >
                      {selectedProject.websiteUrl}
                    </a>
                  ) : (
                    "N/A"
                  )
                }
              />
              <DetailItem
                label="Contract Address"
                value={
                  <span className="break-all font-mono text-sm">
                    {selectedProject.contractAddress ?? "N/A"}
                  </span>
                }
              />
            </div>

            {selectedProject.token && (
              <div className="mb-6 rounded-xl border border-gray-200 p-4 dark:border-gray-800">
                <h4 className="mb-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Token
                </h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <DetailItem label="Symbol" value={selectedProject.token.symbol} />
                  <DetailItem label="Name" value={selectedProject.token.name} />
                  <DetailItem label="Chain" value={formatStatus(selectedProject.token.chain)} />
                  <DetailItem label="Price" value={formatCurrency(selectedProject.token.price)} />
                  <DetailItem
                    label="24h Change"
                    value={
                      typeof selectedProject.token.change24h === "number"
                        ? `${selectedProject.token.change24h}%`
                        : "N/A"
                    }
                  />
                  <DetailItem
                    label="Token Address"
                    value={
                      <span className="break-all font-mono text-sm">
                        {selectedProject.token.address ?? "N/A"}
                      </span>
                    }
                  />
                </div>
              </div>
            )}

            {selectedProject.tags.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Tags
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedProject.riskMetrics.length > 0 && (
              <div className="mb-6">
                <h4 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Risk Radar
                </h4>
                <Chart
                  options={{
                    chart: { type: "radar", toolbar: { show: false } },
                    xaxis: {
                      categories: selectedProject.riskMetrics.map((m) =>
                        m.category.charAt(0).toUpperCase() + m.category.slice(1)
                      ),
                    },
                    yaxis: { min: 0, max: 100, tickAmount: 5 },
                    fill: { opacity: 0.3 },
                    stroke: { show: true, width: 2, colors: ["#465FFF"] },
                    markers: { size: 4 },
                    colors: ["#465FFF"],
                    plotOptions: {
                      radar: {
                        polygons: {
                          strokeColors: "#e5e7eb",
                          fill: { colors: ["#f8fafc", "#f1f5f9"] },
                        },
                      },
                    },
                    tooltip: { enabled: true, y: { formatter: (val) => `${val}/100` } },
                    legend: { show: false },
                    dataLabels: { enabled: true, style: { fontSize: "12px" } },
                  }}
                  series={[
                    {
                      name: "Risk Score",
                      data: selectedProject.riskMetrics.map((m) => m.score),
                    },
                  ]}
                  type="radar"
                  height={280}
                />
              </div>
            )}

            <div>
              <h4 className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                Risk Metrics Breakdown
              </h4>
              <div className="space-y-3">
                {selectedProject.riskMetrics.map((metric) => (
                  <div key={metric.category} className="rounded-lg bg-gray-50 p-3 dark:bg-gray-800">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="font-medium capitalize text-gray-700 dark:text-gray-300">
                        {metric.category}
                      </span>
                      <span className="font-semibold text-gray-800 dark:text-white/90">
                        {metric.score}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {metric.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
      </div>
    </div>
  );
}
