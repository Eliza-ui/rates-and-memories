import React, { useState } from "react";
import AddBeach from "./components/AddBeach";
import BeachList from "./components/BeachList";
import Modal from "./components/Modal";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 1000, once: true });

const App = () => {
  const [beaches, setBeaches] = useState([
    {
      name: "Canyon Cove",
      location: "Nasugbu, Batangas",
      rate: 5000,
      description: "Relaxing beachfront perfect for families.",
      image: "https://i.imgur.com/hP0dV7P.jpeg",
    },
    {
      name: "Boracay White Beach",
      location: "Aklan",
      rate: 9000,
      description: "Famous white sand and sunset views.",
      image: "https://i.imgur.com/VsD4eY1.jpeg",
    },
    {
      name: "Amansara Private Resort",
      location: "Calamba, Laguna",
      rate: 8500,
      description: "Quiet private resort perfect for relaxation.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Villa Judela Private Hot Spring Resort",
      location: "Laguna",
      rate: 7800,
      description: "Private hot spring resort ideal for families.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Villa Jovita Resort",
      location: "Lemery, Batangas",
      rate: 6500,
      description: "Cozy resort near the beach with relaxing ambiance.",
      image: "https://via.placeholder.com/150",
    },
  ]);

  const [favorites, setFavorites] = useState([]);
  const [selectedBeach, setSelectedBeach] = useState(null);

  const addBeach = (b) => setBeaches([...beaches, b]);

  const updateBeach = (index, updated) => {
    setBeaches(beaches.map((b, i) => (i === index ? updated : b)));
  };

  const markFavorite = (b) => {
    if (!favorites.find((f) => f.name === b.name)) {
      setFavorites([...favorites, b]);
    }
  };

  const deleteBeach = (b) => {
    setBeaches(beaches.filter((x) => x !== b));
    setFavorites(favorites.filter((f) => f.name !== b.name));
  };

  const clearAll = () => {
    setBeaches([]);
    setFavorites([]);
  };

  const openModal = (b) => setSelectedBeach(b);
  const closeModal = () => setSelectedBeach(null);

  return (
    <div className="bg-blue-100 min-h-screen p-4 md:p-8">
      <header className="bg-gradient-to-r from-blue-400 to-blue-600 text-white py-8 px-6 md:px-12 rounded-3xl shadow-2xl mb-6 animate-floating">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">🏖️ Rates and Memories for Beaches</h1>
        <p className="opacity-90">
          Explore the best beaches, their rates, and your favorite memories.
        </p>
      </header>

      {/* white card wrapper around the two columns to match desired layout */}
      <div className="max-w-7xl mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <AddBeach addBeach={addBeach} />
          <BeachList
            beaches={beaches}
            markFavorite={markFavorite}
            deleteBeach={deleteBeach}
            updateBeach={updateBeach}
            openModal={openModal}
            clearAll={clearAll}
          />
        </div>
      </div>

      <div className="bg-white mt-6 p-6 rounded-2xl shadow-lg max-w-7xl mx-auto">
        <div className="mb-4">
          <p className="text-lg">Total Beaches Added: <span className="font-bold">{beaches.length}</span></p>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-2">Favorite Memories:</h3>
          {favorites.length === 0 ? (
            <p className="text-gray-600">No favorites yet. Click the ✔ button to add a beach to favorites.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {favorites.map((f, i) => (
                <div key={i} className="border rounded p-3 bg-blue-50 flex gap-3 items-start">
                  <img src={f.image} alt={f.name} className="w-20 h-20 object-cover rounded" />
                  <div>
                    <div className="font-semibold text-lg">{f.name}</div>
                    <div className="text-sm text-gray-600">{f.location} • ₱{f.rate.toLocaleString()}</div>
                    <p className="mt-2 text-gray-700">{f.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedBeach && <Modal beach={selectedBeach} closeModal={closeModal} />}
    </div>
  );
};

export default App;
