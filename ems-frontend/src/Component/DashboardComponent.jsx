import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listEmployees } from '../Services/EmployeeService';

const DashboardComponent = () => {
    const navigator = useNavigate();
    const [employeeCount, setEmployeeCount] = useState(0);
    const [recentEmployees, setRecentEmployees] = useState([]);

    useEffect(() => {
        listEmployees().then((response) => {
            const employees = response.data;
            setEmployeeCount(employees.length);
            // Get last 3 added employees
            setRecentEmployees(employees.slice(-3).reverse());
        }).catch(error => {
            console.error("Error fetching dashboard data:", error);
        });
    }, []);

    return (
        <div className="container fade-in">
            <div className="row mt-5">
                {/* Hero Section */}
                <div className="col-lg-6 mb-4 d-flex flex-column justify-content-center">
                    <h1 className="display-4 fw-bold mb-3">
                        Welcome to <span className="text-gradient">EMS</span>
                    </h1>
                    <p className="lead text-secondary mb-4">
                        Manage your employees efficiently with our modern Employee Management System. Track, add, update, and organize your workforce in one place.
                    </p>
                    <div className="d-flex gap-3">
                        <button className="btn btn-primary-custom btn-lg btn-custom" onClick={() => navigator('/employees')}>
                            <i className="bi bi-people-fill me-2"></i>
                            View Employees
                        </button>
                        <button className="btn btn-secondary-custom btn-lg btn-custom" onClick={() => navigator('/add-employee')}>
                            <i className="bi bi-person-plus-fill me-2"></i>
                            Add New
                        </button>
                    </div>
                </div>

                {/* Stats & Data Section */}
                <div className="col-lg-6">
                    <div className="row g-4">
                        {/* Total Count Card */}
                        <div className="col-md-6 mb-3">
                            <div className="card card-custom p-4 text-center h-100 d-flex flex-column justify-content-center">
                                <div className="mb-2 text-primary">
                                    <i className="bi bi-people" style={{ fontSize: '2.5rem' }}></i>
                                </div>
                                <h3 className="fw-bold display-5 my-2">{employeeCount}</h3>
                                <p className="text-secondary mb-0 fw-medium">Total Employees</p>
                            </div>
                        </div>

                        {/* Quick Stats / Placeholder */}
                        <div className="col-md-6 mb-3">
                            <div className="card card-custom p-4 text-center h-100 d-flex flex-column justify-content-center">
                                <div className="mb-2 text-success">
                                    <i className="bi bi-check-circle-fill" style={{ fontSize: '2.5rem' }}></i>
                                </div>
                                <h5 className="fw-bold my-2">System Active</h5>
                                <p className="text-secondary mb-0 fw-medium">All services operational</p>
                            </div>
                        </div>

                        {/* Recent Employees List */}
                        <div className="col-12">
                            <div className="card card-custom p-4 h-100">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title fw-bold m-0">Recent Additions</h5>
                                    <small className="text-primary cursor-pointer" onClick={() => navigator('/employees')} style={{ cursor: 'pointer' }}>View All</small>
                                </div>
                                <ul className="list-group list-group-flush">
                                    {recentEmployees.length > 0 ? (
                                        recentEmployees.map(emp => (
                                            <li key={emp.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-2 border-bottom-0">
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar-circle bg-primary-subtle text-primary me-3 rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px', fontWeight: 'bold' }}>
                                                        {emp.firstname.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h6 className="mb-0 fw-semibold">{emp.firstname} {emp.lastname}</h6>
                                                        <small className="text-muted" style={{ fontSize: '0.8rem' }}>{emp.email}</small>
                                                    </div>
                                                </div>
                                                <span className="badge bg-light text-dark border">New</span>
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-muted text-center my-3">No recent data available.</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardComponent
