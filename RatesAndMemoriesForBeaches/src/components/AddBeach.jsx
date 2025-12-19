import React, { useState } from "react";

const AddBeach = ({ addBeach }) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [rate, setRate] = useState("");
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const handleAdd = () => {
    if (!name || !location || !rate) {
      alert("Please fill all required fields!");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      addBeach({
        name,
        location,
        rate: parseInt(rate),
        image: e.target.result,
        description: description || `${name} in ${location} is one of my favorite resorts.`,
      });
      setName("");
      setLocation("");
      setRate("");
      setImage(null);
      setDescription("");
    };
    reader.readAsDataURL(image);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-semibold mb-4">Add New Beach</h2>
      <label className="block text-sm font-medium mb-1 text-gray-700">Beach Name</label>
      <input
        className="w-full p-2 border rounded mb-3"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <label className="block text-sm font-medium mb-1 text-gray-700">Location</label>
      <input
        className="w-full p-2 border rounded mb-3"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <label className="block text-sm font-medium mb-1 text-gray-700">Rate per Night</label>
      <input
        type="number"
        className="w-full p-2 border rounded mb-3"
        value={rate}
        onChange={(e) => setRate(e.target.value)}
      />
      <label className="block text-sm font-medium mb-1 text-gray-700">Description (Your personal experience)</label>
      <textarea
        className="w-full p-2 border rounded mb-3 h-28"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="mb-3">
        <label className="block text-sm font-medium mb-1 text-gray-700 inline-block">Upload Picture</label>
        <input
          type="file"
          accept="image/*"
          className="inline-block ml-2"
          onChange={(e) => setImage(e.target.files[0])}
        />
      </div>

      <button
        onClick={handleAdd}
        className="bg-blue-600 text-white w-full py-3 rounded font-medium shadow-sm"
      >
        Add Beach
      </button>
    </div>
  );
};

export default AddBeach;
