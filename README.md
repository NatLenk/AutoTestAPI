# Автотесты API kilbil

Перед первым запуском нужно подготовить данные в личном кабинете. Ниже написал, что для этого нужно сделать.

## Что лежит в проекте

- `tests` - сами тесты. Разложил их по папкам, а файлы назвал по методам API.
- `helpers` - функции, которые собирают данные и отправляют запросы. Использую их, чтобы не писать одно и то же в каждом тесте.
- `types/RequestTypes.ts` - типы для данных, которые отправляю и получаю в запросах.
- `api.config.ts` - общие функции для запросов: собирают URL, выводят запрос и ответ в консоль, возвращают дату и время.
- `playwright.config.ts` - настройки запуска тестов.
- `environment.config.ts` и `config/loadEnvironment.ts` - выбор окружения по Git-ветке и проверка настроек.

## Как запустить тесты

Сначала нужно установить зависимости проекта:

```bash
npm ci
```

Нужны Node.js 22 или новее и Git, доступный из терминала.

Для запуска на своём компьютере создайте два файла в корне проекта: `.env.dev.local` и `.env.prod.local`.

Заполните `.env.dev.local` значениями DEV, а `.env.prod.local` — значениями PROD:

```dotenv
BASE_URL=https://your-api-host/api/
API_TOKEN=your-token
PROMOCODE_GROUP_ID=
GOODS_GROUP_ID=
```

Это пример структуры; URL, токен и ID нужно заменить реальными значениями соответствующего окружения. Если URL содержит путь, укажите завершающий `/`.

При каждом запуске `npx playwright test` окружение выбирается автоматически:

- Ветка `main` — `.env.prod.local`.
- Любая другая ветка — `.env.dev.local`.
- Если ветку определить нельзя, запуск прекращается с ошибкой.

Проверить типы и выбор окружения без запросов к API:

```bash
npm run typecheck
npm run test:config
```

Перед запуском в личном кабинете нужно:

- **Обязательно включить тестовый режим отправки СМС в личном кабинете перед запуском тестов.**
- Создать тестовую программу подарочных сертификатов в личном кабинете и включить в ней генерацию (`generate_gift_card: true`).
- Опубликовать правовую информацию в личном кабинете.
- Для теста `replacecard` создать диапазон карт от `99900000000` до `99900009999` включительно. Карта для замены должна быть неиспользованной. Для `blockcard` и `getclientcards` заранее создавать карты в личном кабинете не нужно.
- Включить QR-коды.
- Создать теги и группы тегов. Для теста `updateclienttag` первый тег в ответе `getlisttags` должен быть счётчиком.
- Создать группу промокодов с диапазоном от `99900000000` до `99999999999`. ID группы нужно записать в `PROMOCODE_GROUP_ID` файла соответствующего окружения.
- Создать акцию на изменение цены товара с кодом `1234`.
- Создать группу товаров. Её ID нужно записать в `GOODS_GROUP_ID` файла соответствующего окружения.

Все тесты запускаются так:

```bash
npx playwright test
```

Один файл можно запустить так:

```bash
npx playwright test tests/clients/searchclient.spec.ts
```

А так можно запустить тесты, у которых в пути к файлу или названии есть `searchclient`:

```bash
npx playwright test searchclient
```

## Клиенты

В папке `tests/clients` семь файлов с тестами. Во всех запросах использую POST:

Функции для этих запросов находятся в `helpers/clientsHelper.ts`, а типы запросов и ответов - в `types/RequestTypes.ts`.

Для создания клиента сначала ищу свободный номер телефона через `findUnusedPhone`. Функция `createTestClient` добавляет клиента и находит его ID по телефону. В большинстве тестов использую её, поэтому заранее создавать клиентов не нужно.

Функция `generateCardCode` создаёт случайный 11-значный номер с префиксом `998`. Код и баркод одинаковые. Генерация не проверяет наличие номера в API и не гарантирует уникальность между запусками.

Функция `findUnusedReplacementCard` проверяет случайные номера из подготовленного диапазона `99900000000`-`99900009999`. Если за 20 попыток подходящая карта не найдена, тест завершается с ошибкой подготовки данных.

Запустить все тесты клиентов:

```bash
npx playwright test tests/clients
```

Запустить только проверки баланса:

```bash
npx playwright test tests/clients/getclientfullbalance.spec.ts
```

## Теги

В папке `tests/tags` пять тестов. Во всех запросах использую POST:

Функции для этих запросов находятся в `helpers/tagsHelper.ts`, а типы - в `types/RequestTypes.ts`.

Перед запуском нужно создать теги и группы тегов в личном кабинете. В тестах беру первый тег из `tags_list`, поэтому список не должен быть пустым. Для `updateclienttag` этот тег должен быть счётчиком (`tag_type: counter`).

Запустить все тесты тегов:

```bash
npx playwright test tests/tags
```

Запустить один тест:

```bash
npx playwright test tests/tags/updateclienttag.spec.ts
```

## Операции

В папке `tests/operation` пять файлов с тестами. Во всех запросах использую POST:

Функции для запросов находятся в `helpers/operationHelper.ts`. Товары для продажи собираю в `buildGoodsData` из `helpers/clientsHelper.ts`. Типы запросов и ответов лежат в `types/RequestTypes.ts`.

