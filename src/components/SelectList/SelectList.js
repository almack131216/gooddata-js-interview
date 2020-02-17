/* SelectList.js
/* USAGE:
<SelectList
    placeholder="Please select..."
    name="insertNamehere"
    selected={insertSelectedValue}
    optionsArr={[{value:##, text:"option name"},{...}]}
    changed={this.handleFilterChange}
    classControl="insertCssClassesHere"
/>
/* IF selected value is not set, then the placeholder text will be used (if set)
*/

import React from "react";

const SelectList = props => {
  if (!props.optionsArr.length) return null;
  // INIT properties
  const selected = props.selected; // selected value
  // placeholder
  const phString = props.placeholder ? props.placeholder : "Please Select";
  // IF nothing is selected and we have a placeholder... then show phOption
  const phOption = !selected && phString ? phString : null;
  // CSS classes
  const classControl = props.classControl;
  // (END) INIT

  // MAP options to jsx
  let options = props.optionsArr.map((item, index) => {
    return (
      <option value={item.value} key={index}>
        {item.text}
      </option>
    );
  });

  // RETURN select list
  return (
    <select
      name={props.name}
      id={props.id}
      value={selected ? selected : ""}
      onChange={props.changed}
      className={classControl}
    >
      {phOption ? <option value="">{phOption}</option> : null}
      {options}
    </select>
  );
};

export default SelectList;
