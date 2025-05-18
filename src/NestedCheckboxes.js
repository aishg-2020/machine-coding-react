import React, { useState } from "react";
import { initialCheckboxData } from "./data";

export const SingleCheckbox = ({
  name,
  checked,
  id,
  level,
  indeterminate,
  onChange,
}) => {
  return (
    <div style={{ marginLeft: `${level * 20}px` }}>
      <input
        id={id}
        type={"checkbox"}
        name={name}
        value={name}
        checked={checked}
        ref={(el) => {
          if (el) el.indeterminate = indeterminate;
        }}
        onChange={onChange}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};
export const AllCheckboxes = ({ level, checkboxData, onCheckboxChange }) => {
  return (
    <div>
      {checkboxData.map((child) => {
        const hasChildren = child?.children?.length > 0;
        const { name, id, children, checked, indeterminate } = child;
        if (hasChildren) {
          return (
            <div key={id}>
              <SingleCheckbox
                name={name}
                id={id}
                checked={checked}
                level={level}
                indeterminate={indeterminate}
                onChange={(e) => onCheckboxChange(id, e.target.checked)}
              />
              <AllCheckboxes
                level={level + 1}
                checkboxData={children}
                onCheckboxChange={onCheckboxChange}
              />
            </div>
          );
        } else
          return (
            <SingleCheckbox
              key={id}
              name={name}
              id={id}
              checked={checked}
              level={level + 1}
              indeterminate={indeterminate}
              onChange={(e) => onCheckboxChange(id, e.target.checked)}
            />
          );
      })}
    </div>
  );
};
export default function NestedCheckboxes() {
  const [checkboxData, setCheckboxData] = useState(initialCheckboxData);

  const updateParent = (parent, data) => {
    if (parent) {
      const allChecked = parent.children.every((child) => child.checked);
      const someChecked = parent.children.some(
        (child) => child.checked || child.indeterminate
      );
      parent.checked = allChecked;
      parent.indeterminate = !allChecked && someChecked;
      updateParent(findParent(data, parent.id), data);
    }
  };

  const findParent = (data, childId) => {
    for (const item of data) {
      if (item.children) {
        if (item.children.some((child) => child.id === childId)) {
          return item;
        } else {
          const foundParent = findParent(item.children, childId);
          if (foundParent) return foundParent;
        }
      }
    }
    return null;
  };
  const updateChildrenState = (node, checked) => {
    node.checked = checked;
    node.indeterminate = false;
    if (node.children) {
      node.children.forEach((child) => updateChildrenState(child, checked));
    }
  };

  const handleCheckboxChange = (id, checked) => {
    const updatedData = [...checkboxData];

    const updateState = (id, checked, data) => {
      data?.forEach((item) => {
        if (item.id === id) {
          item.checked = checked;
          item.indeterminate = false;
          if (item.children) {
            item.children.forEach((child) =>
              updateChildrenState(child, checked)
            );
          }
          const parent = findParent(checkboxData, id);
          updateParent(parent, checkboxData);
        } else {
          updateState(id, checked, item.children);
        }
      });
    };
    updateState(id, checked, updatedData);
    setCheckboxData(updatedData);
  };
  return (
    <div>
      <AllCheckboxes
        level={0}
        checkboxData={checkboxData}
        onCheckboxChange={handleCheckboxChange}
      />
    </div>
  );
}
