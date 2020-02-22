"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const photoController_1 = require("../controller/photoController");
const multer_1 = __importDefault(require("../libs/multer"));
const router = express_1.Router();
router.route('/photos')
    .get(photoController_1.getPhotos)
    .post(multer_1.default.single('image'), photoController_1.savePhoto);
router.route('/photos/:id')
    .get(photoController_1.getOnePhotos)
    .put(multer_1.default.single('image'), photoController_1.updatePhoto)
    .delete(photoController_1.deletePhoto);
exports.default = router;
