async function fetchText(url: string): Promise<string> {
  const resp = await fetch(url);
  return resp.text();
}

export const mathDsl = await fetchText("/examples/mathdsl.py");

export const example = await fetchText("/examples/example.py");
