import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';

import * as controller from '../projects.controller';
import * as service from '../../services/projects.service';

describe('createProject controller', () => {
  it('should return 201 and created project', async () => {
    const mockProject = { id: 1, name: 'My Project' };
    vi.spyOn(service, 'createProject').mockResolvedValue(mockProject);

    const req = {
      body: { name: 'My Project' },
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createProject(req as Request, res as Response);

    expect(service.createProject).toHaveBeenCalledWith('My Project');
    expect(status).toHaveBeenCalledWith(201);
    expect(json).toHaveBeenCalledWith(mockProject);
  });

  it('should handle errors and return 500', async () => {
    vi.spyOn(service, 'createProject').mockRejectedValue(new Error('Fail'));

    const req = {
      body: { name: 'My Project' },
    } as Partial<Request>;

    const json = vi.fn();
    const status = vi.fn().mockReturnValue({ json });

    const res = {
      status,
    } as Partial<Response>;

    await controller.createProject(req as Request, res as Response);

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ message: 'Internal Server Error' });
  });
});
