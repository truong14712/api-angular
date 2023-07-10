const express =require("express")
const { getAllCategory,getOneCategory,addCategory,deleteCategory,updateCategory } =require("../controller/categories.js")
const router= express.Router();
router.get("/", getAllCategory);
router.get("/:id", getOneCategory);
router.post("/", addCategory);
router.delete("/:id", deleteCategory);
router.put("/:id", updateCategory);
module.exports= router;
