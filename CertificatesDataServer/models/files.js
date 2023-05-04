import mongoose from 'mongoose';

const { Schema } = mongoose;

const fileSchema = new Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Files = mongoose.model('File', fileSchema);

export default Files;
