export async function fetchPhotos(page = 1, limit = 4) {
  const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
  if (!response.ok) {
    throw new Error('Failed to fetch photos');
  }
  return response.json();
}
