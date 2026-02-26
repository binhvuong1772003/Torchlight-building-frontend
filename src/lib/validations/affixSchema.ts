// lib/validations/affixSchema.ts
import { z } from 'zod';

// lib/validations/affixSchema.ts
export const rollTableSchema = z.object({
  category: z.enum(['WEAPON', 'ARMOR', 'ACCESSORY']),
  min: z.number(),
  max: z.number(),
});

export const statSchema = z.object({
  statKey: z.string().min(1, 'Stat key is required'),
  rollTables: z.array(rollTableSchema).min(1, 'At least one roll table'),
});

export const createAffixSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  type: z.enum(['PREFIX', 'SUFFIX', 'LEGENDARY', 'BASE']),
  tier: z.number().min(1),
  tierlevel: z.number().min(1),
  tags: z.string(),
  minItemLevel: z.number().min(1),
  maxItemLevel: z.number().nullable().optional(),
  stats: z.array(statSchema).min(1, 'At least one stat'),
});
export const createBaseAffixSchema = z.object({
  key: z.string().min(1),
  name: z.string().min(1),
  description: z.string().optional(),
  minItemLevel: z.number().int().min(1),
  isPriceless: z.boolean(),
  stats: z.array(
    z.object({
      statKey: z.string().min(1),
      value: z.number(),
    })
  ),
});

export type CreateBaseAffixFormData = z.infer<typeof createBaseAffixSchema>;

export type CreateAffixFormData = z.infer<typeof createAffixSchema>;
