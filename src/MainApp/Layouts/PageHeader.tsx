import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import React from 'react'

const PageHeader = () => {
  const page = useStore('pagesStore').selectedPage
  return (
    <div className="border-b navbar bg-base-100 border-base-200">
      <div className="flex-none">
        <label
          htmlFor="my-drawer-2"
          className="lg:hidden btn btn-square btn-ghost"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block w-5 h-5 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </label>
      </div>
      <div className="flex-1">
        <div className="text-sm breadcrumbs">
          <ul>
            <li>
              <a>Home</a>
            </li>
            <li>
              <a>{page?.title || 'Untitled'}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring ring-offset-2 ring-primary ring-offset-base-100">
              <img src="https://ui-avatars.com/api/?background=0D8ABC&color=fff&rounded=true" />
            </div>
          </label>

          <ul
            tabIndex={0}
            className="p-2 mt-3 shadow w-52 menu menu-compact dropdown-content bg-base-100 rounded-box"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default observer(PageHeader)
