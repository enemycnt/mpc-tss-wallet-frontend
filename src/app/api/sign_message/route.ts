import { toHex } from "viem";
type DataForSignature = {
  messageText: string;
  walletAddress: string;
};

export async function POST(request: Request) {
  const requestData = (await request.json()) as DataForSignature;
  const hexMessage = toHex(requestData.messageText);
  const res = await fetch(`${process.env.API_HOST}/sign`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      data: hexMessage,
      wallet: requestData.walletAddress,
    }),
  });
  const data = await res.json();
  return Response.json({ data });
}
