/**
 * @param {object} props - description
 * @param {string | null} props.message
 * @param {boolean} props.isError
 * @return {JSX.Element|null}
 */
const Notification = ({ message, isError }) => {
  if (!message) {
    return null;
  } else if (!isError) {
    return (
      <div
        className="error"
        style={{
          color: "green",
        }}
      >
        {message}
      </div>
    );
  } else {
    return <div className="error">{message}</div>;
  }
};
export default Notification;
