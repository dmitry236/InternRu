import React, { useEffect, useState } from 'react';
import { getInternshipList } from '../../api/endpoints';
import InternshipCard from './InternshipCard';

function InternshipList() {
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInternships = async () => {
      try {
        const response = await getInternshipList();
        console.log('Ответ от API:', response.data);
        
        // 🔥 ГЛАВНОЕ ИЗМЕНЕНИЕ ЗДЕСЬ:
        // Достаем массив из data.data.results
        const data = response.data?.data?.results || [];
        
        // Проверяем, что это массив
        if (Array.isArray(data)) {
          setInternships(data);
        } else {
          console.error('Данные не являются массивом:', data);
          setInternships([]);
        }
        setLoading(false);
      } catch (err) {
        setError('Ошибка загрузки стажировок');
        setLoading(false);
        console.error(err);
      }
    };

    fetchInternships();
  }, []);

  if (loading) return <div className="loading">⏳ Загрузка стажировок...</div>;
  if (error) return <div className="error">❌ {error}</div>;

  return (
    <div className="internship-list">
      {internships.length === 0 ? (
        <div className="empty-message">
          <p>📭 Пока нет стажировок</p>
          <p>Станьте первым, кто разместит стажировку!</p>
        </div>
      ) : (
        internships.map((internship) => (
          <InternshipCard 
            key={internship.id} 
            internship={internship} 
          />
        ))
      )}
    </div>
  );
}

export default InternshipList;