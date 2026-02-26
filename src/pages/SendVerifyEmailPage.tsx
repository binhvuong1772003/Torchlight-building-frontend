// pages/auth/VerifyEmailPage.tsx
import { VerifyEmailBlock } from '@/components/blocks/verify-email';
import { useEmailVerify } from '@/hooks/useEmailVerify';
import { ModeToggle } from '@/components/toggles/mode-toggle';

export default function VerifyEmailPage() {
  const { email, isResending, resendSuccess, error, handleResend, handleSkip } =
    useEmailVerify();

  return (
    <div className="relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <VerifyEmailBlock
        email={email}
        isResending={isResending}
        resendSuccess={resendSuccess}
        error={error}
        onResend={handleResend}
        onSkip={handleSkip}
      />
    </div>
  );
}
