import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const generateUrl = () => {
    const match = input.match(/gist\.github\.com\/[^/]+\/([a-zA-Z0-9]+)/);

    if (!match) {
      setResult("URLが正しくありません");
      return;
    }

    const gistId = match[1];

    const url = `${window.location.origin}/${gistId}`;

    setResult(url);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AtCoder Groups</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">このサイトについて</h2>
        <p className="text-gray-700 mb-2">
          AtCoder Groupsでは、グループ内でのAC数ランキングなどを確認できます。
        </p>
        <a href="" className="text-blue-500 underline">
          例を見る
        </a>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">使い方</h2>
        <ol className="list-decimal list-inside space-y-3 text-gray-800">
          <li>
            <a
              href="https://gist.github.com/"
              target="_blank"
              className="text-blue-500 underline"
            >
              GitHub Gist
            </a>
            にアクセス
          </li>

          <li>
            各行にメンバーのAtCoderIDを入力
            <br />
            <a
              href="https://gist.github.com/Attsu-dev/0c3b58a297417e2ee64bf182aec22f91"
              className="text-blue-500 underline text-sm"
            >
              例を見る
            </a>
          </li>

          <li>"Create secret gist" を押して保存</li>

          <li>
            gistのURLを以下に入力
            <div className="flex mt-2 gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://gist.github.com/username/gistid"
                className="flex-1 border rounded px-3 py-2"
              />
              <button
                onClick={generateUrl}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                URLを生成
              </button>
            </div>
          </li>

          <li>
            生成されたURLにアクセス
            <div className="mt-2 flex gap-2 items-start">
              <div className="flex-1 p-3 border rounded bg-gray-50 text-sm text-gray-600 break-all">
                {result || "（ここにURLが表示されます）"}
              </div>
              <button
                onClick={() => window.open(result, "_blank")}
                disabled={!result}
                className={`px-4 py-2 rounded whitespace-nowrap ${
                  result
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                開く
              </button>
            </div>
          </li>
        </ol>
      </section>
    </div>
  );
}
