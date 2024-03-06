const { inputCategoriesServices, findAllCategoriesServices, updateCategoriesServices, deleteCategoriesServices } = require("./categories.service")


const createCategories = async (nama) => {
    const result = await inputCategoriesServices(nama);
    return result;
}

const findAllCategories = async () => {
    const categories = await findAllCategoriesServices();
    return categories;
}

const updateCategories = async (id, nama) => {
    const result = await updateCategoriesServices(id, nama);
    if(result){
        return 'Categories berhasil di update';
    }else{
        return 'Categories gagal di update';
    }
}

const deleteCategories = async (id) => {
    const result = await deleteCategoriesServices(id);
    if(result){
        return 'Categories berhasil di hapus';
    }else{
        return result;
    }
}



module.exports = {
    createCategories,
    findAllCategories,
    updateCategories,
    deleteCategories
}