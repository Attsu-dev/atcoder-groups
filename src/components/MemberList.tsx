type MemberListProps = {
  members: string[];
};

export default function MemberList({ members }: MemberListProps) {
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((member) => (
        <li key={member}>
          <a
            href={`https://atcoder.jp/users/${member}`}
            target="_blank"
            rel="noreferrer"
            className="block rounded border border-slate-200 bg-white p-4 transition hover:border-blue-300 hover:shadow-sm"
          >
            <p className="truncate font-mono text-lg font-semibold text-slate-950">
              {member}
            </p>
            <p className="mt-2 text-sm text-slate-500">
              AtCoderプロフィールを開く
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
}
