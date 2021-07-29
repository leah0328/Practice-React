// api/new-meetup

import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    // only execute the function if it is a POST request
    const data = req.body;
    // the body of the incoming request = the data of the incoming request (those image, title and stuff)
    // what you fill in when filling in the newMeetupForm

    //const { image, title, address, description } = data; //object destructuring, also what the data(req.body) consist

    const client = await MongoClient.connect(
      "mongodb+srv://writeUser:qcBtbpVwU3MZ1MaT@cluster0.jnmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    //establish a connection with the database
    // dont forget to replace the user & password, and database name (name it 'meetups' here)

    const db = client.db(); // to access the databse we're connecting here

    const meetupsCollection = db.collection("meetups");
    // and named the collection as 'meetups'
    // overall the collection holds multiple meetups, each meetups will be a single documents in the collection(the database table)

    const result = await meetupsCollection.insertOne(data);
    // insertOne(): insert one new document into the collection
    // the document is just an object, hence should include the '{}'
    // can directly insert 'data'(without {}) for that, since 'data' consists of the 'data(line12)' we need

    console.log(result);

    client.close(); // close the databse collection after we're done

    res.status(201).json({ message: "Meetup inserted!" });
    // need to send back a response too
    // .status() : to set a HTTP status code that will be returned, as a JSON response consist of the 'message: Meetup...!'
    // 201 status code: indicates something was inserted successfully
  }
}

export default handler;
