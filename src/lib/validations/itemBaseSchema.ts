// lib/validations/itemBaseSchema.ts
import { z } from 'zod';

const categories = [
  'WEAPON',
  'SHIELD',
  'HELMET',
  'CHEST',
  'GLOVES',
  'BELT',
  'SHOES',
  'AMULET',
  'RING',
] as const;

export const createItemBaseSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  name: z.string().min(3, 'Name must be at least 3 characters').max(100),
  description: z.string(),
  category: z.enum(categories, { message: 'Category is required' }),
  baseAffixKeys: z.array(z.string().min(1)).default([]),
});

export type CreateItemBaseFormData = z.infer<typeof createItemBaseSchema>;
