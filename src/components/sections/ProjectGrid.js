import Image from "next/image";
import { projects } from "@/data/site";

export default function ProjectGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {projects.map((project) => (
        <article
          key={project.title}
          className="overflow-hidden rounded-lg border border-line bg-white shadow-sm"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              {project.category}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-ink">{project.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">{project.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-slate-100 px-2.5 py-1.5 text-xs font-semibold text-slate-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
