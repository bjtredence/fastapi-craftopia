import { useState } from "react";
import { MethodBadge } from "./MethodBadge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface EndpointCardProps {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  summary: string;
  requestExample?: string;
  responseExample?: string;
}

export const EndpointCard = ({
  method,
  path,
  summary,
  requestExample,
  responseExample,
}: EndpointCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg mb-4 overflow-hidden">
      <div
        className="p-4 bg-white cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center space-x-4">
          <MethodBadge method={method} />
          <span className="font-mono text-sm">{path}</span>
        </div>
        {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </div>
      
      {isExpanded && (
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 mb-4">{summary}</p>
          
          {requestExample && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold mb-2">Request Example:</h4>
              <pre className="bg-code-background text-code-foreground p-3 rounded font-mono text-sm overflow-x-auto">
                {requestExample}
              </pre>
            </div>
          )}
          
          {responseExample && (
            <div>
              <h4 className="text-sm font-semibold mb-2">Response Example:</h4>
              <pre className="bg-code-background text-code-foreground p-3 rounded font-mono text-sm overflow-x-auto">
                {responseExample}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};