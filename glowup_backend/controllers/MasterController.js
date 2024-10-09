const Master = require('../models/Master');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const masterId = req.params.id;

        // Directory for the master (uploads/masters/{id})
        const uploadDir = path.join('uploads', 'masters', `${masterId}`);

        // Check if the directory exists, if not — create it
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Save files in the master's directory
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        // Save files with unique names
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage });

// Setup for uploading multiple files (avatar and background image)
const uploadImages = upload.fields([
    { name: 'avatar_url', maxCount: 1 },
    { name: 'background_url', maxCount: 1 }
]);

// Image upload handler
const handleImageUpload = async (req, res) => {
    try {
        const masterId = req.params.id;
        const master = await Master.findByPk(masterId);

        if (!master) {
            return res.status(404).json({ message: 'Master not found' });
        }

        const avatar_url = req.files['avatar_url'] ? req.files['avatar_url'][0].path : null;
        const background_url = req.files['background_url'] ? req.files['background_url'][0].path : null;

        // Update DB fields for avatar and background image
        if (avatar_url) master.avatar_url = avatar_url;
        if (background_url) master.background_url = background_url;

        await master.save(); // Save changes to the database

        res.status(200).json({
            message: 'Images uploaded successfully',
            master: {
                avatar_url: master.avatar_url,
                background_url: master.background_url
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllMasters = async (req, res) => {
    try {
        const masters = await Master.findAll();
        res.status(200).json(masters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getMasterById = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            res.status(200).json(master);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createMaster = async (req, res) => {
    try {
        const master = await Master.create(req.body);
        res.status(201).json(master);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateMaster = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            await master.update(req.body);
            res.status(200).json(master);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteMaster = async (req, res) => {
    try {
        const master = await Master.findByPk(req.params.id);
        if (!master) {
            res.status(404).json({ message: 'Master not found' });
        } else {
            await master.destroy();
            res.status(204).json();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllMasters,
    getMasterById,
    createMaster,
    updateMaster,
    deleteMaster,
    uploadImages,
    handleImageUpload
}