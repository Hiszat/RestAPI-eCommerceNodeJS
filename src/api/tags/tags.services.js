const {createTags, findAllTags, updateTagsByID, deleteTags, findTags} = require('./tags.repository');

const inputTagsServices = async (nama) => {
    const result = await createTags(nama);
    return result;
};

const findAllTagsServices = async () => {
    const tags = await findAllTags();
    return tags;
};

const searchTags = async (tags) => {
    const result = await findTags(tags);
    return result;
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
    deleteTagsServices,
    searchTags
}