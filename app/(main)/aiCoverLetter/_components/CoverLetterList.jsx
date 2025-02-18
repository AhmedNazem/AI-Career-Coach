"use client";
import { deleteCoverLetter } from "@/actions/coverLetter";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { format } from "date-fns";
import { Eye, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";

const CoverLetterList = ({ coverLetters }) => {
  const [letters, setLetters] = React.useState(coverLetters);
  const router = useRouter();

  const handleDeleteList = async (id) => {
    try {
      await deleteCoverLetter(id);
      toast.success("Cover letter deleted successfully");
      setLetters(letters.filter((letter) => letter.id !== id)); // Remove deleted letter from state
    } catch (error) {
      toast.error(error.message || "Failed to delete the cover letter");
    }
  };

  if (!letters?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No Cover Letters Yet</CardTitle>
          <CardDescription>
            Create your first cover letter to get started
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {letters.map((letter) => (
        <Card key={letter.id} className="group relative">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl gradient-title">
                  {letter.jobTitle} at {letter.companyName}
                </CardTitle>
                <CardDescription>
                  Created {format(new Date(letter.createdAt), "PPP")}
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <AlertDialog>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => {
                      router.push(`/aiCoverLetter/${letter.id}`);
                    }}
                  >
                    <Eye className="size-4" />
                  </Button>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <Trash className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Cover Letter?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your cover letter for {letter.jobTitle} at{" "}
                        {letter.companyName}.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteList(letter.id)}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-muted-foreground text-sm line-clamp-3">
              {letter.jobDescription}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default CoverLetterList;
