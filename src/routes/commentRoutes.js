import express from 'express';
import { getAllCommentsByPost, getCommentById, createComment, updateComment, deleteComment } from '../controllers/commentController.js';
import { checkDoctorRole } from '../middleware/authMiddleware.js';

const router = express.Router();

// Get all comments for a post
router.get('/posts/:postId/comments', getAllCommentsByPost);

// Get a comment by ID
router.get('/comments/:id', getCommentById);

// Create a new comment (only doctors)
router.post('/comments', checkDoctorRole, createComment);

// Update a comment
router.put('/comments/:id', updateComment);

// Delete a comment
router.delete('/comments/:id', deleteComment);

export default router;
