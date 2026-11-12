"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { EndpointForm } from "./endpoint-form";
import { NewSecret } from "@/components/kit/new-secret";
import { Modal } from "@/components/ui/modal";
import { useCreateEndpoint } from "@/lib/dashboard/hooks";
import { useWorkspace } from "@/lib/workspace";

/** Add an endpoint, then see its signing secret once and go to it. */
export function CreateEndpointDialog({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { team, mode } = useWorkspace();
  const router = useRouter();
  const create = useCreateEndpoint(team.id, mode);
  const [made, setMade] = React.useState<{ id: string; secret: string } | null>(null);

  const close = () => {
    setMade(null);
    create.reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={close} title={made ? "Endpoint added" : `Add a ${mode} endpoint`}>
      {made ? (
        <NewSecret
          title="Your signing secret"
          secret={made.secret}
          onDone={() => {
            const id = made.id;
            close();
            router.push(`/webhooks/${id}`);
          }}
        >
          Every event carries a <code className="text-[13px] text-fg">Pickriders-Signature</code> header made with it.
          Check it on your server to know the event came from Pickriders. You&apos;ll only see it now.
        </NewSecret>
      ) : (
        open && (
          <EndpointForm
            submitLabel="Add endpoint"
            onCancel={close}
            onSubmit={async (values) => {
              const endpoint = await create.mutateAsync({
                url: values.url,
                enabled_events: values.enabled_events,
                ...(values.description && { description: values.description }),
              });
              setMade({ id: endpoint.id, secret: endpoint.secret });
            }}
          />
        )
      )}
    </Modal>
  );
}
