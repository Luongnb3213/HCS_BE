import CommentModel from '../models/commentModel.js';
import UserModel from '../models/userModel.js';
import PostModel from '../models/postModel.js';

// Get all comments for a post
export const getAllCommentsByPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    const comments = await CommentModel.findAll({
      where: { postId }
    });
    res.json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

// Get comment by ID
export const getCommentById = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await CommentModel.findById(id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comment', error });
  }
};

// Create a new comment (only for DOCTOR role)
export const createComment = async (req, res) => {
  const { postId, content } = req.body;
  const { userId } = req;

  try {
    const user = await UserModel.findById(userId);

    // Ensure the user is a doctor
    if (user.role !== 'DOCTOR') {
      return res.status(403).json({ message: 'Only doctors can create comments' });
    }

    // Ensure the post exists
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const newComment = await CommentModel.create({
      postId,
      userId,
      content,
      likes: 0
    });

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Update a comment (only if author is the one updating)
export const updateComment = async (req, res) => {
  const { id } = req.params;
  const { content } = req.body;
  const { userId } = req;

  try {
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // Ensure the user is the author of the comment
    if (comment.userId !== userId) {
      return res.status(403).json({ message: 'You can only update your own comments' });
    }

    const updatedComment = await CommentModel.update(id, { content });
    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment', error });
  }
};

// Delete a comment (only if author or admin)
export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { userId } = req;

  try {
    const comment = await CommentModel.findById(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    const user = await UserModel.findById(userId);

    // Ensure the user is the author or an admin
    if (comment.userId !== userId && user.role !== 'ADMIN') {
      return res.status(403).json({ message: 'You can only delete your own comments or must be an admin' });
    }

    await CommentModel.delete(id);
    res.status(204).json({});
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment', error });
  }
};
