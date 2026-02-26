ex;
// types/itemBase.ts
export interface CreateItemBaseInput {
  key: string;
  name: string;
  description?: string;
  category:
    | 'WEAPON'
    | 'SHIELD'
    | 'HELMET'
    | 'CHEST'
    | 'GLOVES'
    | 'BELT'
    | 'SHOES'
    | 'AMULET'
    | 'RING';
  baseAffixKeys?: string[];
}

export interface ItemBase {
  id: string;
  key: string;
  name: string;
  description?: string;
  category: string;
  imageId?: string;
  image?: {
    id: string;
    url: string;
    secureUrl: string;
    publicId: string;
  };
  baseAffixes?: {
    baseAffix: {
      id: string;
      key: string;
      name: string;
      isPriceless: boolean;
      minItemLevel: number;
    };
  }[];
  createdAt: string;
  updatedAt: string;
}
