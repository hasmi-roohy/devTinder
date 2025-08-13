
const {MongoClient}=require("mongodb");

const url="mongodb+srv://HasmiRoohy:VEzaW67ZZ7HvcHZH@cluster0.zlhxa.mongodb.net/";
const client=new MongoClient(url);
const dbname="helloworld";
async function run() {
  try {
    await client.connect();
    const database = client.db(dbname);
    const users= database.collection("user");
   
        
    const data={
        "firstname":"nab",
        "lastname":"kati",
        "city":"nammaaoru"
     }
     const result=await collection.insertMany([data]);
   //  result.insertedId;
    const allUsers=await users.find({}).toArray();
    console.log("Users:",allUsers);
  console.log("done");

   




  } finally {
    await client.close();
  }
}
run().catch(console.dir);
