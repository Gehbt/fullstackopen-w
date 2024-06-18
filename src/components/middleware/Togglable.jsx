import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef(
  /**
   * @param {object} props
   * @param {string} props.buttonLabel
   * @param {React.ReactNode} props.children
   */
  ({ buttonLabel, children }, ref) => {
    const [visible, setVisible] = useState(false);

    const hideWhenVisible = { display: visible ? "none" : "" };
    const showWhenVisible = { display: visible ? "" : "none" };

    const toggleVisibility = () => {
      setVisible(!visible);
    };
    // 自定义由 ref 暴露出来的句柄
    useImperativeHandle(ref, () => {
      return {
        toggleVisibility,
      };
    });

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={toggleVisibility}>{buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>
      </div>
    );
  }
);
Togglable.displayName = "Togglable";
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};
export default Togglable;
