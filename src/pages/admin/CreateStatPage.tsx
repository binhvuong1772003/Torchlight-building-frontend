import { CreateStatForm } from '@/components/forms/stat/CreateStatForm';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function CreateStatPage() {
  return (
    <div className="min-h-screen bg-background py-10">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <CreateStatForm />
    </div>
  );
}
