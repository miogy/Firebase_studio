export default function Button({ text, onClick }) {
  return (
    <button
      className="bg-brand py-2 px-4 text-white hover:bg-black rounded-md"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
