const {createTags, findAllTags, updateTagsByID, deleteTags} = require('./tags.repository');

const inputTagsServices = async (nama) => {
    const result = await createTags(nama);
    return result;
};

const findAllTagsServices = async () => {
    const products = await findAllTags();
    return products;
};

const updateTagsServices = async (id, nama) => {
    const result = await updateTagsByID(id, nama);
    return result;
}

const deleteTagsServices = async (id) => {
    const result = await deleteTags(id);
    return result;
}

module.exports = {
    inputTagsServices,
    findAllTagsServices,
    updateTagsServices,
    deleteTagsServices
}