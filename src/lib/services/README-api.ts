export async function fetchReadme(documentPath: string) {
  const BASE_URL = `https://raw.githubusercontent.com/${documentPath}/main/README.md`;

  const response = await fetch(BASE_URL, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch README file");
  }
  const text = await response.text();

  return text;
}
