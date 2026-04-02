import affiliates from "@/data/affiliates.json";

type CTAButtonProps = {
  id: string;
  text?: string;
};

export default function CTAButton({ id, text }: CTAButtonProps) {
  const aff = affiliates[id as keyof typeof affiliates];
  if (!aff || !aff.active) return null;

  return (
    <div className="my-8 text-center">
      <a
        href={aff.url}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="inline-block bg-orange-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
      >
        {text || `${aff.name}の口座を無料で開設する`}
      </a>
      <p className="text-xs text-gray-500 mt-2">※申し込みは最短5分で完了します</p>
    </div>
  );
}
