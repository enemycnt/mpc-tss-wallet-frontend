"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Fieldset,
  Stack,
  Input,
  Code,
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  Textarea,
  Card,
} from "@chakra-ui/react";
import { Button } from "@/components/ui/button";

import { Field } from "@/components/ui/field";
import { useState } from "react";

type Inputs = {
  messageText: string;
};

async function submitTextForSignature(
  messageText: string,
  walletAddress: string
) {
  const res = await fetch("/api/sign_message", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageText,
      walletAddress,
    }),
  });
  const data = await res.json();
  return data;
}

export default function SignatureForm({
  walletAddress,
}: {
  walletAddress: string;
}) {
  const [open, setOpen] = useState(false);
  const [signature, setSignature] = useState("");
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const resData = await submitTextForSignature(
      data.messageText,
      walletAddress
    );

    if (resData.data.signature) {
      setSignature(resData.data.signature);
      setOpen(true);
    }
    if (!!resData.data.error) {
      setError("messageText", {
        type: "custom",
        message: `${resData.data.error}!`,
      });
    }
  };
  return (
    <>
      <Card.Root>
        <Card.Body gap="2">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Fieldset.Root size="lg" maxW="md" invalid={!!errors.messageText}>
              <Stack>
                <Fieldset.Legend>Sign the message</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please enter the message to sign for the wallet{" "}
                  <Code>{walletAddress}</Code>
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field
                  label="Message"
                  invalid={!!errors.messageText}
                  errorText={errors.messageText?.message}
                >
                  <Input
                    w="full"
                    {...register("messageText", {
                      required: "This is required",
                    })}
                  />
                </Field>
              </Fieldset.Content>

              <Button
                loading={isSubmitting}
                loadingText="Loading..."
                colorPalette="yellow"
                type="submit"
                alignSelf="flex-start"
              >
                Submit and obtain the signature
              </Button>
            </Fieldset.Root>
          </form>
        </Card.Body>
      </Card.Root>
      <DialogRoot placement="center" open={open} size="lg">
        <DialogContent
          style={{
            position: "absolute",
            top: 80,
          }}
        >
          <DialogHeader>
            <DialogTitle>Signature</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Textarea value={signature} readOnly />
          </DialogBody>
          <DialogFooter justifyContent="start">
            <DialogActionTrigger asChild>
              <Button
                variant="outline"
                onClick={() => {
                  setOpen(false);
                  reset();
                }}
              >
                Close
              </Button>
            </DialogActionTrigger>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(signature);
                setOpen(false);
                reset();
              }}
            >
              Copy
            </Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
}
