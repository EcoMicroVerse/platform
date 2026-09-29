"use client";

import {
  FormEvent,
  useState,
} from "react";

const enquiryTypes = [
  "Collaboration",
  "Get involved",
  "General question",
  "Ideas & feedback",
  "Advertising / partnership",
  "Technical issue",
  "Other",
];

export default function ContactForm() {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const [message, setMessage] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ||
            "Unable to send your message."
        );
      }

      form.reset();

      setStatus("success");
      setMessage(
        "Thanks for getting in touch. Your message has been sent successfully."
      );
    } catch (error) {
      setStatus("error");

      setMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message. Please try again."
      );
    }
  }

  return (
    <div className="rounded-2xl border p-6 sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold">
          Send a message
        </h2>

        <p className="mt-2 text-sm leading-6 text-muted-foreground">
          Tell us a little about what you would like to
          discuss.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <div>
          <label
            htmlFor="name"
            className="text-sm font-medium"
          >
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            required
            maxLength={100}
            autoComplete="name"
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="Your name"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="text-sm font-medium"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            required
            maxLength={200}
            autoComplete="email"
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="you@example.com"
          />
        </div>

        <div>
          <label
            htmlFor="type"
            className="text-sm font-medium"
          >
            Enquiry type
          </label>

          <select
            id="type"
            name="type"
            required
            defaultValue=""
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none"
          >
            <option value="" disabled>
              Select an option
            </option>

            {enquiryTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="subject"
            className="text-sm font-medium"
          >
            Subject
          </label>

          <input
            id="subject"
            name="subject"
            type="text"
            required
            maxLength={200}
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="What would you like to discuss?"
          />
        </div>

        <div>
          <label
            htmlFor="message"
            className="text-sm font-medium"
          >
            Message
          </label>

          <textarea
            id="message"
            name="message"
            required
            maxLength={5000}
            rows={7}
            className="mt-2 w-full rounded-lg border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2"
            placeholder="Tell us more..."
          />
        </div>

        {/* Honeypot field for basic bot protection */}
        <div
          className="absolute left-[-9999px]"
          aria-hidden="true"
        >
          <label htmlFor="website">
            Website
          </label>

          <input
            id="website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={status === "sending"}
          className="rounded-lg border px-5 py-2.5 text-sm font-medium transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending"
            ? "Sending..."
            : "Send message"}
        </button>

        {message && (
          <div
            className="rounded-lg border p-4 text-sm"
            role="status"
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}