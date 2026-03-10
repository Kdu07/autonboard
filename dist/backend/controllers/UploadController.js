import uploadModel from "../models/UploadModel";
async function getAll(req, res) {
    try {
        const result = await uploadModel.getAll();
        return res.json(result);
    }
    catch (error) {
        return res.json(error);
    }
}
async function create(req, res) {
    try {
        const { customer_id, file_path } = req.params;
        const result = await uploadModel.create(Number(customer_id), file_path);
        return res.json(result);
    }
    catch (error) {
        return res.json(error);
    }
}
module.exports = {
    getAll,
    create
};
// Gerencia o tráfego de entre middleware e serviço
// Recebe o arquivo do middleware
// Chama o serviço de extração 
// Trata erros
//# sourceMappingURL=UploadController.js.map