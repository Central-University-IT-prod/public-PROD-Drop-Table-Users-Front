declare module "*.scss" {
  const content: Record<string, string>;
  export default content;
}

interface ImportMeta {
  env: {
    VITE_BACKEND_URL: string;
    NODE_ENV: "development" | "production";
    PORT?: string;
    PWD: string;
  };
}
