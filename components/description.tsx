"use client";
import { EditContext } from "@/lib/context";
import React, { useContext, useEffect, useState } from "react";
import { getDescription, updateDescription } from "@/actions/description";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { Description } from "@prisma/client";

export default function EditableDescription(): React.ReactNode {
  const { edit } = useContext(EditContext);
  const [description, setDescription] = useState<Description>();
  useEffect(() => {
    getDescription().then((description) => setDescription(description));
  }, []);

  if (!description) return <p>"Loading..."</p>;

  if (!edit) {
    return <div dangerouslySetInnerHTML={{ __html: description.text }} />;
  } else {
    return <MessageForm defaultMessage={description.text} />;
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

const MessageForm = ({ defaultMessage }: { defaultMessage: string }) => {
  const { toast } = useToast();
  const [message, setMessage] = useState(defaultMessage);

  const handleSubmit = async () => {
    await updateDescription(message);
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
        Use ctrl+b to bold text, ctrl+i to italicize, and ctrl+u to underline.
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
