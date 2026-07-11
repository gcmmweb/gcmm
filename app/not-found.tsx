import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-primary mb-4 text-balance">
              404 - Page Not Found
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-pretty">
              We couldn&apos;t find the page you&apos;re looking for. It
              might have been moved, deleted, or you might have
              accidentally entered the wrong URL.
            </p>
          </div>
          <div className="space-y-4">
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link href="/">Go to Homepage</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}