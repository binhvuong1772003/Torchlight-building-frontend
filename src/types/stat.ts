export interface createStatInput {
  key: string;
  name: string;
  description?: string;
  valueType: 'FLAT' | 'PERCENTAGE' | 'MULTIPLIER';
  category: 'OFFENSIVE' | 'DEFENSIVE' | 'UTILITY' | 'RESOURCE';
}
export interface StatDefinition {
  id: string;
  key: string;
  name: string;
}
