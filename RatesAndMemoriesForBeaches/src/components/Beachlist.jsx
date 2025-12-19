import React, { useState } from "react";

const BeachList = ({
  beaches,
  markFavorite,
  deleteBeach,
  updateBeach,
  openModal,
  clearAll,
}) => {
  const [search, setSearch] = useState("");

  const [editingIndex, setEditingIndex] = useState(null);
  const [editingBeach, setEditingBeach] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null); // { beach, idx }

  const [sortMode, setSortMode] = useState(null); // 'rate' | 'location' | null

  const filtered = beaches.filter(
    (b) =>
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.location.toLowerCase().includes(search.toLowerCase())
  );

  // derive a displayed array from filtered + sortMode without mutating props
  const displayed = [...filtered];
  if (sortMode === "rate") {
    displayed.sort((a, b) => a.rate - b.rate);
  } else if (sortMode === "location") {
    displayed.sort((a, b) => a.location.localeCompare(b.location));
  }

  return (
    <div className="bg-blue-50 p-5 rounded-xl shadow overflow-x-auto">
      <h2 className="text-2xl font-semibold mb-3">List of Beaches</h2>
      <input
        placeholder="Search beach or location..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 border rounded mb-3"
      />
  <div className="flex gap-2 mb-3">
        <button onClick={() => setSortMode("rate")} className={`px-3 py-1 rounded ${sortMode === "rate" ? "bg-blue-200" : "bg-gray-200"}`}>
          Sort by Rate
        </button>
        <button onClick={() => setSortMode("location")} className={`px-3 py-1 rounded ${sortMode === "location" ? "bg-blue-200" : "bg-gray-200"}`}>
          Sort by Location
        </button>
        <button
          onClick={() => setShowConfirm(true)}
          className="bg-red-300 px-3 py-1 rounded"
        >
          Clear All
        </button>
      </div>

      <table className="w-full min-w-[700px]">
        <thead>
          <tr className="border-b text-blue-600">
            <th>Picture</th>
            <th>Name</th>
            <th>Location</th>
            <th>Rate</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayed.map((b, i) => {
            const originalIndex = beaches.indexOf(b);
            const idx = originalIndex >= 0 ? originalIndex : i;
            return (
              <tr
                key={idx}
                onClick={() => openModal(b)}
                className="border-b hover:bg-blue-100 cursor-pointer"
              >
                <td>
                  <img
                    src={b.image}
                    alt={b.name}
                    className="w-20 h-20 rounded object-cover"
                  />
                </td>
                <td>{b.name}</td>
                <td>{b.location}</td>
                <td>₱{b.rate.toLocaleString()}</td>
                <td>{b.description}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setEditingIndex(idx);
                      setEditingBeach({ ...b });
                    }}
                    className="bg-yellow-400 text-white px-2 py-1 rounded mr-2"
                  >
                    ✎ Edit
                  </button>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setDeleteTarget({ beach: b, idx });
                      setShowDeleteConfirm(true);
                    }}
                    className="bg-red-500 text-white px-2 py-1 rounded"
                  >
                    ✖ Delete
                  </button>
                </td>
                <td
                  className="flex gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => markFavorite(b)}
                    className="bg-green-500 text-white px-2 rounded"
                  >
                    ✔
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Clear All confirmation modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Clear All</h3>
            <p className="text-sm text-gray-700">Are you sure you want to delete all beaches? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowConfirm(false)} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={() => { clearAll(); setShowConfirm(false); }} className="px-4 py-2 bg-red-600 text-white rounded">Delete All</button>
            </div>
          </div>
        </div>
      )}

      {/* Per-row Delete confirmation modal */}
      {showDeleteConfirm && deleteTarget && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md">
            <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
            <p className="text-sm text-gray-700">Are you sure you want to delete <span className="font-medium">{deleteTarget.beach.name}</span>?</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setShowDeleteConfirm(false); setDeleteTarget(null); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={() => { deleteBeach(deleteTarget.beach); setShowDeleteConfirm(false); setDeleteTarget(null); }} className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit modal */}
      {editingBeach && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-2xl">
            <h3 className="text-xl font-semibold mb-4">Edit Beach</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input className="w-full p-2 border rounded" value={editingBeach.name} onChange={(e) => setEditingBeach({ ...editingBeach, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input className="w-full p-2 border rounded" value={editingBeach.location} onChange={(e) => setEditingBeach({ ...editingBeach, location: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rate</label>
                <input type="number" className="w-full p-2 border rounded" value={editingBeach.rate} onChange={(e) => setEditingBeach({ ...editingBeach, rate: parseInt(e.target.value || 0) })} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Upload Picture</label>
                <input type="file" accept="image/*" className="w-full p-2" onChange={(e) => {
                  const file = e.target.files && e.target.files[0];
                  if (!file) return;
                  const reader = new FileReader();
                  reader.onload = (ev) => setEditingBeach(prev => ({ ...prev, image: ev.target.result }));
                  reader.readAsDataURL(file);
                }} />
                {editingBeach.image && (
                  <img src={editingBeach.image} alt="preview" className="mt-2 w-28 h-20 object-cover rounded" />
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea className="w-full p-2 border rounded h-28" value={editingBeach.description} onChange={(e) => setEditingBeach({ ...editingBeach, description: e.target.value })} />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => { setEditingIndex(null); setEditingBeach(null); }} className="px-4 py-2 bg-gray-200 rounded">Cancel</button>
              <button onClick={() => {
                if (editingIndex == null) return;
                updateBeach(editingIndex, editingBeach);
                setEditingIndex(null);
                setEditingBeach(null);
              }} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeachList;
