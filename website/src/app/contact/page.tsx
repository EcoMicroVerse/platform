import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-3xl">
        <p className="text-sm text-muted-foreground">
          EcoMicroVerse
        </p>

        <h1 className="mt-3 text-4xl font-semibold tracking-tight">
          Get in touch
        </h1>

        <p className="mt-4 text-lg leading-8 text-muted-foreground">
          EcoMicroVerse is being developed as an independent
          research intelligence and knowledge platform. If you
          would like to collaborate, contribute to the project,
          share an idea, ask a question, or discuss opportunities
          to work with the platform, we would be happy to hear
          from you.
        </p>
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.5fr]">
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">
              What can you contact us about?
            </h2>

            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              EcoMicroVerse welcomes enquiries related to the
              development, use and future of the platform.
            </p>
          </div>

          <div className="space-y-3">
            {[
              {
                title: "Collaboration",
                text: "Ideas for scientific, technical or community collaboration.",
              },
              {
                title: "Get involved",
                text: "Ways to contribute to the development and wider EcoMicroVerse project.",
              },
              {
                title: "General questions",
                text: "Questions about the platform, its content or how it works.",
              },
              {
                title: "Ideas & feedback",
                text: "Suggestions for features, resources, datasets or improvements.",
              },
              {
                title: "Advertising & partnerships",
                text: "Opportunities to promote relevant products, services, projects or work through EcoMicroVerse.",
              },
              {
                title: "Technical issue",
                text: "Problems with the website, content or platform functionality.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border p-4"
              >
                <h3 className="font-medium">
                  {item.title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border p-5">
            <p className="text-sm text-muted-foreground">
              Email
            </p>

            <a
              href="mailto:contact@ecomicroverse.bio"
              className="mt-1 block font-medium underline underline-offset-4"
            >
              contact@ecomicroverse.bio
            </a>
          </div>
        </section>

        <section>
          <ContactForm />
        </section>
      </div>
    </main>
  );
}