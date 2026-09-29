
type Props = {
  title: string;
  summary: string;
};

const slides = (
  title: string,
  summary: string
) => [
  {
    heading: "Research Object",
    text: title,
  },
  {
    heading: "Key Finding",
    text: summary.slice(0, 120),
  },
  {
    heading: "Methodology",
    text: "Experimental workflow and analysis.",
  },
  {
    heading: "Why It Matters",
    text: "Scientific significance and impact.",
  },
  {
    heading: "Read More",
    text: "EcoMicroVerse.bio",
  },
];

export default function InstagramCarousel({
  title,
  summary,
}: Props) {
  return (
    <section className="rounded-3xl border border-teal-500/20 bg-[#061426] p-8">

      <div className="text-xs uppercase tracking-widest text-teal-300">
        Instagram Preview
      </div>

      <h2 className="mt-3 text-3xl font-bold">
        Carousel Generator
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-5">

        {slides(title, summary).map(
          (slide, index) => (
            <div
              key={index}
              className="aspect-[4/5] rounded-2xl border border-teal-500/20 bg-gradient-to-br from-[#082028] to-[#061426] p-4"
            >
              <div className="text-xs uppercase tracking-widest text-teal-300">
                Slide {index + 1}
              </div>

              <div className="mt-4 text-lg font-bold">
                {slide.heading}
              </div>

              <div className="mt-3 text-sm text-slate-300">
                {slide.text}
              </div>

              <div className="mt-auto pt-6 text-xs text-slate-500">
                EcoMicroVerse
              </div>
            </div>
          )
        )}

      </div>

    </section>
  );
}