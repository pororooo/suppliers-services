const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const fileSchema = new Schema(
  {
    supplierName: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Files = mongoose.model("File", fileSchema);

module.exports = Files;
