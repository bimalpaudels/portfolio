import { Link } from "next-view-transitions";

export default function Home() {
  return (
    <>
      <h2 className="font-semibold pt-12">Bimal Paudel</h2>
      <div className="space-y-4 home ">
        <p>
          I&apos;m a developer, a lifelong student, and a positive thinker; currently
          based in Berlin, originally from Nepal. I have over two years of{" "}
          <Link href="/about">experience</Link> as a full stack developer.
        </p>

        <p>
          I&apos;m always eager to <Link href="/learn">learn</Link> new technologies
          to expand <Link href="/stack">my stack</Link>. When I am not writing
          code or studying, you can find me cycling in and around Berlin,
          watching movies and sports, or trying to improve my chess (it is not
          going well).
        </p>

        <p>
          Thank you for visiting—feel free to reach out through{" "}
          <Link
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ibimalp@gmail.com"
            target="_blank"
          >
            E-mail{" "}
          </Link>
          or connect with me on
          <Link href="https://www.linkedin.com/in/bimalpaudel/" target="_blank">
            {" "}
            LinkedIn
          </Link>{" "}
          for further details.
        </p>
      </div>
    </>
  );
}
