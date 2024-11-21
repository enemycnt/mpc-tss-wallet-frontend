import SignatureForm from "@/components/application/SignatureForm";
import { Button } from "@/components/ui/button";
import { Box, Container, Stack } from "@chakra-ui/react";
import Link from "next/link";

export default async function Page({
  params,
}: {
  params: Promise<{ wallet_address: string }>;
}) {
  const walletAddress = (await params).wallet_address;
  return (
    <Container maxW="2xl">
      <Stack gap="4">
        <Link href="/">
          <Button variant="subtle"> {"<- Back"} </Button>
        </Link>
        <Box>
          <SignatureForm walletAddress={walletAddress} />
        </Box>
      </Stack>
    </Container>
  );
}
