
import prisma from './prismaClient.js';

const UserModel = {
  // Lấy tất cả người dùng
  findAll: async () => {
    return await prisma.user.findMany();
  },

  // Tạo người dùng mới
  create: async (data) => {
    return await prisma.user.create({
      data,
    });
  },

  // Tìm người dùng theo ID
  findById: async (id) => {
    return await prisma.user.findUnique({
      where: { id },
    });
  },

  // Cập nhật thông tin người dùng
  update: async (id, data) => {
    return await prisma.user.update({
      where: { id },
      data,
    });
  },

  // Xóa người dùng theo ID
  delete: async (id) => {
    return await prisma.user.delete({
      where: { id },
    });
  },
};

export default UserModel;
