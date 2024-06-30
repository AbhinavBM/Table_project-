const schemas = require("../../mongodb/schemas/schemas");


async function setupChangeStream() {

  try {
    
    const collection = db.collection("notifications");

    // Create a change stream on the collection
    const changeStream = collection.watch();

    // Listen for changes in the collection
    changeStream.on('change', (change) => {
      console.log('Change detected:', change);
      
    });

  } catch (err) {
    console.error('Error:', err);
  } finally {
    await client.close();
  }
}

setupChangeStream();
