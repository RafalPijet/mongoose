const crud = require('./crud');

const runAll = async () => {
    await crud.findAllUsers();
    await crud.findByUsername("Kenny_the_boy");
    await crud.updateUserPassword("Mark_the_boy", "newPassword");
    await crud.updateUserPassword("Oskar", "newPassword");
    await crud.updateUsername("Benny_the_boy", "Very_Big_Benny");
    await crud.findUserAndDelete("Mark_the_boy");
    await crud.findAllUsers();
    await crud.findUserAndDelete("Oskar");
    await crud.findUserAndDelete("Very_Big_Benny");
    await crud.findAllUsers();
    await crud.findUserAndDelete("Kenny_the_boy");
    await crud.findAllUsers();
};

Promise.all([
    crud.prepareUser("Kenny", "Kenny_the_boy", "12345"),
    crud.prepareUser("Benny", "Benny_the_boy", "6789"),
    crud.prepareUser("Mark", "Mark_the_boy", "987654321")])
    .then(() => runAll());
 