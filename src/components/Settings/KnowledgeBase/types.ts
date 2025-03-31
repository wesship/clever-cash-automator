
export interface GuideType {
  id: number;
  title: string;
  description: string;
  level: string;
  updated: string;
  timeToRead: number;
  content: string;
}

export interface FAQType {
  question: string;
  answer: string;
}

export interface FAQCategoryType {
  id: number;
  name: string;
  questions: FAQType[];
  filtered?: boolean;
}

export interface APIEndpointType {
  id: number;
  path: string;
  method: string;
  description: string;
  status: string;
  docLink: string;
}

export const guides: GuideType[] = [
  {
    id: 1,
    title: "Getting Started with MoneyHub",
    description: "Learn the basics of setting up your accounts and proxies for automated tasks.",
    level: "Beginner",
    updated: "June 15, 2023",
    timeToRead: 5,
    content: `
      # Getting Started with MoneyHub
      
      This guide will help you set up your accounts and proxies for automated tasks.
      
      ## 1. Account Creation
      To start using MoneyHub, you'll need to set up your financial accounts. Navigate to "Accounts" and click "Add New".
      
      ## 2. Proxy Setup
      For security and to avoid rate limits, set up proxies by going to the Network settings and adding proxy details.
      
      ## 3. First Automation
      Create your first automated task by selecting a template or starting from scratch.
    `
  },
  {
    id: 2,
    title: "Advanced Analytics",
    description: "Deep dive into interpreting and utilizing analytics data for better decision making.",
    level: "Intermediate",
    updated: "August 3, 2023",
    timeToRead: 10,
    content: `
      # Advanced Analytics in MoneyHub
      
      Learn how to make the most of the analytics features to optimize your financial automation.
      
      ## 1. Dashboard Overview
      The analytics dashboard provides real-time metrics on your account performance.
      
      ## 2. Custom Reports
      Create custom reports to track specific metrics relevant to your goals.
      
      ## 3. Data Export
      Export your data for further analysis in external tools.
    `
  },
  {
    id: 3,
    title: "Automation Strategies",
    description: "Learn effective strategies for automating financial tasks and maximizing returns.",
    level: "Advanced",
    updated: "September 12, 2023",
    timeToRead: 12,
    content: `
      # Automation Strategies
      
      Advanced techniques to maximize the efficiency of your automated financial tasks.
      
      ## 1. Task Chaining
      Link multiple tasks together to create complex automation workflows.
      
      ## 2. Conditional Logic
      Use if-then logic to make your automations adapt to different scenarios.
      
      ## 3. Scaling Strategies
      Learn how to safely scale your automation across multiple accounts and platforms.
    `
  },
  {
    id: 4,
    title: "Proxy Configuration",
    description: "Configure and optimize proxies for better performance and security.",
    level: "Intermediate",
    updated: "May 20, 2023",
    timeToRead: 8,
    content: `
      # Proxy Configuration Guide
      
      Learn how to set up and optimize your proxies for maximum security and performance.
      
      ## 1. Proxy Types
      Understand the different types of proxies and when to use each.
      
      ## 2. Rotation Strategies
      Set up proxy rotation to avoid detection and IP bans.
      
      ## 3. Troubleshooting
      Common proxy issues and how to resolve them.
    `
  }
];

