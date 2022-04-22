export interface IPageResponse {
  doc: IPage;
  id: string;
  key: string;
  value: {
    rev: string;
  };
}
export interface IPage {
  _id: string;
  title?: string;
  description?: string;
  content?: string;
}
