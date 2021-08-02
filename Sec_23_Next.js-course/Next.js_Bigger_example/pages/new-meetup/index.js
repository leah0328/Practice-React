// domain.com/new-meetup

import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
  const router = useRouter();

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch("/api/new-meetup", {
      //since it will be on the same server, can write the url like this
      method: "POST",
      body: JSON.stringify(enteredMeetupData), // enteredMeetupData consists of those {title, image...} we need,
      headers: { "Content-Type": "application/json" },
    });

    const data = await response.json();

    console.log(data);

    router.push("/"); //navigate to '/' after adding new meetup
  }
  // find out why the form wuldnt work

  return (
    <Fragment>
      <Head>
        <title>Add A NewMeetup</title>{" "}
        {/*this will appear as the tab title, and in the page source, so better SEO*/}
        <meta name="description" content="Create your own meetup event!" />
      </Head>
      <NewMeetupForm onAddMeetup={addMeetupHandler} />
    </Fragment>
  );
}
export default NewMeetupPage;
