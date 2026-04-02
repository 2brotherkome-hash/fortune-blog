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
        className="text-blue-600 font-medium hover:underline"
      >
        {aff.name}
      </a>
    );
  }

  if (variant === "card") {
    return (
      <div className="border border-gray-200 rounded-lg p-5 bg-white">
        <h4 className="font-bold text-gray-900 mb-2">{aff.name}</h4>
        <p className="text-sm text-gray-600 mb-3">{aff.description}</p>
        <ul className="flex flex-wrap gap-2 mb-4">
          {aff.features.map((f) => (
            <li
              key={f}
              className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded"
            >
              {f}
            </li>
          ))}
        </ul>
        <a
          href={aff.url}
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="block w-full text-center bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          無料で口座開設する
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
      className="inline-flex items-center gap-2 bg-blue-600 text-white font-bold px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      {aff.name}を無料で口座開設
    </a>
  );
}
