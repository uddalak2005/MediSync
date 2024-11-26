import React from 'react';
import './NextAndPrev.css'

function NextAndPrev(props) {
    return(
        <button className="NextAndPrev" onClick={props.onClick}>{props.name}</button>
    )
}

export default NextAndPrev;