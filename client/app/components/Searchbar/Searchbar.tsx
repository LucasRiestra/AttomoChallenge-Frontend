// SearchBar.tsx
import React, { useState } from 'react';
import "./Searchbar.css";

interface SearchBarProps {
  onSearch: (searchValue: string) => void;
  onCategoryChange: (category: string) => void;
  onVoteOrderChange: (order: string) => void;
}

export default function SearchBar({ onSearch, onCategoryChange, onVoteOrderChange }: SearchBarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [category, setCategory] = useState('');
  const [voteOrder, setVoteOrder] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(event.target.value);
    onCategoryChange(event.target.value);
  };

  const handleVoteOrderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setVoteOrder(event.target.value);
    onVoteOrderChange(event.target.value);
  };

  return (
    <div className='SearchBar'>
      <h2>Search in the list of games</h2>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearch}
      />
      <div>
        <h3>Select category</h3>
        <select className="category-select" value={category} onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Sports">Sports</option>
          <option value="Action">Action</option>
          <option value="Open-World">Open-World</option>
          <option value="Mobile">Mobile</option>
        </select>
      </div>
      <div>
        <h3>Order by votes</h3>
        <select className="vote-order-select" value={voteOrder} onChange={handleVoteOrderChange}>
          <option value="">None</option>
          <option value="Most Voted">Most Voted</option>
          <option value="Least Voted">Least Voted</option>
        </select>
      </div>
    </div>
  );
}