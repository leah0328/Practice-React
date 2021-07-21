import React, {useRef, useState} from 'react';
import Input from '../../UI/Input';
import styles from './MealItemForm.module.css';

const MealItemForm = (props) => {
    const [amountIsValid, setAmountIsValid] = useState(true);
    const amountInputRef = useRef();

    const submitHandler = (event) => {
        event.preventDefault(); 
        
        const enteredAmount = amountInputRef.current.value; 
        //this value is always a type'string', although the entered value is a number
        const enteredAmountNumber = + enteredAmount;
        // so the above code is to convert the entered amount to type'int', by adding a'+'

        if (
            enteredAmount.trim().length === 0  ||
            enteredAmountNumber < 1 ||
            enteredAmountNumber > 5
            ) {
                setAmountIsValid(false);
                return;
          }
          //validation for the input amount

          props.onAddToCart(enteredAmountNumber);
    };

    return(
        <form className={styles.form} onSubmit={submitHandler}>
            <Input 
            ref={amountInputRef}
            label="Amount" 
            input={{
                id:"amount_" + props.id, 
                type:"number",
                min:'1',
                max:'5',
                step:'1',
                defaultValue:'1',
            }}/>
            {/* outter{}= JS expression innner{}=JS object*/}
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-5).</p>}
        </form>


    );
};

export default MealItemForm;