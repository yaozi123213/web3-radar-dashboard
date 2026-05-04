"use client";

import { useState } from "react";
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
  const projectWithScore = project as Web3Project & {
    riskScore?: number;
    riskMetrics?: {
      overall?: number;
      score?: number;
      overallScore?: number;
    };
  };

  if (typeof projectWithScore.riskScore === "number") {
    return projectWithScore.riskScore;
  }

  if (typeof projectWithScore.riskMetrics?.overall === "number") {
    return projectWithScore.riskMetrics.overall;
  }

  if (typeof projectWithScore.riskMetrics?.overallScore === "number") {
    return projectWithScore.riskMetrics.overallScore;
  }

  if (typeof projectWithScore.riskMetrics?.score === "number") {
    return projectWithScore.riskMetrics.score;
  }

  return 0;
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

export default function RecentOrders() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState<ProjectSortOrder>("desc");

  const { projects, isLoading, error } = useWeb3Projects({
    searchQuery,
    sortBy: "riskScore",
    sortOrder,
  });

  const tableData = projects.map(mapWeb3ProjectToProjectScan);

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
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-4 mb-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Web3 Project Radar
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
        Showing {tableData.length} of {projects.length} matched project{projects.length === 1 ? "" : "s"}.
      </div>

      <div className="max-w-full overflow-x-auto">
        <Table>
          <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
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
              tableData.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="py-3">
                    <div>
                      <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                        {project.name}
                      </p>
                      <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                        {project.summary}
                      </span>
                    </div>
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
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
