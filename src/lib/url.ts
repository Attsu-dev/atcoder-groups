export function extractGistId(input: string): string | null {
  const match = input.match(/gist\.github\.com\/[^/]+\/([a-zA-Z0-9]+)/);
  return match?.[1] ?? null;
}
