import UploadModel from "../../src/backend/models/UploadModel"

jest.mock("../../src/database/runDB/init", () => ({
  query: jest.fn()
}))

const db = require("../../src/database/runDB/init")

describe("UploadModel", () => {

  test("CT-21: create upload", async () => {

    db.query.mockResolvedValue({
      rows: [{ id: 1, customer_id: 1 }]
    })

    const result = await UploadModel.create(1, "/tmp/file.csv")

    expect(result).toBeDefined()
  })


  test("CT-22: getAll uploads", async () => {

    db.query.mockResolvedValue({
      rows: [{ id: 1 }]
    })

    const result = await UploadModel.getAll()

    expect(result.length).toBeGreaterThan(0)
  })

})