const Button = ({ text }) => {
  return (
    <button className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600">
      {text}
    </button>
  );
};

export default Button;

{
  /*const Button = ({ text, type = "submit" }) => {
  return (
    <button
      type={type}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      {text}
    </button>
  );
};

export default Button;*/
}
