import React, { Fragment } from "react"; // see line 60 for 'Portal'
import ReactDOM from "react";
import styles from "./ErrorModal.module.css";
import Button from "./Button.js";
import Card from "./Card.js";

const Backdrop = (props) => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = (props) => {
  return (
    <Fragment>
      <div className={styles.backdrop} onClick={props.onConfirm} />
      {/* the grey overlay which shows up when there's error (prevent user from interacting with the form)*/}
      <Card className={styles.modal}>
        <header className={styles.header}>
          <h2>{props.title}</h2>
        </header>
        <div className={styles.content}>
          <p>{props.message}</p>
        </div>
        <footer className={styles.actions}>
          <Button onClick={props.onConfirm}>Okay</Button>
        </footer>
      </Card>
    </Fragment>
  );
};

const ErrorModal = (props) => {
  return (
    <Fragment>
      {
        (ReactDOM.createPortal(<Backdrop onConfirm={props.onConfirm} />),
        document.getElementById("backdrop-root"))
      }
      {/*createPortal method takes 2 arguments:
      1 - the react node( the place to port) that should be rendered 
            * with JSX code, hence <Backdrop />, with '<>'
            * and associated function,  ie, onClick, props. )
      2 - the place
      * using the ReactDOM API 'document.getElementById('backdrop-root')'
      * use the same div id written in the index.html file earlier */}
      {
        (ReactDOM.createPortal(
          <ModalOverlay
            title={props.title}
            message={props.message}
            onConfirm={props.onConfirm}
          />
        ),
        document.getElementById("overlay-root"))
      } 
    </Fragment>
  );
};

export default ErrorModal;

// // to use Portal:
// 1. mark the porral place
//     add a div (with id) in '../public/index.html'
//     ie.  <div id="backdrop-root"></div> 
// 2. create const in the relative  xx.js file 
//     ie.  const Backdrop = (props) => {
//             return <div className={styles.backdrop} onClick={props.onConfirm} />;
//         };
// 3. import ReactDom library in xx.js (see line 1 )
//     then call its 'createPortal' method (see line 39)
