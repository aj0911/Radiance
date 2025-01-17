import mongoose, { Document, Model } from "mongoose";
import { IRepository } from "../interfaces/IRepository";

export default class BaseRepository<T> implements IRepository<T> {

  protected _model: Model<T>;

  constructor(model: Model<T>) {
    this._model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    return this._model.create(data);
  }

  async findByID(id: string): Promise<T | null> {
    return this._model.findById(id);
  }

  async findAll(): Promise<T[]> {
    return this._model.find();
  }

  async update(id: string, data: Partial<T>): Promise<T | null> {
    return this._model.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id: string): Promise<boolean> {
    const result = await this._model.findByIdAndDelete(id);
    return result ? true : false;
  }
}