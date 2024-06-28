import {fileURLToPath} from 'url';
import {dirname, join} from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const uploadController = async (req, res) => {
    let uploadFile;
    let uploadPath;

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({status: false, message: "No files were uploaded."});
    }

    uploadFile = req.files.uploadFile;
    const extension = uploadFile.name.split('.').pop()
    uploadFile.name = `${Date.now()}-${uploadFile.name.substring(0,10)}.${extension}` // new name for file
    uploadPath = join(__dirname, `../../../upload/${req.session.user._id}`, uploadFile.name)

    await uploadFile.mv(uploadPath, function (err) {
        if (err) return res.status(500).json({status: false, message: err});

        res.status(200).send({
            status: true,
            message: "File uploaded!",
            data: {
                name: uploadFile.name,
                mimetype: uploadFile.mimetype,
                size: uploadFile.size
            }
        });
    })
}