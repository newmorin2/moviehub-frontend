export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full border p-2 rounded mb-4"
    />
  );
}