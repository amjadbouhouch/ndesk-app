import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import React, { useRef } from 'react'
import PageItemStore from 'store/pageItem.store'

const PageBanner = () => {
  const selectedPage = useStore('pagesStore').selectedPage as PageItemStore
  function handleKeyDown(e) {
    e.target.style.height = 'inherit'
    e.target.style.height = `${e.target.scrollHeight}px`
  }
  return (
    <>
      <div className="relative h-48 bg-gray-200">
        <img
          loading="lazy"
          src={selectedPage.cover}
          className="object-cover w-full h-full"
        />
        <div className="absolute right-3 bottom-3">
          <button className="btn btn-sm">Change cover</button>
        </div>
        <div className="absolute -bottom-4 left-5">
          <div className="btn btn-sm">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              ></path>
            </svg>
          </div>
        </div>
      </div>
      <div className="w-full p-6 space-y-2">
        <input
          className="w-full text-3xl bg-transparent appearance-none outline-0 placeholder:text-base-content"
          placeholder={'Untitled'}
          value={selectedPage.title}
          onChange={(evt) => selectedPage.setTitle(evt.target.value)}
        />
        <input
          className="w-full pl-1 text-xs bg-transparent appearance-none outline-0 placeholder:text-base-content"
          placeholder={'description...'}
          value={selectedPage.description}
          onChange={(evt) => (selectedPage.description = evt.target.value)}
        />
      </div>
    </>
  )
}

export default observer(PageBanner)
