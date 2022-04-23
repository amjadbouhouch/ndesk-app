import React, { useEffect } from 'react'
import PageHeader from '../Layouts/PageHeader'
import Editor from 'components/Editor'
import { useParams } from 'react-router-dom'
import { storeActions, useSelectedPage } from 'store'
import PageBanner from './PageBanner'

const Page = () => {
  const { id } = useParams<{ id?: string }>()

  useEffect(() => {
    storeActions.getCurrentPageById(id)
  }, [id])

  return (
    <div className="flex flex-col h-screen">
      <PageHeader />
      <PageBanner />
      <div className="p-2 overflow-y-auto">
        <Editor />
      </div>
    </div>
  )
}

export default Page
