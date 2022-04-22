import React from 'react'
import PageHeader from '../Layouts/PageHeader'
import Editor from 'components/Editor'

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <PageHeader />
      <div className="overflow-y-auto">
        <Editor />
      </div>
    </div>
  )
}

export default Page
