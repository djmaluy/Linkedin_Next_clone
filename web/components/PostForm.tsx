/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageIcon, XIcon } from "lucide-react";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

function PostForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const formDataCopy = formData;
    formRef.current?.reset();

    const text = formDataCopy.get("postInput") as string;
    if (!text.trim() && !previewImage) {
      throw new Error("Post content cannot be empty");
    }

    setPreviewImage(null);

    try {
    } catch (error) {
      console.error("Error posting:", error);
      throw new Error("Failed to post content");
    }
  };

  return (
    <div className="mb-2">
      <form
        ref={formRef}
        action={(formData) => {
          handlePostAction(formData);
        }}
        className="p-3 bg-white rounded-lg border"
      >
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <input
            type="text"
            name="postInput"
            placeholder="What's on your mind?"
            className="flex-1 outline-none rounded-full py-3 px-4 border bg-white"
          />
          <input
            ref={fileInputRef}
            onChange={handleImageChange}
            type="file"
            name="image"
            accept="image/*"
            hidden
          />
          <button type="submit" hidden>
            Post
          </button>
          <div>
            <Button type="button" onClick={() => fileInputRef.current?.click()}>
              <ImageIcon className="mr-2" size={16} color="currentColor" />{" "}
              {previewImage ? "Change Image" : "Add Image"}
            </Button>
          </div>
        </div>

        {previewImage && (
          <div className="mt-3">
            <img
              src={previewImage}
              alt="Preview"
              className="w-full object-cover rounded-lg"
            />
          </div>
        )}
        <div className="flex justify-end mt-2 space-x-2">
          {previewImage && (
            <Button
              variant="outline"
              type="button"
              onClick={() => setPreviewImage(null)}
            >
              <XIcon className="mr-2" size={16} />
              Remove image
            </Button>
          )}
        </div>
      </form>

      <hr className="my-4 border-gray-300" />
    </div>
  );
}

export default PostForm;
