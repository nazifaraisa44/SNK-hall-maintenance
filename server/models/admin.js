import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: String },
  // Additional fields specific to admins
  role: { type: String, default: 'admin' },
  
});

const Admin = mongoose.model('admin', AdminSchema);

export { Admin };
