
export interface IRepository<T> {

    create(data: Partial<T>): Promise<T>;

    findByID(id: string): Promise<T | null>;

    findAll(): Promise<T[]>;

    update(id: string, data: Partial<T>): Promise<T | null>;

    delete(id: string): Promise<boolean>;
  }