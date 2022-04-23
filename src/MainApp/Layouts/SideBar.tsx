import { State } from '@hookstate/core'
import { IPage } from 'models/IPage'
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, NavLink, useHistory, useRouteMatch } from 'react-router-dom'
import { storeActions, usePages } from 'store'

const SideBar = () => {
  const { url } = useRouteMatch()
  const pages = usePages()
  const history = useHistory()
  const navigateToNewPage = async () => {
    const pageId = await storeActions.createDraft()
    if (pageId) history.push(`/app/${pageId}`)
  }
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
        {pages.map((page, index) => {
          return <PageLinkItem key={page._id.get()} page={page} />
        })}
        <ThemeChanger />
      </ul>
    </div>
  )
}
const PageLinkItem = ({ page }: { page: State<IPage> }) => {
  const { _id, title } = page.get()
  const { url } = useRouteMatch()
  return (
    <li key={_id}>
      <NavLink
        // activeClassName="text-white"
        style={{ textDecoration: 'none' }}
        to={`${url}/${_id}`}
        className="flex items-center justify-between normal-case"
      >
        <span>{title || 'Untitled'}</span>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
          }}
          className="btn btn-ghost btn-xs"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            ></path>
          </svg>
        </button>
      </NavLink>
    </li>
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
