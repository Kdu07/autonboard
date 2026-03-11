import UploadModel from "../../src/backend/models/UploadModel"

jest.mock("../../src/database/config/db", () => ({
  __esModule: true,
  default: {
    query: jest.fn()
  }
}))

const db = require("../../src/database/config/db").default

describe("UploadModel", () => {

  test("CT-21: create upload", async () => {

    db.query.mockResolvedValue({
      rows: [{ id: 1, customer_id: 1, file_path: "/tmp/file.csv" }]
    })

    const result = await UploadModel.create(1, "/tmp/file.csv")

    expect(result).toBeDefined()
    expect(db.query).toHaveBeenCalled()
  })

  test("CT-22: getAll uploads", async () => {

    db.query.mockResolvedValue({
      rows: [{ id: 1 }]
    })

    const result = await UploadModel.getAll()

    expect(result.length).toBeGreaterThan(0)
    expect(db.query).toHaveBeenCalled()
  })

})