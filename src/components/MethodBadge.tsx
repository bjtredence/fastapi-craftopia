import { cn } from "@/lib/utils";

type Method = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface MethodBadgeProps {
  method: Method;
}

const methodColors: Record<Method, string> = {
  GET: "bg-blue-100 text-blue-800",
  POST: "bg-green-100 text-green-800",
  PUT: "bg-yellow-100 text-yellow-800",
  DELETE: "bg-red-100 text-red-800",
  PATCH: "bg-purple-100 text-purple-800",
};

export const MethodBadge = ({ method }: MethodBadgeProps) => {
  return (
    <span
      className={cn(
        "px-2 py-1 text-xs font-bold rounded-md",
        methodColors[method]
      )}
    >
      {method}
    </span>
  );
};