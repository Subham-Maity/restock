import React from "react";
import { Badge } from "@/components/ui/shadcn/badge";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

interface Props {
  href: string;
  className?: string; // Add a className prop
}

const AdminActionUpdate: React.FC<Props> = ({ href, className }) => {
  // Include className in props
  const route = useRouter();
  return (
    <div className={`px-2 ${className}`}>
      {" "}
      {/* Apply the className here */}
      <button onClick={() => route.push(`${href}`)}>
        <Badge variant="cyan">
          <Pencil className="mr-2 h-4 " /> Edit Product
        </Badge>
      </button>
    </div>
  );
};

export default AdminActionUpdate;
