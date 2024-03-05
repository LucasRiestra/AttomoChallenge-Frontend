'use client';
import "./Searchbar.css";

export default function SearchBar() {
  return (
    <div className='SearchBar'>
      <h2>Search in the list of games</h2>
      <input type="text" placeholder="Search..." />
    </div>
  );
}