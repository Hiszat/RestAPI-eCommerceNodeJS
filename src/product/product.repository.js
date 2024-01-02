const prisma = require("../db");

const createProduct = async (nama, price, stock, status, image) => {
    const product = await prisma.products.create({
        data:{
            name: nama,
            price,
            stock,
            status,
            image_url: image
        }
    })

    return product;
} 

const updateProduct = async (nama, price, stock, status, image) => {
    const product = await prisma.products.create({
        data:{
            name: nama,
            price,
            stock,
            status,
            image_url: image
        }
    })

    return product;
} 