import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import CoverLetterGenerator from "../_components/CoverLetterGenerator";

const NewCoverLetterPage = () => {
  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col space-y-2">
        <Link href={"/aiCoverLetter"}>
          <Button variant="link" className="gap-2 pl-0"></Button>
        </Link>
      </div>
      <div className="pb-6">
        <h1 className="text-6xl font-bold gradient-title ">
          Create Cover Letter
        </h1>
        <p className="text-muted-foreground">
          Generate a tailored cover letter for your job application
        </p>
      </div>
      <CoverLetterGenerator />
    </div>
  );
};

export default NewCoverLetterPage;
