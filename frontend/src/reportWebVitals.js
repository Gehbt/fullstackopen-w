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
  // CLS 用于衡量在网页的整个生命周期内发生的每次意外布局偏移的最大突发布局偏移分数
  // < 0.1 | < 0.25
  onCLS((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  //FID 衡量的是从用户首次与网页互动到浏览器实际能够开始处理事件处理脚本以响应相应互动的时间。
  // < 100ms | < 300ms
  onFID((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  // 首次内容绘制 (FCP) 用于衡量从用户首次导航到网页到网页内容的任何部分在屏幕上呈现的时间
  // < 1.8 | < 3.0
  onFCP((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  // LCP 报告的是视口中可见最大图片或文本块相对于用户首次导航到网页的呈现时间
  // < 2.5s | < 4s
  onLCP((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  // TTFB 指标用于衡量从请求资源到响应的第一个字节开始到达的时间点之间的时长。
  // < 800ms | < 1800ms
  onTTFB((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
  // INP 是一项指标，通过观察用户在访问网页期间发生的所有点击、点按和键盘互动的延迟时间，
  // 评估网页对用户互动的总体响应情况。最终 INP 值是观测到的最长互动时间，离群值会被忽略。
  // < 200ms | < 500ms
  onINP((obj) => {
    console.log(obj.name);
    console.dir(obj, { depth: 2 });
  });
};

export default reportWebVitals;
