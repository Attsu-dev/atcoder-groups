import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MemberList from "../components/MemberList";
import { fetchMemberIds } from "../lib/gist";

export default function Group() {
  const { gistId } = useParams<{ gistId: string }>();
  const [members, setMembers] = useState<string[]>([]);
  const [loading, setLoading] = useState(Boolean(gistId));
  const [error, setError] = useState<string | null>(null);

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

  if (!gistId) {
    return <p>Gist IDが指定されていません</p>;
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return <MemberList members={members} />;
}
