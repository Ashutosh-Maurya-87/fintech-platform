// src/components/common/DataTable.jsx
const DataTable = ({ columns, data, renderRowActions }) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white border">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className="p-3 border-b text-left">{col}</th>
          ))}
          {renderRowActions && <th className="p-3 border-b text-left">Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={row._id || index} className="hover:bg-gray-50">
            {/* Render standard text/primitive values safely */}
            <td className="p-3 border-b">{row.id}</td>
            <td className="p-3 border-b">{row.applicantName}</td>
            <td className="p-3 border-b">{row.principal || row.amount}</td>
            <td className="p-3 border-b">{row.creditScore}</td>
            <td className="p-3 border-b">{row.riskGrade}</td>
            <td className="p-3 border-b">
              <span className={`px-2 py-1 rounded text-xs font-semibold ${
                row.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {row.status || 'Pending'}
              </span>
            </td>
            
            {/* Render custom actions (like Approve Button) if provided */}
            {renderRowActions && (
              <td className="p-3 border-b">
                {renderRowActions(row)}
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default DataTable;