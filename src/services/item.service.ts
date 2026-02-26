import axiosClient from '@/api/axiosClient';
import type { CreateItemBaseInput } from '@/types/item';
export const createItemBaseService = async (
  data: CreateItemBaseInput,
  imageFile?: File | null
) => {
  const formData = new FormData();
  formData.append('key', data.key);
  formData.append('name', data.name);
  if (data.description) formData.append('description', data.description);
  formData.append('category', data.category);
  data.baseAffixKeys?.forEach((key) => formData.append('baseAffixKeys[]', key));
  if (imageFile) formData.append('image', imageFile);
  const { data: res } = await axiosClient.post('/item-base', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res;
};
