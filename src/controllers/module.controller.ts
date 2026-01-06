import { Request, Response } from 'express';
import { moduleService } from '../services/module.service';
import { catchAsync } from '../utils/catchasync';
import { ApiResponse } from '../utils/apiresponse';

export const createModule = catchAsync(async (req: Request, res: Response) => {
  const module = await moduleService.createModule({
    ...req.body,
    createdBy: (req as any).user._id,
  });
  res
    .status(201)
    .json(new ApiResponse(201, module, 'Module created successfully'));
});

export const getAllModules = catchAsync(async (req: Request, res: Response) => {
  const modules = await moduleService.getAllModules();
  res
    .status(200)
    .json(new ApiResponse(200, modules, 'Modules fetched successfully'));
});

export const getModuleById = catchAsync(async (req: Request, res: Response) => {
  const module = await moduleService.getModuleById(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, module, 'Module fetched successfully'));
});

export const updateModule = catchAsync(async (req: Request, res: Response) => {
  const module = await moduleService.updateModule(req.params.id, req.body);
  res
    .status(200)
    .json(new ApiResponse(200, module, 'Module updated successfully'));
});

export const deleteModule = catchAsync(async (req: Request, res: Response) => {
  await moduleService.deleteModule(req.params.id);
  res
    .status(200)
    .json(new ApiResponse(200, null, 'Module deleted successfully'));
});
