import { UploadService } from "../../src/backend/services/UploadService"
import UploadModel from "../../src/backend/models/UploadModel"

jest.mock("../../src/backend/models/UploadModel")

describe("UploadService", () => {

  test("CT-01: accept valid CSV file", async () => {

    const file: any = {
      mimetype: "text/csv",
      size: 100,
      file_path: "/tmp/file.csv"
    }

    ;(UploadModel.create as jest.Mock).mockResolvedValue({ id: 1 })
    
    const mockBuffer = Buffer.from("mock file content");
    const result = await UploadService.processUpload(file, 1, 'pending', mockBuffer)

    expect(result).toBeDefined()
  })


  test("CT-02: accept valid XLSX file", async () => {

    const file: any = {
      mimetype:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      size: 100,
      file_path: "/tmp/file.xlsx"
    }

    ;(UploadModel.create as jest.Mock).mockResolvedValue({ id: 1 })

    const mockBuffer = Buffer.from("mock file content");
    const result = await UploadService.processUpload(file, 1, 'pending', mockBuffer);

    expect(result).toBeDefined()
  })


  test("CT-03: reject invalid format", async () => {

    const file: any = {
      mimetype: "application/pdf",
      size: 100,
      file_path: "/tmp/file.pdf"
    }
    const mockBuffer = Buffer.from("mock file content");

    await expect(
      UploadService.processUpload(file, 1, 'pending', mockBuffer)
    ).rejects.toThrow("Invalid format")
  })


  test("CT-04: reject empty file", async () => {

    const file: any = {
      mimetype: "text/csv",
      size: 0,
      file_path: "/tmp/file.csv"
    }
    const mockBuffer = Buffer.from("mock file content");

    await expect(
      UploadService.processUpload(file, 1, 'pending', mockBuffer)
    ).rejects.toThrow()
  })


  test("CT-05: reject missing file", async () => {
    const mockBuffer = Buffer.from("mock file content");
    
    await expect(
      UploadService.processUpload(null as any, 1, 'pending', mockBuffer)
    ).rejects.toThrow("No file was uploaded")
  })

})