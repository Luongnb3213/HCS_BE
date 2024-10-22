import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
import PostModel from './postModel.js';
import UserModel from './userModel.js';

class CommentModel extends Model {}

CommentModel.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  postId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: PostModel,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: UserModel,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Comment',
  tableName: 'comments',
  timestamps: true // Automatically handle createdAt and updatedAt
});

// Define relationships
CommentModel.belongsTo(PostModel, { foreignKey: 'postId', onDelete: 'CASCADE' });
CommentModel.belongsTo(UserModel, { foreignKey: 'userId', onDelete: 'CASCADE' });

export default CommentModel;
