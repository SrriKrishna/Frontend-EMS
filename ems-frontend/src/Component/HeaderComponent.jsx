import React from 'react'
import { useTheme } from '../context/ThemeContext';

const HeaderComponent = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div>
      <header>
        <nav className='navbar navbar-custom fixed-top'>
          <div className="container d-flex justify-content-between align-items-center">
            <a className="navbar-brand navbar-brand-custom" href="/">
              <i className="bi bi-people-fill me-2"></i>
              Employee System
            </a>
            <button
              className="btn btn-link text-decoration-none"
              onClick={toggleTheme}
              style={{ color: 'var(--text-main)', fontSize: '1.2rem' }}
            >
              {theme === 'light' ? <i className="bi bi-moon-fill"></i> : <i className="bi bi-sun-fill"></i>}
            </button>
          </div>
        </nav>
      </header>
    </div>
  )
}

export default HeaderComponent