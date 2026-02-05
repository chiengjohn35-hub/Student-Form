import { useEffect, useState } from "react";
import EditStudent from "./EditStudent";
import AddStudent from "./AddStudent";

const apiBaseUrl = import.meta.env.VITE_API_URL;

function StudentsList() {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchStudents = () => {
    setLoading(true);
    fetch(`${apiBaseUrl}/students/`)
      .then(res => res.json())
      .then(data => {
        setStudents(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      fetch(`${apiBaseUrl}/students/${id}`, { method: 'DELETE' })
        .then(() => fetchStudents());
    }
  };

  return (
    <div className="container mt-4 mb-5">
      {/* SECTION 1: HEADER & TABLE */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center">
            <h4 className="mb-0 me-3">Student Registry</h4>
            <span className="badge bg-primary">{students.length} Total</span>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={fetchStudents}>
             Refresh List
          </button>
        </div>
        
        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th className="px-4">ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th className="text-end px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((s) => (
                    <tr key={s.id}>
                      <td className="px-4 fw-bold text-muted">#{s.id}</td>
                      <td className="fw-semibold">{s.name}</td>
                      <td>{s.age} yrs</td>
                      <td>
                        <span className={`badge ${s.sex === 'Male' ? 'bg-info' : 'bg-warning'} text-dark`}>
                          {s.sex}
                        </span>
                      </td>
                      <td className="text-end px-4">
                        <div className="btn-group">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => setEditingStudent(s)}>Edit</button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(s.id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: ADD STUDENT FORM (Now correctly placed below) */}
      <div className="mt-4">
        <AddStudent onSuccess={fetchStudents} />
      </div>

      {/* SECTION 3: EDIT MODAL (Conditional) */}
      {editingStudent && (
        <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow">
              <EditStudent
                student={editingStudent}
                onCancel={() => setEditingStudent(null)}
                onSuccess={() => {
                  setEditingStudent(null);
                  fetchStudents();
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentsList;
