import React, {useContext} from 'react';
import styles from './MealItem.module.css';
import MealItemForm from './MealItemForm';
import CartContext from '../../../store/cart-context';

const MealItem = (props) =>{
    const cartCtx = useContext(CartContext);
    
    const price = `$${props.price.toFixed(2)}`;
    // 1st `$` = to output '$' sign
    // 2nd ${} = to inject dynamic content into this templete literal
    //           & format the price to 2 decimal point

    const addToCartHandler = (amount) => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: amount,
            price: props.price,
        });
    };
    // the 'amount' parameter on line 14 points to the VALIDATED amount received through the MalItemForm.js
    // which is the one on line 14

    // we parsed an object to the addItem(), hence the {} on line 15, that contains info like id, name etc, as a parameter 
    // props.price on line 19 is the type'int' price from props, not the formatted one on line 9

    return (
        <li className={styles.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={styles.description}>{props.description}</div>  
                <div className={styles.price}>{price}</div>    
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
            </div>
        </li>
    );  
};

export default MealItem;