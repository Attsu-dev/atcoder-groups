import { type FormEvent, useState } from "react";
import { extractGistId } from "../lib/url";

export default function Home() {
  const [input, setInput] = useState("");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [error, setError] = useState("");

  const generateUrl = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const gistId = extractGistId(input);

    if (!gistId) {
      setGeneratedUrl("");
      setError("GistのURL、またはGist IDを入力してください。");
      return;
    }

    setGeneratedUrl(`${window.location.origin}/${gistId}`);
    setError("");
  };

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
        <header className="mb-8 border-b border-slate-200 pb-6">
          <h1 className="text-3xl font-bold text-slate-950">
            AtCoder Groups
          </h1>
          <p className="mt-3 text-slate-600">
            AtCoderの活動状況を、Gistに書いたメンバー一覧から共有するためのページを作成します。
          </p>
        </header>

        <section className="mb-8 rounded border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-950">
            グループページを作る
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            GistのURLかGist IDを入力すると、共有用のURLを生成します。
          </p>

          <form onSubmit={generateUrl} className="mt-5">
            <label
              htmlFor="gist-url"
              className="text-sm font-medium text-slate-700"
            >
              Gist URL
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <input
                id="gist-url"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="https://gist.github.com/username/gistid"
                className="min-w-0 flex-1 rounded border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700">
                URLを生成
              </button>
            </div>
          </form>

          {error && (
            <p className="mt-3 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </p>
          )}

          <div className="mt-4 rounded border border-slate-200 bg-slate-50 p-4">
            <p className="text-sm font-medium text-slate-700">生成されたURL</p>
            {generatedUrl ? (
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
                <a
                  href={generatedUrl}
                  className="min-w-0 flex-1 break-all font-mono text-sm text-blue-600 underline"
                >
                  {generatedUrl}
                </a>
                <a
                  href={generatedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded border border-slate-300 bg-white px-4 py-2 text-center text-sm font-medium text-slate-700 hover:bg-slate-100"
                >
                  開く
                </a>
              </div>
            ) : (
              <p className="mt-2 text-sm text-slate-500">
                ここに共有用URLが表示されます。
              </p>
            )}
          </div>
        </section>

        <section className="rounded border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-semibold text-slate-950">使い方</h2>
          <ol className="mt-4 space-y-4 text-sm text-slate-700">
            <li>
              <p className="font-medium text-slate-950">1. Gistを作成</p>
              <p className="mt-1">
                <a
                  href="https://gist.github.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline"
                >
                  GitHub Gist
                </a>
                で、各行にメンバーのAtCoder IDを書きます。
              </p>
            </li>

            <li>
              <p className="font-medium text-slate-950">2. Secret gistで保存</p>
              <p className="mt-1">
                保存後のGist URLをこのページの入力欄に貼り付けます。
              </p>
            </li>

            <li>
              <p className="font-medium text-slate-950">3. URLを共有</p>
              <p className="mt-1">
                生成されたURLにアクセスすると、メンバー一覧ページを開けます。
              </p>
            </li>
          </ol>

          <a
            href="https://gist.github.com/Attsu-dev/0c3b58a297417e2ee64bf182aec22f91"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex text-sm font-medium text-blue-600 underline"
          >
            Gistの例を見る
          </a>
        </section>
      </div>
    </main>
  );
}
