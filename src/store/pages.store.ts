import { action, makeObservable, observable } from 'mobx'
import { IPage } from 'models/IPage'
import { generateEmptyPage } from '../utils/index'
import { DatabaseService } from './databaseService'
import PageItemStore from './pageItem.store'

class PagesStore {
  pages: PageItemStore[] = []

  selectedPage?: PageItemStore = undefined
  private _db = new DatabaseService('pages')
  constructor() {
    makeObservable(this, {
      pages: observable,
      selectedPage: observable,
      setPages: action,
      setSelectedPage: action,
      updateCurrentPage: action
    })
    this.getAllPages()
    this._db.watchChanges(this._watchDbChanges.bind(this))
  }

  private _watchDbChanges(changes) {
    this.getAllPages()
  }
  async getAllPages() {
    try {
      const retrievedPages = await this._db.getAllDocuments()
      const pages = retrievedPages.map((page) => new PageItemStore(page, this))
      this.setPages(pages)
    } catch (error) {
      console.log(error)
    }
  }
  //
  async getCurrentPageById(pageId?: string) {
    try {
      if (!pageId) {
        return
      }
      const page = await this._db.getDocument(pageId)
      if (!page) {
        return
      }
      const pageItemStore = new PageItemStore(page as IPage, this)
      this.setSelectedPage(pageItemStore)
    } catch (error) {
      console.log(error)
    }
  }

  public async createNewDraftPage(): Promise<string | undefined> {
    try {
      const draftPage: IPage = generateEmptyPage()
      await this._db.addDocument(draftPage)
      return draftPage._id
    } catch (error) {
      return undefined
    }
  }

  setSelectedPage(selectedPage?: PageItemStore) {
    this.selectedPage = selectedPage
  }

  setPages(pages: PageItemStore[]) {
    this.pages = pages
  }

  updateCurrentPage(page: PageItemStore) {
    // const index = this.pages.findIndex((p) => p._id === page._id)
    // if (~index) {
    //   this.setPages(
    //     this.pages.map((p, pageIndex) => {
    //       if (pageIndex === index) {
    //         return page
    //       }
    //       return p
    //     })
    //   )
    // }
  }
}

export default PagesStore
