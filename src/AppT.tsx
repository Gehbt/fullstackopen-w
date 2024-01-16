import React from "react";

const AppT: React.FC = (prop: Record<string, any>) => <div>{prop.name}</div>;
export default AppT;

const aaa = {
  values: 1,
  getValues() {
    return this.values;
  },
  setValues(newValue: number) {
    this.values = newValue;
  },
};
