import { IBookableResourceRepository } from './IBookableResourceRepository';
import { BookableResourceModel } from '../models/BookableResourceModel';

type SaveExecutor = (
  resource: BookableResourceModel
) => Promise<BookableResourceModel>;

export class BookableResourceRepository implements IBookableResourceRepository {
  constructor(private readonly saveExecutor?: SaveExecutor) {}

  async save(resource: BookableResourceModel): Promise<BookableResourceModel> {
    if (this.saveExecutor) {
      return this.saveExecutor(resource);
    }

    // Default behavior keeps the contract stable while the real DB adapter is plugged in.
    return structuredClone(resource);
  }
}
