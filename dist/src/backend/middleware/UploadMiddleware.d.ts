import { Request, Response, NextFunction } from "express";
export declare const UploadMiddleware: {
    /**
     * multer middleware to read a single file field named "file".
     * This should be applied to the route before `process`.
     */
    multerSingle: import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
    /**
     * After multer has stored the file this middleware will parse it with
     * ExcelJS and ensure the required body fields are present.
     */
    process(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>> | undefined>;
};
//# sourceMappingURL=UploadMiddleware.d.ts.map