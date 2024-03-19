const Tags = require("../../db/model/tags");

const createTags = async (nama) => {
      const tags = await Tags.create({
          name: nama,
      });
      return tags;
};
  
const updateTagsByID = async (id, nama) => {
    try {
        const result = await Tags.updateOne(
            { _id: id },
            { name: nama}
        );
        if (result.nModified === 1) {
            return { message: "Tags updated successfully" };
        } else {
            return { message: "Tags not found or no changes applied" };
        }
    } catch (error) {
        throw new Error(error.message);
    }
} 

const findAllTags = async () => {
    const tags = await Tags.find({}, "_id name");
    return tags;

};

const findTags = async (tags) => {
    const result = await Tags.find({name: {$in: tags}});
    return result;

};

const findTagsByID = async (id) => {
    const tags = await Tags.findById(id, "_id name");
    return tags;
} 

const deleteTags = async (id) => {
    const result = await Tags.findByIdAndDelete(id);
    return result;
}

module.exports = {
    createTags,
    updateTagsByID,
    findAllTags,
    findTagsByID,
    deleteTags,
    findTags
}
