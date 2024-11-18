"use client";
import { EditContext } from "@/lib/context";
import React, { SetStateAction, use, useContext, useState } from "react";
import { getDescription, updateDescription } from "@/actions/description";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { set } from "react-hook-form";
import { Description } from "@prisma/client";

export default function EditableDescription(): React.ReactNode {
  const { edit } = useContext(EditContext);
  const [description, setDescription] = useState(use(getDescription()));

  if (!edit) {
    return <div dangerouslySetInnerHTML={{ __html: description.text }} />;
  } else {
    return (
      <MessageForm
        defaultMessage={description.text}
        setDescription={setDescription}
      />
    );
  }
}

const RichTextEditor = ({
  content,
  onChange,
}: {
  content: string;
  onChange: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            class: "min-h-[1rem]",
          },
        },
      }),
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  return <EditorContent editor={editor} />;
};

const MessageForm = ({
  defaultMessage,
  setDescription,
}: {
  defaultMessage: string;
  setDescription: React.Dispatch<SetStateAction<Description>>;
}) => {
  const { toast } = useToast();
  const [message, setMessage] = useState(defaultMessage);

  const handleSubmit = async () => {
    await updateDescription(message);
    setDescription({ text: message, id: "0" });
    toast({
      title: "Updated description",
      description: "Turn off edit mode to see changes.",
      variant: "destructive",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-background m-4 outline outline-2 outline-sky-200 rounded-sm"
    >
      <p className="p-1">
        Edit your description:
        <br />
        Use ctrl+b to <b>bold</b> text and ctrl+i to <i>italicize</i>.
      </p>
      <div className="outline outline-2 outline-sky-200 rounded-lg p-1 m-2">
        <RichTextEditor content={message} onChange={setMessage} />
      </div>
      <div className="flex mx-4 py-1">
        <div className="flex-1" />
        <Button type="submit">Update</Button>
      </div>
    </form>
  );
};
