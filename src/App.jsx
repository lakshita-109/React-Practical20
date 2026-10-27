
import { useEffect, useState } from "react";
import EmployeeForm from "./Components/EmployeeForm";
import EmployeeList from "./Components/EmployeeList";

const API_URL = "https://jsonplaceholder.typicode.com/users";

const emptyForm = {
  name: "",
  email: "",
  department: "",
  salary: "",
};

const departments = ["IT", "HR", "Finance", "Marketing", "Sales"];

function App() {
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // READ: Fetch employees from the API
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error("Unable to fetch employees.");
        }

        const data = await response.json();

        const employeeData = data.map((user, index) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          department: departments[index % departments.length],
          salary: 30000 + user.id * 1000,
        }));

        setEmployees(employeeData);
      } catch (error) {
        setMessage(error.message || "Failed to load employees.");
      } finally {
        setLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  // CREATE and UPDATE
  async function handleSubmit(event) {
    event.preventDefault();
    setMessage("");

    const employeeData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      department: formData.department,
      salary: Number(formData.salary),
    };

    try {
      if (editingId !== null) {
        const response = await fetch(`${API_URL}/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          throw new Error("Could not update employee.");
        }

        setEmployees((current) =>
          current.map((employee) =>
            employee.id === editingId
              ? { ...employee, ...employeeData }
              : employee
          )
        );

        setMessage("Employee updated successfully!");
        setEditingId(null);
      } else {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(employeeData),
        });

        if (!response.ok) {
          throw new Error("Could not add employee.");
        }

        // Use a local unique ID because this is a dummy API.
        const newEmployee = {
          id: Math.max(0, ...employees.map((item) => item.id)) + 1,
          ...employeeData,
        };

        setEmployees((current) => [...current, newEmployee]);
        setMessage("Employee added successfully!");
      }

      setFormData(emptyForm);
    } catch (error) {
      setMessage(error.message || "Something went wrong.");
    }
  }

  // Load an employee's details into the form
  function handleEdit(employee) {
    setEditingId(employee.id);
    setFormData({
      name: employee.name,
      email: employee.email,
      department: employee.department,
      salary: String(employee.salary),
    });
    setMessage("");
  }

  // DELETE: Remove an employee
  async function handleDelete(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this employee?"
    );

    if (!confirmed) return;

    setMessage("");

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Could not delete employee.");
      }

      setEmployees((current) =>
        current.filter((employee) => employee.id !== id)
      );

      if (editingId === id) {
        setEditingId(null);
        setFormData(emptyForm);
      }

      setMessage("Employee deleted successfully!");
    } catch (error) {
      setMessage(error.message || "Could not delete employee.");
    }
  }

  function handleCancel() {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  }

  return (
    <div className="min-h-screen bg-sky-50 px-4 py-8 sm:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Application Header */}
        <header className="mb-8 rounded-3xl bg-gradient-to-r from-sky-700 to-cyan-500 p-8 text-center text-white shadow-lg">
          <div className="mb-2 text-4xl">🏢</div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Employee Management System
          </h1>
          <p className="mt-3 text-sky-100">
            Create, view, edit and delete employee records
          </p>
          <div className="mt-5 inline-block rounded-full bg-white/20 px-5 py-2 font-semibold">
            Total Employees: {employees.length}
          </div>
        </header>

        {/* Conditional Rendering */}
        {message && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-sky-200 bg-white p-4 font-medium text-sky-800"
          >
            {message}
          </div>
        )}

        {loading ? (
          <p className="rounded-2xl bg-white p-10 text-center font-semibold text-sky-700 shadow-sm">
            Loading employee records...
          </p>
        ) : (
          <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.4fr]">
            <EmployeeForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              editingId={editingId}
              onCancel={handleCancel}
            />

            <EmployeeList
              employees={employees}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        <p className="mt-8 text-center text-sm text-sky-700">
          Built with React & Tailwind CSS
        </p>
      </div>
    </div>
  );
}

export default App;