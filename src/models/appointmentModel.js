import prisma from './prismaClient.js';

const AppointmentModel = {
  findAll: async () => {
    return await prisma.appointment.findMany();
  },

  create: async (data) => {
    return await prisma.appointment.create({
      data,
    });
  },

  findById: async (id, status) => {
    return await prisma.appointment.findMany({
      where: {
        AND: [
          { userId: id },
          {
            status: status,
          },
        ],
      },
      include: {
        doctor: {
          include: {
            user: true,
          },
        },
        hospital: true, 
      },
    });
  },

  update: async (id, data) => {
    return await prisma.appointment.update({
      where: { id },
      data,
    });
  },

  delete: async (id) => {
    return await prisma.appointment.delete({
      where: { id },
    });
  },
};

export default AppointmentModel;
