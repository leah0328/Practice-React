import useForm from "../../hooks/use-form";
import styles from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: enteredNameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredStreet,
    isValid: enteredStreetIsValid,
    hasError: enteredStreetHasError,
    valueChangeHandler: streetChangeHandler,
    inputBlurHandler: streetBlurHandler,
    reset: resetStreetInput,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredPostalCode,
    isValid: enteredPostalCodeIsValid,
    hasError: enteredPostalCodeHasError,
    valueChangeHandler: postalCodeChangeHandler,
    inputBlurHandler: postalCodeBlurHandler,
    reset: resetPostalCodeInput,
  } = useForm((value) => value.trim() !== "");

  const {
    value: enteredCity,
    isValid: enteredCityIsValid,
    hasError: enteredCityHasError,
    valueChangeHandler: cityChangeHandler,
    inputBlurHandler: cityBlurHandler,
    reset: resetCityInput,
  } = useForm((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredPostalCodeIsValid &&
    enteredCityIsValid
  ) {
    formIsValid = true;
  }

  const confirmHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity,
    });
    // props from Cart.js (line 75)
    // onConfirm -> points to 'submitOrderHandler' in Cart.js

    console.log(enteredName, enteredStreet, enteredPostalCode, enteredCity);
    resetNameInput();
    resetStreetInput();
    resetPostalCodeInput();
    resetCityInput();
  };

  const nameInputClasses = `${styles.control} ${
    enteredNameHasError ? styles.invalid : ""
  }`;
  // Always apply 'styles.control',
  // if enteredNameHasError , apply  'styles.invalid'

  const streetInputClasses = `${styles.control} ${
    enteredStreetHasError ? styles.invalid : ""
  }`;
  const postalCodeInputClasses = `${styles.control} ${
    enteredPostalCodeHasError ? styles.invalid : ""
  }`;
  const cityInputClasses = `${styles.control} ${
    enteredCityHasError ? styles.invalid : ""
  }`;

  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {enteredNameHasError && (
          <p className={styles["error-text"]}>Please enter a valid name.</p>
        )}
      </div>
      <div className={streetInputClasses}>
        <label htmlFor="street">Street</label>
        <input
          id="street"
          type="text"
          value={enteredStreet}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {enteredStreetHasError && (
          <p className={styles["error-text"]}>Please enter a valid street.</p>
        )}
      </div>
      <div className={postalCodeInputClasses}>
        <label htmlFor="postal">Postal code</label>
        <input
          id="postal"
          type="text"
          value={enteredPostalCode}
          onChange={postalCodeChangeHandler}
          onBlur={postalCodeBlurHandler}
        />
        {/* so the postal code can starts with 0 */}
        {enteredPostalCodeHasError && (
          <p className={styles["error-text"]}>
            Please enter a valid postal code.
          </p>
        )}
      </div>
      <div className={cityInputClasses}>
        <label htmlFor="city">City</label>
        <input
          id="city"
          type="text"
          value={enteredCity}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {enteredCityHasError && (
          <p className={styles["error-text"]}>Please enter a valid city.</p>
        )}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          onClick={props.onCancel}
          className={styles["button--alt"]}
        >
          Cancel
        </button>
        <button className={styles.submit} onSubmit={confirmHandler}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
