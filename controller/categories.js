const ModelCategories = require("../models/Categories");

const getAllCategory = async (req, res) => {
  try {
    const categories = await ModelCategories.find().populate("products");
    if (categories.length === 0) {
      return res.json({
        data: [],
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json({
      data: categories,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const addCategory = async (req, res) => {
  try {
    const formData = req.body;
    const newCategory = new ModelCategories(formData);
    await newCategory.save();
    return res.status(201).send({
      messenger: "Thêm thành công",
      data: newCategory,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const getOneCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ModelCategories.findById(id).populate("products");
    if (!category) {
      return res.json({
        data: [],
        message: "Không có danh mục nào",
      });
    }
    return res.status(200).json({
      data: category,
    });
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await ModelCategories.findByIdAndRemove(id);
    if (category) {
      return res.status(200).send({
        data: category,
        messenger: "Xóa thành công",
      });
    } else {
      return res.status(500).send({
        messenger: "Không tìm thấy category",
      });
    }
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const formData = req.body;
    console.log(formData);
    const { id } = req.params;
    console.log(id);
    const data = await ModelCategories.findByIdAndUpdate(id, formData, {
      new: true,
    });
    if (!data) {
      return res.status(400).send({
        messenger: "Không tìm thấy danh mục",
      });
    } else {
      return res.status(200).send({
        messenger: "Cập nhật thành công",
        data: formData,
      });
    }
  } catch (error) {
    return res.status(500).send({
      messenger: error,
    });
  }
};
module.exports = {
  updateCategory,
  addCategory,
  deleteCategory,
  getOneCategory,
  getAllCategory,
};
