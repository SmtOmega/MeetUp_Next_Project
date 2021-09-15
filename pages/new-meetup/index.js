import { useRouter } from "next/router";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";


const NewMeetupPage = () => {
  const router = useRouter()


  const onAddMeetup = async (meetupData) => {
    const response = await fetch('/api/new-meetup', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    const data = await response.json()
    router.push('/')
  };
  return <NewMeetupForm onAddMeetup={onAddMeetup} />;
};

export default NewMeetupPage;
