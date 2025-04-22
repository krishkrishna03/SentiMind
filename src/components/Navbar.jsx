import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

function Navbar({ theme, toggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const navLinkClass = ({ isActive }) => 
    `px-4 py-2 rounded-md transition-colors duration-200 ${
      isActive 
        ? 'text-primary-600 dark:text-primary-400 font-medium' 
        : 'text-neutral-600 dark:text-neutral-300 hover:text-primary-500 dark:hover:text-primary-400'
    }`

  return (
    <nav className="bg-white dark:bg-neutral-800 shadow-sm transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: 0 }}
              className="w-8 h-8 rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
            />
            <h1 className="text-xl font-bold text-neutral-800 dark:text-white">
              SentiMind
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass}>
              Analyze
            </NavLink>
            <NavLink to="/history" className={navLinkClass}>
              History
            </NavLink>
            <NavLink to="/about" className={navLinkClass}>
              About
            </NavLink>
            <button
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 transition-colors duration-200"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 py-2"
          >
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className={navLinkClass} onClick={closeMenu}>
                Analyze
              </NavLink>
              <NavLink to="/history" className={navLinkClass} onClick={closeMenu}>
                History
              </NavLink>
              <NavLink to="/about" className={navLinkClass} onClick={closeMenu}>
                About
              </NavLink>
              <button
                onClick={() => {
                  toggleTheme();
                  closeMenu();
                }}
                className="flex items-center space-x-2 px-4 py-2 rounded-md text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors duration-200"
              >
                {theme === 'light' ? (
                  <>
                    <FiMoon size={20} />
                    <span>Dark Mode</span>
                  </>
                ) : (
                  <>
                    <FiSun size={20} />
                    <span>Light Mode</span>
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}

export default Navbar