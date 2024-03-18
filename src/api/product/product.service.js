const { createProduct, findAllProduct, findProductByID, updateProductByID, updateProductByName, deleteProduct } = require("./product.repository");

const inputProductServices = async (nama, price, stock, status, category, image_url) => {
    const product = await createProduct(nama, price, stock, status, category, image_url);
    return product;
};

const findAllProductServices = async () => {
    const products = await findAllProduct();
    return products;

};

const findProductIDServices = async (id) => {
    const product = await findProductByID(id);
    return product;
};

const updateProductServices = async (id, data) => {
    const {nama, price, stock, status, filename: pict} = data;
    if (id) {
        const result = await updateProductByID(id, data);
        return result;
    } else if (nama) {
        const result = await updateProductByName(nama, price, stock, status, pict);
        return result;
    }
};

const deleteProductServices = async (id) => {
    const result = await deleteProduct(id);
    return result;
}


module.exports = {inputProductServices, findAllProductServices, updateProductServices, findProductIDServices, deleteProductServices};