import { MailCheck } from "lucide-react";
import { CubeGrabLogo } from "@/components/reusable/cubegrab-logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function EmailConfirmedPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-6">
        <CubeGrabLogo 
          width={150}
          height={150}
        />

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
              <MailCheck className="h-7 w-7 text-green-600 dark:text-green-400" />
            </div>

            <CardTitle className="text-2xl">
              Email Verified Successfully
            </CardTitle>

            <CardDescription>
              Your CubeGrab account has been verified successfully.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 text-center">
            <p className="text-sm text-muted-foreground">
              You can now return to the previous CubeGrab tab to continue.
            </p>

            <div className="rounded-lg border bg-muted/40 p-4">
              <p className="text-sm font-medium">
                Email Verified 🎉
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                The previous tab will automatically continue the onboarding
                process once you return.
              </p>
            </div>

            <p className="text-xs text-muted-foreground">
              You may now close this window.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}