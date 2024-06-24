/* v8 ignore next 100 */
import {
  onLCP,
  onINP,
  onCLS,
  onFCP,
  onFID,
  onTTFB,
} from "web-vitals/attribution";

const reportWebVitals = () => {
  onCLS((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  onFID((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  onFCP((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  onLCP((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  onTTFB((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
};

export default reportWebVitals;
