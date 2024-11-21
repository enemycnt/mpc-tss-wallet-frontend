import NewWalletButton from "@/components/application/NewWalletButton";
import { Container, Stack, Table, Box, Button, Card } from "@chakra-ui/react";
import Link from "next/link";

type Wallet = {
  address: string;
  pubkey: string;
};
type Wallets = [Wallet];

export async function loadWallets() {
  try {
    // Call an external API endpoint to get posts
    const res = await fetch(`${process.env.API_HOST}/wallets`);
    const data = await res.json();

    return data as { wallets: Wallets };
  } catch (e) {
    console.error(e);
    return { wallets: [] };
  }
}

export default async function Main() {
  const { wallets } = await loadWallets();
  return (
    <Container w="2xl">
      <Card.Root>
        <Card.Body gap="2">
          <Stack>
            <Box>
              <NewWalletButton />
            </Box>
            {wallets.length > 0 ? (
              <Table.Root size="md" striped>
                <Table.Header>
                  <Table.Row>
                    <Table.ColumnHeader>Account address</Table.ColumnHeader>
                    <Table.ColumnHeader textAlign="end">
                      Action
                    </Table.ColumnHeader>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {wallets.map((wallet) => (
                    <Table.Row key={wallet.address}>
                      <Table.Cell>{wallet.address}</Table.Cell>
                      <Table.Cell textAlign="end">
                        <Link href={`/wallet/${wallet.address}`}>
                          <Button variant="surface">Sign message</Button>
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Root>
            ) : (
              <Box>No wallets</Box>
            )}
          </Stack>
        </Card.Body>
      </Card.Root>
    </Container>
  );
}