export const faqCategories: FAQCategoryType[] = [
  {
    id: 1,
    name: "Account Management",
    questions: [
      {
        question: "How do I add a new account?",
        answer: "Navigate to the Accounts tab, click the 'Add New' button, and fill out the account details in the form that appears. You can add multiple accounts from different platforms to automate tasks across various services simultaneously."
      },
      {
        question: "Can I use multiple accounts simultaneously?",
        answer: "Yes, MoneyHub supports managing multiple accounts simultaneously across different platforms. This allows you to diversify your automation strategy and maximize earnings potential. Each account can be configured with its own proxy and task settings."
      },
      {
        question: "How do I connect my account to a proxy?",
        answer: "In the account details page, you'll find a 'Proxy' section where you can select from your available proxies. Click on the dropdown menu to see all available proxies, or add a new proxy directly from this interface for immediate connection."
      },
      {
        question: "What happens if my account gets locked?",
        answer: "If an account gets locked or flagged by the platform, MoneyHub will automatically pause all running tasks for that account and notify you. You can then take appropriate action such as verifying the account with the platform or switching to a different account."
      },
      {
        question: "Can I import accounts in bulk?",
        answer: "Yes, MoneyHub supports bulk import of accounts using CSV files. Navigate to the Accounts section, click the menu button, and select 'Import Accounts'. You can download a template file to ensure your CSV is formatted correctly."
      }
    ]
  },
  {
    id: 2,
    name: "Proxies & Security",
    questions: [
      {
        question: "Why should I use proxies?",
        answer: "Proxies help protect your identity, avoid IP bans, and distribute tasks across multiple connections for better efficiency and security. They're essential for running multiple accounts on the same platform without triggering anti-automation measures."
      },
      {
        question: "What proxy types are supported?",
        answer: "MoneyHub supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxy types. Each type has different advantages depending on your needs. SOCKS proxies generally provide better performance for certain applications, while HTTP proxies may be more compatible with specific platforms."
      },
      {
        question: "Is my data encrypted?",
        answer: "Yes, all data is encrypted both at rest and in transit using industry-standard encryption protocols. We use AES-256 encryption for stored data and TLS 1.3 for all communications between your browser and our servers. Additionally, sensitive information like passwords and API keys are encrypted using asymmetric encryption."
      },
      {
        question: "How often should I rotate proxies?",
        answer: "The optimal proxy rotation frequency depends on the platforms you're using and the volume of tasks. As a general rule, high-volume tasks should rotate proxies more frequently. MoneyHub allows you to set automatic rotation schedules or manually rotate when needed."
      },
      {
        question: "Can I use residential proxies?",
        answer: "Yes, MoneyHub supports residential proxies which are often more effective for avoiding detection. You can input residential proxy details just like any other proxy type, or purchase proxies directly through our integrated marketplace partners."
      }
    ]
  },
  {
    id: 3,
    name: "Task Automation",
    questions: [
      {
        question: "How many tasks can I run simultaneously?",
        answer: "The number of simultaneous tasks depends on your subscription plan. Free accounts can run up to 3 concurrent tasks, while premium plans allow for 10, 25, or unlimited concurrent tasks depending on your tier."
      },
      {
        question: "Can I schedule tasks to run at specific times?",
        answer: "Yes, MoneyHub has a powerful scheduling system. You can set tasks to run at specific times, on certain days of the week, or at regular intervals. This helps distribute your automation activity to appear more natural and avoid detection."
      },
      {
        question: "What happens if a task fails?",
        answer: "When a task fails, MoneyHub logs the error details and can attempt automatic recovery based on your settings. You can configure retry attempts, notification preferences, and fallback options for each task or globally."
      }
    ]
  }
];

export const apiEndpoints: APIEndpointType[] = [
  {
    id: 1,
    path: "/api/accounts",
    method: "GET",
    description: "Retrieve all accounts with pagination support",
    status: "Stable",
    docLink: "/docs/api/accounts/get-all"
  },
  {
    id: 2,
    path: "/api/accounts/{id}",
    method: "GET",
    description: "Get single account details with full transaction history",
    status: "Stable",
    docLink: "/docs/api/accounts/get-one"
  },
  {
    id: 3,
    path: "/api/proxies",
    method: "GET",
    description: "Retrieve all proxies with filtering options",
    status: "Stable",
    docLink: "/docs/api/proxies/get-all"
  },
  {
    id: 4,
    path: "/api/tasks/start",
    method: "POST",
    description: "Start a new task with specified configuration",
    status: "Beta",
    docLink: "/docs/api/tasks/start"
  },
  {
    id: 5,
    path: "/api/analytics/summary",
    method: "GET",
    description: "Get analytics summary with customizable date range",
    status: "Stable",
    docLink: "/docs/api/analytics/summary"
  },
  {
    id: 6,
    path: "/api/accounts",
    method: "POST",
    description: "Create a new account with validation",
    status: "Stable",
    docLink: "/docs/api/accounts/create"
  },
  {
    id: 7,
    path: "/api/accounts/{id}",
    method: "PUT",
    description: "Update an existing account details",
    status: "Stable",
    docLink: "/docs/api/accounts/update"
  },
  {
    id: 8,
    path: "/api/accounts/{id}",
    method: "DELETE",
    description: "Delete an account and associated tasks",
    status: "Stable",
    docLink: "/docs/api/accounts/delete"
  },
  {
    id: 9,
    path: "/api/webhooks",
    method: "POST",
    description: "Register a new webhook for event notifications",
    status: "Beta",
    docLink: "/docs/api/webhooks/create"
  },
  {
    id: 10,
    path: "/api/tasks/batch",
    method: "POST",
    description: "Create multiple tasks in a single request",
    status: "Beta",
    docLink: "/docs/api/tasks/batch"
  }
];
