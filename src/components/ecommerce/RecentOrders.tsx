"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import { useWeb3Projects } from "@/hooks/useWeb3Projects";
import type { Web3Project } from "@/types/web3-project";

interface ProjectScan {
  id: string;
  name: string;
  summary: string;
  category: string;
  risk: "Low" | "Medium" | "High" | "Critical";
  status: "Reviewed" | "Watching" | "Flagged";
}

function mapWeb3ProjectToProjectScan(project: Web3Project): ProjectScan {
  // 状态映射
  const statusMap: Record<Web3Project['status'], ProjectScan['status']> = {
    active: "Watching",
    testing: "Watching",
    launching: "Flagged",
    deprecated: "Reviewed",
  };

  // 风险映射
  const riskMap: Record<Web3Project['riskLevel'], ProjectScan['risk']> = {
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
  };
}

export default function RecentOrders() {
  const { projects, isLoading, error } = useWeb3Projects();

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

  const tableData = projects.map(mapWeb3ProjectToProjectScan);

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Recent Project Scans
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Read-only research snapshots for Web3 projects.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            Filter
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200">
            See all
          </button>
        </div>
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
                Status
              </TableCell>
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
            {tableData.map((project) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
