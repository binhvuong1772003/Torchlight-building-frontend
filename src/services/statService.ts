import axiosClient from '@/api/axiosClient';
import type { createStatInput, StatDefinition } from '@/types/stat';
export const createStatService = async (data: createStatInput) => {
  const { data: res } = await axiosClient.post('/create-stat', data);
  return res;
};
export const getStatDefinitions = async (): Promise<StatDefinition[]> => {
  const { data } = await axiosClient.get('/stats');
  return data.data;
};
