"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email("Email is incorrect"),
  title: z.string().min(4, { message: "Title should be at least 4 characters" }),
  message: z.string().min(10, { message: "Message should be at least 10 characters" }),
});

export default function DialogComponentDemo() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      title: "",
      message: "",
    },
  });
  const [loading , setLoading] = useState(false);
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);
      const response = await fetch('/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      setLoading(false);
      toast({
        title: "Success",
        description: (
          <div className="grid gap-3">
            <div className="flex gap-2">
              <strong className="text-sm">Email: </strong>
              <span className="text-sm">{result.data.email}</span>
            </div>
            <div className="flex gap-2">
              <strong className="text-sm">Title: </strong>
              <span className="text-sm">{result.data.title}</span>
            </div>
            <div className="flex gap-2">
              <strong className="text-sm">Message: </strong>
              <span className="text-sm">{result.data.message}</span>
            </div>
          </div>
        ),
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while submitting the form.",
      });
      setLoading(false);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Contact</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="items-start">
          <DialogTitle>Contact</DialogTitle>
          <DialogDescription>Fill the form and contact us</DialogDescription>
        </DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <div className="grid gap-2 items-center">
                      <Label htmlFor="email">Email:</Label>
                      <Input placeholder="email...." {...field} />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <div className="grid gap-2 items-center">
                      <Label htmlFor="title">Title:</Label>
                      <Input placeholder="title...." {...field} />
                      <FormMessage />
                    </div>
                  )}
                />
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <div className="grid gap-2 items-center">
                      <Label htmlFor="message">Message:</Label>
                      <Textarea placeholder="message...." {...field} className="resize-none" />
                      <FormMessage />
                    </div>
                  )}
                />
              </div>
              <Button type="submit" variant="secondary" disabled={loading}>
                <span>Submit</span>
                {loading && <Loader  className="ml-2 w-5 h-5 animate-spin" />}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
