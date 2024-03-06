const { inputTagsServices, findAllTagsServices, updateTagsServices, deleteTagsServices } = require("./tags.services");

const createTags = async (nama) => {
    const result = await inputTagsServices(nama);
    return result;
}

const findAllTags = async () => {
    const tags = await findAllTagsServices();
    return tags;
}

const updateTags = async (id, nama) => {
    const result = await updateTagsServices(id, nama);
    if(result){
        return 'Tags berhasil di update';
    }else{
        return 'Tags gagal di update';
    }
}

const deleteTags = async (id) => {
    const result = await deleteTagsServices(id);
    if(result){
        return 'Tags berhasil di hapus';
    }else{
        return result;
    }
}



module.exports = {
    createTags,
    findAllTags,
    updateTags,
    deleteTags
}