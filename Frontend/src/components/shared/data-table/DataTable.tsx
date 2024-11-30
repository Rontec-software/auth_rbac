import { ITableProps } from './DataTable.interface';

export const DataTable = <T,>({ columns, data }: ITableProps<T>) => {
  return (
    <div className="border border-gray-800 shadow-lg rounded-lg overflow-hidden">
      <table className="w-full table-auto">
        <thead className="bg-gray-700 text-white text-sm">
          <tr>
            {columns.map((col, index) => (
              <th
                key={index}
                className={`border border-gray-600 px-6 py-2 text-${
                  col.align || 'left'
                }`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-background-janela-principal text-sm">
          {data.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-gray-900">
              {columns.map((col, colIndex) => (
                <td
                  key={colIndex}
                  className={`border border-gray-800 px-6 py-1 text-${
                    col.align || 'left'
                  }`}
                >
                  {String(row[col.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
