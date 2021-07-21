import React from 'react';
import styles from './Input.module.css';

const Input = React.forwardRef((props, ref) => { 
     return (
         <div className={styles.input}>
             <label htmlFor={props.input.id}>{props.label} </label>
             <input ref={ref} {...props.input} />
         </div>
            //{...props.input} ensure all key-value pairs in the input object, that we recieved on props input, are added as props to input
            // which will includes info like: id={props.input.id} type="text"
    );
});

export default Input;