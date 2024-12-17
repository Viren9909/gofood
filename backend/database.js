const { default: mongoose } = require('mongoose');
// const uri = "mongodb://gofood:gofood75@gofoodcluster-shard-00-00.3pa4p.mongodb.net:27017,gofoodcluster-shard-00-01.3pa4p.mongodb.net:27017,gofoodcluster-shard-00-02.3pa4p.mongodb.net:27017/?ssl=true&replicaSet=atlas-kjcuek-shard-0&authSource=admin&retryWrites=true&w=majority&appName=gofoodcluster";
const uri = "mongodb://localhost:27017/gofoodDB";

const connectMongo = async () => {
    try {
        await mongoose.connect(uri);
        const fetched_data = await mongoose.connection.db.collection("food_item").find({}).toArray();
        const fetched_category = await mongoose.connection.db.collection("food_category").find({}).toArray();
        console.log("Connection established...");
        global.food_item = fetched_data
        global.food_category = fetched_category
    } catch (error) {
        console.log("Cant connect with database.")
    }
}

module.exports = connectMongo;