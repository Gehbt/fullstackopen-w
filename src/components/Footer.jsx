import stylex from "@stylexjs/stylex";
const footerStyle = {
  footer: {
    color: "green",
    fontStyle: "italic",
    fontSize: 16,
  },
};
const Footer = () => {
  return (
    <div {...stylex.props(footerStyle.footer)}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2022
      </em>
    </div>
  );
};
export default Footer;
