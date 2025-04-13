"use client";

import { CodeBlock } from "@/components/code-block/code-block.component";
import { LinkIcon } from "lucide-react";
import Link from "next/link";

const codeExemple = `name: CI
on:
  push:
    branches:
      - main
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version: [14, 16, 18]
    steps:
      - name: Checkout code
        uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "{{ matrix.node-version }}"
      - name: Install dependencies
        run: npm install
      - name: Run tests
        run: npm test
      - name: Build
        run: npm run build
      - name: Deploy
        run: npm run deploy
      - name: Notify
        run: echo "Deployment successful!"`;

const CardTil = ({
  data = [
    {
      title: "GitHub Actions - Matrix Strategy",
      tags: ["devops", "githubactions"],
      code: codeExemple,
      description:
        "GitHub Actions is a powerful tool for automating workflows in your GitHub repository. The matrix strategy allows you to run multiple jobs in parallel with different configurations.",
      officialLink:
        "https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions",
    },
    {
      title: "GitHub Actions - Matrix Strategy",
      tags: ["devops", "githubactions"],
      code: codeExemple,
      description:
        "GitHub Actions is a powerful tool for automating workflows in your GitHub repository. The matrix strategy allows you to run multiple jobs in parallel with different configurations.",
      officialLink:
        "https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions",
    },
    {
      title: "GitHub Actions - Matrix Strategy",
      tags: ["devops", "githubactions"],
      code: codeExemple,
      description:
        "GitHub Actions is a powerful tool for automating workflows in your GitHub repository. The matrix strategy allows you to run multiple jobs in parallel with different configurations.",
      officialLink:
        "https://docs.github.com/en/actions/learn-github-actions/introduction-to-github-actions",
    },
  ],
  date = "January 10, 2025",
}: {
  data: {
    title: string;
    tags?: string[];
    code?: string;
    description?: string;
    officialLink?: string;
  }[];
  date?: string;
}) => {
  return (
    <div className="flex max-w-full gap-10 md:gap-20">
      <div className="py-7 hidden md:flex flex-col gap-2">
        <div className="sticky top-20">
          <span className="whitespace-nowrap text-lg font-extrabold ">
            January 10, 2025
          </span>
        </div>
      </div>
      {/* <div className="min-w-[2px] max-w-[2px] min-h-full bg-border relative py-8">
        <div className="sticky top-25">
          <div className="w-5 h-5 bg-primary border-2 rounded-full border-primary -translate-x-2.5 z-10">
            <div className="w-8 h-0.5 bg-primary my-auto -translate-x-1.75 translate-y-1.75 z-0" />
          </div>
        </div>
      </div> */}

      <div className="flex flex-col w-full">
        {data.map((item, index) => (
          <div className="flex gap-10 md:gap-20" key={index}>
            <div className="min-w-[2px] max-w-[2px] min-h-full bg-border relative py-8">
              <div className="sticky top-20">
                <div className="w-5 h-5 bg-primary border-2 rounded-full border-primary -translate-x-2.5 z-10">
                  <div className="w-8 h-0.5 bg-primary my-auto -translate-x-1.75 translate-y-1.75 z-0" />
                </div>
              </div>
            </div>
            <div className="py-7 w-full">
              <span className="text-slate-700 dark:text-slate-200 font-extrabold text-2xl">
                {item.title}
              </span>
              {item.tags ? (
                <div className="flex flex-row gap-3 mt-4 mb-4 text-primary">
                  {item.tags.map((tag, index) => (
                    <span
                      className="bg-primary/10 dark:bg-transparent rounded-full px-2"
                      key={tag + index}
                    >
                      {`#${tag}`}
                    </span>
                  ))}
                </div>
              ) : null}
              {item.description ? (
                <p className="text-slate-600 dark:text-slate-400 text-md mt-4 mb-4">
                  {item.description}
                </p>
              ) : null}
              {item.code ? (
                <CodeBlock
                  language="yaml"
                  code={item.code}
                  className="w-full"
                />
              ) : null}
              {item.officialLink ? (
                <Link
                  href={item.officialLink}
                  target="_blank"
                  className="text-primary mt-4 block text-md"
                >
                  Official Documentation{" "}
                  <LinkIcon className="inline ml-1" size={14} />
                </Link>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionTil = () => {
  return (
    <section className="mt-10 min-h-screen max-w-full flex flex-col gap-0">
      <CardTil />
      <CardTil />
      <CardTil />
      <CardTil />
    </section>
  );
};

export default SectionTil;
