// SCHEMA/User-schema.js
const bcrypt_password = require("../Utils/Bcrypt-Password");
const crypto = require('crypto');
const getFormattedDate = require("../Utils/Date");

class UserSchema {
 constructor({ User, Location }) {
  // --- Validate required fields ---
  if (!User?.phone || User.phone.length !== 15) {
   throw new Error("Phone number must be valid and 15 characters long");
  }
  if (!User?.password) {
   throw new Error("Password is required");
  }

  // --- Unique ID ---
  this._id = crypto.randomUUID();

  // --- User info ---
  this.User = {
   name: User.name || "",
   phone: User.phone,
   password: User.password, // already hashed
   Role: User.Role || "",
   DOB: null,
   Gender: User.Gender || "",
   NID: User.nid || ""
  };



  // --- Location info ---
  this.Location = {
   houseNumber: Location?.houseNumber || "",
   roadNumber: Location?.roadNumber || "",
   division: Location?.division || "",
   district: Location?.district || "",
   upazila: Location?.upazila || "",
   postalCode: Location?.postalCode || ""
  };

  this.createdAt = getFormattedDate();
 }

 // --- Static async method to hash password and create the schema ---
 static async create(data) {
  if (!data.User?.password) {
   throw new Error("Password is required");
  }

  const hashedPassword = await bcrypt_password(data.User.password);

  // Pass the hashed password to constructor
  return new UserSchema({
   User: { ...data.User, password: hashedPassword },
   Location: data.Location || {}
  });
 }
}

module.exports = UserSchema;
