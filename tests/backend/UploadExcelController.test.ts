import { Request, Response } from 'express';
import { UploadExcelController } from '../../src/backend/controllers/UploadExcelController';
import { UploadExcelService } from '../../src/backend/services/UploadExcelService';
import { ValidationError } from '../../src/backend/errors/HttpError';

type MockResponse = Response & {
  status: jest.Mock;
  json: jest.Mock;
};

function createResponseMock(): MockResponse {
  const response = {} as MockResponse;
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
}

describe('UploadExcelController', () => {
  it('should return 400 when no file is sent', async () => {
    const service = { process: jest.fn() } as unknown as UploadExcelService;
    const controller = new UploadExcelController(service);
    const req = {} as Request;
    const res = createResponseMock();

    await controller.upload(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'No file was uploaded. Use multipart/form-data with field "file".',
      },
    });
    expect(service.process).not.toHaveBeenCalled();
  });

  it('should return 201 and normalized payload on success', async () => {
    const service = {
      process: jest.fn().mockResolvedValue({
        raw: { location: { building: ['Tower A'] } },
        mapped: { location: { building: 'Tower A' } },
        saved: { id: 1 },
      }),
    } as unknown as UploadExcelService;
    const controller = new UploadExcelController(service);

    const req = {
      file: { path: '/tmp/input.xlsx' },
    } as unknown as Request;
    const res = createResponseMock();

    await controller.upload(req, res);

    expect(service.process).toHaveBeenCalledWith({ filePath: '/tmp/input.xlsx' });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Excel processed successfully',
      data: {
        raw: { location: { building: ['Tower A'] } },
        mapped: { location: { building: 'Tower A' } },
        saved: { id: 1 },
      },
    });
  });

  it('should return 422 with consistent error payload for validation failures', async () => {
    const service = {
      process: jest.fn().mockRejectedValue(new ValidationError('Missing required section "rates"')),
    } as unknown as UploadExcelService;
    const controller = new UploadExcelController(service);

    const req = {
      file: { path: '/tmp/input.xlsx' },
    } as unknown as Request;
    const res = createResponseMock();

    await controller.upload(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Missing required section "rates"',
        details: undefined,
      },
    });
  });
});
