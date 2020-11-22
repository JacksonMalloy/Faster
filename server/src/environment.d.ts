declare global {
  namespace NodeJS {
    interface ProcessEnv {
      SENDGRID: string
    }
  }
}

export {}
