# Автотесты API kilbil


Файл содержит автотесты апи. Написаны на playwright TypeScript.

Для работы с репозиторием нужно установить библиотеку playwright командой:

**npm init playwright@latest**

## Содержимое проекта:

-Для запуска тестов в CI нужны переменные окружения GitHub. Cоздать GitHub Environment api-test, переменные BASE_URL и API_TOKEN

-Для локальной отладки тестов нужно создать файл .env.local указав те же переменные как и в GitHub и настроить playwright.config.ts:

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { loadEnvFile } from 'node:process'
import { defineConfig, devices } from '@playwright/test'

const localEnvironmentPath = resolve(__dirname, '.env.local')

if (existsSync(localEnvironmentPath)) {
  loadEnvFile(localEnvironmentPath)
}

-Папка tests содержит файлы запросов. Название каждого файла соответствует эндпоинту.

-В папке types находится файл RequestTypes содержит типизированные параметры для body запросов

-В файле конфигурации api.config.ts находят функции для построения url и вспомогательные функции.

## Запуск тестов

Для запуска тестов с использованием библиотеки playwright нужно выполнить команду:

**npx playwright test** - запуск всех файлов соответствующих форматов .spec.js, .spec.ts, .test.js или .test.ts находящихся в папке tests

**npx playwright test tests/searchclient.spec.ts** - запуск конкретного файла содержащего тесты

**npx playwright test searchclient** - запуск всех тестов содержащих в названии searchclient