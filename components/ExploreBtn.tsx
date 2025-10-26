"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const ExploreBtn = () => {
  return (
    <Button
      type="button"
      size="lg"
      asChild
      className="mt-7 px-10! py-3.5 rounded-full w-full md:w-auto mx-auto border border-[#182830] bg-[#0D161A]"
    >
      <Link href="#events">
        Explore events <ArrowDown />
      </Link>
    </Button>
  );
};

export default ExploreBtn;
