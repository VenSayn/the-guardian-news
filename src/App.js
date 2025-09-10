import React, { useState } from 'react';

import axios from 'axios';

import NewsSearch from './Components/NewsSearch';

import NewsList from './Components/NewList';

import './App.css';

const API_KEY = '2b2e26bf-7a86-4016-990b-d64649bb4433';

function App() {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState('');
  const fetchNews = async (searchQuery, page = 1) => {
    try {
      const response = await axios.get(
        `https://content.guardianapis.com/search?q=${searchQuery}&page=${page}
&api-key=${API_KEY}`
);

setArticles(response.data.response.results);
setQuery(searchQuery);
setCurrentPage(page);
} catch (error) {
  console.error('Ошибка при загрузке новостей:', error);
}
};

const handlePageChange = (direction) => {
  const nextPage = currentPage + direction;
  if (nextPage > 0) {
    fetchNews(query, nextPage);
  }
};

return (
<div className="app">
  <h1>Новости The Guardian</h1>
  <NewsSearch onSearch={(query) => fetchNews(query)} />
    <NewsList articles={articles} />
    {articles.length > 0 && (
      <div className="pagination">
        <button onClick={() => handlePageChange(-1)}>Предыдущая</button>
        <span>Страница: {currentPage}</span>
        <button onClick={() => handlePageChange(1)}>Следующая</button>
        </div>
      )}
      </div>
      );

}

export default App;
