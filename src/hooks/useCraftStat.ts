import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  createStatSchema,
  createStateFormData,
} from '@/lib/validations/statSchema';
import { createStatService } from '@/services/statService';
import type { createStatInput } from '@/types/stat';
export const useCreateStat = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<createStateFormData>({
    resolver: zodResolver(createStatSchema),
    defaultValues: {
      key: '',
      name: '',
      description: '',
      valueType: 'FLAT',
      category: 'OFFENSIVE',
    },
  });
  const name = form.watch('name');
  useEffect(() => {
    const key = name?.toLowerCase().trim().replace(/\s+/g, '_');
    form.setValue('key', key);
    form.setValue('description', name);
  });
  const onSubmit = async (data: createStatInput) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      await createStatService(data);
      toast.success('Stat created successfully!');
      form.reset();
    } catch (err: any) {
      toast.error('Failed to create stat!');
      setApiError(err?.response?.data?.message || 'Failed to create affix');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    apiError,
    isSubmitting,
    form,
    onSubmit,
  };
};
