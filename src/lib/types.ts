// src/lib/types.ts

export type StatValueType = 'FLAT' | 'PERCENTAGE' | 'MULTIPLIER';
export type StatCategory = 'OFFENSIVE' | 'DEFENSIVE' | 'UTILITY' | 'RESOURCE';
export type AffixType = 'PREFIX' | 'SUFFIX' | 'LEGENDARY';
export type AffixTier = 'BASIC' | 'ADVANCE' | 'ULTIMATE' | 'LEGENDARY';
export type ItemCategory =
  | 'WEAPON'
  | 'SHIELD'
  | 'HELMET'
  | 'CHEST'
  | 'GLOVES'
  | 'BELT'
  | 'SHOES'
  | 'AMULET'
  | 'RING';

export interface StatDefinition {
  id: string;
  key: string;
  name: string;
  description?: string;
  valueType: StatValueType;
  category: StatCategory;
  icon?: string;
  color?: string;
}

export interface RollTable {
  category: ItemCategory;
  minValue: number;
  maxValue: number;
}

export interface AffixStatInput {
  statKey: string;
  rollTables: RollTable[];
}

export interface CreateAffixInput {
  key: string;
  name: string;
  description?: string;
  type: AffixType;
  tier: AffixTier;
  tierlevel: number;
  minItemLevel: number;
  maxItemLevel?: number;
  tags: string[];
  stats: AffixStatInput[];
}
