import React, { useEffect, useState } from 'react';
import { getMyApplications } from '../api/endpoints';

function MyApplicationsPage() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await getMyApplications();
        setApplications(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchApplications();
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="my-applications">
      <h2>Мои заявки на стажировки</h2>
      {applications.length === 0 ? (
        <p>Вы еще не подавали заявки</p>
      ) : (
        <ul>
          {applications.map(app => (
            <li key={app.id}>
              <strong>{app.job_title}</strong> - Компания: {app.company}
              <span className="status">Статус: {app.status || 'На рассмотрении'}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyApplicationsPage;