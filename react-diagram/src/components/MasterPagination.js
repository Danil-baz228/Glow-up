import React from 'react';
import './css/MasterPage/MasterPagination.css';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

  // Функция для обработки клика по кнопке
  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      console.log(`Switching to page: ${page}`); // Отладка: проверим, какой номер страницы отправляется
      onPageChange(page);
    }
  };

  return (
    <div className="pagination">
      {/* Кнопка "Назад" */}
      <button
        onClick={() => handleClick(currentPage - 1)}
        disabled={currentPage === 1} // Отключена, если на первой странице
      >
        &lt;
      </button>

      {/* Генерация кнопок для каждой страницы */}
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handleClick(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}

      {/* Кнопка "Вперед" */}
      <button
        onClick={() => handleClick(currentPage + 1)}
        disabled={currentPage === totalPages} // Отключена, если на последней странице
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
