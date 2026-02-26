import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import {
  CreateAffixFormData,
  createAffixSchema,
} from '@/lib/validations/affixSchema';
import { toast } from 'sonner';
import {
  createAffixService,
  getStatDefinitions,
} from '@/services/affixService';
import type { StatDefinition } from '@/types/affix';
export const useCreateAffix = () => {
  const navigate = useNavigate();
  const [statDefs, setStatDefs] = useState<StatDefinition[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const [apiError, setApiError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
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
  const form = useForm<CreateAffixFormData>({
    resolver: zodResolver(createAffixSchema),
    defaultValues: {
      key: '',
      name: '',
      description: '',
      type: 'PREFIX',
      tier: 1,
      tierlevel: 1,
      tags: '',
      minItemLevel: 1,
      maxItemLevel: null,
      stats: [
        { statKey: '', rollTables: [{ category: 'WEAPON', min: 0, max: 0 }] },
      ],
    },
  });
  const {
    fields: statFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({ control: form.control, name: 'stats' });
  const onSubmit = async (data: CreateAffixFormData) => {
    setApiError('');
    setIsSubmitting(true);
    try {
      await createAffixService(data);
      toast.success('Base Affix created successfully!');
      navigate('/admin/affixes');
    } catch (err: any) {
      toast.success('Base Affix created Fail!');
      setApiError(err?.response?.data?.message || 'Failed to create affix');
    } finally {
      setIsSubmitting(false);
    }
  };
  return {
    form,
    statFields,
    appendStat,
    removeStat,
    statDefs,
    isLoadingStats,
    apiError,
    isSubmitting,
    onSubmit,
  };
};
