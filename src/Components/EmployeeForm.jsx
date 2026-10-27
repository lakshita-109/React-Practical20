function EmployeeForm({
  formData,
  setFormData,
  onSubmit,
  editingId,
  onCancel,
}) {
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  return (
    <div className="rounded-2xl border border-sky-100 bg-white p-6 shadow-sm">
      <h2 className="mb-5 text-xl font-bold text-sky-950">
        {editingId ? "✏️ Edit Employee" : "➕ Add Employee"}
      </h2>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Employee Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter employee name"
            required
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="employee@example.com"
            required
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full rounded-lg border border-slate-300 bg-white p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          >
            <option value="">Select department</option>
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-semibold text-slate-700">
            Salary (₹)
          </label>
          <input
            type="number"
            name="salary"
            value={formData.salary}
            onChange={handleChange}
            placeholder="Enter salary"
            min="1"
            required
            className="w-full rounded-lg border border-slate-300 p-3 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-sky-600 px-4 py-3 font-semibold text-white transition hover:bg-sky-700"
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>

        {editingId && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-lg border border-slate-300 px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100"
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}


export default EmployeeForm;
