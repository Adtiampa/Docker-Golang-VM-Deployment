interface EnvConfig {
    apiUrl: string;
    env: string;
    isProd: boolean;
    isDev: boolean;
}

export const env: EnvConfig = {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
    env: import.meta.env.MODE,
    isProd: import.meta.env.PROD,
    isDev: import.meta.env.DEV,
};