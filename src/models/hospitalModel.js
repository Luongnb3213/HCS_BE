// src/models/hospitalModel.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const HospitalModel = {
  findAll: async () => {
    try {
      return await prisma.hospital.findMany();
    } catch (error) {
      throw new Error('Error fetching hospitals');
    }
  },

  findById: async (id) => {
    try {
      return await prisma.hospital.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error fetching hospital');
    }
  },

  create: async (hospitalData) => {
    try {
      return await prisma.hospital.create({
        data: hospitalData,
      });
    } catch (error) {
      throw new Error('Error creating hospital');
    }
  },

  update: async (id, hospitalData) => {
    try {
      return await prisma.hospital.update({
        where: { id },
        data: hospitalData,
      });
    } catch (error) {
      throw new Error('Error updating hospital');
    }
  },

  delete: async (id) => {
    try {
      return await prisma.hospital.delete({
        where: { id },
      });
    } catch (error) {
      throw new Error('Error deleting hospital');
    }
  },
};

export default HospitalModel;
