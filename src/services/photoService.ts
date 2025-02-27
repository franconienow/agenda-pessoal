import api from './api';

export async function getPhoto(photoId: number): Promise<string> {
  try {
    const response = await api.get('/foto/download/' + photoId, {
      responseType: 'blob',
    });
    return URL.createObjectURL(response.data);
  } catch (error) {
    console.error('Erro no download:', error);
    throw new Error('Failed to get');
  }
}

export async function uploadPhoto(personId: number, formData: FormData): Promise<any> {
  try {
    const response = await api.post('/foto/upload/' + personId, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  } catch (error) {
    console.error('Erro no download:', error);
    throw new Error('Failed to get');
  }
}
