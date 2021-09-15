import { MongoClient } from "mongodb";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const data = req.body;

    

    const client = await MongoClient.connect(
      "mongodb+srv://username:<enter db password>@cluster0.bxjyi.mongodb.net/dbmeetupDb?retryWrites=true&w=majority"
    );
    const db = client.db();

    const meetUpCollections =  db.collection('dbMeetUp')
    const result = await meetUpCollections.insertOne(data)
    

    client.close()
    res.status(201).json({message: 'data inserted'})
  }
};

export default handler