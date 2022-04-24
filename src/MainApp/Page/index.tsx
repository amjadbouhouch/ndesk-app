import Editor from 'components/Editor'
import { useStore } from 'hooks/useStore'
import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageHeader from '../Layouts/PageHeader'
import PageBanner from './PageBanner'

const Page = () => {
  const { id } = useParams<{ id?: string }>()
  const pagesStore = useStore('pagesStore')
  useEffect(() => {
    pagesStore.getCurrentPageById(id)
  }, [id])
  if (!pagesStore.selectedPage) return null
  return (
    <div className="flex-col h-screen overflow-x-hidden">
      <PageHeader />
      <PageBanner />
      <div className="m-2 overflow-y-auto">
        <Editor />
      </div>
    </div>
  )
}

export default observer(Page)
