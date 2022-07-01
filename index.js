const { MongoClient } = require('mongodb');

async function main(){
    const uri = "mongodb+srv://raadheyyy:Ajay123@cluster0.oytfuwu.mongodb.net/?retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try{
        await client.connect();

        await updateListingByName(client, "Stige-task", "Updated"); //To update
        
        await findOneListingByName(client, "stige-task"); //Read

        await deletedListingByName(client, "stige-task"); //Delete
        
        await createListing(client, {                     // To create
            description: "Create-part",
            completed: true
        })

    } catch(e){
        console.error(e);
    } finally {
        await client.close();
    }

}   

main().catch(console.error);

async function findOneListingByName(client, descOfListing){
    const result = await client.db("Stige").collection("Tasks").findOne({description:
    descOfListing});

    if(result){
        console.log(`Found a listing in the collection with matching description.`);
        console.log(result);
    } else{
        console.log(`Collection not found, check the spelling entered.`);
    }
}

async function updateListingByName(client, descOfListing, updatedDesc){
    const result = await client.db("Stige").collection("Tasks").updateOne({description: descOfListing}, {set: updatedDesc});
    console.log(`${result.matchedCount} documents matched`);
}

async function createListing(client, newListing){
    const result = await client.db("Stige").collection("Tasks").insertOne(newListing);
    console.log(`New Listing is added`);
}

async function deletedListingByName(client, descName){
    const result = await client.db("Stige").collection("Tasks").deleteOne({description: descName});

    console.log(`${result.deletedCount} document(s) deleted`);

}

async function listDatabases(client){
    const databasesList = await client.db().admin().listDatabases();
    console.log("Databases : ");
    databasesList.databases.forEach(db => {
        console.log(`- ${db.name}`);
    })
}
