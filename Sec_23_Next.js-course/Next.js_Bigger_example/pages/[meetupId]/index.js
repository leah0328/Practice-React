import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

const MeetupDetails = (props) => {
  return (
    <Fragment>
      <Head>
        <title>{props.meetupData.title}</title>
        {/*dynamic output*/}
        {/*this will appear as the tab title, and in the page source, so better SEO*/}
        <meta name="description" content={props.meetupData.description} />
      </Head>
      <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
        // all passed through props from getStaticProps() below
        // data for the single meetup  (after you click on 'show details')
      />
    </Fragment>
  );
};

// getStaticPath() is a 'must-do' when generating dynamic pages using 'getStaticProps'
// to tell NEXTJS for which dynamic values it should pre-generate the page

// for getStaticPaths(), we are pre-generating the paths for each specific id on the collections
// to prepare for when user click on 'show detail' on certain meetup
export async function getStaticPaths() {
  const client = await MongoClient.connect(
    "mongodb+srv://writeUser:qcBtbpVwU3MZ1MaT@cluster0.jnmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
  // .find({},{_id:1}) :
  //  1st argument = define the filter criteria,
  // an empty object = so we can find all document (all object) in the collection, instead of filter for certain field values

  //  2nd argument =  defines which field should be extracted for every document (by deafult all the field willbe returned (title, image))
  // {_id:1} = only return the _id field

  client.close();

  return {
    fallback: "blocking",
    // 'false' meaning: the path arrays content all supported parameter values,
    // so users will be directed to 404 if they enters an invalid meetupId values
    // 'true', NEXTJS will generate a page for the meet ID dynamically on the server for incoming request

    // if we allow people to add new meetup event, should set it to true or 'blocking'
    // so nextjs will not respond with a 404 page, if it cant find the page immidiately
    // it will then generate the page on demand, and cache it (so it will pre-generated when needed)

    // difference betwwen true & 'blocking'
    // true: it would immediately return an empty page, and show the dynamically generated page once it's done (need to catch error)
    // 'blocking': user would not see anyhting until the page was pre-generated, and the finished page will be served

    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() },
    })),
    // for every meetup (object with an id) in 'meetups' (the collection)
    // each of them should have a params key, which holds an meetupId object, with the value of the autogenerated Ids (._id) (that is converted to String)

    // hard-coded version
    // paths: [
    //   {
    //     params: {
    //       meetupId: "m1",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m2",
    //     },
    //   },
    //   {
    //     params: {
    //       meetupId: "m3",
    //     },
    //   },
    // ],
  };
}

export async function getStaticProps(context) {
  //for getStaticProps() we are fetch data for single meetup (after you click on 'show details')

  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(
    "mongodb+srv://writeUser:qcBtbpVwU3MZ1MaT@cluster0.jnmkq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
  );

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId), // to ensure we can correctly look for a specific id, we need to convert it from string to the ObjectId
  });
  // .findOne({_id:mmetupId}) :
  //  1st argument = define the filter criteria,
  // {_id:mmetupId} = look for object with the targeted id
  // if {} (an empty object) =  find all document (all object) in the collection, instead of filter for certain field values

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(), // conver the ._id back to string, so there's wouldnt be any error
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        description: selectedMeetup.description,
        image: selectedMeetup.image,
      },
      // {
      // image:
      //   "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80",
      // id: meetupId,
      // title: "Xbox Gaming Session",
      // address: "6 Land Street",
      // description: "Everyone's invited! Come join us for a gaming session!",
      // },
    },
  };
}

export default MeetupDetails;