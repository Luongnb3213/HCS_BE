import express from 'express';
import {
  getAllHospitals,
  getHospitalById,
  createHospital,
  updateHospital,
  deleteHospital,
} from '../controllers/hospitalController.js';

const router = express.Router();

// Get all hospitals
router.get('/hospitals', getAllHospitals);

// Get a single hospital by ID
router.get('/hospitals/:id', getHospitalById);

// Create a new hospital
router.post('/hospitals', createHospital);

// Update an existing hospital
router.put('/hospitals/:id', updateHospital);

// Delete a hospital by ID
router.delete('/hospitals/:id', deleteHospital);

export default router;
