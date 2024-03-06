const PostModel = require("../models/postModel.js");
const CommentModel = require("../models/commentModel.js");
const LikeModel = require("../models/likeModel.js");

exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const post = new PostModel({
      title,
      body,
    });
    const savedPost = await post.save();

    res.send({
      success: true,
      message: " Post created successfully",
      post: savedPost,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Error while creating post",
    });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const Posts = await PostModel.find().populate("likes");

    res.send({
      success: true,
      message: "All Posts fetched successfully",
      post: Posts,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error while fetching posts",
    });
  }
};

//---------------------------------------------------------------------------------------------

exports.likePost = async (req, res) => {
  try {
    const { post, user } = req.body;

    const Savedlike = await new LikeModel({ post, user }).save();

    const updatedPost = await PostModel.findByIdAndUpdate(
      post,
      { $push: { likes: Savedlike._id } },
      { new: true }
    ).populate("likes");

    res.send({
      success: true,
      message: "Post Liked successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error while Liking the post",
    });
  }
};

exports.unlikePost = async (req, res) => {
  try {
    const { post, like } = req.body;

    //delete from Like model
    const deletedLike = await LikeModel.findByIdAndDelete({
      post: post,
      _id: like,
    }); //findByIdAndDelete returns the document removed or deleted.

    //delete from Postmodel and update
    const updatedPost = await PostModel.findByIdAndUpdate(
      post,
      { $pull: { likes: like } },
      { new: true }
    ).populate("likes");

    res.send({
      success: true,
      message: "Post UnLiked successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error while UnLiking the post",
    });
  }
};

//------------------------------------------------------------------------------------

exports.createComment = async (req, res) => {
  try {
    const { post, user, body } = req.body;
    const SavedComment = await new CommentModel({ post, user,body }).save();
    const updatedPost = await PostModel.findByIdAndUpdate(
      post,
      {
        $push: { comments: SavedComment._id },
      },
      { new: true }
    ).populate("comments");

    res.send({
      success: true,
      message: "Post Comment successfull",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error while creating Comment",
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { post, comment } = req.body;

    //delete from Like model
    const deletedComment = await CommentModel.findByIdAndDelete({
      post: post,
      _id: comment,
    }); //findByIdAndDelete returns the document removed or deleted.

    //delete from Postmodel and update
    const updatedPost = await PostModel.findByIdAndUpdate(
      post,
      { $pull: { comments: comment } },
      { new: true }
    );

    res.send({
      success: true,
      message: "Comment deleted successfully",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).send({
      error: "Error while deleting comment the post",
    });
  }
};
