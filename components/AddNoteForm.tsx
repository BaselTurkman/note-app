"use client";

import { createNote } from "@/app/_actions/notes";
import { useState, FormEvent, useTransition } from "react";

const AddNoteForm = () => {
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const title = formData.get("title")?.toString().trim() || "";
    const content = formData.get("content")?.toString().trim() || "";

    if (!title || !content) {
      setError("Both title and content are required.");
      return;
    }
    setError("");
    startTransition(async () => {
      await createNote(formData);
      form.reset();
      setError("")
    });
  };

  return (
    <div className="card bg-base-200 p-6 mb-8 shadow-lg border border-base-300 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-3">
          <input
            name="title"
            placeholder="Note title"
            className="input input-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20 rounded-lg text-base"
          />
          <textarea
            name="content"
            placeholder="Write your note..."
            className="textarea textarea-bordered w-full bg-base-100 border-base-300 focus:border-primary focus:ring focus:ring-primary/20 rounded-lg text-base"
            rows={2}
          />
        </div>
        {error && <p className="text-error text-sm">{error}</p>}
        <div className="flex justify-end">
          <div
            className="relative tooltip tooltip-bottom"
            data-tip="Add new note"
          >
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary px-6 py-2 rounded-lg"
            >
              {isPending ? (
                <span className="loading loading-spinner loading-sm" />
              ) : (
                "Add Note"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNoteForm;
