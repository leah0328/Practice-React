import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

// const DUMMY_MEETUPS = [
//   {
//     id: "m1",
//     image:
//       "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
//     title: "Xbox Gaming Session",
//     address: "6 Land Street",
//     description: "Everyone's invited!",
//   },
//   {
//     id: "m2",
//     image:
//       "https://images.unsplash.com/photo-1586899028174-e7098604235b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80",
//     title: "Netflix Marathon",
//     address: "5 Delhi Road",
//     description: "Netflix and chill for all ages! ",
//   },
//   {
//     id: "m3",
//     image:
//       "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
//     title: " Coffee Tasting Brunch",
//     address: "13 Network Place",
//     description: "Bring your friends along! ",
//   },
// ];

function HomePage(props) {
  //   const [loadedMeetups, setLoadedMeetups] = useState([]);

  //   useEffect(() => {
  //     //send HTTPs request
  //     setLoadedMeetups(DUMMY_MEETUPS);
  //   }, []);

  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>{" "}
        {/*this will appear as the tab title, and in the page source, so better SEO*/}
        <meta name="description" content="A meetup app made using React!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
  // 'props.meetup' is from line 45
  // dont forget to pass 'props' as argument for HomePage
}

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://writeUser:qcBtbpVwU3MZ1MaT@cluster0.jnmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );
  const db = client.db(); // to access the databse we're connecting here

  const meetupsCollection = db.collection("meetups"); //access the collection

  const meetups = await meetupsCollection.find().toArray();
  // find() : get the whole meetups list from collection and convert to an Arrays
  // for HomePage's Meetups List

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(), // conver the id to string otherwise it will get an error
      })),
    },
    revalidate: 3600,
    // regenerates the website after (seconds), frequency should depend on your updating frequent
    // revalidate takes a 'number', (seconds) it would wait before regenerating the pages for incoming request
    // revalidate unlock a feature 'Incremental Static Generation'
  };
}

export default HomePage;
