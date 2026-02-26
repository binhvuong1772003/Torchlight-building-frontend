// types/affix.ts
export interface RollTableInput {
  category: 'WEAPON' | 'ARMOR' | 'ACCESSORY';
  min: number;
  max: number;
}

export interface StatInput {
  statKey: string;
  rollTables: RollTableInput[];
}

export interface CreateAffixInput {
  key: string;
  name: string;
  description?: string;
  type: 'PREFIX' | 'SUFFIX';
  tier: number;
  tierlevel: number;
  tags: string;
  minItemLevel: number;
  maxItemLevel?: number | null;
  stats: StatInput[];
}

export interface StatDefinition {
  id: string;
  key: string;
  name: string;
}
