declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    MOLLIE_API_KEY: string;
    MOLLIE_REDIRECT_BASE_URL: string;
    CSRF_SECRET: string;
  }
}
