import * as React from "react";

export default function FilterItem(props) {
  return ( <
    div className = "form-check form-check-inline" >
      <input 
        className = "form-check-input d-none"
        type = "checkbox"
        name = {props.name}
        onChange = {props.onChange}
        id = {props.name} 
      />
      <label className = {props.gender !== props.name ?
            "form-check-label text-muted" :
            "form-check-label"}
      htmlFor = {props.name} >
        {props.name} 
      </label> 
      { props.divider ? <span className = "pl-2" > /</span > : null }
     </div>
    )
}