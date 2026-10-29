import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getInternshipDetail, applyToInternship } from '../../api/endpoints';
import { useAuth } from '../../context/AuthContext';

function InternshipDetail() {
  // 🔥 Убедимся, что slug извлекается правильно
  const { slug } = useParams();
  console.log('🔍 Полученный slug из URL:', slug);  // ← Отладка
  
  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    // 🔥 Проверяем, есть ли slug
    if (!slug) {
      setError('Не указан идентификатор стажировки');
      setLoading(false);
      return;
    }

    const fetchDetail = async () => {
      try {
        console.log('📤 Запрос деталей для slug:', slug);
        const response = await getInternshipDetail(slug);
        console.log('✅ Ответ:', response.data);
        setInternship(response.data);
        setLoading(false);
      } catch (err) {
        console.error('❌ Ошибка:', err);
        setError('Стажировка не найдена');
        setLoading(false);
      }
    };
    
    fetchDetail();
  }, [slug]);  // ← Зависимость от slug

  const handleApply = async () => {
    if (!token) {
      alert('Войдите, чтобы подать заявку');
      return;
    }

    try {
      await applyToInternship(slug);
      setApplied(true);
      alert('Заявка успешно подана!');
    } catch (err) {
      alert('Ошибка при подаче заявки');
    }
  };

  if (loading) return <div className="loading">⏳ Загрузка...</div>;
  if (error) return <div className="error">❌ {error}</div>;
  if (!internship) return <div className="error">❌ Стажировка не найдена</div>;

  return (
    <div className="internship-detail">
      <h1>{internship.job_title || internship.title}</h1>
      <div className="detail-section">
        <p><strong>Компания:</strong> {internship.company}</p>
        <p><strong>Локация:</strong> {internship.location || 'Не указана'}</p>
        <p><strong>Язык работы:</strong> {internship.working_language || 'Не указан'}</p>
        <p><strong>Тип контракта:</strong> {internship.contract_type || 'Не указан'}</p>
        <p><strong>Категория:</strong> {internship.job_category || 'Не указана'}</p>
        <p><strong>Email для связи:</strong> {internship.email}</p>
        <p><strong>Дедлайн:</strong> {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Не указан'}</p>
        {internship.job_link && (
          <p><strong>Ссылка:</strong> <a href={internship.job_link} target="_blank" rel="noopener noreferrer">Перейти</a></p>
        )}
        <p><strong>Описание:</strong></p>
        <p>{internship.job_description || internship.description}</p>
        {internship.questionnaire && Object.keys(internship.questionnaire).length > 0 && (
          <div>
            <strong>Опросник:</strong>
            <pre>{JSON.stringify(internship.questionnaire, null, 2)}</pre>
          </div>
        )}
      </div>
      
      {!applied ? (
        <button onClick={handleApply} className="apply-btn">
          📩 Подать заявку на стажировку
        </button>
      ) : (
        <p className="success-message">✅ Заявка подана! Ждите ответа.</p>
      )}
    </div>
  );
}

export default InternshipDetail;