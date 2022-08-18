const ObjectId = require('mongodb').ObjectID;
const MongoClient = require('mongodb').MongoClient;

async function seedDB() {
   const uri = 'mongodb://localhost:27017';

   const client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   });
   try {
      await client.connect();
      const collection = client.db('TaskManagement').collection('Users');
      const cursor = await collection.findOne({
         _id: ObjectId('62ebccf7102425f843c962c7'),
      });
      if (!cursor) {
         let user = [
            {
               _id: ObjectId('62ebccf7102425f843c962c7'),
               Name: 'Administrador',
               User: 'admin',
               Password: '12345678',
               CPF: '',
               Tel: '',
               Email: '',
            },
         ];

         await collection.insertMany(user);
      }

      client.close();
   } catch (err) {
      console.log(err.stack);
   }
}

seedDB();
