import React, { useEffect, useContext, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import CartContext from '../../store/cart-context';
import styles from './HeaderCartButton.module.css';

const HeaderCartButton = (props) => {
    const [ btnIsHighlighted, setBtnIsHighlighted ] = useState(false);
    const cartCtx = useContext(CartContext);

    const numberOfCartItems = cartCtx.items.reduce((accumulator, item) => {
        return accumulator + item.amount;
    }, 0 );
    
    /* 0 this is the initial value (optional argument)*/

    //the reduce() function transform an array of data into a single value
    //takes 2 arguments (method, starting value)

    // the method itself also takes 2 arguments 

    // currentNumber = (the accumulator) aka the (constantly) updated value, 
    //     which will be different each time the reducer function is executed, depneding on previous value)
    //     during the very first execution, it will be 0 (as stated in line 11)

    // item =  the current object of the ongoing iteration
    //     ie.first iteration-> first item, second iteration->second, so on
    //     so it will go over the entire array of cart items, and compute the numberOfCartItems

    // item.amount = the amount field (from card item object) that represents how many units per item type

    //* 'callback' is a function passed into another funciton as an argument to be executed later

    const { items } = cartCtx;
    // object desrtucturing
    // use this as a dependencies
    //so the animation will only play when there's changes to 'items' (ie. item added) 
    
    // the 'item' below (line 40-59) all refers to this 'item' (line 33)

    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0 ) {
            return;
            // so the animation wouldnt be triggered if no item is added
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
             setBtnIsHighlighted(false);
             // so the animation will start again after each changes
        }, 300); // (the duration of the animation) so the timer will be reset after the animation is shown
        
        return () => {
            clearTimeout(timer);
            //cleanup function
            // if we added multiple items rapidly 
            // we would want to clear the old timer and make sure the new timer is set
        };
    }, [items]);

        return  (
            <button className={btnClasses} onClick={props.onClick}>
                {/*props.onClick --> point to the onClick in Header.js*/}
                <span className={styles.icon}>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className={styles.badge}>{numberOfCartItems}</span>
            </button>
        );
};

export default HeaderCartButton;