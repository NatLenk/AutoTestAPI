import { loadEnvironment } from './config/loadEnvironment'

// Перед запуском тестов укажите DEV или PROD.
export const TEST_ENVIRONMENT: 'DEV' | 'PROD' = 'DEV'

export const environmentConfig = loadEnvironment(__dirname, TEST_ENVIRONMENT)
