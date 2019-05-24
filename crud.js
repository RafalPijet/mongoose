const repository = require('./repository');
const User = repository.User;

const prepareUser = (name, username, password) => {
    const user = new User({
        name: name,
        username: username,
        password: password
    });

    user.manify(function (err, name) {

        if (err) throw err;
        console.log('Twoje nowe imię to: ' + name)
    });

    return user.save(function (err) {

        if (err) throw err;
        console.log('Użytkownik ' + user.name + ' zapisany pomyślnie');
    });
};

const findAllUsers = () => {
    console.log('\nBEGIN ============ findAllUsers\n');
    return User.find({}, (err, res) => {

        if (err) throw err;
        console.log('Actual database records are ' + res);
        console.log('\nfindAllUsers =========== DONE\n');
    })
};

const findByUsername = username => {
    console.log('\nBEGIN ============ findByUsername\n');
    return User.find({"username": username}, (err, res) => {

        if (err) throw err;
        console.log('Record you are looking for is ' + res);
        console.log('\nfindByUsername =========== DONE\n');
    })
};

const updateUserPassword = (username, newPassword) => {
    console.log('\nBEGIN ============ updateUserPassword\n');
    return User.findOne({"username": username})
        .then(user => {
            console.log('Old password for user ' + user.name + ' is ' + user.password);
            user.password = newPassword;
            console.log('Now is new password: ' + user.password);
            user.save(err => {

                if (err) throw err;
                console.log('Użytkownik ' + user.name + ' został pomyślnie zaktualizowany');
            })
            console.log('\nupdateUserPassword =========== DONE\n');
        })
        .catch(() => {
            console.log('Nie znaleziono użytkownika ' + username);
            console.log('\nupdateUserPassword =========== DONE\n');
        })

};

const updateUsername = (username, newUsername) => {
    console.log('\nBEGIN ============ updateUsername\n');
    return User.findOneAndUpdate({"username": username}, {"username": newUsername}, {new: true}, (err, user) => {

        if (err) throw err;
        console.log('Nazwa użytkownika po aktualizacji to ' + user.username);
        console.log('\nupdateUsername =========== DONE\n');
    })
};

const findUserAndDelete = username => {
    console.log('\nBEGIN ============ findUserAndDelete\n');
    return User.findOne({"username": username})
        .then(user => {
            return user.remove(err => {

                if (err) throw err;
                console.log('Użytkownik ' + username + ' został usunięty');
                console.log('\nfindUserAndDelete =========== DONE\n');
            })
        })
        .catch(() => {
            console.log('Użytkownik ' + username + ' nie został znaleziony');
            console.log('\nfindUserAndDelete =========== DONE\n');
        })
};

module.exports = {
    prepareUser: prepareUser,
    findAllUsers: findAllUsers,
    findByUsername: findByUsername,
    updateUserPassword: updateUserPassword,
    updateUsername: updateUsername,
    findUserAndDelete: findUserAndDelete
};
