# Автотесты API kilbil

Перед первым запуском нужно подготовить данные в личном кабинете. Ниже написал, что для этого нужно сделать.

## Что лежит в проекте

- `tests` — сами тесты. Разложил их по папкам, а файлы назвал по методам API.
- `helpers` — функции, которые собирают данные и отправляют запросы. Использую их, чтобы не писать одно и то же в каждом тесте.
- `types/RequestTypes.ts` — типы для данных, которые отправляю и получаю в запросах.
- `api.config.ts` — общие функции для запросов: собирают URL, выводят запрос и ответ в консоль, возвращают дату и время.
- `playwright.config.ts` — настройки запуска тестов.

## Как запустить тесты

Сначала нужно установить зависимости проекта:

```bash
npm ci
```

Для запуска на своём компьютере нужно создать файл `.env.local` в корне проекта и указать в нём `BASE_URL` и `API_TOKEN`.

Для запуска через GitHub Actions нужно создать Environment с названием `api-test` и добавить в него секреты `BASE_URL` и `API_TOKEN`.

Перед запуском в личном кабинете нужно:

- Создать диапазон карт от `99900000000` до `99999999999`.
- Включить QR-коды.
- Создать теги и группы тегов. Для теста `updateclienttag` первый тег в ответе `getlisttags` должен быть счётчиком.
- Создать группу промокодов с диапазоном от `99900000000` до `99999999999`. ID группы нужно записать в `list_id` функции `buildGenerate_PromocodeBody` в `helpers/promocodeHelper.ts`.
- Создать акцию на изменение цены товара с кодом `1234`.
- Создать группу товаров. Её ID нужно записать в поле `ID` функции `buildGoodsListBody` в `helpers/nomenclatureHelper.ts`.

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

Функции для этих запросов находятся в `helpers/clientsHelper.ts`, а типы запросов и ответов — в `types/RequestTypes.ts`.

Для создания клиента сначала ищу свободный номер телефона через `findUnusedPhone`. Функция `createTestClient` добавляет клиента и находит его ID по телефону. В большинстве тестов использую её, поэтому заранее создавать клиентов не нужно. В отдельном тесте `searchclient` просто передаю случайный телефон и проверяю статус 200.

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

Функции для этих запросов находятся в `helpers/tagsHelper.ts`, а типы — в `types/RequestTypes.ts`.

Перед запуском нужно создать теги и группы тегов в личном кабинете. В тестах беру первый тег из `tags_list`, поэтому список не должен быть пустым. Для `updateclienttag` этот тег должен быть счётчиком (`tag_type: counter`).

В тестах с клиентом сначала создаю нового клиента и добавляю ему тег. В тесте удаления сначала добавляю тег, потом удаляю его. Так каждый тест можно запускать отдельно.

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

## Подтверждение телефона

В папке `tests/confirm code` два теста. В обоих использую POST:

Функции для запросов находятся в `helpers/confirmcodeHelper.ts`. Использую типы `AskConfirmPhone` и `CheckConfirmPhoneCode` из `types/RequestTypes.ts`.

Клиент и телефон создаются внутри каждого теста.

Запустить оба теста:

```bash
npx playwright test "tests/confirm code"
```

Запустить только запрос без кода:

```bash
npx playwright test "tests/confirm code/checkconfirmphonecode.spec.ts"
```

## Промокоды

В папке `tests/promocode` четыре теста. Во всех запросах использую POST:

Функции для этих запросов находятся в `helpers/promocodeHelper.ts`, а типы — в `types/RequestTypes.ts`.

Перед запуском нужно создать группу промокодов и записать её ID в `list_id` функции `buildGenerate_PromocodeBody`. Диапазон промокодов указан выше в подготовке к запуску.

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

В тесте `getactionslist` сначала загружаю товар с кодом `1234` через `goods`. Перед запуском в личном кабинете нужно создать акцию на изменение цены этого товара.

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

Перед запуском `goodslist` нужно создать группу товаров в личном кабинете и записать её ID в поле `ID` функции `buildGoodsListBody`. В тесте сначала загружаю товар, жду 60 секунд и потом передаю его код в `inside`. Для этого теста время ожидания увеличено до 120 секунд.

Запустить все тесты номенклатуры:

```bash
npx playwright test tests/nomenclature
```

Запустить только добавление товара в группу:

```bash
npx playwright test tests/nomenclature/goodslist.spec.ts
```

## Подарочные сертификаты

В папке `tests/giftcard` три теста. Для поиска и создания сертификата использую POST, для получения программ — GET.

Функции для этих запросов находятся в `helpers/giftcardHelper.ts`, а типы запросов и ответов — в `types/RequestTypes.ts`.

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

В папке `tests/other` четыре теста. Для `legal_info` использую GET, для остальных запросов — POST.

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
