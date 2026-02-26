import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import {
  CreateItemBaseFormData,
  createItemBaseSchema,
} from '@/lib/validations/itemBaseSchema';
import { createItemBaseService } from '@/services/item.service';
import { getBaseAffixService } from '@/services/affixService';
import type { BaseAffix } from '@/types/affix';

export const useCreateItemBase = () => {
  const [apiError, setApiError] = useState('');
  const [baseAffixes, setBaseAffixes] = useState<BaseAffix[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoadingBA, setIsLoadingBA] = useState(false);
  const [files, setFiles] = useState<File[]>([]);

  useEffect(() => {
    const fetchBaseAffix = async () => {
      setIsLoadingBA(true);
      try {
        const data = await getBaseAffixService();
        setBaseAffixes(data);
      } catch (err: any) {
        console.error('Failed to fetch base affix:', err);
      } finally {
        setIsLoadingBA(false);
      }
    };
    fetchBaseAffix();
  }, []);

  const form = useForm<CreateItemBaseFormData>({
    resolver: zodResolver(createItemBaseSchema) as any,
    defaultValues: {
      key: '',
      name: '',
      description: '',
      category: 'WEAPON',
      baseAffixKeys: [''],
    },
  });

  const name = form.watch('name');
  useEffect(() => {
    const key = name?.toLowerCase().trim().replace(/\s+/g, '_');
    form.setValue('key', key);
    form.setValue('description', name);
  }, [name]); // ← dependency array

  const onSubmit = async (data: CreateItemBaseFormData) => {
    setApiError('');
    setIsSubmitting(true);
    try {
      await createItemBaseService(data, files[0] ?? null);
      toast.success('Item Base created successfully!');
      form.reset();
      setFiles([]);
    } catch (err: any) {
      toast.error('Item Base created error!');
      setApiError(err?.response?.data?.message || 'Failed to create');
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    form,
    baseAffixes,
    isLoadingBA,
    isSubmitting,
    apiError,
    files,
    setFiles,
    onSubmit,
  };
};
