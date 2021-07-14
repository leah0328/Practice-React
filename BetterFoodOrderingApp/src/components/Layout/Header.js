import React, {Fragment} from 'react';

import HeaderCartButton from './HeaderCartButton';
import foodImage from '../../assets/foodImage.jpg';
import styles from './Header.module.css';

const Header = (props) => { 
    return (
        <Fragment> 
                <header className={styles.header}> 
                    <h1>YuberEats</h1>
                    <HeaderCartButton onClick={props.onShowCart} />
                </header>
                <div className={styles['main-image']}>
                    <img src={foodImage} alt="A table of delicacies!" />
                </div>
        </Fragment>
    );
};

export default Header;