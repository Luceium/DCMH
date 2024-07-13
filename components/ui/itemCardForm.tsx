"use client";

import React from "react";
import { Progress } from "./progress";
import { addItemFromForm } from "@/actions/editItems";
import { Item } from "@prisma/client";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "./input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./button";

export const formSchema = z.object({
  imageURL: z.string().url(),
  name: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().positive(),
  targetQuantity: z.number().positive(),
});

const ItemCardForm = ({
  category,
  addItem,
}: {
  category: string;
  addItem: (item: Item) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: "",
      name: "",
      description: "",
      quantity: 50,
      targetQuantity: 100,
    },
  });

  const watchQuantity = form.watch("quantity");
  const watchTargetQuality = form.watch("targetQuantity");

  return (
    <div className="card w-80 bg-gray-500 mb-4 p-4">
      <p className="text-center">Add New Item</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(
            async (values: z.infer<typeof formSchema>) => {
              addItem(await addItemFromForm(values, category));
            }
          )}
        >
          <FormField
            control={form.control}
            name="imageURL"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
=
          <FormLabel>Quantity</FormLabel>
          <Progress value={(watchQuantity / watchTargetQuality) * 100} />
          <div className="flex mt-2">
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <span className="mx-2 font-normal">/</span>
          <FormField
            control={form.control}
            name="targetQuantity"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>

          <Button type="submit">Add</Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemCardForm;
