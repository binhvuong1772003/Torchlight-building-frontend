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
export interface BaseStatInput {
  statKey: string;
  value: number;
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
export interface CreateBaseAffixInput {
  key: string;
  name: string;
  description?: string;
  minItemLevel: number;
  isPriceless: boolean;
  stats: BaseStatInput[];
}

export interface StatDefinition {
  id: string;
  key: string;
  name: string;
}
export interface BaseAffixStat {
  id: string;
  statDefId: string;
  value: number;
  statDef: {
    id: string;
    key: string;
    name: string;
    valueType: string;
    category: string;
  };
}

export interface BaseAffix {
  id: string;
  key: string;
  name: string;
  description?: string;
  minItemLevel: number;
  isPriceless: boolean;
  stats: BaseAffixStat[];
  createdAt: string;
  updatedAt: string;
}
