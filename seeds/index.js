const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DATABASE CONNECTED');
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '62e7a564e6cc742cff896fee',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum voluptates commodi minima natus tempore illo dolor ipsam consequuntur culpa. Quae hic rem exercitationem, quaerat voluptatibus a fugit quisquam explicabo numquam?',
            price,
            geometry: { type: 'Point', coordinates: [-113.133115, 47.020078] },
            images: [
                {
                    url: 'https://res.cloudinary.com/dzajtftnk/image/upload/v1659701652/YelpCamp/f2qm4rlwjdyp52dngqfx.jpg',
                    filename: 'YelpCamp/f2qm4rlwjdyp52dngqfx'
                },
                {
                    url: 'https://res.cloudinary.com/dzajtftnk/image/upload/v1659701681/YelpCamp/ago4srfkt7ysyvokitev.jpg',
                    filename: 'YelpCamp/ago4srfkt7ysyvokitev'
                }
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});