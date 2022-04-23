import { generateEmptyPage } from './../utils/index'
import { createState, useState } from '@hookstate/core'
import { IPage } from 'models/IPage'
import { DatabaseService } from './databaseService'

const db = new DatabaseService('pages')

type IState = {
  pages: IPage[]
  selectedPage?: IPage
}
const store = createState<IState>({
  pages: []
})
let timeout: any = null
// const page = generateEmptyPage()
// helpers
const watch = (changes) => {
  // const newPage = changes.doc as IPage
  // store.pages.set((prev) => [...prev, newPage])
  storeActions.getAllPages()
}
// later we will use this to unsubscribe from changes
const unsubscribe = db.watchChanges(watch)

const storeActions = {
  // getters
  getAllPages: async () => {
    try {
      const retrievedPages = await db.getAllDocuments()

      store.pages.set(retrievedPages)
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
      store.selectedPage.set(page)
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
  },
  updateCurrentPageTitle: async (title: string) => {
    if (timeout) {
      clearTimeout(timeout)
    }

    store.selectedPage.set((p) => ({ ...p, title: title } as IPage))
    timeout = setTimeout(async () => {
      const document = store.selectedPage.get()
      const { rev } = await db.updateDocument(document)

      store.selectedPage.set((p) => ({ ...p, _rev: rev } as IPage))
    }, 1000)
  }
}
storeActions.getAllPages()

// hooks
const usePages = () => useState<IPage[]>(store.pages)
const useSelectedPage = () => useState(store.selectedPage)

export { usePages, useSelectedPage, storeActions, store }
