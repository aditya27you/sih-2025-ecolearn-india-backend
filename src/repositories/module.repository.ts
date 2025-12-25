import { Module } from '../models/module.model';
import { IModule } from '../types/module.types';

export class ModuleRepository {
  async create(data: Partial<IModule>): Promise<IModule> {
    return Module.create(data);
  }

  async findAll(): Promise<IModule[]> {
    return Module.find().populate('lessons');
  }

  async findById(id: string): Promise<IModule | null> {
    return Module.findById(id).populate('lessons');
  }

  async update(id: string, data: Partial<IModule>): Promise<IModule | null> {
    return Module.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  }

  async delete(id: string): Promise<IModule | null> {
    return Module.findByIdAndDelete(id);
  }
}

export const moduleRepository = new ModuleRepository();
