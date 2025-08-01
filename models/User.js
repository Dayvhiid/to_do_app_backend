import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 5,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const bcrypt = await import('bcryptjs');
        this.password = await bcrypt.default.hash(this.password, 10);
    }
    next();
}


);

export default mongoose.model('User', userSchema);