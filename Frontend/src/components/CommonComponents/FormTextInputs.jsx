import React from 'react';
import './FormTextInputs.css'

function FormTextInput(props) {
    return(
        <div className="info">
            <input type={props.type} placeholder={props.placeholder} id={props.id} className="formTextInput" value={props.value} onChange={props.onChange} />
        </div>
    )
}

export default FormTextInput