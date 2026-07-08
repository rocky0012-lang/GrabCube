import { FooterLarge01 } from "@/components/layout/footer";
import HeaderNavigation from "@/components/layout/header-navigation";
import { ContactSimpleForm } from "@/components/marketing/contact/contact-simple-form";

export default function Home() {
  return (
    <>
      <HeaderNavigation />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-10 font-sans sm:px-6 lg:px-8 lg:py-16">
        <section className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="flex flex-col items-center gap-6 sm:items-start sm:text-left">
            <h1 className="max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-4xl lg:text-5xl">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-600 dark:text-zinc-400 sm:text-lg sm:leading-8">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-zinc-950 dark:text-zinc-50"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>
          <div className="flex w-full flex-col gap-4 pt-3 text-base font-medium sm:w-auto sm:flex-row">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] sm:w-auto sm:min-w-40"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Deploy Now
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/8 px-5 transition-colors hover:border-transparent hover:bg-black/4 dark:border-white/[.145] dark:hover:bg-[#1a1a1a] sm:w-auto sm:min-w-40"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </section>
      </main>

      <ContactSimpleForm />
      <FooterLarge01 />
    </>
  );
}

