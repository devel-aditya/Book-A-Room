const mongoose=require('mongoose')
const cities=require('./cities');
const {places,descriptors} =require('./seedHelpers');
const Campground=require('../models/campground');
mongoose.connect('mongodb://localhost:27017/yelp-camp',{
    useNewUrlParser: true,
    //useCreateIndex: true, 
    useUnifiedTopology: true
});

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
    console.log("Database connected");
});

const sample=array =>array[Math.floor(Math.random() * array.length)];

const seedDB= async() =>{
    await Campground.deleteMany({});
   for(let i=0;i< 50; i++){
    const random1000=Math.floor(Math.random()*1000);
    const price=Math.floor(Math.random()*20)+10;
    const camp=new Campground({
        author:'64ad13e9d6aaa7f7c7743061',
        location: `${cities[random1000].city},${cities[random1000].state}`,
        title:`${sample(descriptors)} ${sample(places)}`,
       images:[
            {
              url: 'https://res.cloudinary.com/dncxzoalf/image/upload/v1690279581/YelpCamp/dxxyymt2nlmy0t81ahxa.jpg',
              filename: 'YelpCamp/dxxyymt2nlmy0t81ahxa'
            },
            {
              url: 'https://res.cloudinary.com/dncxzoalf/image/upload/v1690279581/YelpCamp/nmumim2wwvn8qpzjkwqg.jpg',
              filename: 'YelpCamp/nmumim2wwvn8qpzjkwqg',
            }
          ],
        description:'Best rated and loved Hotel for explorers!!',
        price
    })
    await camp.save();
   }
}
seedDB().then(()=>{
mongoose.connection.close();
})