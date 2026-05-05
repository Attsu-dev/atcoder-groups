export function extractGistId(input: string): string | null {
  const trimmedInput = input.trim();

  if (/^[a-f0-9]{20,}$/i.test(trimmedInput)) {
    return trimmedInput;
  }

  const match = trimmedInput.match(
    /^https?:\/\/gist\.github\.com\/[^/]+\/([a-f0-9]{20,})(?:\/.*)?$/i,
  );

  return match?.[1] ?? null;
}
