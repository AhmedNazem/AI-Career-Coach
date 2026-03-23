"use client";
import { generateCoverLetter } from "@/actions/coverLetter";
import { coverLetterSchema } from "@/app/lib/schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const CoverLetterGenerator = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(coverLetterSchema),
  });

  const {
    loading: generating,
    fn: generateLetterFn,
    data: generatedLetter,
  } = useFetch(generateCoverLetter);

  useEffect(() => {
    if (generatedLetter) {
      toast.success("Cover letter generated successfully");
      router.push("aiCoverLetter");
      reset();
    }
  }, [generatedLetter, reset]); // ✅ Added `reset` to dependency array

  const onSubmit = async (data) => {
    try {
      await generateLetterFn(data);
    } catch (error) {
      console.error("Error generating letter:", error); // Log full error for debugging
      toast.error(error?.message || "Unable to generate the Letter");
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Job details</CardTitle>
          <CardDescription>
            Provide information about the position you're applying for
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Enter the company name"
                  {...register("companyName")}
                />
                {errors?.companyName?.message && ( // ✅ Fixed optional chaining
                  <p className="text-sm text-red-500">
                    {errors.companyName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job Title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Enter job title"
                  {...register("jobTitle")}
                />
                {errors?.jobTitle?.message && ( // ✅ Fixed optional chaining
                  <p className="text-sm text-red-500">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                className="h-32"
                placeholder="Set your job description here :D"
                {...register("jobDescription")}
              />
              {errors?.jobDescription?.message && ( // ✅ Fixed optional chaining
                <p className="text-sm text-red-500">
                  {errors.jobDescription.message}
                </p>
              )}
            </div>
            <div className="flex justify-end">
              <Button disabled={generating} type="submit">
                {" "}
                {/* ✅ Fixed disabled prop */}
                {generating ? (
                  <>
                    <Loader2 className="size-4 mr-2 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CoverLetterGenerator;
