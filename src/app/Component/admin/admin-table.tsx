interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface AdminTableProps {
  columns: Column[];
  data: any[];
}

export default function AdminTable({ columns, data }: AdminTableProps) {
  return (
    <table className="w-full border text-sm">
      <thead>
        <tr className="bg-gray-100">
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
                {col.render ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
