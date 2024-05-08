import  mongoose  from "mongoose";

const webscrapSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productLink: {
    type: String,
    required: true,
   },
  price: {
    type: String,
    required: true,
    trim: true,
  },
  imgUrl: {
    type: String,
    trim: true,
  },
  catogery:{
    type: String,
  }
});

const productModule = mongoose.model("productModule", webscrapSchema);
export {productModule};
