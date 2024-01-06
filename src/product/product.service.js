const { createProduct, findAllProduct, findProductByID, updateProductByID, updateProductByName } = require("./product.repository");

const inputProduct = async (nama, price, stock, status) => {
    if (!nama || !price || !status) {
        throw new Error('Nama, price dan status wajib diisi.');
    }   
    const product = await createProduct(nama, price, stock, status);
    return product;
};

const findProduct = async (id) => {
    if (id === undefined) {
        const products = await findAllProduct();
        return products;
    } else {
        const product = await findProductByID(id);
        return product;
    }
};

const updateProduct = async (id, data) => {
    const {nama, price, stock, status} = data;
    if (id) {
        try {
            const result = await updateProductByID(id, nama, price, stock, status);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    } else if (nama) {
        try {
            const result = await updateProductByName(nama, price, stock, status);
            return result;
        } catch (error) {
            throw new Error(error.message);
        }
    } else {
        throw new Error('ID or name must be provided for updating product');
    }
};


module.exports = {inputProduct, findProduct, updateProduct};