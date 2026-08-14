const LINKS = [
  {
    label: "Email",
    href: "mailto:hello.jaymin.maheta@gmail.com",
    display: "hello.jaymin.maheta@gmail.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/jaymin-maheta",
    display: "linkedin.com/in/jaymin-maheta",
  },
  {
    label: "Resume",
    href: "/assets/docs/jaymin-maheta-resume.pdf",
    display: "Download PDF",
    download: true,
  },
];

export function Footer() {
  return (
    <footer className="theme-transition bg-bg-muted/50 px-5 py-8 text-center sm:px-8 md:px-12 lg:px-16">
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[13px] text-text-muted">
        {LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            {...(link.download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
            className="group relative inline-block transition hover:text-brand-blue"
          >
            {link.display}
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-blue transition-transform duration-300 ease-out group-hover:scale-x-100" />
          </a>
        ))}
      </div>
      <p className="mt-4 text-[12.5px] font-medium text-text-muted">
        Jaymin Maheta · Senior UI Engineer &amp; UI/UX Designer · Ahmedabad, India
      </p>
      <p className="mt-1.5 text-[12px] text-text-subtle">
        Built with React, TypeScript &amp; Tailwind · Accessible &amp; performant
      </p>
    </footer>
  );
}
