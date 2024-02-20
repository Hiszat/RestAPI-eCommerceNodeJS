const Categories = require("../db/model/categories");

const createCategories = async (nama) => {
      const categories = await Categories.create({
          name: nama,
      });
      return categories;
};
  
const updateCategoriesByID = async (id, nama) => {
    try {
        const result = await Categories.updateOne(
            { _id: id },
            { name: nama}
        );
        if (result.nModified === 1) {
            return { message: "Categories updated successfully" };
        } else {
            return { message: "Categories not found or no changes applied" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
} 

const findAllCategories = async () => {
    const categories = await Categories.find({}, "_id name");
    return categories;

};

const findCategoriesByID = async (id) => {
    const categories = await Categories.findById(id, "_id name");
    return categories;
} 

const deleteCategories = async (id) => {
    const result = await Categories.findByIdAndDelete(id);
    return result;
}

module.exports = {
    createCategories,
    updateCategoriesByID,
    findAllCategories,
    findCategoriesByID,
    deleteCategories
}