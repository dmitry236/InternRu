import React from 'react';
import { Link } from 'react-router-dom';

function InternshipCard({ internship }) {
  // Адаптируем под реальные поля
  return (
    <div className="internship-card">
      <h3>{internship.job_title || internship.title}</h3>
      <p><strong>Компания:</strong> {internship.company}</p>
      <p><strong>Локация:</strong> {internship.location || 'Не указана'}</p>
      <p><strong>Тип:</strong> {internship.contract_type || 'Не указан'}</p>
      <p><strong>Категория:</strong> {internship.job_category || 'Не указана'}</p>
      <p><strong>Дедлайн:</strong> {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'Не указан'}</p>
      <Link to={`/internship/${internship.slug}`} className="details-link">
        Подробнее
      </Link>
    </div>
  );
}

export default InternshipCard;