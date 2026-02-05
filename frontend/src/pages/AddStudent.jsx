import { useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL;

function AddStudent({ onSuccess }) {
  const [form, setForm] = useState({ name: "", age: "", sex: "Male" });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiBaseUrl}/students/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    }).then(() => {
      setForm({ name: "", age: "", sex: "Male" });
      onSuccess();
    });
  };

  return (
    <div className="card shadow-sm mt-4 mb-5">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">Add New Student</h5>
      </div>
      <div className="card-body">
        {/* Use 'row-cols-1' for mobile and 'row-cols-md-auto' for desktop scaling */}
        <form onSubmit={handleSubmit} className="row g-3 align-items-end">
          
          {/* Name: Full width on mobile (col-12), auto-grow on desktop (col-md) */}
          <div className="col-12 col-md">
            <label className="form-label fw-semibold">Name</label>
            <input
              className="form-control"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          {/* Age: Half width on mobile (col-6), fixed width on desktop (col-md-2) */}
          <div className="col-6 col-md-2">
            <label className="form-label fw-semibold">Age</label>
            <input
              className="form-control"
              type="number"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              required
            />
          </div>

          {/* Sex: Half width on mobile (col-6), fixed width on desktop (col-md-2) */}
          <div className="col-6 col-md-2">
            <label className="form-label fw-semibold">Sex</label>
            <select 
              className="form-select"
              value={form.sex}
              onChange={(e) => setForm({ ...form, sex: e.target.value })}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Button: Full width on mobile (col-12), auto width on desktop (col-md-auto) */}
          <div className="col-12 col-md-auto">
            <button type="submit" className="btn btn-primary w-100 px-4">
              Add Student
            </button>
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default AddStudent;

