import React from 'react'
import { storeActions, useSelectedPage } from 'store'
import EditableTitle from '../../components/Editor/EditableTitle'

const PageBanner = () => {
  const selectedPage = useSelectedPage().get()

  const onTitleChange = (title: string) =>
    storeActions.updateCurrentPageTitle(title)
  return (
    <>
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
      {selectedPage && (
        <div className="mx-6 mt-2 space-y-2 prose-sm prose">
          <input
            className="text-3xl bg-transparent appearance-none outline-0"
            placeholder={'Untitled'}
            value={selectedPage.title}
            onChange={(e) => onTitleChange(e.target.value)}
          />
          {/* <EditableTitle
            content={selectedPage.title as string}
            handleChange={onTitleChange}
            handleOnBlur={() => {}}
            onKeyDown={() => {}}
          /> */}
          <p className="text-sm">{selectedPage?.description}</p>
        </div>
      )}
    </>
  )
}

export default PageBanner
