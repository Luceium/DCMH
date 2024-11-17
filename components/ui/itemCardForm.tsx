"use client";

import React, { use, useContext, useEffect, useRef, useState } from "react";
import { Progress } from "./progress";
import { submitItemFromForm } from "@/actions/editItems";
import { set, useForm } from "react-hook-form";
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
import { EditContext } from "@/lib/context";
import { isImgUrl } from "@/lib/utils";
import { watch } from "fs";
import Image from "next/image";
import { getCategories } from "@/actions/categories";

export const formSchema = z.object({
  imageURL: z
    .string()
    .url()
    .refine(isImgUrl, { message: "Please enter a valid image URL." }),
  name: z.string().min(1),
  category: z
    .string()
    .min(1)
    .refine((category) => category != "Prioritized", {
      message:
        'Please use a more descriptive category and star the item after to add it to "Prioritized".',
    }),
  description: z.string().min(1),
  quantity: z.number().nonnegative(),
  targetQuantity: z.number().positive(),
});

export type FormSchema = z.infer<typeof formSchema>;

type ItemCardFormProps = {
  partialItem: Partial<Item>;
  setEditCardMode?: React.Dispatch<React.SetStateAction<boolean>>;
  addItem?: (item: Item) => void;
  updateItem?: (item: Item) => void;
  invalidateSignal: boolean;
};

const ItemCardForm: React.FC<ItemCardFormProps> = ({
  partialItem,
  setEditCardMode,
  addItem,
  updateItem,
  invalidateSignal,
}) => {
  const { edit } = useContext(EditContext);

  const [categories, setCategories] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    getCategories()
      .then((fetchedCategories) => {
        setCategories(fetchedCategories);
      })
  }, [invalidateSignal]);

  const form = useForm<z.infer<typeof formSchema>>({
    mode: "all",
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageURL: partialItem.imageURL ?? "",
      name: partialItem.name ?? "",
      category: partialItem.categoryId,
      description: partialItem.description ?? "",
      quantity: partialItem.quantity ?? 50,
      targetQuantity: partialItem.targetQuantity ?? 100,
    },
  });

  const watchQuantity = form.watch("quantity");
  const watchTargetQuality = form.watch("targetQuantity");
  const watchImageURL = form.watch("imageURL");
  const isUpdate: boolean = !!partialItem.id;
  const [validImageURL, setValidImageURL] = useState("");

  useEffect(() => {
    isImgUrl(watchImageURL).then((valid) => {
      if (valid) {
        setValidImageURL(watchImageURL);
      } else {
        setValidImageURL("");
      }
    });
  }, [watchImageURL]);

  return (
    edit && (
      <div className="card w-80 bg-[#e3e8fc] dark:bg-gray-500 mb-4 p-4">
        {!isUpdate && <p className="text-center">Add New Item</p>}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(async (values: FormSchema) => {
              const item = await submitItemFromForm(values, partialItem?.id);

              if (isUpdate) {
                updateItem?.(item);
                setEditCardMode?.(false);
              } else {
                addItem?.(item);
              }
            })}
          >
            {validImageURL && (
              <Image
                className="w-full h-52 object-cover"
                src={validImageURL}
                width={275}
                height={275}
                alt="Image preview"
              />
            )}
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      value={partialItem.categoryId || ""}
                      className="border rounded-md w-full p-2 dark:bg-gray-700 dark:text-white"
                      onChange={(e) => {
                        const selectedCategory = e.target.value;
                        field.onChange(selectedCategory);
                      }}
                    >
                      <option value="" disabled>
                        Select a category
                      </option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.name}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
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
    )
  );
};

export default ItemCardForm;
