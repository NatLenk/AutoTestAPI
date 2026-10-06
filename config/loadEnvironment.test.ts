import assert from 'node:assert/strict'
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join, resolve } from 'node:path'
import { test, type TestContext } from 'node:test'
import { loadEnvironment } from './loadEnvironment'

const temporaryRoot = resolve(tmpdir())

function createDirectory(t: TestContext): string {
    const directory = mkdtempSync(join(temporaryRoot, 'autotestapi-config-'))

    t.after(() => {
        // Удаляем только созданный этим тестом каталог внутри системного temp.
        assert.equal(dirname(resolve(directory)), temporaryRoot)
        assert.ok(basename(directory).startsWith('autotestapi-config-'))
        rmSync(directory, { recursive: true, force: true })
    })

    return directory
}

function selectBranch(directory: string, branch: string): void {
    writeFileSync(join(directory, '.git', 'HEAD'), `ref: refs/heads/${branch}\n`, 'utf8')
}

function createRepository(t: TestContext, branch: string): string {
    const directory = createDirectory(t)
    mkdirSync(join(directory, '.git'))
    selectBranch(directory, branch)
    return directory
}

function writeEnvironment(directory: string, environment: 'dev' | 'prod', overrides: Record<string, string> = {}): void {
    const values = {
        BASE_URL: `https://${environment}.example.test/api/`,
        API_TOKEN: `${environment}-test-token`,
        PROMOCODE_GROUP_ID: environment === 'prod' ? '101' : '201',
        GOODS_GROUP_ID: environment === 'prod' ? '102' : '202',
        ...overrides
    }

    writeFileSync(join(directory, `.env.${environment}.local`),
        Object.entries(values).map(([name, value]) => `${name}=${value}`).join('\n'), 'utf8')
}

test('main выбирает только PROD, остальные ветки выбирают DEV', t => {
    for (const branch of ['main', 'feature/test', 'rework/rework-code', 'main-fix']) {
        const directory = createRepository(t, branch)
        writeEnvironment(directory, 'dev')
        writeEnvironment(directory, 'prod')

        const environment = branch === 'main' ? 'prod' : 'dev'
        assert.deepEqual(loadEnvironment(directory), {
            branch,
            environment,
            fileName: `.env.${environment}.local`,
            baseUrl: `https://${environment}.example.test/api/`,
            apiToken: `${environment}-test-token`,
            promocodeGroupId: environment === 'prod' ? 101 : 201,
            goodsGroupId: environment === 'prod' ? 102 : 202
        })
    }
})

test('после переключения ветки загружается другой набор настроек', t => {
    const directory = createRepository(t, 'feature/test')
    writeEnvironment(directory, 'dev')
    writeEnvironment(directory, 'prod')

    assert.equal(loadEnvironment(directory).environment, 'dev')
    selectBranch(directory, 'main')
    assert.equal(loadEnvironment(directory).environment, 'prod')
    assert.equal(loadEnvironment(directory).promocodeGroupId, 101)
    selectBranch(directory, 'feature/test')
    assert.equal(loadEnvironment(directory).goodsGroupId, 202)
})

test('отсутствующий файл не заменяется другим окружением или старым .env.local', t => {
    for (const branch of ['main', 'feature/test']) {
        const directory = createRepository(t, branch)
        writeEnvironment(directory, branch === 'main' ? 'dev' : 'prod')
        writeFileSync(join(directory, '.env.local'), 'BASE_URL=https://legacy.example.test/\nAPI_TOKEN=legacy-token')

        const expectedFile = branch === 'main' ? '.env.prod.local' : '.env.dev.local'
        assert.throws(() => loadEnvironment(directory), error =>
            error instanceof Error && error.message.includes(`Не удалось прочитать ${expectedFile}`))
    }
})

test('переменные процесса не подменяют значения выбранного файла', t => {
    const directory = createRepository(t, 'feature/test')
    writeEnvironment(directory, 'dev')
    const names = ['BASE_URL', 'API_TOKEN', 'PROMOCODE_GROUP_ID', 'GOODS_GROUP_ID']
    const originalValues = names.map(name => process.env[name])

    try {
        for (const name of names) process.env[name] = 'foreign-environment-value'
        const config = loadEnvironment(directory)
        assert.equal(config.baseUrl, 'https://dev.example.test/api/')
        assert.equal(config.apiToken, 'dev-test-token')
        assert.equal(config.promocodeGroupId, 201)
        assert.equal(config.goodsGroupId, 202)
    } finally {
        names.forEach((name, index) => {
            if (originalValues[index] === undefined) delete process.env[name]
            else process.env[name] = originalValues[index]
        })
    }
})

test('все четыре переменные обязательны, ошибка не раскрывает токен', t => {
    const directory = createRepository(t, 'main')
    const names = ['BASE_URL', 'API_TOKEN', 'PROMOCODE_GROUP_ID', 'GOODS_GROUP_ID']

    for (const name of names) {
        writeEnvironment(directory, 'prod', { [name]: '' })
        assert.throws(() => loadEnvironment(directory), error =>
            error instanceof Error && error.message.includes(name) && !error.message.includes('prod-test-token'))
    }
})

test('URL должен быть HTTP или HTTPS, ID — положительными безопасными целыми числами', t => {
    const directory = createRepository(t, 'main')

    for (const url of ['not-a-url', 'ftp://example.test/', '/api/']) {
        writeEnvironment(directory, 'prod', { BASE_URL: url })
        assert.throws(() => loadEnvironment(directory), /BASE_URL/)
    }

    for (const name of ['PROMOCODE_GROUP_ID', 'GOODS_GROUP_ID']) {
        for (const value of ['0', '-1', '1.5', 'NaN', '9007199254740992', '1e3']) {
            writeEnvironment(directory, 'prod', { [name]: value })
            assert.throws(() => loadEnvironment(directory), error =>
                error instanceof Error && error.message.includes(name))
        }
    }
})

test('без Git-репозитория запуск прекращается', t => {
    const directory = createDirectory(t)
    assert.throws(() => loadEnvironment(directory), /Не найдены корректные Git-метаданные/)
})

test('detached HEAD не выбирает DEV автоматически', t => {
    const directory = createRepository(t, 'main')
    writeFileSync(join(directory, '.git', 'HEAD'), '0123456789abcdef0123456789abcdef01234567\n', 'utf8')
    writeEnvironment(directory, 'dev')
    writeEnvironment(directory, 'prod')

    assert.throws(() => loadEnvironment(directory), /detached HEAD не поддерживается/)
})
