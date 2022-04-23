import { IPage } from 'models/IPage'
import PouchDb from 'pouchdb'

type OnChangeType = (change: any) => void
// create class pouchdb with all the methods
export class DatabaseService {
  private _db: PouchDB.Database<IPage>

  constructor(dbName: string) {
    this._db = new PouchDb(dbName)
  }

  public watchChanges(onChange: OnChangeType) {
    const changes = this._db
      .changes({
        since: 'now',
        live: true,
        include_docs: true
      })
      .on('change', onChange)
      .on('complete', function (info) {})
      .on('error', function (err) {
        console.log(err)
      })
    return changes
  }

  // create a new database
  public createDatabase() {
    return this._db.createIndex({
      index: {
        fields: ['id']
      }
    })
  }

  // add a new document to the database
  public addDocument(doc: any) {
    return this._db.put(doc)
  }

  // get a document from the database
  public async getDocument(id: string) {
    return this._db.get(id)
  }

  // get all documents from the database
  public async getAllDocuments(): Promise<IPage[]> {
    try {
      const result = await this._db.allDocs({ include_docs: true })
      const pages = result.rows.map((row) => row.doc)
      return pages as IPage[]
    } catch (error) {
      return []
    }
  }

  // update a document in the database
  // update doc with _rev
  public updateDocument(doc: any) {
    return this._db.put(doc)
  }

  // delete a document from the database
  public deleteDocument(doc: any) {
    return this._db.remove(doc)
  }

  // delete all documents from the database
  public deleteAllDocuments() {
    return this._db.allDocs({ include_docs: true }).then((docs) => {
      const docsToDelete = docs.rows.map((row) => {
        return this._db.remove(row.doc)
      })
      return Promise.all(docsToDelete)
    })
  }
}
