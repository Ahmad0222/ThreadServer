const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const BrandSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
    },
    slug: {
        type: String,
    },
    photo: {
        type: Array,
    }
}, {
    timestamps: true
});

BrandSchema.pre("save", async function (next) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    if (this.id == null) {
        const seq = await getNextSequenceValue("Brand");
        this.id = seq;
    }
    next();
});

const Brand = mongoose.model("Brand", BrandSchema);
module.exports = Brand;