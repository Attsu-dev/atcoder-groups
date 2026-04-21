import { useParams } from "react-router-dom";

export default function Group() {
  const { gistId } = useParams();

  return <div>gistId: {gistId}</div>;
}