const { createCategory, updateCategory, getAllCategories, deleteCategoryById } = require("../controller/category");
const { createComment, getAllComments, getCommentById, } = require("../controller/comment");

const router = require("express").Router();

router.post("/api/comment", createComment);
router.get("/api/comment",getAllComments);
router.get("/api/comment/:blogId",getCommentById);
router.post("/api/category",createCategory);
router.put("/api/category",updateCategory)
router.get("/api/category",getAllCategories);
router.delete("/api/category/:catId",deleteCategoryById);

module.exports = router;