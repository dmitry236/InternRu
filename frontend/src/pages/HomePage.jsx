import React from 'react';
import InternshipList from '../components/internships/InternshipList';

function HomePage() {
  return (
    <div className="home-page">
      <div className="hero">
        <h1>Найди свою идеальную стажировку</h1>
        <p>Старт карьеры для студентов</p>
      </div>
      <InternshipList />
    </div>
  );
}

export default HomePage;