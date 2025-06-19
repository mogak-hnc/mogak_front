import { AdminTableProps } from "@/types/admin.type";
import Link from "next/link";

export default function AdminTable<T>({ columns, data }: AdminTableProps<T>) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-borders text-text dark:bg-border-dark dark:text-text-dark">
          {columns.map((col) => (
            <th key={String(col.key)} className="px-4 py-2 border">
              {col.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, i) => (
          <tr key={i} className="border-t">
            {columns.map((col) => {
              const cellValue = row[col.key as keyof T];
              return (
                <td key={String(col.key)} className="px-4 py-2 text-center">
                  {col.render ? (
                    col.render(cellValue as string, row)
                  ) : col.linkTo ? (
                    <Link
                      href={col.linkTo(row)}
                      className="text-primary dark:text-primary-dark hover:underline"
                    >
                      {String(cellValue)}
                    </Link>
                  ) : (
                    String(cellValue)
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