Для продажи создаю случайный `move_id` и беру дату и время компьютера.

Запустить все тесты операций:

```bash
npx playwright test tests/operation
```

Запустить один файл:

```bash
npx playwright test tests/operation/processsale.spec.ts
```

## Код подтверждения

В папке `tests/confirmcode` два теста. В обоих использую POST:

Функции для запросов находятся в `helpers/confirmCodeHelper.ts`. Использую типы `AskConfirmPhone` и `CheckConfirmPhoneCode` из `types/RequestTypes.ts`.

Клиент и телефон создаются внутри каждого теста.

Запустить оба теста:

```bash
npx playwright test "tests/confirmcode"
```

Запустить только запрос без кода:

```bash
npx playwright test "tests/confirmcode/checkconfirmphonecode.spec.ts"
```

## Промокоды

В папке `tests/promocode` четыре теста. Во всех запросах использую POST:

Функции для этих запросов находятся в `helpers/promocodeHelper.ts`, а типы - в `types/RequestTypes.ts`.

Перед запуском нужно создать группу промокодов и записать её ID в `PROMOCODE_GROUP_ID` файла соответствующего окружения. Диапазон промокодов указан выше в подготовке к запуску.

Запустить все тесты промокодов:

```bash
npx playwright test tests/promocode
```

Запустить только поиск:

```bash
npx playwright test tests/promocode/searchpromocode.spec.ts
```

## Лояльность

В папке `tests/loyaltyinfo` два теста. В обоих использую POST:

Функции для запросов находятся в `helpers/loyaltyinfoHelper.ts`. Использую типы `GetPrograms` и `GetActionsList` из `types/RequestTypes.ts`.

Перед запуском в личном кабинете нужно создать акцию на изменение цены товара.

Запустить оба теста:

```bash
npx playwright test tests/loyaltyinfo
```

Запустить только получение акций:

```bash
npx playwright test tests/loyaltyinfo/getactionslist.spec.ts
```

## Номенклатура

В папке `tests/nomenclature` два файла с тестами. В запросах использую POST:

Функции для этих запросов находятся в `helpers/nomenclatureHelper.ts`. Типы `Goods`, `GoodsList` и `Inside` лежат в `types/RequestTypes.ts`.

Перед запуском `goodslist` нужно создать группу товаров в личном кабинете и записать её ID в `GOODS_GROUP_ID` файла соответствующего окружения.

Запустить все тесты номенклатуры:

```bash
npx playwright test tests/nomenclature
```

Запустить только добавление товара в группу:

```bash
npx playwright test tests/nomenclature/goodslist.spec.ts
```

## Подарочные сертификаты

В папке `tests/giftcard` три теста. Для поиска и создания сертификата использую POST, для получения программ - GET.

Функции для этих запросов находятся в `helpers/giftcardHelper.ts`, а типы запросов и ответов - в `types/RequestTypes.ts`.

Перед запуском нужно создать тестовую программу подарочных сертификатов в личном кабинете и включить генерацию (`generate_gift_card: true`). В функции `getGiftCardProgramId` беру ID первой программы с включённой генерацией.

Запустить все тесты сертификатов:

```bash
npx playwright test tests/giftcard
```

Запустить только поиск:

```bash
npx playwright test tests/giftcard/searchgiftcard.spec.ts
```

## Реферальная программа

В папке `tests/referral` один тест. В запросе использую POST.

Функции для запроса находятся в `helpers/referralHelper.ts`. Использую тип `Referral` из `types/RequestTypes.ts`.

Запустить тесты из папки:

```bash
npx playwright test tests/referral
```

Запустить один файл:

```bash
npx playwright test tests/referral/referral.spec.ts
```

## Wallet

В папке `tests/wallet` один тест. В запросе использую POST.

Функции для запроса находятся в `helpers/walletHelper.ts`. Использую тип `GetWalletLink` из `types/RequestTypes.ts`.

Запустить тесты из папки:

```bash
npx playwright test tests/wallet
```

Запустить один файл:

```bash
npx playwright test tests/wallet/getwalletlink.spec.ts
```

## План-факт

В папке `tests/planfact` один файл с двумя тестами. В обоих запросах использую POST.

Функции для запроса находятся в `helpers/planfactHelper.ts`. Использую тип `GetSalesIndicesSlides` из `types/RequestTypes.ts`.

Запустить оба теста:

```bash
npx playwright test tests/planfact
```

Запустить один файл:

```bash
npx playwright test tests/planfact/getsalesindicesslides.spec.ts
```

## Другое

В папке `tests/other` четыре теста. Для `legal_info` использую GET, для остальных запросов - POST.

Функции для этих запросов находятся в `helpers/otherHelper.ts`. Типы `CloseSession`, `ExchangePosSettings` и `GenerateCard` лежат в `types/RequestTypes.ts`.

Для создания карты в тесте `generatecard` нужно настроить интеграцию CardsMobile.

Запустить все тесты из папки:

```bash
npx playwright test tests/other
```

Запустить один тест:

```bash
npx playwright test tests/other/legal_info.spec.ts
```
