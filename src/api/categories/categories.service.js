const { createCategories, findAllCategories, updateCategoriesByID, deleteCategories } = require("./categories.repository");

const inputCategoriesServices = async (nama) => {
    const result = await createCategories(nama);
    return result;
};

const findAllCategoriesServices = async () => {
    const products = await findAllCategories();
    return products;
};

const updateCategoriesServices = async (id, nama) => {
    const result = await updateCategoriesByID(id, nama);
    return result;
}

const deleteCategoriesServices = async (id) => {
    const result = await deleteCategories(id);
    return result;
}

module.exports = {
    inputCategoriesServices,
    findAllCategoriesServices,
    updateCategoriesServices,
    deleteCategoriesServices
}