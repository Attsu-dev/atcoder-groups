import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AcRankList from "../components/AcRankList";
import MemberList from "../components/MemberList";
import { type AcRankSummary, fetchGroupAcRanks } from "../lib/atcoderProblems";
import { fetchMemberIds } from "../lib/gist";

export default function Group() {
  const { gistId } = useParams<{ gistId: string }>();
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(Boolean(gistId));
  const [error, setError] = useState<string | null>(null);
  const [acRanks, setAcRanks] = useState<AcRankSummary[]>([]);
  const [rankLoading, setRankLoading] = useState(false);
  const [rankError, setRankError] = useState<string | null>(null);

  useEffect(() => {
    if (!gistId) {
      return;
    }

    let ignore = false;

    (async () => {
      setLoading(true);
      setError(null);

      try {
        const memberIds = await fetchMemberIds(gistId);

        if (!ignore) {
          setMembers(memberIds);
          setAcRanks([]);
        }
      } catch (err) {
        if (!ignore) {
          setError(
            err instanceof Error ? err.message : "メンバーの取得に失敗しました",
          );
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [gistId]);

  useEffect(() => {
    if (members.length === 0) {
      return;
    }

    let ignore = false;

    (async () => {
      setRankLoading(true);
      setRankError(null);

      try {
        const rankings = await fetchGroupAcRanks(members);

        if (!ignore) {
          setAcRanks(rankings);
        }
      } catch {
        if (!ignore) {
          setRankError("AC数ランキングの取得に失敗しました");
        }
      } finally {
        if (!ignore) {
          setRankLoading(false);
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, [members]);

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 flex flex-col gap-4 border-b border-slate-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to="/"
              className="mb-3 inline-flex text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              ホームに戻る
            </Link>
            <h1 className="text-3xl font-bold text-slate-950">
              AtCoder Groups
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Gistに登録されたメンバーのAtCoder IDを表示しています。
            </p>
          </div>

          {gistId && (
            <div className="rounded border border-slate-200 bg-white px-4 py-3 text-sm">
              <p className="font-medium text-slate-700">Gist ID</p>
              <p className="mt-1 max-w-72 break-all font-mono text-slate-500">
                {gistId}
              </p>
            </div>
          )}
        </header>

        {!gistId && (
          <StatusPanel
            title="Gist IDが指定されていません"
            description="ホームでGistのURLを入力して、グループページを作成してください。"
          />
        )}

        {gistId && loading && <LoadingPanel />}

        {gistId && !loading && error && (
          <StatusPanel
            title="メンバーを取得できませんでした"
            description={error}
            tone="error"
          />
        )}

        {gistId && !loading && !error && members.length === 0 && (
          <StatusPanel
            title="メンバーが登録されていません"
            description="GistにAtCoder IDを1行に1つずつ入力してください。英数字とアンダースコアのみが読み込まれます。"
          />
        )}

        {gistId && !loading && !error && members.length > 0 && (
          <div className="space-y-8">
            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    AC数ランキング
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    AtCoder Problemsの公開APIから取得したAC数で並べています。
                  </p>
                </div>
              </div>

              {rankLoading && <RankingLoadingPanel />}

              {!rankLoading && rankError && (
                <StatusPanel
                  title="ランキングを取得できませんでした"
                  description={rankError}
                  tone="error"
                />
              )}

              {!rankLoading && !rankError && acRanks.length > 0 && (
                <AcRankList rankings={acRanks} />
              )}
            </section>

            <section>
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    メンバー
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {members.length}人のメンバーが登録されています。
                  </p>
                </div>
              </div>
              <MemberList members={members} />
            </section>
          </div>
        )}
      </div>
    </main>
  );
}

type StatusPanelProps = {
  title: string;
  description: string;
  tone?: "default" | "error";
};

function StatusPanel({
  title,
  description,
  tone = "default",
}: StatusPanelProps) {
  const toneClass =
    tone === "error"
      ? "border-red-200 bg-red-50 text-red-700"
      : "border-slate-200 bg-white text-slate-600";

  return (
    <section className={`rounded border p-6 ${toneClass}`}>
      <h2 className="text-lg font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm">{description}</p>
    </section>
  );
}

function LoadingPanel() {
  return (
    <section className="rounded border border-slate-200 bg-white p-6">
      <p className="mb-4 text-sm font-medium text-slate-700">
        メンバーを読み込んでいます...
      </p>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-20 animate-pulse rounded border border-slate-200 bg-slate-100"
          />
        ))}
      </div>
    </section>
  );
}

function RankingLoadingPanel() {
  return (
    <div className="rounded border border-slate-200 bg-white p-4">
      <p className="mb-3 text-sm font-medium text-slate-700">
        AC数ランキングを読み込んでいます...
      </p>
      <div className="space-y-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-12 animate-pulse rounded bg-slate-100"
          />
        ))}
      </div>
    </div>
  );
}
