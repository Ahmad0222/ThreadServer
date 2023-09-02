const asyncHandler = require("express-async-handler");
const Product = require("../models/Product");

const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({ published: true });
    res.json(products);
});

const addProduct = asyncHandler(async (req, res) => {
    try {
        const product = new Product(req.body);
        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    }
    catch (error) {
        if (error.code === 11000) {
            const statusCode = 400;
            res.status(statusCode).json({ error: 'Duplicate key error.', statusCode });
        } else {
            const statusCode = 500;
            res.status(statusCode).json({ error: 'MongoDB error occurred.', statusCode });
        }
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const {
            title,
            shortDescription,
            description,
            skuNumber,
            category,
            subCategory,
            photos,
            price,
            discountedPrice,
            brand,
            model,
            variantOptions,
            variants,
            stock,
            tags,
            published,
            reviews
        } = req.body;
        const Product = await Product.findById(req.params._id);
        if (Product) {
            Product.title = title;
            Product.shortDescription = shortDescription;
            Product.description = description;
            Product.skuNumber = skuNumber;
            Product.category = category;
            Product.subCategory = subCategory;
            Product.photos = photos;
            Product.price = price;
            Product.discountedPrice = discountedPrice;
            Product.brand = brand;
            Product.model = model;
            Product.variantOptions = variantOptions;
            Product.variants = variants;
            Product.stock = stock;
            Product.tags = tags;
            Product.published = published;
            Product.reviews = reviews;
            const newProduct = await Product.save();
            const updatedProduct = await newProduct.populate('brand');
            res.status(201).json(updatedProduct);
        } else {
            res.status(404);
            throw new Error('Product not found');
        }
    }
    catch (error) {
        if (error.code === 11000) {
            const statusCode = 400;
            res.status(statusCode).json({ error: 'Duplicate key error.', statusCode });
        } else {
            const statusCode = 500;
            res.status(statusCode).json({ error: 'MongoDB error occurred.', statusCode });
        }
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params._id);
    if (product) {
        const removedProduct = await product.deleteOne();
        res.json(removedProduct);
    } else {
        res.status(404);
        throw new Error('Product not found');
    }
});

module.exports = { getProducts, addProduct, updateProduct, deleteProduct };