import affiliates from "@/data/affiliates.json";

type AffiliateLinkProps = {
  id: string;
  variant?: "inline" | "button" | "card";
};

export default function AffiliateLink({ id, variant = "button" }: AffiliateLinkProps) {
  const aff = affiliates[id as keyof typeof affiliates];
  if (!aff || !aff.active) return null;

  if (variant === "inline") {
    return (
      <a
        href={aff.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="text-purple-400 font-medium hover:text-purple-300 hover:underline"
      >
        {aff.name}
      </a>
    );
  }

  if (variant === "card") {
    return (
      <div className="border border-purple-200 rounded-lg p-5 bg-white">
        <h4 className="font-bold text-purple-900 mb-2">{aff.name}</h4>
        <p className="text-sm text-purple-600/70 mb-3">{aff.description}</p>
        <ul className="flex flex-wrap gap-2 mb-4">
          {aff.features.map((f) => (
            <li
              key={f}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded"
            >
              {f}
            </li>
          ))}
        </ul>
        <a
          href={aff.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold py-3 rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all"
        >
          無料会員登録はこちら
        </a>
      </div>
    );
  }

  // default: button
  return (
    <a
      href={aff.url}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-bold px-6 py-3 rounded-lg hover:from-purple-500 hover:to-violet-500 transition-all"
    >
      {aff.name} 無料会員登録はこちら
    </a>
  );
}
