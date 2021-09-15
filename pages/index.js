import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";
import Head from 'next/head'

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Next/React Meetups</title>
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://username:<enter db password>@cluster0.bxjyi.mongodb.net/dbmeetupDb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollections = db.collection("dbMeetUp");
  const meetupData = await meetUpCollections.find().toArray();
  client.close();
  return {
    props: {
      meetups: meetupData.map((meetUp) => ({
        title: meetUp.title,
        image: meetUp.image,
        address: meetUp.address,
        id: meetUp._id.toString(),
      })),
    },
    revalidate: 10,
  };
}

export default HomePage;
