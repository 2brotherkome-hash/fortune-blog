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
        className="inline-block bg-gradient-to-r from-purple-500 to-violet-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:from-purple-400 hover:to-violet-400 transition-all shadow-lg shadow-purple-900/50"
      >
        {text || `${aff.name}を無料で登録する`}
      </a>
      <p className="text-xs text-purple-400/50 mt-2">※無料会員登録後すぐに相談できます</p>
    </div>
  );
}
