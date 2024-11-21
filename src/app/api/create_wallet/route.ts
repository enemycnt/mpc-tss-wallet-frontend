// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function POST(_request: Request) {
  const res = await fetch(`${process.env.API_HOST}/wallet`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  return Response.json({ data });
}
