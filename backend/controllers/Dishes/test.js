// // Import the MongoDB driver
// const { MongoClient } = require('mongodb');

// // Connection URL and database name
// const url = 'mongodb+srv://fandb34:uy3MJSJvXH8t7pFU@cluster0.erhvdsc.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
// const dbName = 'test'; // Replace with your database name

// // Attribute to add (e.g., 'newAttribute' with a default value)
// const newAttribute = 'tax';
// const defaultValue = '0';

// async function addAttributeToCollection() {
//   // Create a new MongoClient
//   const client = new MongoClient(url, { useUnifiedTopology: true });

//   try {
//     // Connect to the MongoDB server
//     await client.connect();

//     // Select the database
//     const db = client.db(dbName);

//     // Select the collection where you want to add the attribute
//     const collectionName = 'food'; // Replace with your collection name
//     const collection = db.collection(collectionName);

//     // Update all documents in the collection to add the new attribute if it doesn't exist
//     const result = await collection.updateMany(
//       { [newAttribute]: { $exists: false } },
//       { $set: { [newAttribute]: defaultValue } }
//     );

//     console.log(`Matched ${result.matchedCount} documents and modified ${result.modifiedCount} documents.`);
//   } catch (error) {
//     console.error('Error:', error);
//   } finally {
//     // Close the MongoDB connection
//     await client.close();
//   }
// }

// // Call the function to add the attribute
// addAttributeToCollection();
