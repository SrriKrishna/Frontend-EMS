import React, { useEffect, useState } from 'react'
import { deleteEmployee, listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponents = () => {

  const [employees, setEmployees] = useState([])
  const navigator = useNavigate();

  useEffect(() => {
    getAllEmployees();
  }, [])

  function getAllEmployees() {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch(error => {
        console.error(error);
      })
  }

  function addNewEmployee() {
    navigator('/add-employee')
  }

  function updateEmployee(id) {
    navigator(`/update-employee/${id}`)
  }

  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id).then((response) => {
      getAllEmployees();
    }).catch(error => {
      console.error(error);
    })
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 text-center my-4">
          <h2 className="fw-bold display-6 text-uppercase mb-4">
            <span className="text-gradient">List Of Employees</span>
          </h2>
          <div className="d-flex justify-content-end mb-3">
            <button className="btn btn-primary-custom btn-custom" onClick={addNewEmployee}>
              <i className="bi bi-plus-lg me-2"></i> Add Employee
            </button>
          </div>
        </div>
      </div>

      <div className="card card-custom p-0 mb-5">
        <div className="card-body p-0">
          <table className="table table-custom mb-0">
            <thead>
              <tr>
                <th className="px-4 py-3">Id</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {employees.map(employee => (
                <tr key={employee.id}>
                  <td className="px-4">{employee.id}</td>
                  <td className="px-4 fw-medium">{employee.firstname}</td>
                  <td className="px-4 fw-medium">{employee.lastname}</td>
                  <td className="px-4 text-secondary">{employee.email}</td>
                  <td className="px-4 text-center">
                    <button className='btn btn-action-edit' onClick={() => updateEmployee(employee.id)}>Update</button>
                    <button className='btn btn-action-delete' onClick={() => removeEmployee(employee.id)}
                    >Delete</button>
                  </td>
                </tr>
              ))}
              {employees.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No employees found. Add one to get started!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ListEmployeeComponents
