import { action, makeObservable, observable } from 'mobx'
import { IPage } from 'models/IPage'
import PagesStore from './pages.store'
//
class PageItemStore implements IPage {
  _id: string

  title?: string = undefined

  url?: string = undefined

  cover?: string = undefined

  description?: string = undefined

  content?: string = undefined
  _rev?: string = undefined
  //
  constructor(
    { _id, _rev, content, cover, description, title, url }: IPage,
    private readonly _pagesStore: PagesStore
  ) {
    makeObservable(this, {
      content: observable,
      cover: observable,
      description: observable,
      title: observable,
      url: observable,
      setTitle: action
    })
    this._id = _id
    this.title = title
    this._rev = _rev
    this.content = content
    this.cover = cover
    this.description = description
    this.url = url
  }

  setTitle(title?: string) {
    this.title = title || ''
  }
  //
}

export default PageItemStore
