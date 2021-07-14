import React, { useContext } from 'react';
import styles from './Cart.module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = (props) => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    //for dynamic output of total amount on line 25

    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({ ...item, amount: 1 });
    };
    // cartItemAddHandler & cartItemRemoveHandler points to;
    // addItemToCartHandler() & removeItemToCartHandler() in CartProvider.js (under  const cartContext() )
    // which then points to the cartReducer() logics

    const cartItems = (
        <ul className={styles['cart-items']}>
            {cartCtx.items.map((item) => (
                <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price} 
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)} 
                />
                // bind() allow us to pre-configure the ARGUMENT(item.id) that function(cartItemRemovHandler) will received when it's being executed
                // so whenever the cartItemRemoveHandler() is executed, the item.id will be passed as the argument
            ))}
        </ul>
    );
        

    return (
        <Modal onClose={props.onClose}>{cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onClose}>Close</button>
                {/*{['button--alt']}, with[] and '' bcause of --*/}
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;