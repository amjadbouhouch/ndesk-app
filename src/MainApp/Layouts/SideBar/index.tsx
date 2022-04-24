import { useStore } from 'hooks/useStore'
import React from 'react'
import { FaPlus } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import PagesLink from './PagesLink'
import ThemeChanger from './ThemeChanger'

const SideBar = () => {
  //
  const pagesStore = useStore('pagesStore')
  const history = useHistory()
  const navigateToNewPage = async () => {
    const pageId = await pagesStore.createNewDraftPage()
    if (pageId) history.push(`/app/${pageId}`)
  }
  return (
    <div className="shrink-0 drawer-side">
      <label htmlFor="my-drawer-2" className="drawer-overlay" />

      <ul className="p-2 overflow-y-auto border-r w-80 border-base-300 menu bg-base-100 text-base-content">
        <div className="flex-1">
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
          <PagesLink />
        </div>
        <ThemeChanger />
      </ul>
    </div>
  )
}
export default SideBar
