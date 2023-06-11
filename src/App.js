import React, { useState } from "react";
import axios from "axios";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [sortOption, setSortOption] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.github.com/users/${searchQuery}/repos`
      );
      setRepositories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSort = (option) => {
    setSortOption(option);
    const sortedRepositories = [...repositories].sort(
      (a, b) => b[option] - a[option]
    );
    setRepositories(sortedRepositories);
  };

  return (
    <div className="min-h-screen bg-gray-900 p-3">
      <div className="max-w-3xl max-h-screen overflow-auto mx-auto px-4 sm:px-6 lg:px-8 border-2 rounded-lg mb-3">
        <h1 className="text-3xl font-semibold mb-6 text-gray-100">
          GitHub Repository Finder
        </h1>
        <div className="flex">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter a GitHub username"
            className="mr-4 px-4 py-2 w-full border border-gray-300 rounded-lg"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
          >
            Search
          </button>
        </div>
        <div className="mt-6">
          <label className="mr-2 text-white">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => handleSort(e.target.value)}
            className="border border-gray-300 px-4 py-2 rounded-md"
          >
            <option value="">None</option>
            <option value="stargazers_count">Stars</option>
            <option value="forks_count">Forks</option>
          </select>
        </div>
        <div className="mt-6">
          {repositories.map((repo) => (
            <div
              key={repo.id}
              className="bg-gray-300 rounded-md shadow-md p-4 mb-4 hover:scale-105"
            >
              <h3 className="text-lg font-semibold mb-2">{repo.name}</h3>
              <p className="text-gray-600 mb-2">{repo.description}</p>
              <p className="text-gray-700">Stars: {repo.stargazers_count}</p>
              <p className="text-gray-700">Forks: {repo.forks_count}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
