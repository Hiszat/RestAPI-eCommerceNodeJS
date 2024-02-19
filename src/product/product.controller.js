const path = require('path');
const fs = require('fs');
const { updateProductServices, findAllProductServices, findProductIDServices, inputProductServices, deleteProductServices} = require('./product.service');
const config = require('../config');


const inputProduct = async (nama, price, stock, status, pict) => {
    if (!nama || !price || !status) {
        throw new Error('Nama, price, dan status wajib diisi.');
    }

    try {
        if (pict) {
            let tmp_path = pict.path;
            let originalExt = pict.originalname.split('.')[pict.originalname.split('.').length - 1];
            let filename = pict.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            await new Promise((resolve, reject) => {
                src.on('end', async () => {
                    try {
                        let product = await inputProductServices(nama, price, stock, status, filename);
                        resolve(product);
                    } catch (error) {
                        fs.unlinkSync(target_path);
                        reject(error);
                    }
                });
            });
        } else {
            const product = await inputProductServices(nama, price, stock, status, 'default.svg');
            return product;
        }
    } catch (error) {
        if (error && error.name === "ValidationError") {
            throw new Error(JSON.stringify({
                error: 1,
                message: error.message,
                fields: error.errors
            }));
        } else {
            throw error;
        }
    }
};


const findProduct = async (id) => {
    if (id === undefined) {
        const products = await findAllProductServices();
        if (!products) {
            throw new Error("Products kosong");
        }
        const transformedProducts = products.map(product => {
            return {
                _id: product._doc._id,
                name: product._doc.name,
                price: product._doc.price,
                stock: product._doc.stock,
                status: product._doc.status,
                image_url: `localhost:2020/public/images/products/${product.image_url}`
            };
        });

        return transformedProducts; // Mengembalikan array object, tidak perlu JSON.stringify
    } else {
        const product = await findProductIDServices(id);
        if (!product) {
            throw new Error("Product yang dicari tidak ada");
        }
        return {
            _id: product._doc._id,
            name: product._doc.name,
            price: product._doc.price,
            stock: product._doc.stock,
            status: product._doc.status,
            image_url: `localhost:2020/public/images/products/${product.image_url}`
        }; // Mengembalikan object tunggal, bukan string JSON
    }

};


const updateProduct = async (data) => {
    if (Array.isArray(data)) {
        return updateMultipleProducts(data);
    } else {
        return updateSingleProduct(data);
    }
};

const updateSingleProduct = async (data) => {
    const {id, nama, price, stock, status, pict} = data;
    if (!id || !nama || !price || !status) {
        throw new Error('ID, nama, price, dan status wajib diisi.');
    }

    try {
        let filename = null;
        if (pict) {
            const existingProduct = await findProduct(id);
            let existFile = null;
            if (existingProduct) {
                existFile = existingProduct.image_url;
            }else{
                throw new Error('Produk dengan ID tersebut tidak ditemukan.');
            }
            let tmp_path = pict.path;
            let originalExt = pict.originalname.split('.')[pict.originalname.split('.').length - 1];
            filename = pict.filename + '.' + originalExt;
            let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            await new Promise((resolve, reject) => {
                src.on('end', async () => {
                    try {
                        await updateProductServices(id, {nama, price, stock, status, filename});
                        if (existFile && existFile != 'default.svg') {
                            fs.unlinkSync(path.resolve(config.rootPath, `public/images/products/${existFile}`));
                        }
                        resolve();
                    } catch (error) {
                        fs.unlinkSync(target_path);
                        reject(error);
                    }
                });
            });
        } else {
            const existingProduct = await findProduct(id);
            if (existingProduct) {
                filename = existingProduct.filename; // Gunakan nama file yang sudah ada
            }
            await updateProductServices(id, {nama, price, stock, status, filename});
        }
    } catch (error) {
        if (error && error.name === "ValidationError") {
            throw new Error(JSON.stringify({
                error: 1,
                message: error.message,
                fields: error.errors
            }));
        } else {
            throw error;
        }
    }
};


const updateMultipleProducts = async (productsData) => {
    const updatedProducts = [];
    for (const productData of productsData) {
        const updatedProduct = await updateSingleProduct(productData);
        updatedProducts.push(updatedProduct);
    }
    return updatedProducts;
};

const deleteProduct = async (id) => {
    const existProduct = await findProductIDServices(id);
    if (existProduct) { // Periksa apakah produk ditemukan (bukan null atau undefined)
        if (existProduct.image_url && existProduct.image_url != 'default.svg') {
            fs.unlinkSync(path.resolve(config.rootPath, `public/images/products/${existProduct.image_url}`));
        }
        const result = await deleteProductServices(id);
        return result;
    } else {
        throw Error("Gagal menghapus product (Product ID tidak ditemukan)");
    }
}


module.exports = {inputProduct, findProduct, updateProduct, deleteProduct};