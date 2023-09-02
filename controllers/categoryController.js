const asyncHandler = require('express-async-handler');
const Category = require('../models/Category');
const fs = require("fs")

const createCategory = asyncHandler(async (req, res) => {
    const { name, photo, subCategory } = req.body;

    const category = new Category({
        name: name,
        photo: photo,
        subCategory: subCategory
    });
    const createdCategory = await category.save();
    res.status(201).json({ message: 'Category created successfully', createdCategory });
}
);

const updateCategory = asyncHandler(async (req, res) => {
    const { name, photo, subCategory } = req.body;
    const category = await Category.findById(req.params.id);

    if (category) {
        category.name = name;
        category.photo = photo;
        category.subCategory = subCategory;
        const updatedCategory = await category.save();
        res.status(201).json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
}
);


const deleteCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (category) {
        const deleteImages = category.photo;
        deleteImages.forEach((image) => {
            const imageName = image.split("/")[5];
            fs.unlink(`uploads/images/${imageName}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
        const removedCat = await category.deleteOne();
        res.json(removedCat);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});

// {
//     "name": "Kitchen",
//     "subCategory": [{
//         "name": "Accessories"
//     }]
// }


const deleteSubCategory = asyncHandler(async (req, res) => {
    const category = await Category.findById(req.params.id);
    const { subId } = req.body;
    if (category) {
        const subCategory = category.subCategory.find((subCat) => subCat._id == subId);
        const deleteImages = subCategory.photo;
        deleteImages.forEach((image) => {
            const imageName = image.split("/")[5];
            fs.unlink(`uploads/images/${imageName}`, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
            });
        });
        category.subCategory = category.subCategory.filter((subCat) => subCat._id != subId);
        const updatedCategory = await category.save();
        res.status(201).json(updatedCategory);
    } else {
        res.status(404);
        throw new Error('Category not found');
    }
});




const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find({});
    res.json(categories);
}
);

module.exports = { createCategory, updateCategory, deleteCategory, getAllCategories, deleteSubCategory };
