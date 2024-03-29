const Product = require("../../db/model/product");

const createProduct = async (nama, price, stock, status, category, tags_arr, image_url) => {
      const product = await Product.create({
          name: nama,
          price: price,
          stock: stock,
          status: status,
          category: category,
          tags: tags_arr,
          image_url : image_url
      });
      return product;
  };
  

const updateProductByID = async (id, data) => {
    const {nama, price, stock, status, cat_id, tags_arr, filename: pict} = data;
    try {
        const result = await Product.updateOne(
            { _id: id },
            { name: nama, price, stock, status, category:cat_id, tags:tags_arr, image_url: pict}
        );
        if (result.nModified === 1) {
            return { message: "Product updated successfully" };
        } else {
            return { message: "Product not found or no changes applied" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
} 


const updateProductByName = async (nama, price, stock, status, cat_id, tags_arr, pict) => {
    const result = await Product.updateOne(
        { name: nama },
        { price, stock, status, category:cat_id, tags:tags_arr, image_url:pict }
    );
    if (result.nModified === 1) {
        return { message: "Product updated successfully" };
    } else {
        return { message: "Product not found or no changes applied" };
    }
};


const findAllProduct = async () => {
    await Product.updateMany({ image_url: { $exists: false } }, { $set: { image_url: "default.svg" } });
    const products = await Product.find().populate('category').populate('tags');
    return products;

};

const findProductByID = async (id) => {
    const products = await Product.findById(id, "_id name price stock status category tags image_url").populate('category').populate('tags');
    return products;
} 

const deleteProduct = async (id) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
}


module.exports = {
    createProduct,
    updateProductByID,
    updateProductByName,
    findAllProduct,
    findProductByID,
    deleteProduct
}