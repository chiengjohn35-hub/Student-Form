import { useState, useEffect } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL;

function EditStudent({ student, onCancel, onSuccess }) {
  const [form, setForm] = useState({ name: "", age: "", sex: "" });

  useEffect(() => {
    if (student) {
      setForm({
        name: student.name,
        age: student.age,
        sex: student.sex
      });
    }
  }, [student]);

  const handleSave = (e) => {
    e.preventDefault(); // Prevent page refresh if triggered by form submit
    fetch(`${apiBaseUrl}/students/${student.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })
      .then(() => {
        onSuccess(); 
      });
  };

  return (
    <>
      {/* Modal Header */}
      <div className="modal-header bg-primary text-white">
        <h5 className="modal-title">
          <i className="bi bi-pencil-square me-2"></i>
          Edit Student Profile
        </h5>
        <button 
          type="button" 
          className="btn-close btn-close-white" 
          onClick={onCancel}
        ></button>
      </div>

      {/* Modal Body */}
      <div className="modal-body">
        <form id="editForm" onSubmit={handleSave}>
          <div className="mb-3">
            <label className="form-label fw-bold small text-uppercase">Full Name</label>
            <input
              className="form-control form-control-lg"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>

          <div className="row">
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase">Age</label>
                <input
                  className="form-control"
                  type="number"
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="col-6">
              <div className="mb-3">
                <label className="form-label fw-bold small text-uppercase">Sex</label>
                <select 
                  className="form-select"
                  value={form.sex}
                  onChange={(e) => setForm({ ...form, sex: e.target.value })}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Modal Footer */}
      <div className="modal-footer bg-light">
        <button 
          type="button" 
          className="btn btn-secondary px-4" 
          onClick={onCancel}
        >
          Cancel
        </button>
        <button 
          type="submit" 
          form="editForm" 
          className="btn btn-primary px-4 shadow-sm"
        >
          Save Changes
        </button>
      </div>
    </>
  );
}

export default EditStudent;
