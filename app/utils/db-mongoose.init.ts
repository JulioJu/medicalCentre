import { URLMONGODB } from './';

export const dbMongooseInit = () => {
    // In function, doesn't work with es6 module import.
    const mongoose = require('mongoose');
    mongoose.connect(URLMONGODB);
    const dbMongoose = mongoose.connection;
    dbMongoose.on('error', console.error.bind(console, 'connection error:'));
    dbMongoose.once('open', function() {
        // we're connected!
    });

    const kittySchema = mongoose.Schema({
        name: String
    });
    // NOTE: methods must be added to the schema before compiling it with
    // mongoose.model()
    // De not use Arrow function because we have a this ! And Arrow function
    // havn't this.
    kittySchema.methods.speak = function() {
        const greeting = this.name
            ? 'Meow name is ' + this.name
            : 'I don\'t have a name';
        console.debug(greeting);
    }

    const Kitten = mongoose.model('Kitten', kittySchema);
    const silence = new Kitten({ name: 'Silence' });
    console.debug(silence.name);
    const fluffy = new Kitten({ name: 'fluffy' });
    fluffy.save((err, saved) => {
        if (err) {
            return console.error(err);
        }
        console.debug('coucou');
        saved.speak();
        console.debug('coucou');
    });

    setTimeout(() => {
        Kitten.find((err, kittFind) => {
            if (err) {
                return console.error(err);
            }
            console.debug('coucou2');
            console.debug('coucou2');
        });
    }, 2000);
}
