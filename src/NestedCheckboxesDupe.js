import React, { useState, useEffect } from "react";
import { initialCheckboxData } from "./data";

const SingleCheckbox = ({
  name,
  id,
  checked,
  indeterminate,
  onCheckboxChange,
  level,
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
        onChange={onCheckboxChange}
      />
      <label htmlFor={id}>{name}</label>
    </div>
  );
};

const AllCheckboxes = ({ level, checkboxData, handleCheckboxChange }) => {
  return (
    <div>
      {checkboxData.map((single) => {
        const { name, id, checked, indeterminate, children } = single;
        const hasChildren = children?.length > 0;

        if (hasChildren) {
          return (
            <div key={id}>
              <SingleCheckbox
                name={name}
                id={id}
                checked={checked}
                onCheckboxChange={(e) =>
                  handleCheckboxChange(id, e.target.checked)
                }
                indeterminate={indeterminate}
                level={level}
              />
              <AllCheckboxes
                level={level + 1}
                checkboxData={children}
                handleCheckboxChange={handleCheckboxChange}
              />
            </div>
          );
        } else
          return (
            <div key={id}>
              <SingleCheckbox
                name={name}
                id={id}
                checked={checked}
                onCheckboxChange={(e) =>
                  handleCheckboxChange(id, e.target.checked)
                }
                indeterminate={indeterminate}
                level={level}
              />
            </div>
          );
      })}
    </div>
  );
};

const NestedCheckboxesDupe = () => {
  const [checkboxData, setCheckboxData] = useState(initialCheckboxData);

  const findParent = (childNode, data) => {
    for (const item of data) {
      if (item.children) {
        if (item.children?.some((el) => el.id === childNode.id)) {
          return item;
        }
        const found = findParent(childNode, item.children);
        if (found) return found;
      }
    }
    return null;
  };
  const updateParent = (parent, data) => {
    const allChecked = parent.children.every((el) => el.checked);
    const someChecked = parent.children.some(
      (el) => el.checked || el.indeterminate
    );

    parent.checked = allChecked;
    parent.indeterminate = !allChecked && someChecked;

    const foundParent = findParent(parent, data);
    if (foundParent) {
      updateParent(foundParent, data);
    }
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
      data?.forEach((child) => {
        if (child.id === id) {
          child.checked = checked;
          child.indeterminate = false;
          if (child?.children) {
            child.children.forEach((single) =>
              updateChildrenState(single, checked)
            );
          }
          const parent = findParent(child, checkboxData);
          if (parent) {
            updateParent(parent, data);
          }
        } else {
          updateState(id, checked, child.children);
        }
      });
    };

    updateState(id, checked, updatedData);
    setCheckboxData(updatedData);
  };

  return (
    <AllCheckboxes
      level={0}
      checkboxData={checkboxData}
      handleCheckboxChange={handleCheckboxChange}
    />
  );
};
export default NestedCheckboxesDupe;
