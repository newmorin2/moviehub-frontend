import { useState } from "react";
import Navbar from "../components/standard/Navbar";
import Hero from "../components/home/Hero";

function Home() {
  const [search, setSearch] = useState("");

  return (
    <>
    <div className="min-h-screen bg-linear-to-b from-red-600 to-gray-950 grid md:grid-cols-2 gap-10 p-6">
      <main className="pt-6">
        <Hero search={search} setSearch={setSearch} />
        {/* <div className="mt-8 rounded-lg bg-white/10 p-6 text-white shadow-lg shadow-black/20"> */}
          {/* <h2 className="text-2xl font-semibold mb-2">Welcome to MovieHub</h2> */}
          {/* <p className="text-base leading-7 text-gray-200">
            Discover your next favorite movie, explore curated recommendations,
            and book tickets with ease. MovieHub brings the best of cinema
            together in one place.
          </p> */}
        {/* </div> */}
      </main>
    </div>
    </>
  );
}

export default Home;
