import { usePortal } from 'hooks/usePortal'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useHistory, useRouteMatch } from 'react-router-dom'

const SideBar = () => {
  const { url } = useRouteMatch()
  const history = useHistory()
  const navigateToNewPage = () => history.push(`/app/new`)
  return (
    <div className="drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay" />

      <ul className="p-2 overflow-y-auto border-r w-80 border-base-300 menu bg-base-100 text-base-content">
        <div className="flex items-center justify-between">
          <Link to="/app" className="text-xl normal-case btn btn-ghost">
            Ndesk v0.0.1
          </Link>
          <button
            onClick={navigateToNewPage}
            className="btn btn-square btn-ghost"
          >
            <FaPlus className="w-5 h-5" />
          </button>
        </div>
        {/* {isOpen && (
          <div>
            <CreatePageForm closePortal={closePortal} />
          </div>
        )} */}
        {/*  {pages.map((page, index) => {
          const doc = page.doc.get()
          return (
            <li key={doc._id}>
              <NavLink
                // activeClassName="text-white"
                style={{ textDecoration: 'none' }}
                to={`${url}/${doc._id}`}
                className="normal-case"
              >
                {doc.title}
              </NavLink>
            </li>
          )
        })} */}
        <ThemeChanger />
      </ul>
    </div>
  )
}

const ThemeChanger = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true)
  const toggleDarkMode = () => {
    const prevTheme = isDarkModeEnabled ? 'dark' : 'light'
    document
      .getElementsByTagName('html')[0]
      .setAttribute('data-theme', prevTheme === 'dark' ? 'light' : 'dark')
    setIsDarkModeEnabled((prev) => !prev)
  }
  return (
    <div className="form-control">
      <label className="cursor-pointer label">
        <span className="label-text">Dark mode</span>
        <input
          type="checkbox"
          className="toggle toggle-secondary"
          checked={isDarkModeEnabled}
          onChange={toggleDarkMode}
        />
      </label>
    </div>
  )
}
export default SideBar
