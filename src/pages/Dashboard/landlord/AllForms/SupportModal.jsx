import React, { useState } from "react";

const SupportModal = ({ isOpen, onClose, onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(query);
    setQuery("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-2">
            Your Query
            <textarea
              className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-sm"
              rows={4}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              required
            />
          </label>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm bg-yellow-400 text-white rounded hover:bg-yellow-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportModal;
