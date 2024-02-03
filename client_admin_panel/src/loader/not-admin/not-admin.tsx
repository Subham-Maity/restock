import Link from "next/link";

import { Button } from "@/components/ui/shadcn/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card";
import { not_admin } from "@/config/default/default";

export default function NotAdmin() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <Card className="w-[420px]">
        <CardHeader className="text-center">
          <CardTitle className="lg:text-7xl text-4xl mb-4">Sorry 😟</CardTitle>
          <CardDescription>
            Are you sure you are in the right place? This page is for{" "}
            {not_admin} admins only.
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-center">
          <Button asChild>
            <Link href="/login">Go Back</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
