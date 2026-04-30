import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";

interface ProjectScan {
  id: number;
  name: string;
  summary: string;
  category: string;
  risk: "Low" | "Medium" | "High";
  status: "Reviewed" | "Watching" | "Flagged";
}

const tableData: ProjectScan[] = [
  {
    id: 1,
    name: "EigenLayer",
    summary: "Restaking protocol with active ecosystem signals",
    category: "Restaking",
    risk: "Medium",
    status: "Watching",
  },
  {
    id: 2,
    name: "Ethena",
    summary: "Synthetic dollar protocol with market risk exposure",
    category: "Stablecoin",
    risk: "High",
    status: "Flagged",
  },
  {
    id: 3,
    name: "Uniswap",
    summary: "Established DEX with strong open-source footprint",
    category: "DEX",
    risk: "Low",
    status: "Reviewed",
  },
  {
    id: 4,
    name: "Pendle",
    summary: "Yield trading protocol with complex product mechanics",
    category: "DeFi",
    risk: "Medium",
    status: "Watching",
  },
  {
    id: 5,
    name: "Unknown AI Token",
    summary: "Marketing-heavy project with unclear repo activity",
    category: "AI / Token",
    risk: "High",
    status: "Flagged",
  },
];

export default function RecentOrders() {
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
