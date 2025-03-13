import type { PropertyStatus } from "@/types/propertyStatus";
import { Badge } from "./badge";

const statusLabel = {
  "for-sale": "For sale",
  sold: "Sold",
  withdrawn: "Withdrawn",
  draft: "Draft",
};

const variant: {
  [key: string]: "primary" | "success" | "destructive" | "secondary";
} = {
  "for-sale": "primary",
  sold: "success",
  withdrawn: "destructive",
  draft: "secondary",
};

export default function PropertyStatusBadge({
  status,
  className,
}: {
  status: PropertyStatus;
  className?: string;
}) {
  const label = statusLabel[status];
  return (
    <Badge variant={variant[status]} className={className}>
      {label}
    </Badge>
  );
}
