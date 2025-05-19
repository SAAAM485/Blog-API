const path = require("path");
const fs = require("fs");
const db = require("../db/queries");

// 圖片上傳處理
async function uploadImages(req, res) {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: "No files uploaded" });
        }
        const imagesData = await Promise.all(
            req.files.map(async (file) => {
                // 假設圖片 URL 為 /uploads/<filename>
                const url = `/uploads/${file.filename}`;
                const image = await db.createImage(url);
                return image;
            })
        );
        return res
            .status(200)
            .json({ message: "Upload successful", images: imagesData });
    } catch (error) {
        console.error("Error uploading images:", error);
        return res
            .status(500)
            .json({ message: "Server error uploading images" });
    }
}

// 更新圖片排序
async function fetchAllImages(req, res) {
    try {
        const images = await db.getAllImages();
        return res.status(200).json(images);
    } catch (error) {
        console.error("Error fetching images:", error);
        return res
            .status(500)
            .json({ message: "Server error fetching images" });
    }
}

// 刪除圖片
async function deleteImage(req, res) {
    try {
        const { imageId } = req.params;
        const image = await db.findImageById(imageId);
        if (!image) {
            return res.status(404).json({ message: "Image not found" });
        }
        await db.deleteImageById(imageId);
        // 從檔案系統中刪除實體檔案
        const filePath = path.join(
            __dirname,
            "../uploads",
            path.basename(image.url)
        );
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        return res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        return res.status(500).json({ message: "Server error deleting image" });
    }
}

module.exports = {
    uploadImages,
    fetchAllImages,
    deleteImage,
};
