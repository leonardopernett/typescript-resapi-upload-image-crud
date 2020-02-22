"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const Photo_1 = __importDefault(require("../model/Photo"));
async function getPhotos(req, res) {
    const photos = await Photo_1.default.find();
    res.status(200).json(photos);
}
exports.getPhotos = getPhotos;
async function getOnePhotos(req, res) {
    const photo = await Photo_1.default.findOne({ _id: req.params.id });
    res.status(200).json(photo);
}
exports.getOnePhotos = getOnePhotos;
async function savePhoto(req, res) {
    const ext = path_1.default.extname(req.file.originalname);
    if (ext !== ".jpg" && ext !== ".png" && ext !== ".jpeg") {
        await fs_extra_1.default.unlink(req.file.path);
        return res.json('formato imagen no pemritido');
    }
    if (req.file.size > 1000000) {
        await fs_extra_1.default.unlink(req.file.path);
        return res.json('imagen no puede superar 1mb');
    }
    const { title, description } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newPhoto = {
        title,
        description,
        imagePath: imagePath
    };
    const photo = new Photo_1.default(newPhoto);
    await photo.save();
    res.json({
        message: "photo created",
        body: {
            photo: {
                title,
                description,
                imagePath
            }
        }
    });
}
exports.savePhoto = savePhoto;
async function updatePhoto(req, res) {
    const photo = await Photo_1.default.findById(req.params.id);
    await fs_extra_1.default.unlink(path_1.default.resolve('./build/public' + (photo === null || photo === void 0 ? void 0 : photo.imagePath)));
    const { title, description } = req.body;
    const imagePath = '/uploads/' + req.file.filename;
    const newPhoto = {
        title,
        description,
        imagePath
    };
    await Photo_1.default.findByIdAndUpdate(req.params.id, newPhoto);
    res.json({ message: "photo updated" });
}
exports.updatePhoto = updatePhoto;
async function deletePhoto(req, res) {
    const { id } = req.params;
    const photo = await Photo_1.default.findByIdAndDelete(id);
    await fs_extra_1.default.unlink(path_1.default.resolve('./build/public' + (photo === null || photo === void 0 ? void 0 : photo.imagePath)));
    res.status(200).json({
        message: "photo deleted",
        photo
    });
}
exports.deletePhoto = deletePhoto;
