const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const CategorySchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    subCategory: [
        {
            name: {
                type: String,
            },
            slug: {
                type: String,
            },
        }
    ],
    photo: {
        type: Array,
    },
    slug: {
        type: String,
    },
}, {
    timestamps: true
});

CategorySchema.pre("save", async function (next) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    this.subCategory.forEach((subCat) => {
        subCat.slug = subCat.name.toLowerCase().split(' ').join('-');
    });
    if (this.id == null) {
        const seq = await getNextSequenceValue("Category");
        this.id = seq;
    }
    next();
});


const Category = mongoose.model("Category", CategorySchema);
module.exports = Category;