import React, { Component } from 'react';
import  TransitionGroup  from 'react-transition-group/TransitionGroup';
import  CSSTransition from 'react-transition-group/CSSTransition';

// use TransitionGroup to output dynamic lists
// TransitionGroup has to be used inconjunction with CSSTransition

import './List.css';

class List extends Component {
    state = {
        items: [1, 2, 3]
    }

    addItemHandler = () => {
        this.setState((prevState) => {
            return {
                items: prevState.items.concat(prevState.items.length + 1)
            };
        });
    }

    removeItemHandler = (selIndex) => {
        this.setState((prevState) => {
            return {
                items: prevState.items.filter((item, index) => index !== selIndex)
            };
        });
    };

    render () {
        const listItems = this.state.items.map((item, index) => (
            <CSSTransition key={index} classNames="fade" timeout={300}>
                <li 
                    className="ListItem" 
                    onClick={() => this.removeItemHandler(index)}>{item}</li>
            </CSSTransition>
        ));
        // wrap the list item using CSSTransition
        // move the 'key' propoerty to the CSSTransition, and other configuration accordingly(classNames,timeout)
        // no need for 'in' property: automatically configured / determined one element in the list is added/removed (we dont need to / couldnt control it)

        return (
            <div>
                <button className="Button" onClick={this.addItemHandler}>Add Item</button>
                <p>Click Item to Remove.</p>
                <TransitionGroup component="ul" className="List">
                    {listItems}
                </TransitionGroup> 
            </div>
        );
    }
    // line 42: replace <ul> with ><TransitionGroup> but kept the property!
    // assign a 'component' property with value of 'ul' & 'className' property with the original css class
}

export default List;