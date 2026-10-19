import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInternship } from '../api/endpoints';

function PostInternshipPage() {
  const [formData, setFormData] = useState({
    company: '',
    job_title: '',
    job_description: '',
    location: '',
    working_language: 'Russian',
    contract_type: 'Internship',
    job_category: 'IT / SOftware development',  // ← ИСПРАВЛЕНО!
    email: '',
    company_size: '0-10',  // ← ИСПРАВЛЕНО!
    industry: 'Technology',
    deadline: '',
    logo: null,
    job_link: '',
    candidate_range: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    
    if (type === 'file') {
      setFormData({
        ...formData,
        [name]: files[0]
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Генерируем slug
    const slug = `${formData.job_title}-${formData.company}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    
    //  const randomSuffix = Math.floor(Math.random() * 1000);
    //  slug = `${slug}-${randomSuffix}`;


    const dataToSend = {
      ...formData,
      slug: slug
    };
    
    console.log('📤 Отправка данных:', dataToSend);
    
    try {
      const response = await createInternship(dataToSend);
      console.log('✅ Успешно создано:', response.data);
      alert('🎉 Стажировка успешно создана!');
      navigate('/');
    } catch (error) {
      console.error('❌ Ошибка:', error);
      
      if (error.response?.data) {
        const errors = error.response.data;
        let errorMessage = '';
        for (const [field, messages] of Object.entries(errors)) {
          errorMessage += `${field}: ${messages}\n`;
        }
        setError(errorMessage);
      } else {
        setError('Ошибка при создании стажировки. Проверьте все поля.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="post-internship">
      <h2>📝 Разместить стажировку</h2>
      
      {error && (
        <div className="error">
          <strong>Ошибка валидации:</strong>
          <pre style={{whiteSpace: 'pre-wrap', marginTop: '10px'}}>{error}</pre>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>* Название стажировки:</label>
          <input
            type="text"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            placeholder="Например: Python разработчик"
            required
          />
        </div>
        
        <div>
          <label>* Компания:</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Название компании"
            required
          />
        </div>
        
        <div>
          <label>* Описание стажировки:</label>
          <textarea
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            placeholder="Подробное описание стажировки, обязанности, условия"
            rows="5"
            required
          />
        </div>
        
        <div>
          <label>* Локация:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Город или 'Удаленно'"
            required
          />
        </div>
        
        <div>
          <label>* Язык работы:</label>
          <input
            type="text"
            name="working_language"
            value={formData.working_language}
            onChange={handleChange}
            placeholder="Русский, Английский и т.д."
            required
          />
        </div>
        
        <div>
          <label>* Тип контракта:</label>
          <select
            name="contract_type"
            value={formData.contract_type}
            onChange={handleChange}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Freelance">Freelance</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        
        <div>
          <label>* Категория:</label>
          <select
            name="job_category"
            value={formData.job_category}
            onChange={handleChange}
            required
          >
            <option value="IT / SOftware development">IT / SOftware development</option>
            <option value="Design / UX">Design / UX</option>
            <option value="Marketing & Communication">Marketing & Communication</option>
            <option value="Finance">Finance</option>
            <option value="Operations & Support">Operations & Support</option>
            <option value="Other">Other</option>
          </select>
        </div>
        
        <div>
          <label>* Email для связи:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            required
          />
        </div>
        
        <div>
          <label>* Размер компании:</label>
          <select
            name="company_size"
            value={formData.company_size}
            onChange={handleChange}
            required
          >
            <option value="0-10">0-10</option>
            <option value="11-50">11-50</option>
            <option value="51-200">51-200</option>
            <option value="201-500">201-500</option>
            <option value="501-1000">501-1000</option>
            <option value="1001-5000">1001-5000</option>
          </select>
        </div>
        
        <div>
          <label>* Индустрия:</label>
          <select
            name="industry"
            value={formData.industry}
            onChange={handleChange}
            required
          >
            <option value="Saas">Saas</option>
            <option value="E-commerce">E-commerce</option>
            <option value="Technology">Technology</option>
            <option value="Fashion">Fashion</option>
            <option value="Finance">Finance</option>
            <option value="Health">Health</option>
            <option value="Gaming">Gaming</option>
            <option value="Travel">Travel</option>
            <option value="Food">Food</option>
            <option value="Education">Education</option>
            <option value="Transportation">Transportation</option>
            <option value="Music">Music</option>
            <option value="Arts">Arts</option>
            <option value="Others">Others</option>
          </select>
        </div>
        
        <div>
          <label>* Дедлайн подачи:</label>
          <input
            type="date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        
        <div>
          <label>Количество кандидатов (опционально):</label>
          <input
            type="text"
            name="candidate_range"
            value={formData.candidate_range}
            onChange={handleChange}
            placeholder="Например: 5-10"
          />
        </div>
        
        <div>
          <label>Ссылка на вакансию (опционально):</label>
          <input
            type="url"
            name="job_link"
            value={formData.job_link}
            onChange={handleChange}
            placeholder="https://example.com/job"
          />
        </div>
        
        <div>
          <label>Логотип компании (опционально):</label>
          <input
            type="file"
            name="logo"
            accept="image/*"
            onChange={handleChange}
          />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? '⏳ Публикация...' : '🚀 Опубликовать стажировку'}
        </button>
      </form>
    </div>
  );
}

export default PostInternshipPage;