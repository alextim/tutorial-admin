export async function validateResponse(res: Response) {
  if (res.ok) {
    return;
  }
  if (res.status === 0) {
    throw new Error('Server unavailable');
  }
  const body = await res.json();
  throw new Error(body?.message || res.statusText);
}
