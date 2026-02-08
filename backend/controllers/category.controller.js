import categoryModel from "../models/category.model.js";
import catogeryModel from "../models/category.model.js";

export const getAllCategories = async (req, res) => {
    try {
        const categories = await catogeryModel.find({});
        return res.json({categories});
    } catch (error) {
        console.log(error);
    }
}

export const addCategory = async (req, res) => {
    try {
        const { category } = req.body;

        const newCategory = await categoryModel.create({category});
        return res.json({newCategory});
    } catch (error) {
        console.log(error)
    }
}

export const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { category } = req.body;

        const updatedCategory = await catogeryModel.findByIdAndUpdate(id, {category}, {new: true});
        return res.json({updatedCategory});
    } catch (error) {
        console.log(error);
    }
}

export const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await catogeryModel.findByIdAndDelete(id);
        return res.json({message : "Category deleted successfully"});
    } catch (error) {
        console.log(error);
    }
}