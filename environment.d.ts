declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production";
    MOLLIE_API_KEY: string;
    APP_BASE_URL: string;
    CSRF_SECRET: string;
    SENDGRID_API_KEY: string;
  }
}
