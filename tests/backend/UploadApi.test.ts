/**
 * Jest test suite for the Upload API
 *
 * Run with:
 *   npx jest upload.test.ts
 *
 * Dependencies (add to package.json devDependencies if missing):
 *   jest, ts-jest, @types/jest, @types/node
 *   @types/express, @types/multer
 *
 * jest.config.ts (or jest field in package.json):
 *   { preset: "ts-jest", testEnvironment: "node" }
 */

// ---------------------------------------------------------------------------
// Mocks — must be declared before imports so Jest hoists them correctly
// ---------------------------------------------------------------------------

// Mock the database module so no real Postgres connection is needed
jest.mock("../../src/database/config/db.ts", () => ({
  query: jest.fn(),
}));

import db from "../../src/database/config/db";

// ---------------------------------------------------------------------------
// Imports under test
// ---------------------------------------------------------------------------
import { Request, Response } from "express";
import { getAll, create } from "../../src/backend/controllers/UploadController";
import { UploadService } from "../../src/backend/services/UploadService";
import UploadModel from "../../src/backend/models/UploadModel";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a minimal Express-like mock response */
function mockResponse() {
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as unknown as Response;
  return res;
}

/** Build a minimal Express-like mock request */
function mockRequest(overrides: Partial<Request> = {}): Request {
  return {
    body: {},
    file: undefined,
    ...overrides,
  } as unknown as Request;
}

/** Minimal Multer file fixture */
function multerFile(overrides: Partial<Express.Multer.File> = {}): Express.Multer.File {
  return {
    fieldname: "file",
    originalname: "data.csv",
    encoding: "7bit",
    mimetype: "text/csv",
    size: 512,
    destination: "/tmp/uploads",
    filename: "123456-data.csv",
    path: "/tmp/uploads/123456-data.csv",
    buffer: Buffer.from("col1,col2\nval1,val2"),
    stream: null as any,
    ...overrides,
  };
}

/** Reusable upload record fixture */
const uploadRecord = {
  id: 1,
  customer_id: 42,
  status: "pending",
  file: Buffer.from("col1,col2\nval1,val2"),
  file_type: "text/csv",
  upload_date: new Date("2024-01-01T00:00:00Z"),
  size: 512,
};

// ---------------------------------------------------------------------------
// UploadModel
// ---------------------------------------------------------------------------

describe("UploadModel", () => {
  const mockedQuery = db.query as jest.Mock;

  beforeEach(() => jest.clearAllMocks());

  describe("create()", () => {
    it("inserts a record and returns the first row", async () => {
      mockedQuery.mockResolvedValueOnce({ rows: [uploadRecord] });

      const result = await UploadModel.create(
        42,
        "pending",
        Buffer.from("data"),
        "text/csv"
      );

      expect(mockedQuery).toHaveBeenCalledTimes(1);
      // Query should include the INSERT statement
      expect(mockedQuery.mock.calls[0][0]).toMatch(/INSERT INTO submission/i);
      // Values should match positional parameters
      expect(mockedQuery.mock.calls[0][1]).toEqual([
        42,
        "pending",
        Buffer.from("data"),
        "text/csv",
      ]);
      expect(result).toEqual(uploadRecord);
    });

    it("uses 'pending' as the default status when omitted", async () => {
      mockedQuery.mockResolvedValueOnce({ rows: [uploadRecord] });

      await UploadModel.create(42, undefined as any, Buffer.from("x"), "text/csv");

      expect(mockedQuery.mock.calls[0][1][1]).toBe("pending");
    });

    it("propagates database errors", async () => {
      mockedQuery.mockRejectedValueOnce(new Error("DB connection lost"));

      await expect(
        UploadModel.create(1, "pending", Buffer.from("x"), "text/csv")
      ).rejects.toThrow("DB connection lost");
    });
  });

  describe("getAll()", () => {
    it("returns all rows from the submission table", async () => {
      mockedQuery.mockResolvedValueOnce({ rows: [uploadRecord, { ...uploadRecord, id: 2 }] });

      const result = await UploadModel.getAll();

      expect(mockedQuery).toHaveBeenCalledWith("SELECT * FROM submission");
      expect(result).toHaveLength(2);
    });

    it("returns an empty array when the table is empty", async () => {
      mockedQuery.mockResolvedValueOnce({ rows: [] });

      const result = await UploadModel.getAll();

      expect(result).toEqual([]);
    });
  });
});

