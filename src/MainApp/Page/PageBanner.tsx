import Editor from 'components/Editor'
import React from 'react'
import { useSelectedPage } from 'store'

const PageBanner = () => {
  const selectedPage = useSelectedPage().get()
  return (
    <div className="">
      <div className="relative h-48 bg-red-200">
        <img
          loading="lazy"
          src={selectedPage?.cover}
          className="object-cover w-full h-full"
        />
        <div className="absolute right-3 bottom-3">
          <button className="btn btn-sm">Change cover</button>
        </div>
      </div>
      <div className="px-6 pt-6 space-y-2">
        <h1 className="text-3xl">{selectedPage?.title}</h1>
        <p className="text-sm">{selectedPage?.description}</p>
      </div>
    </div>
  )
}

export default PageBanner
