import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../Services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
const EmployeeComponent = () => {

  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')

  const { id } = useParams();

  const [errors, setErrors] = useState({
    firstname: '',
    lastname: '',
    email: ''
  })

  const navigator = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id).then((response) => {
        setFirstname(response.data.firstname);
        setLastname(response.data.lastname);
        setEmail(response.data.email);
      }).catch(error => {
        console.error(error)
      })
    }
  }, [id])

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstname, lastname, email }
      console.log(employee);

      if (id) {
        updateEmployee(id, employee).then((response) => {
          console.log(response.data);
          navigator('/')
        }).catch(error => {
          console.error(error)
        })
      } else {
        createEmployee(employee).then((response) => {
          console.log(response.data);
          navigator('/')
        }).catch(error => {
          console.error(error);
        })
      }

    }
  }

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors }

    if (firstname.trim()) {
      errorsCopy.firstname = '';
    }
    else {
      errorsCopy.firstname = "First Name is required"
      valid = false;
    }

    if (lastname.trim()) {
      errorsCopy.lastname = '';
    }
    else {
      errorsCopy.lastname = "Last Name is required"
      valid = false;
    }

    if (email.trim()) {
      errorsCopy.email = '';
    }
    else {
      errorsCopy.email = "Email is required"
      valid = false;
    }


    setErrors(errorsCopy);
    return valid;
  }

  function pageTitle() {
    if (id) {
      return <h2 className="text-center mb-4 fw-bold text-gradient">Update Employee</h2>
    }
    else {
      return <h2 className="text-center mb-4 fw-bold text-gradient">Add Employee</h2>
    }
  }

  return (
    <div className="container min-vh-100 d-flex align-items-center justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card card-custom p-4 p-md-5">
          {
            pageTitle()
          }
          <div className="card-body p-0">
            <form>
              <div className="form-group mb-4">
                <label className="form-label-custom">First Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee First Name"
                  name="firstname"
                  value={firstname}
                  className={`form-control form-control-custom ${errors.firstname ? 'is-invalid' : ''}`}
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {errors.firstname && <div className='invalid-feedback'>{errors.firstname}</div>}
              </div>

              <div className="form-group mb-4">
                <label className="form-label-custom">Last Name</label>
                <input
                  type="text"
                  placeholder="Enter Employee Last Name"
                  name="lastname"
                  value={lastname}
                  className={`form-control form-control-custom ${errors.lastname ? 'is-invalid' : ''}`}
                  onChange={(e) => setLastname(e.target.value)}
                />
                {errors.lastname && <div className='invalid-feedback'>{errors.lastname}</div>}
              </div>

              <div className="form-group mb-5">
                <label className="form-label-custom">Email</label>
                <input
                  type="email"
                  placeholder="Enter Employee Email"
                  name="email"
                  value={email}
                  className={`form-control form-control-custom ${errors.email ? 'is-invalid' : ''}`}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>

              <div className="text-center d-grid">
                <button className="btn btn-primary-custom btn-custom btn-lg" onClick={saveOrUpdateEmployee}>
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeComponent
