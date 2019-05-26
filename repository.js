const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:root123@ds261096.mlab.com:61096/test123', {
    useNewUrlParser: true
});

// const uri = "mongodb+srv://LopezPL:#TechnoParty2204$@cluster0-yn33v.mongodb.net/test?retryWrites=true";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     perform actions on the collection object
    // client.close();
// });
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    admin: Boolean,
    created_at: Date,
    updated_at: Date
});

userSchema.methods.manify = function (next) {
    this.name = this.name + '-boy';
    return next(null, this.name);
};

userSchema.pre('save', function (next) {
    const currentDate = new Date();
    this.updated_at = currentDate;

    if (!this.created_at) {
        this.created_at = currentDate;
    }

    next();
});

const User = mongoose.model('User', userSchema);

exports.User = User;