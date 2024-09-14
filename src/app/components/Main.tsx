"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

export default function Main() {
  type FormData = z.infer<typeof FormSchema>;
  const FormSchema = z.object({
    name: z.string().min(4, {
      message: "Username must be at least 4 characters.",
    }),
    language: z.string().min(2, {
      message: "Lnagugae must be at least 2 characters.",
    }),
  });
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "ahmed",
      language: "js",
    },
  });
  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">show</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <div className="my-4">
            <h1 className="text-2xl">About</h1>
            <p className="text-sm text-muted">Edit your info</p>
          </div>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="name">Name: </Label>
                      <FormControl>
                        <Input placeholder="name" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="language"
                render={({ field }) => (
                  <>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="language">language: </Label>
                      <FormControl>
                        <Input placeholder="language" {...field}/>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </>
                )}
              />
            </div>
            <div className="flex justify-end mt-4">
              <Button type="submit" variant="secondary">
                save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
