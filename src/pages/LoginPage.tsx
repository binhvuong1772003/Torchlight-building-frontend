import { Link } from 'react-router-dom';
import { AuthLayout } from '@/components/layouts/AuthLayout';
import { LoginForm } from '@/components/forms/LoginForm';
import { ModeToggle } from '@/components/toggles/mode-toggle';
export default function LoginPage() {
  return (
    <div className="flex min-h-screen min-w-screen items-center justify-center bg-background px-4">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <LoginForm className="w-full max-w-md" />
    </div>
  );
}
