import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { NavLink, useRouteMatch } from 'react-router-dom'
import PageItemStore from 'store/pageItem.store'

const PagesLink = () => {
  const pagesStore = useStore('pagesStore')

  return (
    <>
      {pagesStore.pages.map((page, index) => {
        return <PageLinkItem key={page._id} page={page} />
      })}
    </>
  )
}
const PageLinkItem = ({ page }: { page: PageItemStore }) => {
  const { _id, title } = page
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
export default observer(PagesLink)
