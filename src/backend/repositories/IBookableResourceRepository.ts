import { BookableResourceModel } from '../models/BookableResourceModel';

export interface IBookableResourceRepository {
  save(resource: BookableResourceModel): Promise<BookableResourceModel>;
}