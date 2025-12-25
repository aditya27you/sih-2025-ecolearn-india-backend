import { moduleRepository } from '../repositories/module.repository';
import { IModule } from '../types/module.types';
import { ApiError } from '../utils/apierror';

export class ModuleService {
  async createModule(data: Partial<IModule>) {
    return moduleRepository.create(data);
  }

  async getAllModules() {
    return moduleRepository.findAll();
  }

  async getModuleById(id: string) {
    const module = await moduleRepository.findById(id);
    if (!module) {
      throw new ApiError('Module not found', 404);
    }
    return module;
  }

  async updateModule(id: string, data: Partial<IModule>) {
    const updated = await moduleRepository.update(id, data);
    if (!updated) {
      throw new ApiError('Module not found', 404);
    }
    return updated;
  }

  async deleteModule(id: string) {
    const deleted = await moduleRepository.delete(id);
    if (!deleted) {
      throw new ApiError('Module not found', 404);
    }
    return deleted;
  }
}

export const moduleService = new ModuleService();
