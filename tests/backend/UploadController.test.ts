import * as UploadController from "../../src/backend/controllers/UploadController"
import UploadModel from "../../src/backend/models/UploadModel"
import { Readable } from "stream"

jest.mock("../../src/backend/models/UploadModel")

describe("UploadController", () => {

  test("CT-16: getAll returns data", async () => {

    const req: any = {}

    const res: any = {
      json: jest.fn()
    }

    ;(UploadModel.getAll as jest.Mock).mockResolvedValue([{ id: 1 }])

    await UploadController.getAll(req, res)

    expect(res.json).toHaveBeenCalled()
  })


  test("CT-17: create upload", async () => {

    const mockFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'test.csv',
      encoding: '7bit',
      mimetype: 'text/csv',
      size: 1024,
      destination: '/uploads',
      filename: 'test-file.csv',
      path: '/uploads/test-file.csv',
      stream: new Readable(),
      buffer: Buffer.from('test'),
    }

    const req: any = {
      body: {
        customer_id: "1",
        status: "pending"
      },
      file: mockFile
    }

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    }

    ;(UploadModel.create as jest.Mock).mockResolvedValue({ id: 1 })

    await UploadController.create(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalled()
  })


  test("CT-20: handle error in getAll", async () => {

    const req: any = {}

    const res: any = {
      json: jest.fn()
    }

    ;(UploadModel.getAll as jest.Mock).mockRejectedValue(
      new Error("DB error")
    )

    await UploadController.getAll(req, res)

    expect(res.json).toHaveBeenCalled()
  })

})