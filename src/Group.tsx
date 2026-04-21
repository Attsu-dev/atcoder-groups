import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Group() {
  const { gistId } = useParams<{ gistId: string }>();
  const [list, setList] = useState<string[]>([]);

  useEffect(() => {
    if (!gistId) return;

    (async () => {
      let rawUrl = localStorage.getItem(gistId);

      if (!rawUrl) {
        const res = await fetch(`https://api.github.com/gists/${gistId}`);
        const data = await res.json();

        rawUrl = Object.values<any>(data.files)[0].raw_url;
        if (!rawUrl) {
          alert("Gistの取得に失敗しました");
          return;
        }
        localStorage.setItem(gistId, rawUrl);
      }

      const text = await fetch(rawUrl).then((r) => r.text());

      setList(
        Array.from(
          new Set(
            text
              .split("\n")
              .map((s) => s.trim())
              .filter((s) => /^[a-zA-Z0-9_]+$/.test(s)),
          ),
        ),
      );
    })();
  }, [gistId]);

  return (
    <ul>
      {list.map((v, i) => (
        <li key={i}>{v}</li>
      ))}
    </ul>
  );
}
