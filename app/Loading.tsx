import { Progress } from "@nextui-org/react";

export default function Loading() {
    return <div className="w-full h-[calc(100vh-4rem)] flex items-center justify-center">
      <Progress size="sm" isIndeterminate aria-label="Loading..." className="max-w-md" />
    </div>
  }