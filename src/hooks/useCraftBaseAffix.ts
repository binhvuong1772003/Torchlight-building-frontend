import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  CreateBaseAffixFormData,
  createBaseAffixSchema,
} from '@/lib/validations/affixSchema';
import {
  createBaseAffixService,
  getStatDefinitions,
} from '@/services/affixService';
import type { CreateBaseAffixInput } from '@/types/affix';
import type { StatDefinition } from '@/types/affix';
export const useCraftBaseAffix = () => {
  const [apiError, setApiError] = useState('');
  const [statDefs, setStatDefs] = useState<StatDefinition[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<CreateBaseAffixFormData>({
    resolver: zodResolver(createBaseAffixSchema),
    defaultValues: {
      key: '',
      name: '',
      description: '',
      minItemLevel: 1,
      isPriceless: false,
      stats: [{ statKey: '', value: 0 }],
    },
  });
  useEffect(() => {
    const fetchStatDefs = async () => {
      setIsLoadingStats(true);
      try {
        const data = await getStatDefinitions();
        setStatDefs(data);
      } catch (err: any) {
        console.error('Failed to fetch stat definitions:', err);
      } finally {
        setIsLoadingStats(false);
      }
    };
    fetchStatDefs();
  }, []);
  const name = form.watch('name');
  useEffect(() => {
    const key = name?.toLowerCase().trim().replace(/\s+/g, '_');
    form.setValue('key', key);
    form.setValue('description', name);
  });
  const {
    fields: statFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({ control: form.control, name: 'stats' });
  const onSubmit = async (data: CreateBaseAffixInput) => {
    setIsSubmitting(true);
    setApiError('');
    try {
      await createBaseAffixService(data);
      toast.success('Base Affix created successfully!');
    } catch (err: any) {
      toast.success('Base Affix created Fail!');
      setApiError(err?.response?.data?.message || 'Failed to create affix');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    isSubmitting,
    apiError,
    onSubmit,
    isLoadingStats,
    statFields,
    appendStat,
    removeStat,
    form,
    statDefs,
  };
};
