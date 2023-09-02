const { default: mongoose } = require("mongoose")
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");
const ProductSchema = new Schema({
    id: {
        type: Number,
    },
    title: {
        type: String,
        required: true

    },
    slug: {
        type: String,
    },
    shortDescription: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    skuNumber: {
        type: String,
        unique: true,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubCategory',
    },
    photos: {
        type: Array,
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
    model: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Model',
    },
    variantOptions: [
        {
            title: {
                type: String,
            },
            options: {
                type: Array,
            }
        }
    ],
    variants: [
        {
            name: {
                type: String,
            },
            skuNumber: {
                type: String,
            },
            price: {
                type: Number,
            },
            discountedPrice: {
                type: Number,
            },
            stock: {
                type: Number,
                default: 0
            },
            photos: {
                type: Array,
            },
        }
    ],

    stock: {
        type: Number,
        default: 0
    },
    tags: {
        type: Array,
    },
    published: {
        type: Boolean,
        default: false
    },
    reviews: {
        type: Array,
    }
}, {
    timestamps: true
});

ProductSchema.pre('save', function (next) {
    this.slug = this.title.toLowerCase().split(' ').join('-');
    let newStock = 0;
    if (this.variantOptions?.length > 0) {
        this.variants?.forEach(option => {
            option.skuNumber = this.skuNumber + '-' + option.name.toLowerCase().split(' ').join('-');
            newStock += option.stock;
        })
        this.stock = newStock;
    }
    if (this.id === null || this.id === undefined) {
        getNextSequenceValue('product').then(res => {
            this.id = res;
        })
    }
    next();
});


const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;