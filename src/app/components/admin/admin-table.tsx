import { AdminTableProps } from "@/types/admin.type";
import Link from "next/link";

export default function AdminTable({ columns, data }: AdminTableProps) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-borders text-text dark:bg-border-dark dark:text-text-dark">
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-2 border">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((col) => (
              <td key={col.key} className="px-4 py-2 text-center">
                {col.render ? (
                  col.render(row[col.key], row)
                ) : col.linkTo ? (
                  <Link
                    href={col.linkTo(row)}
                    className="text-primary dark:text-primary-dark hover:underline"
                  >
                    {row[col.key]}
                  </Link>
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
