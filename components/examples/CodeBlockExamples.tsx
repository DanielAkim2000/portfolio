"use client";

import { CodeBlock } from "@/components/code-block/code-block.component";

export function CodeBlockExamples() {
  // JavaScript example
  const jsCode = `function fibonacci(n) {
  if (n <= 1) return n;
  
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Calculate the 10th Fibonacci number
const result = fibonacci(10);
console.log(result); // 55`;

  // TypeScript example
  const tsCode = `interface User {
  id: number;
  name: string;
  email: string;
  isActive: boolean;
}

function getUserInfo(user: User): string {
  return \`User \${user.name} (\${user.email}) is \${user.isActive ? 'active' : 'inactive'}\`;
}

const currentUser: User = {
  id: 1,
  name: "John Doe",
  email: "john@example.com",
  isActive: true
};

console.log(getUserInfo(currentUser));`;

  // Python example
  const pythonCode = `def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# Example usage
numbers = [3, 6, 8, 10, 1, 2, 1]
sorted_numbers = quick_sort(numbers)
print(sorted_numbers)  # Output: [1, 1, 2, 3, 6, 8, 10]`;

  // CSS example
  const cssCode = `.card {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.card__image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card__content {
  padding: 1rem;
  background-color: white;
}`;

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-bold mb-4">Basic JavaScript Example</h2>
        <CodeBlock code={jsCode} language="javascript" />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          TypeScript with Line Numbers Disabled
        </h2>
        <CodeBlock
          code={tsCode}
          language="typescript"
          showLineNumbers={false}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          Python with Highlighted Lines
        </h2>
        <CodeBlock
          code={pythonCode}
          language="python"
          highlightLines={[1, 2, 9, 10]}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">
          CSS Example with Custom Class
        </h2>
        <CodeBlock
          code={cssCode}
          language="css"
          className="max-h-80 overflow-y-auto"
        />
      </section>

      <section className="border p-6 rounded-lg bg-slate-50 dark:bg-slate-800">
        <h2 className="text-2xl font-bold mb-4">Usage Information</h2>
        <p className="mb-4">
          The CodeBlock component accepts the following props:
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
              code
            </code>
            : The source code to display (string)
          </li>
          <li>
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
              language
            </code>
            : Programming language for syntax highlighting (Language from
            prism-react-renderer)
          </li>
          <li>
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
              showLineNumbers
            </code>
            : Whether to display line numbers (boolean, default: true)
          </li>
          <li>
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
              highlightLines
            </code>
            : Array of line numbers to highlight (number[])
          </li>
          <li>
            <code className="bg-slate-200 dark:bg-slate-700 px-1 rounded">
              className
            </code>
            : Additional CSS classes for the container
          </li>
        </ul>

        <div className="mt-6">
          <p className="font-medium">Supported languages include:</p>
          <p className="mt-2">
            javascript, typescript, jsx, tsx, html, css, python, java, c, cpp,
            ruby, go, rust, swift, php, and many more.
          </p>
        </div>
      </section>
    </div>
  );
}
