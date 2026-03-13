import * as UploadController from "../../src/backend/controllers/UploadController"
import UploadModel from "../../src/backend/models/UploadModel"

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

    const req: any = {
      params: {
        customer_id: "1",
        file_path: "/tmp/file.csv"
      }
    }

    const res: any = {
      json: jest.fn()
    }

    ;(UploadModel.create as jest.Mock).mockResolvedValue({ id: 1 })

    await UploadController.create(req, res)

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