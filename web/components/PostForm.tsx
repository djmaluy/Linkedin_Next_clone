/* eslint-disable @next/next/no-img-element */
"use client";

import { ImageIcon, XIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

import { createPost } from "@/app/actions/postActions";

function PostForm() {
  const formRef = React.useRef<HTMLFormElement>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = React.useState<string | null>(null);
  const [base64ImageData, setBase64ImageData] = React.useState<{
    base64: string;
    filename: string;
    contentType: string;
  } | null>(null);
  const { data } = useSession();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPreviewImage(result);

        const base64 = result.split(",")[1];

        setBase64ImageData({
          base64,
          filename: file.name,
          contentType: file.type,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostAction = async (formData: FormData) => {
    const text = formData.get("postInput") as string;

    if (!text.trim() && !base64ImageData) {
      alert("Post content cannot be empty");
      return;
    }

    const payload: any = {
      message: text,
      likes_count: 0,
      user_email: data?.user?.email || "",
    };

    if (base64ImageData) {
      payload.image = {
        io: base64ImageData.base64,
        filename: base64ImageData.filename,
        content_type: base64ImageData.contentType,
      };
    }

    try {
      await createPost(payload);
      setPreviewImage(null);
      setBase64ImageData(null);
      formRef.current?.reset();
    } catch (error) {
      console.error("Error posting:", error);
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
              onClick={() => {
                setPreviewImage(null);
                setBase64ImageData(null);
                if (fileInputRef.current) fileInputRef.current.value = "";
              }}
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
