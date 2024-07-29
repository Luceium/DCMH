"use client";

import React from "react";
import { Progress } from "./progress";
import { submitItemFromForm } from "@/actions/editItems";
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
import { Item } from "@prisma/client";

export const formSchema = z.object({
  imageURL: z.string().url(),
  name: z.string().min(1),
  description: z.string().min(1),
  quantity: z.number().nonnegative(),
  targetQuantity: z.number().positive(),
});

export type FormSchema = z.infer<typeof formSchema>;

export type PartialItem = {
  id?: string;
  name?: string;
  category: string;
  priority?: boolean;
  description?: string;
  quantity?: number;
  targetQuantity?: number;
  imageURL?: string;
};

type ItemCardFormProps = {
  partialItem: PartialItem;
  setEditCardMode?: React.Dispatch<React.SetStateAction<boolean>>;
  addItem?: (item: Item) => void;
  updateItem?: (item: Item) => void;
};

const ItemCardForm: React.FC<ItemCardFormProps> = ({
  partialItem,
  setEditCardMode,
  addItem,
  updateItem,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: partialItem.imageURL ?? "",
      name: partialItem.name ?? "",
      description: partialItem.description ?? "",
      quantity: partialItem.quantity ?? 50,
      targetQuantity: partialItem.targetQuantity ?? 100,
    },
  });

  const watchQuantity = form.watch("quantity");
  const watchTargetQuality = form.watch("targetQuantity");
  const isUpdate: boolean = !!partialItem.id;

  return (
    <div className="card w-80 bg-gray-500 mb-4 p-4">
      {!isUpdate && <p className="text-center">Add New Item</p>}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(async (values: FormSchema) => {
            const item = await submitItemFromForm(
              values,
              partialItem.category,
              partialItem?.id
            );

            if (isUpdate) {
              updateItem?.(item);
              setEditCardMode?.(false);
            } else {
              addItem?.(item);
            }
          })}
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
          <Button type="submit">{isUpdate ? "Update" : "Add"}</Button>
        </form>
      </Form>
    </div>
  );
};

export default ItemCardForm;
