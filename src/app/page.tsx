import { Triangle } from "lucide-react";
import DialogComponentDemo from "./components/DialogComponentDemo";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between">
        <div className="flex items-center gap-2 hover:cursor-pointer">
          <Triangle className="w-6 h-6" />
          <h2 className="text-xl">Triangle</h2>
        </div>
        <DialogComponentDemo />
      </div>
    </div>
  );
}
