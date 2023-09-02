const { default: mongoose } = require("mongoose");
const { Schema } = mongoose;
const getNextSequenceValue = require("../middleware/counter");

const ModelSchema = new Schema({
    id: {
        type: Number,
    },
    name: {
        type: String,
        default: 'All'
    },
    slug: {
        type: String,
    },
    brand: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Brand',
    },
}, {
    timestamps: true
});

ModelSchema.pre("save", async function (next) {
    this.slug = this.name.toLowerCase().split(' ').join('-');
    if (this.id == null) {
        const seq = await getNextSequenceValue("Model");
        this.id = seq;
    }
    next();
});



const Model = mongoose.model("Model", ModelSchema);
module.exports = Model;