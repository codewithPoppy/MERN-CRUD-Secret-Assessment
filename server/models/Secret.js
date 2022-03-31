const mongoose = require("mongoose");

const SecretSchema = new mongoose.Schema({
  hash: {
    type: String,
  },
  secretText: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  expiresAt: {
    type: Date,
  },
});

const Secret = mongoose.model("Secret", SecretSchema);
module.exports = Secret;
