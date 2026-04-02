import affiliates from "@/data/affiliates.json";

type AffiliateData = {
  name: string;
  category: string;
  asp: string;
  url: string;
  reward: number;
  description: string;
  features: string[];
  active: boolean;
};

export function getAffiliate(id: string): AffiliateData | null {
  const aff = affiliates[id as keyof typeof affiliates];
  return aff || null;
}

export function getAffiliatesByCategory(category: string): (AffiliateData & { id: string })[] {
  return Object.entries(affiliates)
    .filter(([, v]) => v.category === category && v.active)
    .map(([id, v]) => ({ id, ...v }));
}

export function getActiveAffiliates(): (AffiliateData & { id: string })[] {
  return Object.entries(affiliates)
    .filter(([, v]) => v.active)
    .map(([id, v]) => ({ id, ...v }));
}
