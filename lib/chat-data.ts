export interface ChatItem {
  id: string
  question: string
  answer: string
}

export const chatData: ChatItem[] = [
  {
    id: "services",
    question: "What services do you offer?",
    answer:
      "We specialize in 4 core areas:\n\n1. 🤖 AI & Automation — Custom agents, RAG chatbots, MLOps\n2. 📊 Data Analytics — ETL pipelines, real-time dashboards, BI\n3. 📱 Mobile Engineering — React Native & Flutter apps\n4. 🌐 Enterprise Web — Next.js platforms built to scale",
  },
  {
    id: "location",
    question: "Where are you located?",
    answer:
      "We're headquartered in Surat, Gujarat, India. But we operate as a remote-first team and serve clients globally — from startups in San Francisco to enterprises in Europe.",
  },
  {
    id: "cost",
    question: "How much does a project cost?",
    answer:
      "Every project is unique. We offer:\n\n• Fixed Cost — for well-scoped projects\n• Time & Material — for evolving requirements\n• Dedicated Team — for ongoing product development\n\nReach out via 'Contact Sales' for a custom quote.",
  },
  {
    id: "tech",
    question: "What tech stack do you use?",
    answer:
      "We build on modern, proven foundations:\n\nFrontend: Next.js, React Native, Flutter\nBackend: Node.js, Python, FastAPI\nData: Snowflake, BigQuery, dbt, Apache Spark\nCloud: AWS, GCP, Vercel\nAI: OpenAI, LangChain, TensorFlow",
  },
  {
    id: "hiring",
    question: "Are you hiring?",
    answer:
      "We're always looking for exceptional talent! We value engineers who care deeply about craft, ownership, and impact.\n\nEmail your resume to careers@datacore.com — we'd love to meet you.",
  },
  {
    id: "contact",
    question: "How do I get in touch?",
    answer:
      "Several ways to reach us:\n\n📧 hello@datacore.com\n📞 +91 98765 43210\n💬 Use the 'Contact Sales' button in the navbar to schedule a call.\n\nWe typically respond within 24 hours.",
  },
]