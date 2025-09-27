export type ScoreInput = { requirements?: string; summary?: string; title?: string; };
const keywords = (txt?: string) => (txt||'').toLowerCase().split(/[^a-zA-Z؀-ۿ0-9]+/).filter(Boolean);

export function simpleScore({ requirements, summary, title }: ScoreInput): {score:number, notes:string} {
  const req = new Set(keywords(requirements + ' ' + title));
  const cand = keywords(summary);
  if (req.size === 0 || cand.length === 0) return { score: 50, notes: "لا توجد كلمات مفتاحية كافية" };
  let hit = 0;
  for (const w of cand) if (req.has(w)) hit++;
  const score = Math.min(100, Math.round((hit / Math.max(6, req.size)) * 100));
  return { score, notes: `تطابق ${hit} كلمات مفتاحية من ${req.size}` };
}
