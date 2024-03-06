const express = require("express")


const {
  createPost,
  getAllPosts,
  likePost,
  unlikePost,
  createComment,
  deleteComment,
} = require("../controllers/blogControllers.js");


const router = express.Router();
//Mapping Create
router.post("/posts/create", createPost);
router.get("/posts", getAllPosts);

router.post("/likes/like", likePost);
router.post("/likes/unlike", unlikePost);

router.post("/comments/create", createComment);
router.post("/comments/deleteComment", deleteComment);






module.exports=router;