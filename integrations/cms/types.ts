export type WixDataItem = {
  _id?: string;
  _createdDate?: Date;
  _updatedDate?: Date;
};

export type WixDataQueryResult<T> = {
  items: T[];
  totalCount: number;
  hasNext: boolean;
  hasPrev: boolean;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
