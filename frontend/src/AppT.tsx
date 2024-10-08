import React from "react";

const AppT = React.forwardRef<HTMLDivElement, { name: string }>((prop) => (
  <div>{prop.name}</div>
));
export default AppT;

export const signal = {
  values: 1,
  getValues() {
    return this.values;
  },
  setValues(newValue: number) {
    this.values = newValue;
  },
};
