import React from 'react';

import styles from './Button.module.css';

const Button = props => {
  return (
    <button type={props.type} className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default Button;

// to use CSS muodule:
// 1- rename css file to xx.module.css
// 2- import styles (or class) form './xx.module.css'
// 3- for className, use '{}' not '""' + {style.xx}
// ie.  className={styles.button}
// if the css class name is written with hyfen: 
//(form-control <-- valid for css but not for javascript)
//(formControl <-- javascript)
// write className=`${styles["form-control"]}`

