import { execFileSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { parseEnv } from 'node:util'

export type EnvironmentConfig = Readonly<{
    branch: string
    environment: 'dev' | 'prod'
    fileName: string
    baseUrl: string
    apiToken: string
    promocodeGroupId: number
    goodsGroupId: number
}>

export function loadEnvironment(projectDirectory: string): EnvironmentConfig {
    let branch: string

    try {
        branch = execFileSync('git', ['symbolic-ref', '--quiet', '--short', 'HEAD'], {
            cwd: projectDirectory,
            encoding: 'utf8',
            stdio: ['ignore', 'pipe', 'pipe'],
            windowsHide: true
        }).trim()
    } catch {
        throw new Error('Не удалось определить Git-ветку. Запускайте тесты из Git-репозитория с выбранной веткой; detached HEAD не поддерживается.')
    }

    if (!branch) {
        throw new Error('Git вернул пустое имя ветки. Окружение для тестов не выбрано.')
    }

    const environment = branch === 'main' ? 'prod' : 'dev'
    const fileName = `.env.${environment}.local`
    let values: ReturnType<typeof parseEnv>

    try {
        // Читаем выбранный файл напрямую: переменные процесса не могут подменить окружение.
        values = parseEnv(readFileSync(resolve(projectDirectory, fileName), 'utf8'))
    } catch {
        throw new Error(`Не удалось прочитать ${fileName} для ветки ${branch}. Создайте его в корне проекта и заполните настройки ${environment.toUpperCase()}: BASE_URL, API_TOKEN, PROMOCODE_GROUP_ID, GOODS_GROUP_ID.`)
    }

    const requiredNames = ['BASE_URL', 'API_TOKEN', 'PROMOCODE_GROUP_ID', 'GOODS_GROUP_ID']
    const missingNames = requiredNames.filter(name => !values[name]?.trim())

    if (missingNames.length > 0) {
        throw new Error(`${fileName}: заполните обязательные переменные ${missingNames.join(', ')}.`)
    }

    // Обязательные значения проверены выше до построения конфигурации.
    const baseUrl = values.BASE_URL!.trim()
    let url: URL

    try {
        url = new URL(baseUrl)
    } catch {
        throw new Error(`${fileName}: BASE_URL должен быть корректным HTTP или HTTPS URL.`)
    }

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
        throw new Error(`${fileName}: BASE_URL должен использовать HTTP или HTTPS.`)
    }

    function readGroupId(name: string): number {
        const value = values[name]!.trim()
        const id = Number(value)

        if (!/^\d+$/.test(value) || !Number.isSafeInteger(id) || id <= 0) {
            throw new Error(`${fileName}: ${name} должен быть положительным целым числом.`)
        }

        return id
    }

    return Object.freeze({
        branch,
        environment,
        fileName,
        baseUrl,
        apiToken: values.API_TOKEN!.trim(),
        promocodeGroupId: readGroupId('PROMOCODE_GROUP_ID'),
        goodsGroupId: readGroupId('GOODS_GROUP_ID')
    })
}
