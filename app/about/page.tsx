import { Header } from "@/components";

export const metadata = {
  title: "About Bimal Paudel",
  description:
    "Learn more about Bimal Paudel - a full-stack developer passionate about building modern web applications and sharing knowledge about technology and development.",
  keywords: ["Bimal Paudel", "About", "Developer", "Full Stack"],
  alternates: {
    canonical: "/about",
  },
};

export default function About() {
  return (
    <div className="animate-fade-in">
      <Header />
      <div className="article">
        <h2>Summary</h2>
        <p className="text-gray-900 dark:text-gray-100">
          Software engineer with over three years of experience. Proficient in
          AI-powered web applications development with Python, Typescript,
          FastAPI, and AWS. Passionate about creating optimized and scalable
          solutions. Eager to contribute to meaningful and innovative digital
          project.
        </p>

        <h2>Software Engineer</h2>
        <p className="text-gray-900 dark:text-gray-100">
          <strong>InfoDevelopers Pvt. Ltd. (2022-2024)</strong>
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Assisted in digitizing a bank&apos;s loan approval process by
          integrating it with the Core Banking System for faster decisions.
          Integrated a third-party psychometric analysis API into the loan
          system under a tight deadline.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Developed a government revenue-sharing system to allocate fiscal
          grants based on population and socio-economic factor.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Mentored interns, guiding them to become a fully contributing team
          member.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          <strong>Tech stack:</strong> Python, Django, React, PostgreSQL,
          Celery, REST API, Docker
        </p>

        <h2>Junior Software Engineer</h2>
        <p className="text-gray-900 dark:text-gray-100">
          <strong>InfoDevelopers Pvt. Ltd. (2021-2022)</strong>
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Developed a customizable CMS for Nepal Police using Django-CMS,
          tailored to their operational needs.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Actively participated and led in client meetings to gather
          requirements and showcase progress for feedback. Managed evolving
          requirements and tight deadlines to ensure timely feature delivery.
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          <strong>Tech stack:</strong> Python, Django-CMS, PostgreSQL, Docker
        </p>

        <h2>Freelance</h2>
        <p className="text-gray-900 dark:text-gray-100">
          <strong>2021</strong>
        </p>
        <p className="text-gray-900 dark:text-gray-100">
          Before joining any companies, I worked as a freelancer, taking on
          smaller tasks in projects from college seniors. The tasks included
          assisting in initial database design with normalization and initial
          models. I also helped develop an E-commerce website for a
          friend&apos;s startup with Express.js.
        </p>
      </div>
    </div>
  );
}
