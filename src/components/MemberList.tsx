type MemberListProps = {
  members: string[];
};

export default function MemberList({ members }: MemberListProps) {
  return (
    <ul>
      {members.map((member) => (
        <li key={member}>{member}</li>
      ))}
    </ul>
  );
}
