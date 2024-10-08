import stylex from "@stylexjs/stylex";
/**
 * @type {Record<string,React.CSSProperties>}
 */
const footerStyle = {
  footer: {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  },
};
const Footer = () => {
  return (
    <div style={footerStyle.footer}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};
export default Footer;
