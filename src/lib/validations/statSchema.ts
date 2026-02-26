import { z } from 'zod';
export const createStatSchema = z.object({
  key: z.string().min(1, 'Key is required'),
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  valueType: z.enum(['FLAT', 'PERCENTAGE', 'MULTIPLIER']),
  category: z.enum(['OFFENSIVE', 'DEFENSIVE', 'UTILITY', 'RESOURCE']),
});
export type createStateFormData = z.infer<typeof createStatSchema>;
