import React, { useState } from 'react';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const DataTable: React.FC<DataTableProps> = ({
  columns,
  data,
  onEdit,
  onDelete,
  onView,
  searchable = true,
  searchPlaceholder = 'Search...',
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredData = data.filter((item) =>
    columns.some((column) =>
      String(item[column.key]).toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {searchable && (
        <div className="p-4 border-b">
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.label}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map((column) => (
                  <td key={column.key} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {column.render ? column.render(item[column.key], item) : item[column.key]}
                  </td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    {onView && (
                      <button
                        onClick={() => onView(item)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <FaEye />
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(item)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <FaEdit />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(item)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <FaTrash />
                      </button>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No data found
        </div>
      )}
    </div>
  );
};

export default DataTable;
