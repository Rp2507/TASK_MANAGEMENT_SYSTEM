import React from "react";

const TaskFilter = ({
  filterPriority,
  setFilterPriority,
  filterStatus,
  setFilterStatus,
  setSortOrder,
}) => {
  return (
    <div className="mb-4 p-4 border rounded shadow-sm bg-gray-50">
      <h2 className="text-lg font-semibold mb-2">Filter & Sort</h2>
      <div className=" flex items-center gap-12">
        {/* Filter by Priority:
         */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Filter by Priority:
          </label>
          <select
            className="border rounded p-2"
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Filter by Status:
         */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Filter by Status:
          </label>
          <select
            className="border rounded p-2"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {/* Sort by Due Date:
         */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Sort by Due Date:
          </label>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSortOrder("asc")}
            >
              Ascending
            </button>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => setSortOrder("desc")}
            >
              Descending
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
