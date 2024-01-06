const Product = require("../db/model/product");

const createProduct = async (nama, price, stock, status) => {
    try {
      const product = await Product.create({
          name: nama,
          price: price,
          stock: stock,
          status: status
      });
      return product;
    } catch (error) {
      // Tangani error jika terjadi
      console.error("Error creating product:", error);
      throw error; // Lepaskan kembali error untuk ditangani di tempat lain
    }
  };
  

const updateProductByID = async (id, nama, price, stock, status, image) => {
    try {
        const result = await Product.updateOne(
            { _id: id },
            { name: nama, price, stock, status }
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


const updateProductByName = async (nama, price, stock, status, image) => {
    try {
        const result = await Product.updateOne(
            { name: nama },
            { price, stock, status }
        );
        if (result.nModified === 1) {
            return { message: "Product updated successfully" };
        } else {
            return { message: "Product not found or no changes applied" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
};


const findAllProduct = async () => {
    try {
        const products = await Product.find({}, "_id name price stock status");
        return products;
    } catch (error) {
        console.error("Error while finding products:", error);
        throw error;
    }
};

const findProductByID = async (id) => {
    try {
        const products = await Product.findById(id, "_id name price stock status");
        return products;
    } catch (error) {
        console.error("Error while finding products:", error);
        throw error;
    }
} 


module.exports = {
    createProduct,
    updateProductByID,
    updateProductByName,
    findAllProduct,
    findProductByID
}