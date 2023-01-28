export async function validateResponse(res: Response) {
  if (res.ok) {
    return;
  }
  let message: string;
  if (res.status === 0) {
    message = 'Server unavailable';
  } else {
    const body = await res.json();
    message = body?.message || res.statusText;
  }

  throw new Error(message);
}
