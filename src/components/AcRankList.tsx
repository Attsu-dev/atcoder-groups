import {
  type AcRankSummary,
  sortAcRankSummaries,
} from "../lib/atcoderProblems";

type AcRankListProps = {
  rankings: AcRankSummary[];
};

export default function AcRankList({ rankings }: AcRankListProps) {
  const sortedRankings = sortAcRankSummaries(rankings);

  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <table className="w-full border-collapse text-left text-sm">
        <thead className="bg-slate-100 text-slate-600">
          <tr>
            <th className="w-16 px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">ユーザー</th>
            <th className="px-4 py-3 text-right font-medium">AC数</th>
            <th className="hidden px-4 py-3 text-right font-medium sm:table-cell">
              全体順位
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {sortedRankings.map((ranking, index) => (
            <tr key={ranking.userId}>
              <td className="px-4 py-3 text-slate-500">{index + 1}</td>
              <td className="px-4 py-3">
                <a
                  href={`https://atcoder.jp/users/${ranking.userId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono font-semibold text-slate-950 hover:text-blue-600"
                >
                  {ranking.userId}
                </a>
                {ranking.error && (
                  <p className="mt-1 text-xs text-red-600">{ranking.error}</p>
                )}
              </td>
              <td className="px-4 py-3 text-right font-semibold text-slate-950">
                {ranking.acCount?.toLocaleString() ?? "-"}
              </td>
              <td className="hidden px-4 py-3 text-right text-slate-600 sm:table-cell">
                {ranking.rank ? `${ranking.rank.toLocaleString()}位` : "-"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
