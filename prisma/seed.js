import { PrismaClient, Gender, Role, HospitalType, AppointmentStatus, PostCategory, MedicationStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Seed for Users
  const user1 = await prisma.user.create({
    data: {
      username: 'john_doe',
      password: 'hashed_password_123',
      email: 'john.doe@example.com',
      fullName: 'John Doe',
      phone: '1234567890',
      dateOfBirth: new Date('1985-10-20'),
      gender: Gender.MALE,
      role: Role.USER,
      address: '123 Main Street, City',
      profilePicture: 'https://example.com/profiles/john_doe.jpg',
      isVerified: true,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: 'jane_smith',
      password: 'hashed_password_456',
      email: 'jane.smith@example.com',
      fullName: 'Jane Smith',
      phone: '0987654321',
      dateOfBirth: new Date('1990-05-15'),
      gender: Gender.FEMALE,
      role: Role.DOCTOR,
      address: '456 Second Street, City',
      profilePicture: 'https://example.com/profiles/jane_smith.jpg',
      isVerified: true,
    },
  });


  // Seed for Hospitals
  const hospital1 = await prisma.hospital.create({
    data: {
      name: 'City Hospital',
      address: '789 Hospital Road, City',
      contact: '123456789',
      email: 'contact@cityhospital.com',
      website: 'https://cityhospital.com',
      type: HospitalType.HOSPITAL,
      services: ['Cardiology', 'Neurology', 'Emergency Care'],
    },
  });

  const hospital2 = await prisma.hospital.create({
    data: {
      name: 'Green Clinic',
      address: '321 Clinic Avenue, Town',
      contact: '987654321',
      email: 'info@greenclinic.com',
      type: HospitalType.CLINIC,
      services: ['General Practice', 'Pediatrics', 'Dermatology'],
    },
  });

  // Seed for Doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      userId: user2.id,
      specialty: 'Cardiology',
      licenseNumber: 'CARD123456',
      experienceYears: 10,
      education: 'Medical School of City University',
      hospitalId: hospital1.id,
      bio: 'An experienced cardiologist specialized in treating heart conditions.',
      rating: 4.8,
      availableDays: ['Monday', 'Wednesday', 'Friday'],
    },
  });

  // Seed for Appointments
  const appointment1 = await prisma.appointment.create({
    data: {
      userId: user1.id,
      doctorId: doctor1.id,
      hospitalId: hospital1.id,
      appointmentDate: new Date('2024-11-01T09:30:00Z'),
      status: AppointmentStatus.CONFIRMED,
      reason: 'Regular check-up for heart condition',
    },
  });

  const appointment2 = await prisma.appointment.create({
    data: {
      userId: user1.id,
      hospitalId: hospital2.id,
      appointmentDate: new Date('2024-12-15T14:00:00Z'),
      status: AppointmentStatus.PENDING,
      reason: 'Dermatology consultation',
    },
  });

  // Seed for Posts
  const post1 = await prisma.post.create({
    data: {
      userId: user1.id,
      title: '10 Tips for a Healthy Heart',
      content: 'Maintaining a healthy heart is crucial for overall well-being. Here are 10 tips...',
      category: PostCategory.HEALTH_TIPS,
      tags: ['heart', 'health', 'wellness'],
    },
  });

  // Seed for HealthRecords
  const healthRecord1 = await prisma.healthRecord.create({
    data: {
      userId: user1.id,
      recordType: 'Blood Test',
      description: 'Routine blood test showing normal levels.',
      fileUrl: 'https://example.com/records/blood_test_john_doe.pdf',
    },
  });

  const healthRecord2 = await prisma.healthRecord.create({
    data: {
      userId: user1.id,
      recordType: 'MRI Scan',
      description: 'MRI scan results showing no abnormalities.',
      fileUrl: 'https://example.com/records/mri_john_doe.pdf',
    },
  });

  // Seed for Medications
  const medication1 = await prisma.medication.create({
    data: {
      userId: user1.id,
      medicineName: 'Aspirin',
      dosage: '100mg',
      frequency: 'Once a day',
      reminderTime: ['08:00'],
      status: MedicationStatus.TAKEN,
    },
  });

  const medication2 = await prisma.medication.create({
    data: {
      userId: user1.id,
      medicineName: 'Lisinopril',
      dosage: '10mg',
      frequency: 'Twice a day',
      reminderTime: ['08:00', '20:00'],
      status: MedicationStatus.PENDING,
    },
  });

  // Seed for Comments
  const comment1 = await prisma.comment.create({
    data: {
      postId: post1.id,
      userId: user2.id,
      content: 'Great tips! Thank you for sharing.',
    },
  });

  console.log('📄 Seed dữ liệu đã được thêm thành công!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
