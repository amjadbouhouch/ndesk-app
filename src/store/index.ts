import { generateEmptyPage } from './../utils/index'
import { createState, useState } from '@hookstate/core'
import { IPage } from 'models/IPage'
import { DatabaseService } from './databaseService'

const db = new DatabaseService('pages')

type IState = {
  pages: IPage[]
  selectedPage?: IPage
}
const state = createState<IState>({
  pages: []
})
// const page = generateEmptyPage()
// helpers
const watch = (changes) => {
  const newPage = changes.doc as IPage
  state.pages.set((prev) => [...prev, newPage])
}
// later we will use this to unsubscribe from changes
const unsubscribe = db.watchChanges(watch)

const storeActions = {
  // getters
  getAllPages: async () => {
    try {
      const retrievedPages = await db.getAllDocuments()

      state.pages.set(retrievedPages)
    } catch (error) {
      console.log(error)
    }
  },

  // create new page
  createDraft: async () => {
    try {
      const draftPage: IPage = generateEmptyPage()
      await db.addDocument(draftPage)
      return draftPage._id
    } catch (error) {
      return undefined
    }
  },
  // updateCurrentPage
  updateCurrentPage: async () => {
    // const c = currentPage.get()
    // const updateFunction = () => {
    //   globalTimeout = null
    //   db.updateDocument(c)
    //     .then(() => {})
    //     .catch((err) => console.log(err))
    // }
    // if (globalTimeout !== null) clearTimeout(globalTimeout)
    // globalTimeout = setTimeout(updateFunction, 1000)
  },
  getCurrentPageById: async (pageId?: string) => {
    try {
      if (!pageId) {
        return
      }
      const page = await db.getDocument(pageId)
      state.selectedPage.set(page)
    } catch (error) {
      console.log(error)
    }
  },
  //
  updateContentOfCurrentPage: async (content: string) => {
    // try {
    //   const page = currentPage.get()
    //   if (page) {
    //     currentPage.set((prev) => {
    //       if (!prev) {
    //         return undefined
    //       }
    //       return {
    //         ...prev,
    //         doc: {
    //           ...prev?.doc,
    //           content
    //         }
    //       }
    //     })
    //     // await db.updateDocument(page);
    //   }
    // } catch (error) {
    //   // console.log(error);
    // }
  }
}
storeActions.getAllPages()

// hooks
const usePages = () => useState<IPage[]>(state.pages)
const useSelectedPage = () => useState(state.selectedPage)

export { usePages, useSelectedPage, storeActions }
