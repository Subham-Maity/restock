import React from "react";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import { Badge } from "@/components/ui/shadcn/badge";
import { useRouter } from "next/router";

interface Props {
  href: string;
}

const AdminActionCard: React.FC<Props> = ({ href }) => {
  const route = useRouter();
  return (
    <div className="px-2">
      <button onClick={() => route.push(`${href}`)}>
        <Badge variant="cyan">
          <EnvelopeOpenIcon className="mr-2 h-4 w-4 " /> Edit Product
        </Badge>
      </button>
    </div>
  );
};

export default AdminActionCard;
