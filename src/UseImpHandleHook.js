import { forwardRef, useImperativeHandle, useRef } from "react";

const ChildComponent = forwardRef((props, ref) => {
  const ownRef = useRef();
  useImperativeHandle(ref, () => {
    return {
      myFocus() {
        ownRef.current.focus();
      },
    };
  });

  return (
    <input
      placeholder="Enter Value"
      ref={ownRef}
      defaultValue={props.initialValue}
    ></input>
  );
});

function UseImpHandleHook() {
  const childRef = useRef();
  const handleFocus = () => {
    childRef.current.myFocus();
  };
  return (
    <div>
      <ChildComponent ref={childRef} initialValue={"Hello"} />
      <button onClick={handleFocus}>Focus me</button>
    </div>
  );
}

export default UseImpHandleHook;
