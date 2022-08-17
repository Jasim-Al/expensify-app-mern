import "./Input.css";

const Input = (props) => {
  return (
    <input
      type={props.type}
      name={props.name}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
      className={`input ${props.className}`}
    />
  );
};

export default Input;