// ---------------------------------------------------------------------------
// UploadService
// ---------------------------------------------------------------------------

describe("UploadService", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("processUpload()", () => {
    it("saves a valid CSV upload and returns the record", async () => {
      jest.spyOn(UploadModel, "create").mockResolvedValueOnce(uploadRecord);

      const file = multerFile();
      const buffer = Buffer.from("col1,col2\nval1,val2");

      const result = await UploadService.processUpload(file, 42, "pending", buffer);

      expect(UploadModel.create).toHaveBeenCalledWith(
        42,
        "pending",
        buffer,
        "text/csv"
      );
      expect(result).toEqual(uploadRecord);
    });

    it("saves a valid XLSX upload", async () => {
      jest.spyOn(UploadModel, "create").mockResolvedValueOnce({
        ...uploadRecord,
        file_type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const file = multerFile({
        mimetype:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        originalname: "data.xlsx",
      });

      const result = await UploadService.processUpload(file, 1, "pending", Buffer.from("x"));

      expect(UploadModel.create).toHaveBeenCalledTimes(1);
      expect(result).toBeDefined();
    });

    it("throws when no file is provided", async () => {
      // ⚠️  BUG: the current implementation catches the error internally and
      // returns undefined instead of re-throwing. This test documents the
      // EXPECTED (correct) behaviour — it will fail until the service is fixed.
      await expect(
        UploadService.processUpload(undefined, 42, "pending", Buffer.from(""))
      ).rejects.toThrow("No file was uploaded.");
    });

    it("throws for an unsupported MIME type", async () => {
      const file = multerFile({ mimetype: "application/pdf", size: 100 });

      await expect(
        UploadService.processUpload(file, 42, "pending", Buffer.from("x"))
      ).rejects.toThrow(/Invalid format/i);
    });

    it("throws when the file size is 0", async () => {
      const file = multerFile({ size: 0 });

      await expect(
        UploadService.processUpload(file, 42, "pending", Buffer.from(""))
      ).rejects.toThrow(/empty/i);
    });
  });

  describe("getAll()", () => {
    it("delegates to UploadModel and returns the records", async () => {
      jest
        .spyOn(UploadModel, "getAll")
        .mockResolvedValueOnce([uploadRecord]);

      const result = await UploadService.getAll();

      expect(UploadModel.getAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual([uploadRecord]);
    });
  });
});

// ---------------------------------------------------------------------------
// UploadController
// ---------------------------------------------------------------------------

describe("UploadController", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("getAll()", () => {
    it("responds 200 with the list of uploads on success", async () => {
      jest.spyOn(UploadService, "getAll").mockResolvedValueOnce([uploadRecord]);

      const req = mockRequest();
      const res = mockResponse();

      await getAll(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([uploadRecord]);
    });

    it("falls back to res.json(error) on service failure", async () => {
      // ⚠️  BUG: the catch block returns res.json(error) with no status code.
      // Correct behaviour would be res.status(500).json({ message: ... }).
      // This test documents current (buggy) behaviour so regressions are caught.
      const dbError = new Error("DB down");
      jest.spyOn(UploadService, "getAll").mockRejectedValueOnce(dbError);

      const req = mockRequest();
      const res = mockResponse();

      await getAll(req, res);

      // Currently no status code is set — this assertion captures the bug.
      expect(res.status).not.toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith(dbError);
    });
  });

  describe("create()", () => {
    it("creates an upload and returns the record", async () => {
      jest.spyOn(UploadService, "processUpload").mockResolvedValueOnce(uploadRecord);

      const buffer = Buffer.from("col1,col2\nval1,val2");
      const req = mockRequest({
        body: { customer_id: "42", status: "pending" },
        file: multerFile(),
        // fileBuffer is attached by the middleware
        ...(({ fileBuffer: buffer } as any)),
      });
      (req as any).fileBuffer = buffer;

      const res = mockResponse();

      await create(req, res);

      expect(UploadService.processUpload).toHaveBeenCalledWith(
        req.file,
        42,           // customer_id parsed to Number
        "pending",
        buffer
      );
      expect(res.json).toHaveBeenCalledWith(uploadRecord);
    });

    it("falls back to res.json(error) when the service throws", async () => {
      // Same note as getAll — 500 status should be set here
      jest.spyOn(UploadService, "processUpload").mockRejectedValueOnce(
        new Error("Unexpected failure")
      );

      const req = mockRequest({
        body: { customer_id: "1", status: "pending" },
        file: multerFile(),
      });
      (req as any).fileBuffer = Buffer.from("x");

      const res = mockResponse();

      await create(req, res);

      expect(res.json).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});

// ---------------------------------------------------------------------------
// UploadMiddleware
// ---------------------------------------------------------------------------

/**
 * The middleware is mostly integration-level (multer + ExcelJS + disk I/O).
 * We unit-test the guard clauses that run after multer finishes.
 */
describe("UploadMiddleware — process()", () => {
  // Dynamically import to allow per-test mocking of fs/exceljs
  let UploadMiddleware: any;

  // Re-require with fresh mocks each describe block
  beforeEach(() => {
    jest.resetModules();

    // Stub ExcelJS so tests don't hit the filesystem
    jest.mock("exceljs", () => ({
      Workbook: jest.fn().mockImplementation(() => ({
        csv: { readFile: jest.fn().mockResolvedValue(undefined) },
        xlsx: { readFile: jest.fn().mockResolvedValue(undefined) },
        worksheets: [
          {
            eachRow: jest.fn((cb: Function) => {
              cb({ values: ["col1", "col2"] });
            }),
          },
        ],
      })),
    }));

    // Stub fs/promises so we never touch real disk
    jest.mock("fs/promises", () => ({
      readFile: jest.fn().mockResolvedValue(Buffer.from("mocked")),
    }));

    // Stub synchronous fs checks
    jest.mock("fs", () => ({
      existsSync: jest.fn().mockReturnValue(true),
      mkdirSync: jest.fn(),
    }));

    UploadMiddleware = require("../../src/backend/middleware/UploadMiddleware").UploadMiddleware;
  });

  it("returns 400 when req.file is missing", async () => {
    const req = { file: undefined, body: {} } as Request;
    const res = mockResponse();
    const next = jest.fn();

    await UploadMiddleware.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: "No file provided" });
    expect(next).not.toHaveBeenCalled();
  });

  it("returns 400 when customer_id is missing from body", async () => {
    const req = {
      file: multerFile(),
      body: { status: "pending" }, // missing customer_id
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    await UploadMiddleware.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/customer_id/i) })
    );
  });

  it("returns 400 when status is missing from body", async () => {
    const req = {
      file: multerFile(),
      body: { customer_id: "1" }, // missing status
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    await UploadMiddleware.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.stringMatching(/status/i) })
    );
  });

  it("calls next() when file and all required fields are present", async () => {
    const req = {
      file: multerFile(),
      body: { customer_id: "42", status: "pending" },
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    await UploadMiddleware.process(req, res, next);

    expect(next).toHaveBeenCalled();
    // fileBuffer should have been attached to the request
    expect((req as any).fileBuffer).toBeDefined();
  });

  it("returns 422 when ExcelJS fails to parse the spreadsheet", async () => {
    jest.resetModules();
    jest.mock("exceljs", () => ({
      Workbook: jest.fn().mockImplementation(() => ({
        csv: {
          readFile: jest.fn().mockRejectedValue(new Error("Corrupt file")),
        },
        xlsx: {
          readFile: jest.fn().mockRejectedValue(new Error("Corrupt file")),
        },
        worksheets: [],
      })),
    }));
    jest.mock("fs/promises", () => ({
      readFile: jest.fn().mockResolvedValue(Buffer.from("x")),
    }));
    jest.mock("fs", () => ({
      existsSync: jest.fn().mockReturnValue(true),
      mkdirSync: jest.fn(),
    }));

    UploadMiddleware = require("../../src/backend/middleware/UploadMiddleware").UploadMiddleware;

    const req = {
      file: multerFile(),
      body: { customer_id: "42", status: "pending" },
    } as unknown as Request;
    const res = mockResponse();
    const next = jest.fn();

    await UploadMiddleware.process(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(next).not.toHaveBeenCalled();
  });
});
