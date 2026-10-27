
function EmployeeList({ employees, onEdit, onDelete }) {
  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-sky-950">
        👥 Employee Records
      </h2>

      {employees.length === 0 ? (
        <p className="rounded-xl bg-sky-50 p-8 text-center text-slate-600">
          No employees found. Add your first employee!
        </p>
      ) : (
        <div className="space-y-4">
          {employees.map((employee) => (
            <div
              key={employee.id}
              className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-sky-200"
            >
              <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div className="flex items-start gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-sky-100 text-lg font-bold text-sky-700">
                    {employee.name.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="break-words font-bold text-slate-800">
                      {employee.name}
                    </h3>
                    <p className="break-words text-sm text-slate-600">
                      {employee.email}
                    </p>
                    <p className="mt-1 text-sm text-sky-700">
                      Department: {employee.department}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-emerald-700">
                      Salary: ₹{Number(employee.salary).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    onClick={() => onEdit(employee)}
                    className="rounded-lg bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-800 hover:bg-amber-200"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => onDelete(employee.id)}
                    className="rounded-lg bg-rose-100 px-3 py-2 text-sm font-semibold text-rose-700 hover:bg-rose-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EmployeeList;
