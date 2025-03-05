const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  id: { type: Buffer, required: true },
  matric_no: { type: String, required: true, unique: true },
  student_name: { type: String, required: true },
  passKey: {
    publicKey: { type: String, required: true },
    deviceType: { type: Buffer, required: true },
    backedUp: { type: Boolean, required: true },
    transports: { type: Array, required: true }
  }
});

module.exports = mongoose.model('Student', studentSchema);
