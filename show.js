const crud = require('./crud');

Promise.all([
    crud.prepareUser("Kenny", "Kenny_the_boy", "12345"),
    crud.prepareUser("Benny", "Benny_the_boy", "6789"),
    crud.prepareUser("Mark", "Mark_the_boy", "987654321")])
    .then(crud.findAllUsers)
    .then(() => crud.findByUsername("Kenny_the_boy"))
    .then(() => crud.updateUserPassword("Mark_the_boy", "newPassword"))
    .then(() => crud.updateUserPassword("Oskar", "newPassword"))
    .then(() => crud.updateUsername("Benny_the_boy", "Very_Big_Benny"))
    .then(() => crud.findUserAndDelete("Mark_the_boy"))
    .then(crud.findAllUsers)
    .then(() => crud.findUserAndDelete("Oskar"))
    .then(() => crud.findUserAndDelete("Very_Big_Benny"))
    .then(crud.findAllUsers)
    .then(() => crud.findUserAndDelete("Kenny_the_boy"))
    .then(crud.findAllUsers);

    