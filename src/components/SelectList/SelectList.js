/* SelectList.js
/* USAGE:
<SelectList
    placeholder="Please select..."
    name="insertNamehere"
    selected={insertSelectedValue}
    dataArr={array[{},{}]}
    changed={this.handleFilterChange}
    classControl="insertCssClassesHere"
/>
/* IF selected value is not set, then the placeholder text will be used
*/

import React from "react";

const SelectList = props => {
  // INIT properties
  const selected = props.selected; // selected value
  // placeholder
  const phString = props.placeholder ? props.placeholder : "Please Select";
  // IF nothing is selected then show phOption
  const phOption = !props.selected && phString ? phString : null;
  // CSS classes
  const classControl = props.classControl;
  // (END) INIT

  // MAP options to jsx
  let options = props.dataArr.map((item, index) => {
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
      className={classControl}
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
