import React, { useState, useEffect } from 'react';
import { fetchPhotos } from '../api/photosApi';

const Gallery = () => {
  const savedPage = Number(localStorage.getItem('page')) || 1;
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(savedPage);

  useEffect(() => {
    const loadPhotos = async () => {
      setLoading(true);
      try {
        const data = await fetchPhotos(page, 4);
        setPhotos(data);
        localStorage.setItem('page', page);
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPhotos();
  }, [page]);

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Галерея</h1>
      {loading ? (
        <p>Завантаження...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {photos.map(photo => (
            <div key={photo.id} className="border p-2 rounded shadow">
              <img src={photo.download_url} alt={photo.author} className="w-full h-48 object-cover rounded" />
              <p className="mt-2 text-sm text-center">Автор: {photo.author}</p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePrev}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          disabled={page === 1}
        >
          Попередні
        </button>
        <span>Сторінка: {page}</span>
        <button
          onClick={handleNext}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Наступні
        </button>
      </div>
    </div>
  );
};

export default Gallery;
