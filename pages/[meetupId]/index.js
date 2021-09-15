import {MongoClient, ObjectId} from 'mongodb'
import MeetupDetail from "../../components/meetups/meetupDetail";
import Head from 'next/head'

const MeetupDetails = (props) => {
  return (
    <>
    <Head>
      <title>Next/React Meetup Details</title>
    </Head>
    <MeetupDetail
      image={props.meetupData.image}
      title={props.meetupData.title}
      address={props.meetupData.address}
      desc={props.meetupData.desc}
    />
    </>
  );
};

export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://username:<enter db password>@cluster0.bxjyi.mongodb.net/dbmeetupDb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollections = db.collection("dbMeetUp");
  const meetupDetails = await meetUpCollections.find({}, {_id: 1}).toArray();
  client.close();

  return {
    fallback: false,
    paths: meetupDetails.map(meetDet => ({params: {meetupId: meetDet._id.toString()}}))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://username:<enter db password>@cluster0.bxjyi.mongodb.net/dbmeetupDb?retryWrites=true&w=majority"
  );
  const db = client.db();
  const meetUpCollections = db.collection("dbMeetUp");
  const selectedMeetUp = await meetUpCollections.findOne({_id: ObjectId(meetupId)})
  return {
    props: {
      meetupData: {
        id: selectedMeetUp._id.toString(),
        image:
         selectedMeetUp.image,
        title: selectedMeetUp.title,
        address: selectedMeetUp.address,
        desc: selectedMeetUp.description,
      },
    },
  };
}

export default MeetupDetails;
