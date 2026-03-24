import { Request, Response, NextFunction } from "express";
import { UploadMiddleware } from "../../src/backend/middleware/UploadMiddleware";
import ExcelJS from "exceljs";

jest.mock("exceljs");

describe("UploadMiddleware.process", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      body: {},
      file: undefined
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    next = jest.fn();
  });

  test("should return error when file is missing", async () => {
    await UploadMiddleware.process(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No file provided" });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return error when customer_id or status is missing", async () => {
    req.file = {
      path: "fake-path.xlsx"
    } as any;

    const mockWorkbook = {
      xlsx: { readFile: jest.fn().mockResolvedValue(undefined) },
      worksheets: [
        {
          eachRow: (cb: any) => {
            cb({ values: ["header"] });
          }
        }
      ]
    };

    (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);

    await UploadMiddleware.process(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Missing required fields: customer_id and status"
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("should return error when spreadsheet parsing fails", async () => {
    req.file = {
      path: "fake-path.xlsx"
    } as any;

    req.body = {
      customer_id: "123",
      status: "active"
    };

    const mockWorkbook = {
      xlsx: {
        readFile: jest.fn().mockRejectedValue(new Error("parse error"))
      }
    };

    (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);

    await UploadMiddleware.process(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(422);

    expect(res.json).toHaveBeenCalledWith({
      error: "Failed to parse spreadsheet",
      details: "parse error"
    });

    expect(next).not.toHaveBeenCalled();
  });

  test("should process spreadsheet and call next()", async () => {
    req.file = {
      path: "fake-path.xlsx"
    } as any;

    req.body = {
      customer_id: "123",
      status: "active"
    };

    const mockWorkbook = {
      xlsx: { readFile: jest.fn().mockResolvedValue(undefined) },
      worksheets: [
        {
          eachRow: (cb: any) => {
            cb({ values: ["row1"] });
            cb({ values: ["row2"] });
          }
        }
      ]
    };

    (ExcelJS.Workbook as jest.Mock).mockImplementation(() => mockWorkbook);

    await UploadMiddleware.process(req as Request, res as Response, next);

    expect((req as any).parsedData).toEqual([
      ["row1"],
      ["row2"]
    ]);

    expect(next).toHaveBeenCalled();
  });
});