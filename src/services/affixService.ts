import axiosClient from '@/api/axiosClient';
import type {
  CreateAffixInput,
  StatDefinition,
  CreateBaseAffixInput,
  BaseAffix,
} from '@/types/affix';
export const createAffixService = async (data: CreateAffixInput) => {
  const { data: res } = await axiosClient.post('/create-affix', {
    ...data,
    tags: data.tags
      .split('')
      .map((t) => t.trim())
      .filter(Boolean),
  });
  return res;
};
export const getStatDefinitions = async (): Promise<StatDefinition[]> => {
  const { data } = await axiosClient.get('/stats');
  return data.data;
};
export const createBaseAffixService = async (data: CreateBaseAffixInput) => {
  const { data: res } = await axiosClient.post('/create-base-affix', data);
  return res;
};
export const getBaseAffixService = async (): Promise<BaseAffix[]> => {
  const { data } = await axiosClient.get('/base-affix');
  return data.data;
};
