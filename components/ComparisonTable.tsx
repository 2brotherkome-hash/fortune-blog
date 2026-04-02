import affiliates from "@/data/affiliates.json";

type ComparisonTableProps = {
  ids: string[];
};

export default function ComparisonTable({ ids }: ComparisonTableProps) {
  const items = ids
    .map((id) => {
      const aff = affiliates[id as keyof typeof affiliates];
      return aff ? { id, ...aff } : null;
    })
    .filter(Boolean) as (typeof affiliates[keyof typeof affiliates] & { id: string })[];

  if (items.length === 0) return null;

  return (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-gray-50">
            <th className="text-left p-4 text-sm font-bold text-gray-700 border-b">
              サービス名
            </th>
            <th className="text-left p-4 text-sm font-bold text-gray-700 border-b">
              特徴
            </th>
            <th className="text-center p-4 text-sm font-bold text-gray-700 border-b">
              申し込み
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => (
            <tr key={item.id} className={i % 2 === 1 ? "bg-gray-50" : ""}>
              <td className="p-4 border-b">
                <div className="font-bold text-gray-900">{item.name}</div>
                <div className="text-xs text-gray-500 mt-1">{item.description}</div>
              </td>
              <td className="p-4 border-b">
                <ul className="space-y-1">
                  {item.features.map((f) => (
                    <li key={f} className="text-sm text-gray-700 flex items-center gap-1">
                      <span className="text-green-500">&#10003;</span> {f}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="p-4 border-b text-center">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-block bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  口座開設
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
