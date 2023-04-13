import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    id: {type: String, required: true},
    items: {type: Array, required: true}
});

export default mongoose.model("carts", cartSchema);