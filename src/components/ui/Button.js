export default function Button({ text, onClick }) {
  return (
    <button
      className="md:bg-brand py-2 px-4 md:text-white md:hover:bg-black  rounded-md "
      onClick={onClick}
    >
      {text}
    </button>
  );
}
