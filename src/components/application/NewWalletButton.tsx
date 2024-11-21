"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewWalletButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function createWallet() {
    try {
      setIsLoading(true);
      const res = await fetch("/api/create_wallet", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const data = await res.json();
      setIsLoading(false);
      router.refresh();
    } catch (e) {
      console.error(e);
      setIsLoading(false);
    }
  }

  return (
    <Button
      colorPalette="yellow"
      loading={isLoading}
      loadingText="Creating..."
      onClick={() => createWallet()}
    >
      Create a new wallet
    </Button>
  );
}
