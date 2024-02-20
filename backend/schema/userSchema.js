const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    salt: { type: String },
    profilePhoto: { type: String },
    streak: { type: Number, default: 0 }, 
    lastExpenseDate: { type: Date }, 
  });
userSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.salt = salt; 
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;  
    }
    next();
});

userSchema.methods.validatePassword = async function (password) {
    console.log('Stored Salt:', this.salt);
    console.log('Stored Hashed Password:', this.password);

    const isValid = await bcrypt.compare(password, this.password);

    console.log('Provided Password:', password);
    console.log('Validation Result:', isValid);

    return isValid;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
