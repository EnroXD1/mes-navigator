const modules = [
  { id: "production", title: "Производственный контур", weeks: "1–10 недели", range: "1–17", description: "Системы предприятия, изделие, планирование и исполнение производства." },
  { id: "architecture", title: "Архитектура и интеграции", weeks: "11–14 недели", range: "18–25", description: "Модули, web-архитектура, API и обмен между корпоративными системами." },
  { id: "data", title: "Данные и масштабирование", weeks: "15–17 недели", range: "26–33", description: "Модели данных, транзакции, миграции, запросы и параллельная работа." },
  { id: "security", title: "Надёжность и безопасность", weeks: "18–20 недели", range: "34–45", description: "Доступ, резервирование, КИИ, отечественная инфраструктура и риски." },
  { id: "engineering", title: "Инженерная разработка", weeks: "21–22 недели", range: "46–55", description: "Лицензии, Git, тестирование, CI/CD, версии и документация." },
  { id: "implementation", title: "Анализ и внедрение", weeks: "23–24 недели", range: "56–65", description: "Требования, процессы, UX, аналитика, пилот и сопровождение." },
  { id: "legal", title: "Право и договоры", weeks: "25–26 недели", range: "66–75", description: "Права на ПО, конфиденциальность, договоры и закупочные механизмы." },
  { id: "product", title: "Экономика и команда", weeks: "27–28 недели", range: "76–88", description: "Финансирование, оценка, Roadmap, MVP, долг и ответственность команды." },
  { id: "platforms", title: "Платформы и тиражирование", weeks: "29–30 недели", range: "89–100", description: "Обзор решений и превращение локальной системы в промышленный продукт." }
];

const rawTopics = [
  [1, "MES и MOM-системы", "MES управляет исполнением производства в цехе, а MOM охватывает более широкий контур производственных операций: исполнение, качество, обслуживание и аналитику."],
  [2, "ERP и граница производственной системы", "ERP планирует ресурсы и ведёт хозяйственный контур предприятия; MES детализирует и контролирует фактическое исполнение работ на производстве."],
  [3, "PDM и PLM", "PDM управляет инженерными данными и документами, а PLM — информацией об изделии на всём жизненном цикле, от замысла до снятия с эксплуатации."],
  [4, "BOM, EBOM и MBOM", "BOM — состав изделия; EBOM отражает конструкторское представление, а MBOM перестраивает его под реальное изготовление и сборку."],
  [5, "Иерархическая структура изделия", "Многоуровневая структура связывает конечное изделие с узлами, блоками, деталями, материалами и покупными комплектующими."],
  [6, "Маршруты, операции и рабочие центры", "Технологический маршрут задаёт последовательность операций, места их выполнения, нормативное время и производственный цикл."],
  [7, "APS и конечные мощности", "APS строит выполнимое производственное расписание с учётом ограничений оборудования, людей, материалов и сроков."],
  [8, "Загрузка оборудования и персонала", "Планирование загрузки сопоставляет потребность операций с доступными сменами, квалификациями и мощностями рабочих центров."],
  [9, "Жизненный цикл производственного заказа", "Заказ проходит состояния от создания и планирования через запуск и выполнение до закрытия, отмены или приостановки."],
  [10, "Незавершённое производство — WIP", "WIP показывает материалы и изделия, которые уже поступили в производство, но ещё не стали готовой продукцией."],
  [11, "Прослеживаемость", "Прослеживаемость позволяет восстановить происхождение материалов, выполненные операции, оборудование, исполнителей и результаты контроля для каждого изделия."],
  [12, "Управление качеством", "Контур качества фиксирует проверки, испытания, дефекты, несоответствия, решения о приёмке, возврате или переделке."],
  [13, "Производственный склад", "Складской контур учитывает остатки, резервы, партии, места хранения, выдачу в производство, перемещения и возвраты."],
  [14, "MRP", "MRP рассчитывает, какие материалы и комплектующие, в каком количестве и к какому сроку нужны для выполнения производственного плана."],
  [15, "Закупки и МТО", "Материально-техническое обеспечение превращает рассчитанную потребность в заявки, заказы поставщикам, поставки и обеспечение производства."],
  [16, "НСИ и единые справочники", "Нормативно-справочная информация задаёт согласованные коды, единицы, материалы, операции и другие определения для всех систем предприятия."],
  [17, "Единый цифровой контур", "Цифровой контур связывает данные и процессы инженерии, планирования, снабжения, производства, качества и аналитики без ручного дублирования."],
  [18, "Модульная архитектура", "Крупная система разделяется на модули с ясной ответственностью и контрактами, чтобы их можно было развивать и заменять независимо."],
  [19, "Универсальное ядро и специфика предприятия", "Ядро хранит общие правила продукта, а особенности завода оформляются конфигурацией, расширениями и адаптерами."],
  [20, "Multi-site архитектура", "Multi-site поддерживает несколько предприятий с общим продуктом, но разными структурами, правилами, часовыми поясами и локальными данными."],
  [21, "Клиент-серверная архитектура", "Клиент отвечает за взаимодействие с пользователем, сервер централизованно выполняет бизнес-логику, проверяет права и работает с данными."],
  [22, "Web-архитектура корпоративных систем", "Web-система использует браузерный интерфейс, серверные сервисы и сетевые протоколы, упрощая централизованное обновление рабочих мест."],
  [23, "API и интеграция систем", "API задаёт формальный контракт, по которому разные приложения запрашивают данные и запускают разрешённые операции."],
  [24, "REST, очереди и события", "REST удобен для синхронных запросов, а очереди и события — для надёжного асинхронного обмена и слабой связанности систем."],
  [25, "Интеграция с корпоративным контуром", "Интеграционный слой согласует форматы, идентификаторы и процессы MES с ERP, 1С, PLM, базами данных и другими системами."],
  [26, "Реляционные БД и нормализация", "Реляционная база хранит связанные таблицы, а нормализация уменьшает дублирование и предотвращает аномалии изменения данных."],
  [27, "Модель данных производственной системы", "Модель данных описывает изделия, ресурсы, маршруты, заказы, партии, операции и их связи с учётом реального производственного процесса."],
  [28, "Транзакции и целостность", "Транзакция объединяет несколько изменений в неделимую операцию, чтобы данные сохранились полностью или не изменились вовсе."],
  [29, "История, аудит и журналирование", "Историчность сохраняет прошлые состояния, аудит отвечает кто и что изменил, а журналирование фиксирует технические события системы."],
  [30, "Миграции структуры БД", "Миграции управляемо изменяют схему и данные между версиями приложения с проверкой совместимости и возможностью безопасного восстановления."],
  [31, "Индексы и оптимизация запросов", "Индексы ускоряют поиск ценой дополнительного места и стоимости записи; оптимизация начинается с измерения реальных планов запросов."],
  [32, "Параллельная работа пользователей", "Конкурентный доступ требует блокировок, уровней изоляции или версионности, чтобы одновременные изменения не повреждали данные."],
  [33, "Кэширование и большие объёмы", "Кэш снижает задержку и нагрузку на источник, но требует правил актуализации; большие данные также нуждаются в разбиении и пакетной обработке."],
  [34, "RBAC", "Ролевая модель выдаёт разрешения ролям, а пользователям назначает роли, упрощая управление доступом по рабочим обязанностям."],
  [35, "Аутентификация и авторизация", "Аутентификация подтверждает личность пользователя, а авторизация определяет, какие действия ему разрешены."],
  [36, "Резервное копирование и восстановление", "Резервирование создаёт проверяемые копии данных, а план восстановления определяет сроки, порядок и допустимую потерю информации."],
  [37, "Отказоустойчивость", "Отказоустойчивая система обнаруживает сбои, ограничивает их влияние и продолжает работу либо быстро восстанавливается без нарушения целостности."],
  [38, "Логирование и мониторинг", "Логи объясняют отдельные события, метрики показывают состояние во времени, а трассировка связывает путь запроса между компонентами."],
  [39, "Информационная безопасность", "Безопасность защищает конфиденциальность, целостность и доступность данных с помощью организационных и технических мер."],
  [40, "Сегментация и минимальные привилегии", "Сегментация ограничивает сетевое взаимодействие, а минимальные привилегии дают субъекту только необходимый доступ на необходимое время."],
  [41, "187-ФЗ и КИИ", "Законодательство о КИИ задаёт контур защиты значимых объектов критической информационной инфраструктуры; детали нужно изучать по актуальной редакции и подзаконным актам."],
  [42, "ПО для ОПК и государственных компаний", "Такие заказчики могут предъявлять дополнительные требования к безопасности, происхождению компонентов, сертификации, эксплуатации и обращению с информацией."],
  [43, "Реестр российского ПО", "Реестр используется для подтверждения статуса отечественного программного обеспечения; актуальные критерии и закупочные последствия проверяются по официальным источникам."],
  [44, "Российские ОС, СУБД и серверы", "Целевая инфраструктура может требовать совместимости с отечественными операционными системами, базами данных, средствами виртуализации и оборудованием."],
  [45, "Импортозависимость", "Импортозависимость оценивают по компонентам, лицензиям, облачным сервисам, оборудованию и компетенциям, затем снижают заменой и архитектурной изоляцией."],
  [46, "Лицензии open-source", "MIT и Apache обычно разрешительны, GPL и AGPL содержат сильные copyleft-требования, LGPL применяется преимущественно к библиотекам; обязательства проверяют для каждой версии лицензии."],
  [47, "Риски сторонних библиотек", "Зависимости несут лицензионные, уязвимостные, эксплуатационные и supply-chain риски, поэтому требуют учёта, проверки и контролируемого обновления."],
  [48, "Облачный ИИ и корпоративные данные", "Передача кода и данных внешнему ИИ допустима только с учётом режима информации, договора, политики предприятия и настроек хранения поставщика."],
  [49, "Git и командная разработка", "Git хранит историю изменений и позволяет разработчикам параллельно работать, сравнивать версии и управляемо объединять результат."],
  [50, "Ветки, Pull Request и Code Review", "Ветка изолирует изменение, Pull Request организует обсуждение, Code Review проверяет качество, а правила слияния защищают основную линию разработки."],
  [51, "CI/CD", "CI автоматически собирает и проверяет изменения, а CD подготавливает или выполняет воспроизводимую доставку версии в среды эксплуатации."],
  [52, "Виды тестирования", "Unit-тесты проверяют малые части, интеграционные — взаимодействие компонентов, регрессионные — сохранение поведения, нагрузочные — работу под потоком запросов."],
  [53, "Версионирование и совместимость", "Версия сообщает характер изменения, а обратная совместимость позволяет старым клиентам, данным и интеграциям продолжать работу после обновления."],
  [54, "Релизы и откат", "Релиз объединяет согласованный набор изменений, а стратегия отката или переключения версии снижает последствия неудачного обновления."],
  [55, "Документация промышленного ПО", "Техническая документация помогает разработке и эксплуатации, пользовательская — выполнению рабочих операций, а обе должны соответствовать версии продукта."],
  [56, "Сбор и формализация требований", "Аналитик выявляет цели, ограничения и правила разных подразделений, устраняет противоречия и переводит договорённости в проверяемые требования."],
  [57, "User Story, Use Case и Acceptance Criteria", "User Story кратко выражает потребность, Use Case подробно описывает взаимодействие, а критерии приёмки определяют проверяемый результат."],
  [58, "Изучение процесса перед автоматизацией", "Перед проектированием изучают участников, события, данные, исключения, показатели и реальные обходные пути процесса AS-IS, затем проектируют TO-BE."],
  [59, "Почему нельзя копировать Excel-процесс", "Прямой перенос часто закрепляет дублирование, ручные проверки и ошибки; автоматизация должна сохранять цель процесса, а не случайную форму таблицы."],
  [60, "UX/UI производственных систем", "Интерфейс оператора должен быть быстрым, однозначным, устойчивым к ошибкам и пригодным для длительной работы в условиях конкретного рабочего места."],
  [61, "BI, KPI и производственная аналитика", "BI превращает производственные данные в показатели и отчёты, а KPI связывает наблюдаемые метрики с управленческими целями."],
  [62, "Миграция данных из старых систем", "Миграция включает инвентаризацию, сопоставление, очистку, пробную загрузку, сверку и управляемое переключение источников."],
  [63, "Пилот и опытная эксплуатация", "Пилот проверяет решение на ограниченном контуре, опытная эксплуатация — в реальной работе, после чего подтверждённый подход тиражируется."],
  [64, "Техническая поддержка", "Поддержка принимает и классифицирует обращения, восстанавливает работу, устраняет причины, ведёт базу знаний и передаёт улучшения в разработку."],
  [65, "SLA", "SLA фиксирует измеримые уровни сервиса: доступность, сроки реакции и восстановления, приоритеты инцидентов и границы ответственности сторон."],
  [66, "Интеллектуальная собственность на ПО", "К программному продукту относятся исходный код, документация, дизайн, базы данных и другие результаты, права на которые должны быть определены."],
  [67, "Авторское и исключительное право", "Авторское право включает личные права автора, а исключительное право позволяет использовать произведение и разрешать либо запрещать использование другим."],
  [68, "Служебное произведение", "Права на ПО сотрудника зависят от трудовых обязанностей, задания, оформления результата и применимого законодательства; условия следует фиксировать документально."],
  [69, "Передача прав и лицензирование", "Отчуждение передаёт исключительное право целиком, а лицензия разрешает оговорённые способы использования в определённых пределах."],
  [70, "Лицензионные модели продукта", "Продукт может лицензироваться бессрочно, по подписке, пользователям, серверам, предприятиям, модулям или объёму использования."],
  [71, "NDA и коммерческая тайна", "NDA создаёт договорные обязанности конфиденциальности, а режим коммерческой тайны требует установленного организационного порядка защиты информации."],
  [72, "Договор на разработку ПО", "Договор согласует предмет, результаты, этапы, сроки, стоимость, права, изменения, ответственность и объективные критерии приёмки."],
  [73, "Гарантийное и постгарантийное сопровождение", "Гарантия обычно охватывает устранение оговорённых недостатков, а последующее сопровождение регулируется отдельным объёмом услуг и оплатой."],
  [74, "ИП, ООО и форма команды", "Юридическая форма влияет на ответственность, налоги, управление, инвестиции, найм и возможность заключать договоры с крупными заказчиками."],
  [75, "44-ФЗ и 223-ФЗ", "Эти режимы регулируют разные закупочные контуры; для ориентации важно понимать участников, процедуры, документацию и критерии выбора по актуальным нормам."],
  [76, "Нацпроект «Экономика данных»", "Государственные программы задают направления цифрового развития и меры поддержки; состав и параметры проектов необходимо проверять по актуальным официальным паспортам."],
  [77, "Федеральный проект «Отечественные решения»", "Проект рассматривается как часть политики развития и внедрения российских ИТ-решений; актуальные задачи и инструменты поддержки изучают по официальным материалам."],
  [78, "Особо значимые ИТ-проекты", "Статус значимого проекта может быть связан с технологическим приоритетом, крупным заказчиком, требованиями отбора и специальными механизмами поддержки."],
  [79, "Грантовое и корпоративное финансирование", "Финансирование различается источником, конкурсными условиями, софинансированием, отчётностью, правами на результат и ожиданиями возврата."],
  [80, "Экономика заказной разработки", "Цена должна покрывать труд команды, налоги, инфраструктуру, управление, риски, гарантию, сопровождение и плановую прибыль."],
  [81, "Оценка стоимости разработки", "Оценка строится из объёма работ, ролей, сроков, неопределённости, нефункциональных требований, интеграций и стоимости полного жизненного цикла."],
  [82, "Стоимость разработки, продукта и прав", "Затраты на создание не равны рыночной цене продукта, а передача исключительных прав имеет отдельную ценность и последствия."],
  [83, "Product Roadmap", "Roadmap связывает продуктовые цели, крупные результаты, зависимости и горизонты развития, не превращаясь в неподвижный календарный обещатель."],
  [84, "MVP и поэтапное внедрение", "MVP — минимальный целостный продукт для проверки ценности и рисков, после которого модули развиваются на основе результата эксплуатации."],
  [85, "Технический долг", "Технический долг — будущая стоимость принятых упрощений; его нужно видеть, оценивать по риску и планово сокращать."],
  [86, "Bus factor", "Bus factor показывает, сколько людей может выпасть из проекта до критической потери знаний; документация, review и ротация снижают зависимость."],
  [87, "Ownership модулей", "Владелец модуля отвечает за его границы, качество и развитие, но знания и возможность изменения не должны оставаться у одного человека."],
  [88, "Роли продуктовой команды", "Архитектура, backend, frontend, данные, интеграции, DevOps, QA, аналитика и внедрение требуют разных компетенций и согласованной ответственности."],
  [89, "1С:ERP, 1С:MES и 1С:PLM", "Линейку полезно изучать как пример связанных корпоративных решений: состав модулей, модель расширения, интеграции и распределение ответственности."],
  [90, "Галактика ERP/MES", "Платформу полезно анализировать по покрываемым процессам, архитектурному подходу и открытым кейсам внедрения в сложной промышленности."],
  [91, "T-FLEX PLM", "Решение служит примером управления инженерными данными, составом изделия и жизненным циклом в наукоёмком производстве."],
  [92, "Siemens Opcenter", "Opcenter можно рассматривать как международный пример семейства MES/MOM-решений для управления производственными операциями."],
  [93, "DELMIA Apriso", "Apriso полезен как пример платформенного подхода к унификации и координации производственных операций на нескольких площадках."],
  [94, "SAP Digital Manufacturing", "Решение иллюстрирует связь оперативного производства с корпоративным планированием, данными и облачным цифровым контуром."],
  [95, "Внутренние промышленные платформы", "Практика крупных групп показывает, как единые стандарты, платформенные компоненты и центры компетенций поддерживают множество предприятий."],
  [96, "Пилот → результат → тиражирование", "Пилот должен доказать измеримый эффект и воспроизводимость, после чего команда стандартизирует решение и разворачивает его на следующих площадках."],
  [97, "Внутренняя программа и тиражируемый продукт", "Продукту нужны конфигурируемость, документация, совместимость, поддержка, модель версий и экономика, которых может не быть у локальной программы."],
  [98, "От локальной системы к платформе", "Платформизация требует отделить общие возможности от частных, ввести стабильные контракты расширения, конфигурацию и управляемый жизненный цикл."],
  [99, "Интеграционные адаптеры", "Адаптер переводит внешний протокол и модель данных в стабильный внутренний контракт, изолируя ядро от особенностей конкретного предприятия."],
  [100, "Новый завод без отдельной ветки", "Различия площадок следует выражать данными, настройками, правилами и расширениями, чтобы все заводы обновлялись из одной продуктовой линии."],
];

const moduleFor = (id) => {
  if (id <= 17) return "production";
  if (id <= 25) return "architecture";
  if (id <= 33) return "data";
  if (id <= 45) return "security";
  if (id <= 55) return "engineering";
  if (id <= 65) return "implementation";
  if (id <= 75) return "legal";
  if (id <= 88) return "product";
  return "platforms";
};
const topicDetails = window.TOPIC_DETAILS || {};
const topicDiagrams = window.TOPIC_DIAGRAMS || {};
const abbreviations = window.ABBREVIATIONS || [];
const topics = rawTopics.map(([id, title, definition]) => ({
  id,
  title,
  definition,
  module: moduleFor(id),
  details: topicDetails[id] || { points: [], example: "", distinction: "", related: [], source: null },
  diagram: topicDiagrams[id] || ["Исходные данные", title, "Практический результат"]
}));
const moduleMap = Object.fromEntries(modules.map((module) => [module.id, module]));

const defaultState = {
  studied: [],
  notes: {},
  quizBest: null,
  xp: 0,
  streak: 0,
  lastStudyDate: null,
  simulator: { index: 0, defect: false, log: ["Заказ МО-2407 создан в ERP и передан в MES"] }
};

function loadState() {
  try {
    const stored = JSON.parse(localStorage.getItem("ceh-znaniy-state"));
    return stored ? { ...defaultState, ...stored, simulator: { ...defaultState.simulator, ...stored.simulator } } : structuredClone(defaultState);
  } catch {
    return structuredClone(defaultState);
  }
}

let state = loadState();
let selectedModule = "all";
let activeTopicId = 1;
let quiz = null;
let lesson = null;

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const saveState = () => localStorage.setItem("ceh-znaniy-state", JSON.stringify(state));
const topicById = (id) => topics.find((topic) => topic.id === Number(id));
const nextTopic = () => topics.find((topic) => !state.studied.includes(topic.id)) || null;
const isTopicUnlocked = (topic) => state.studied.includes(topic.id) || topic.id === nextTopic()?.id;

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function updateStreak() {
  const today = localDateKey();
  if (state.lastStudyDate === today) return;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  state.streak = state.lastStudyDate === localDateKey(yesterday) ? (state.streak || 0) + 1 : 1;
  state.lastStudyDate = today;
}

function showView(name, updateHash = true) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${name}-view`));
  $$(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  if (updateHash) history.replaceState(null, "", `#${name}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProgress() {
  const count = state.studied.length;
  const percent = Math.round((count / topics.length) * 100);
  const current = nextTopic();
  $("#header-progress-value").textContent = `${percent}%`;
  $("#header-progress-bar").style.width = `${percent}%`;
  $("#studied-count").textContent = count;
  $("#xp-count").textContent = state.xp || 0;
  $("#streak-count").textContent = state.streak || 0;
  $("#quiz-best").textContent = state.quizBest === null ? "—" : `${state.quizBest}/10`;
  $("#next-topic-kicker").textContent = current ? `Следующий урок · тема ${current.id} из ${topics.length}` : "Маршрут завершён · 100 из 100";
  $("#next-topic-title").textContent = current?.title || "Все темы пройдены";
  $("#next-topic-copy").textContent = current?.definition || "Закрепи знания в итоговом экзамене или повтори любой завершённый урок.";
  $("#continue-button").textContent = current ? "Начать урок" : "Перейти к экзамену";
}

function renderModules() {
  $("#module-grid").innerHTML = modules.map((module, index) => {
    const moduleTopics = topics.filter((topic) => topic.module === module.id);
    const done = moduleTopics.filter((topic) => state.studied.includes(topic.id)).length;
    const percent = Math.round((done / moduleTopics.length) * 100);
    return `<button class="module-card" data-open-module="${module.id}">
      <span class="module-index">МОДУЛЬ ${String(index + 1).padStart(2, "0")} · ${module.weeks}</span>
      <h3>${module.title}</h3><p>${module.description}</p>
      <span class="module-progress"><span>${done}/${moduleTopics.length}</span><span class="progress-track"><i style="width:${percent}%"></i></span></span>
    </button>`;
  }).join("");

  $("#module-filter-list").innerHTML = modules.map((module) => {
    const count = topics.filter((topic) => topic.module === module.id).length;
    return `<button class="filter-button" data-module="${module.id}"><span>${module.title}</span><b>${count}</b></button>`;
  }).join("");
}

function renderSequentialPath() {
  const current = nextTopic();
  const activeModuleId = current?.module || modules[modules.length - 1].id;
  const activeModule = moduleMap[activeModuleId];
  const moduleTopics = topics.filter((topic) => topic.module === activeModuleId);
  const completed = moduleTopics.filter((topic) => state.studied.includes(topic.id)).length;
  $("#lesson-path-summary").innerHTML = `<div><span>Сейчас</span><b>${activeModule.title}</b></div><strong>${completed}/${moduleTopics.length} уроков</strong>`;
  $("#lesson-path").innerHTML = moduleTopics.map((topic) => {
    const mastered = state.studied.includes(topic.id);
    const unlocked = isTopicUnlocked(topic);
    const stateClass = mastered ? "mastered" : unlocked ? "current" : "locked";
    const stateText = mastered ? "Пройдено" : unlocked ? "Доступно сейчас" : "Откроется позже";
    const icon = mastered ? "✓" : unlocked ? "▶" : "🔒";
    return `<button class="lesson-path-item ${stateClass}" data-topic="${topic.id}" aria-label="Тема ${topic.id}: ${topic.title}. ${stateText}">
      <span class="path-node">${icon}</span>
      <span class="path-copy"><small>Тема ${topic.id}</small><b>${topic.title}</b><em>${stateText}</em></span>
    </button>`;
  }).join("");
}

function renderTopics() {
  const query = $("#topic-search").value.trim().toLowerCase();
  const unfinishedOnly = $("#unfinished-only").checked;
  const visible = topics.filter((topic) => {
    const matchesModule = selectedModule === "all" || topic.module === selectedModule;
    const abbreviationText = abbreviationsForTopic(topic.id).map((item) => `${item.code} ${item.full} ${item.meaning}`).join(" ");
    const detailText = `${topic.details.points.join(" ")} ${topic.details.example} ${topic.details.distinction} ${abbreviationText}`;
    const matchesQuery = !query || `${topic.title} ${topic.definition} ${detailText}`.toLowerCase().includes(query);
    const matchesProgress = !unfinishedOnly || !state.studied.includes(topic.id);
    return matchesModule && matchesQuery && matchesProgress;
  });

  $("#topic-result-count").textContent = `${visible.length} ${wordForTopics(visible.length)}`;
  $("#topic-empty").hidden = visible.length !== 0;
  $("#topic-list").innerHTML = visible.map((topic) => {
    const mastered = state.studied.includes(topic.id);
    const unlocked = isTopicUnlocked(topic);
    return `<button class="topic-card ${mastered ? "studied" : ""} ${!unlocked ? "locked" : ""}" data-topic="${topic.id}">
    <span class="topic-number">${topic.id}</span>
    <span><h3>${topic.title}</h3><p>${topic.definition}</p></span>
    <span class="studied-indicator" aria-label="${mastered ? "Пройдено" : unlocked ? "Текущий урок" : "Урок заблокирован"}">${mastered ? "✓" : unlocked ? "▶" : "🔒"}</span>
  </button>`;
  }).join("");
}

function wordForTopics(number) {
  const mod100 = number % 100;
  const mod10 = number % 10;
  if (mod100 >= 11 && mod100 <= 14) return "тем";
  if (mod10 === 1) return "тема";
  if (mod10 >= 2 && mod10 <= 4) return "темы";
  return "тем";
}

function abbreviationsForTopic(topicId) {
  return abbreviations.filter((item) => item.topics.includes(Number(topicId)));
}

function abbreviationCountLabel(number) {
  const mod100 = number % 100;
  const mod10 = number % 10;
  if (mod100 >= 11 && mod100 <= 14) return `${number} сокращений`;
  if (mod10 === 1) return `${number} сокращение`;
  if (mod10 >= 2 && mod10 <= 4) return `${number} сокращения`;
  return `${number} сокращений`;
}

function abbreviationButton(item, compact = false) {
  if (compact) {
    return `<button class="topic-abbreviation" type="button" data-abbreviation="${item.code}">
      <b>${item.code}</b><span>${item.meaning}</span>
    </button>`;
  }
  return `<button class="glossary-card" type="button" data-abbreviation="${item.code}" aria-label="Открыть расшифровку ${item.code}">
    <span class="glossary-card-head"><b>${item.code}</b><em>${item.category}</em></span>
    <span class="glossary-full">${item.full}</span>
    <strong>${item.meaning}</strong>
    <span class="glossary-purpose">${item.purpose}</span>
    <span class="glossary-example"><small>Пример</small>${item.example}</span>
  </button>`;
}

function renderGlossary() {
  const query = $("#glossary-search").value.trim().toLowerCase();
  const visible = abbreviations.filter((item) => {
    const searchable = `${item.code} ${item.full} ${item.meaning} ${item.category} ${item.purpose} ${item.role} ${item.example}`.toLowerCase();
    return !query || searchable.includes(query);
  });
  $("#glossary-count").textContent = `${abbreviationCountLabel(visible.length)} из ${abbreviations.length}`;
  $("#glossary-empty").hidden = visible.length !== 0;
  $("#glossary-grid").innerHTML = visible.map((item) => abbreviationButton(item)).join("");
}

function openAbbreviation(code) {
  const item = abbreviations.find((entry) => entry.code === code);
  if (!item) return;
  $("#abbreviation-category").textContent = item.category;
  $("#abbreviation-code").textContent = item.code;
  $("#abbreviation-full").textContent = item.full;
  $("#abbreviation-meaning").textContent = item.meaning;
  $("#abbreviation-purpose").textContent = item.purpose;
  $("#abbreviation-role").textContent = item.role;
  $("#abbreviation-example").textContent = item.example;
  $("#abbreviation-topics").innerHTML = item.topics.slice(0, 10).map((topicId) => {
    const topic = topicById(topicId);
    return topic ? `<button type="button" data-topic="${topic.id}">№${topic.id} · ${topic.title}</button>` : "";
  }).join("");
  if (!$("#abbreviation-dialog").open) $("#abbreviation-dialog").showModal();
}

function openTopic(id) {
  const topic = topicById(id);
  if (!topic) return;
  activeTopicId = topic.id;
  const module = moduleMap[topic.module];
  $("#dialog-module").textContent = `${module.title} · тема ${topic.id}`;
  $("#dialog-title").textContent = topic.title;
  $("#dialog-definition").textContent = topic.definition;
  $("#dialog-points").innerHTML = topic.details.points.map((point) => `<li>${point}</li>`).join("");
  $("#dialog-example").textContent = topic.details.example;
  $("#dialog-distinction").textContent = topic.details.distinction;
  const topicAbbreviations = abbreviationsForTopic(topic.id);
  $("#dialog-abbreviations-section").hidden = topicAbbreviations.length === 0;
  $("#dialog-abbreviations").innerHTML = topicAbbreviations.map((item) => abbreviationButton(item, true)).join("");
  $("#dialog-related").innerHTML = topic.details.related.map((relatedId) => {
    const related = topicById(relatedId);
    return related ? `<button type="button" data-topic="${related.id}">№${related.id} · ${related.title}</button>` : "";
  }).join("");
  const sourceSection = $("#dialog-source-section");
  sourceSection.hidden = !topic.details.source;
  if (topic.details.source) {
    $("#dialog-source").textContent = topic.details.source[0];
    $("#dialog-source").href = topic.details.source[1];
  }
  $("#dialog-question").textContent = `Объясни своими словами, какую проблему решает «${topic.title}», и приведи пример для завода электродвигателей.`;
  $("#dialog-note").value = state.notes[topic.id] || "";
  updateLessonButton(topic);
  if (!$("#topic-dialog").open) $("#topic-dialog").showModal();
}

function updateLessonButton(topic = topicById(activeTopicId)) {
  const button = $("#start-topic-lesson");
  const mastered = state.studied.includes(topic.id);
  const unlocked = isTopicUnlocked(topic);
  button.disabled = !unlocked;
  button.textContent = mastered ? "Повторить урок" : unlocked ? "Начать урок" : `Сначала пройди тему №${nextTopic()?.id}`;
  button.classList.toggle("secondary", mastered || !unlocked);
  button.classList.toggle("primary", unlocked && !mastered);
}

function buildLessonQuestions(topic) {
  const pool = topics.filter((item) => item.id !== topic.id && item.module === topic.module);
  const definitionOptions = shuffle([topic, ...shuffle(pool).slice(0, 3)]).map((item) => ({ id: item.id, text: item.definition }));
  const exampleOptions = shuffle([topic, ...shuffle(pool).slice(0, 3)]).map((item) => ({ id: item.id, text: item.details.example }));
  return [
    {
      label: "Распознай понятие",
      prompt: `Какое определение точнее всего описывает «${topic.title}»?`,
      options: definitionOptions
    },
    {
      label: "Примени на практике",
      prompt: `Какой производственный пример относится к теме «${topic.title}»?`,
      options: exampleOptions
    }
  ];
}

function startLesson(id = activeTopicId) {
  const topic = topicById(id);
  if (!topic || !isTopicUnlocked(topic)) return;
  activeTopicId = topic.id;
  lesson = {
    topicId: topic.id,
    step: 0,
    answered: false,
    errors: 0,
    completed: false,
    award: 0,
    firstTime: !state.studied.includes(topic.id),
    questions: buildLessonQuestions(topic)
  };
  if ($("#topic-dialog").open) $("#topic-dialog").close();
  renderLesson();
  if (!$("#lesson-dialog").open) $("#lesson-dialog").showModal();
}

function renderLesson() {
  if (!lesson) return;
  const topic = topicById(lesson.topicId);
  const module = moduleMap[topic.module];
  const body = $("#lesson-body");
  const controls = $("#lesson-controls");
  $("#lesson-label").textContent = `${module.title} · тема ${topic.id}`;
  $("#lesson-step-label").textContent = lesson.step === 4 ? "Урок завершён" : `Шаг ${lesson.step + 1} из 4`;
  $("#lesson-progress-bar").style.width = `${lesson.step === 4 ? 100 : (lesson.step + 1) * 25}%`;
  controls.innerHTML = "";

  if (lesson.step === 0) {
    const lessonAbbreviations = abbreviationsForTopic(topic.id).slice(0, 4);
    body.innerHTML = `<div class="lesson-copy">
      <p class="eyebrow">Разберись в сути</p>
      <h2>${topic.title}</h2>
      <p class="lesson-definition">${topic.definition}</p>
      <div class="memory-hook"><span>Опорная связь</span><strong>${topic.diagram.join(" → ")}</strong></div>
      ${lessonAbbreviations.length ? `<div class="lesson-abbreviations"><span>Аббревиатуры урока</span><div>${lessonAbbreviations.map((item) => abbreviationButton(item, true)).join("")}</div></div>` : ""}
      <ul class="lesson-key-points">${topic.details.points.slice(0, 2).map((point) => `<li>${point}</li>`).join("")}</ul>
    </div>`;
    controls.innerHTML = `<button class="button primary" id="lesson-next">Показать схему</button>`;
    return;
  }

  if (lesson.step === 1) {
    body.innerHTML = `<div class="lesson-copy">
      <p class="eyebrow">Собери модель в голове</p>
      <h2>${topic.title}</h2>
      <div class="lesson-diagram" aria-label="Схема темы ${topic.title}">
        ${topic.diagram.map((node, index) => `<div class="diagram-node"><small>${index === 0 ? "Вход" : index === 1 ? "Механизм" : "Результат"}</small><strong>${node}</strong></div>${index < 2 ? '<span class="diagram-arrow" aria-hidden="true">→</span>' : ""}`).join("")}
      </div>
      <div class="lesson-rule"><span>Не перепутай</span><p>${topic.details.distinction}</p></div>
    </div>`;
    controls.innerHTML = `<button class="button primary" id="lesson-next">Перейти к заданию</button>`;
    return;
  }

  if (lesson.step === 2 || lesson.step === 3) {
    const question = lesson.questions[lesson.step - 2];
    body.innerHTML = `<div class="lesson-copy lesson-question">
      <p class="eyebrow">${question.label}</p>
      <h2>${question.prompt}</h2>
      <div class="lesson-answer-list">${question.options.map((option) => `<button class="lesson-answer" data-lesson-answer="${option.id}">${option.text}</button>`).join("")}</div>
      <div class="lesson-feedback" id="lesson-feedback" hidden></div>
    </div>`;
    return;
  }

  const next = nextTopic();
  body.innerHTML = `<div class="lesson-result">
    <span class="lesson-complete-mark">✓</span>
    <p class="eyebrow">${lesson.firstTime ? "Новая тема освоена" : "Повторение завершено"}</p>
    <h2>${topic.title}</h2>
    <div class="reward-row"><strong>+${lesson.award} XP</strong><span>${state.streak || 0} ${dayWord(state.streak || 0)} подряд</span></div>
    <p>${lesson.errors === 0 ? "Оба задания выполнены без ошибок." : `Ошибок до правильного ответа: ${lesson.errors}. Вернись к схеме, если связь ещё не закрепилась.`}</p>
  </div>`;
  controls.innerHTML = `<button class="button secondary" id="lesson-to-path">К маршруту</button><button class="button primary" id="lesson-continue">${next ? `Следующая тема · №${next.id}` : "Итоговый экзамен"}</button>`;
}

function dayWord(number) {
  const mod100 = number % 100;
  const mod10 = number % 10;
  if (mod100 >= 11 && mod100 <= 14) return "дней";
  if (mod10 === 1) return "день";
  if (mod10 >= 2 && mod10 <= 4) return "дня";
  return "дней";
}

function answerLessonQuestion(answerId, button) {
  if (!lesson || lesson.answered || ![2, 3].includes(lesson.step)) return;
  const feedback = $("#lesson-feedback");
  if (Number(answerId) !== lesson.topicId) {
    lesson.errors += 1;
    button.classList.add("wrong");
    button.disabled = true;
    feedback.textContent = "Не совсем. Исключи этот вариант и сравни оставшиеся с опорной схемой.";
    feedback.dataset.result = "wrong";
    feedback.hidden = false;
    return;
  }
  lesson.answered = true;
  $$(".lesson-answer").forEach((answer) => {
    answer.disabled = true;
    if (Number(answer.dataset.lessonAnswer) === lesson.topicId) answer.classList.add("correct");
  });
  feedback.textContent = lesson.step === 2 ? "Верно. Ты распознал границы понятия." : "Верно. Ты связал термин с производственной ситуацией.";
  feedback.dataset.result = "correct";
  feedback.hidden = false;
  $("#lesson-controls").innerHTML = `<button class="button primary" id="lesson-next">${lesson.step === 3 ? "Завершить урок" : "Следующее задание"}</button>`;
}

function completeLesson() {
  if (!lesson || lesson.completed) return;
  const firstTime = !state.studied.includes(lesson.topicId);
  lesson.firstTime = firstTime;
  lesson.award = firstTime ? Math.max(10, 20 - lesson.errors * 2) : Math.max(3, 6 - lesson.errors);
  if (firstTime) state.studied = [...state.studied, lesson.topicId].sort((a, b) => a - b);
  state.xp = (state.xp || 0) + lesson.award;
  updateStreak();
  lesson.completed = true;
  saveState();
  renderAll();
}

function advanceLesson() {
  if (!lesson) return;
  if ([2, 3].includes(lesson.step) && !lesson.answered) return;
  if (lesson.step === 3) {
    completeLesson();
    lesson.step = 4;
  } else if (lesson.step < 3) {
    lesson.step += 1;
    lesson.answered = false;
  }
  renderLesson();
}

function continueLearning() {
  if ($("#lesson-dialog").open) $("#lesson-dialog").close();
  const next = nextTopic();
  if (next) startLesson(next.id);
  else showView("quiz");
}

const simStages = [
  { label: "План", short: "План", status: "Запланирован", topic: 9, title: "Производственный заказ", copy: "Задание создано, но материалы и мощности ещё не подтверждены.", action: "Рассчитать потребность и зарезервировать" },
  { label: "Материалы", short: "МТР", status: "Обеспечен", topic: 14, title: "MRP и резерв", copy: "Состав MBOM развёрнут в потребность, доступные партии зарезервированы под заказ.", action: "Составить расписание и запустить" },
  { label: "Запуск", short: "Старт", status: "Запущен", topic: 7, title: "APS и рабочие центры", copy: "Операции назначены на доступные рабочие центры с учётом последовательности и мощности.", action: "Начать выполнение операций" },
  { label: "Производство", short: "WIP", status: "В работе", topic: 10, title: "Незавершённое производство", copy: "Материалы выданы, изделие находится в WIP, а MES фиксирует факт выполнения операций.", action: "Завершить маршрут" },
  { label: "Контроль", short: "ОТК", status: "На контроле", topic: 12, title: "Управление качеством", copy: "ОТК проверяет результат и принимает решение: выпуск, несоответствие или переделка.", action: null },
  { label: "Выпуск", short: "ГП", status: "Завершён", topic: 11, title: "Прослеживаемость", copy: "Изделие принято и выпущено. История материалов, операций и контроля связана с серийным номером ЭД100-0001.", action: null }
];

const bom = [
  ["Статор СТ-100", "1 шт."], ["Ротор РТ-100", "1 шт."], ["Корпус КР-100", "1 шт."], ["Подшипник 6204", "2 шт."]
];
const route = [
  ["010 · Комплектование", "СКЛ-01"], ["020 · Сборка", "РЦ-СБ-01"], ["030 · Испытание", "СТЕНД-02"]
];

function renderSimulator() {
  const sim = state.simulator;
  const current = simStages[sim.index];
  $("#order-status").textContent = sim.defect ? "Несоответствие" : current.status;
  $("#order-status").style.color = sim.defect ? "var(--red)" : "";
  $("#stage-track").innerHTML = simStages.map((stage, index) => `<div class="stage ${index < sim.index ? "done" : ""} ${index === sim.index ? "current" : ""}" data-short="${stage.short}">${stage.label}</div>`).join("");
  $("#simulation-explainer").innerHTML = `<b>${sim.defect ? "Обнаружен дефект: повышенная вибрация" : current.title}</b><p>${sim.defect ? "Изделие нельзя выпустить. Нужно зарегистрировать несоответствие и выполнить переделку с повторным контролем." : current.copy}</p>`;
  $("#active-term-title").textContent = sim.defect ? "Несоответствие и переделка" : current.title;
  $("#active-term-copy").textContent = sim.defect ? "Контур качества сохраняет дефект, решение и повторные операции в истории изделия." : current.copy;
  $("#active-term-link").dataset.topic = sim.defect ? 12 : current.topic;

  if (sim.index < 4) {
    $("#simulation-actions").innerHTML = `<button class="button primary" id="advance-simulator">${current.action}</button>`;
  } else if (sim.index === 4 && !sim.defect) {
    $("#simulation-actions").innerHTML = `<button class="button primary" data-quality="pass">Принять и выпустить</button><button class="button secondary" data-quality="defect">Зарегистрировать дефект</button>`;
  } else if (sim.index === 4 && sim.defect) {
    $("#simulation-actions").innerHTML = `<button class="button primary" data-quality="rework">Выполнить переделку</button>`;
  } else {
    $("#simulation-actions").innerHTML = `<button class="button secondary" data-topic="11">Посмотреть, что вошло в прослеживаемость</button>`;
  }

  $("#bom-list").innerHTML = bom.map(([name, quantity]) => `<div class="data-row"><span>${name}<small>${sim.index >= 1 ? "Партия зарезервирована" : "Доступно на складе"}</small></span><b class="data-value ${sim.index >= 1 ? "ok" : ""}">${quantity}${sim.index >= 1 ? " · ✓" : ""}</b></div>`).join("");
  $("#route-list").innerHTML = route.map(([name, center], index) => {
    const routeProgress = sim.index < 3 ? "Ожидает" : sim.index === 3 ? (index === 0 ? "Выполнено" : index === 1 ? "В работе" : "Ожидает") : "Выполнено";
    const statusClass = routeProgress === "Выполнено" ? "ok" : routeProgress === "В работе" ? "active" : "";
    return `<div class="data-row"><span>${name}<small>${center}</small></span><b class="data-value ${statusClass}">${routeProgress}</b></div>`;
  }).join("");
  $("#trace-log").innerHTML = sim.log.slice().reverse().map((entry) => `<li><time>Событие ${sim.log.indexOf(entry) + 1}</time>${entry}</li>`).join("");
}

function advanceSimulator() {
  if (state.simulator.index >= 4) return;
  const messages = [
    "MRP рассчитал потребность; склад зарезервировал партии компонентов",
    "APS назначил маршрут на РЦ-СБ-01 и СТЕНД-02; заказ запущен",
    "Материалы выданы со склада; изделие вошло в WIP",
    "Операции маршрута завершены; изделие передано в ОТК"
  ];
  state.simulator.log.push(messages[state.simulator.index]);
  state.simulator.index += 1;
  saveState();
  renderSimulator();
}

function handleQuality(action) {
  if (action === "defect") {
    state.simulator.defect = true;
    state.simulator.log.push("ОТК зарегистрировал дефект: повышенная вибрация");
  } else if (action === "rework") {
    state.simulator.defect = false;
    state.simulator.log.push("Переделка выполнена; изделие возвращено на повторный контроль");
  } else if (action === "pass") {
    state.simulator.index = 5;
    state.simulator.log.push("ОТК принял изделие; присвоен серийный номер ЭД100-0001");
  }
  saveState();
  renderSimulator();
}

function resetSimulator() {
  state.simulator = structuredClone(defaultState.simulator);
  saveState();
  renderSimulator();
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function startQuiz() {
  quiz = { questions: shuffle(topics).slice(0, 10), index: 0, score: 0, answered: false };
  $("#quiz-intro").hidden = true;
  $("#quiz-result").hidden = true;
  $("#quiz-card").hidden = false;
  renderQuestion();
}

function renderQuestion() {
  const topic = quiz.questions[quiz.index];
  const distractors = shuffle(topics.filter((item) => item.id !== topic.id)).slice(0, 3);
  const options = shuffle([topic, ...distractors]);
  quiz.answered = false;
  $("#quiz-counter").textContent = `Вопрос ${quiz.index + 1} из 10`;
  $("#quiz-score").textContent = `${quiz.score} ${quiz.score === 1 ? "балл" : "баллов"}`;
  $("#quiz-progress").style.width = `${quiz.index * 10}%`;
  $("#quiz-term").textContent = topic.title;
  $("#answer-list").innerHTML = options.map((option) => `<button class="answer-button" data-answer="${option.id}">${option.definition}</button>`).join("");
  $("#quiz-feedback").hidden = true;
  $("#next-question").hidden = true;
}

function answerQuestion(answerId) {
  if (quiz.answered) return;
  quiz.answered = true;
  const correct = quiz.questions[quiz.index];
  const isCorrect = Number(answerId) === correct.id;
  if (isCorrect) quiz.score += 1;
  $$(".answer-button").forEach((button) => {
    button.disabled = true;
    if (Number(button.dataset.answer) === correct.id) button.classList.add("correct");
    else if (button.dataset.answer === String(answerId)) button.classList.add("wrong");
  });
  $("#quiz-score").textContent = `${quiz.score} ${quiz.score === 1 ? "балл" : "баллов"}`;
  $("#quiz-feedback").textContent = isCorrect ? "Верно. Термин распознан правильно." : `Неверно. Правильное определение выделено; вернись к теме №${correct.id}.`;
  $("#quiz-feedback").hidden = false;
  $("#next-question").textContent = quiz.index === 9 ? "Показать результат" : "Следующий вопрос";
  $("#next-question").hidden = false;
}

function nextQuestion() {
  if (quiz.index === 9) {
    finishQuiz();
    return;
  }
  quiz.index += 1;
  renderQuestion();
}

function finishQuiz() {
  state.quizBest = Math.max(state.quizBest ?? 0, quiz.score);
  saveState();
  renderProgress();
  $("#quiz-card").hidden = true;
  $("#quiz-result").hidden = false;
  $("#quiz-result").innerHTML = `<p class="eyebrow">Экзамен завершён</p><div class="result-score">${quiz.score}/10</div><h2>${quiz.score >= 8 ? "Зачёт" : "Нужно повторение"}</h2><p>${quiz.score >= 8 ? "Ты уверенно распознаёшь термины этого набора." : "Открой неизученные темы, повтори определения и попробуй снова."}</p><button class="button primary" id="restart-quiz">Пройти ещё раз</button>`;
}

function renderAll() {
  renderProgress();
  renderModules();
  renderSequentialPath();
  renderTopics();
  renderGlossary();
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) showView(viewButton.dataset.view);

  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) {
    if ($("#abbreviation-dialog").open) $("#abbreviation-dialog").close();
    openTopic(topicButton.dataset.topic);
  }

  const abbreviationButton = event.target.closest("[data-abbreviation]");
  if (abbreviationButton) openAbbreviation(abbreviationButton.dataset.abbreviation);

  const moduleButton = event.target.closest("[data-open-module]");
  if (moduleButton) {
    selectedModule = moduleButton.dataset.openModule;
    $$(".filter-button").forEach((button) => button.classList.toggle("active", button.dataset.module === selectedModule));
    showView("topics");
    renderTopics();
  }

  const filterButton = event.target.closest("[data-module]");
  if (filterButton) {
    selectedModule = filterButton.dataset.module;
    $$(".filter-button").forEach((button) => button.classList.toggle("active", button === filterButton));
    renderTopics();
  }

  if (event.target.closest("#advance-simulator")) advanceSimulator();
  const qualityButton = event.target.closest("[data-quality]");
  if (qualityButton) handleQuality(qualityButton.dataset.quality);
  const answerButton = event.target.closest("[data-answer]");
  if (answerButton) answerQuestion(answerButton.dataset.answer);
  const lessonAnswer = event.target.closest("[data-lesson-answer]");
  if (lessonAnswer) answerLessonQuestion(lessonAnswer.dataset.lessonAnswer, lessonAnswer);
  if (event.target.closest("#lesson-next")) advanceLesson();
  if (event.target.closest("#lesson-continue")) continueLearning();
  if (event.target.closest("#lesson-to-path")) {
    $("#lesson-dialog").close();
    showView("overview");
  }
  if (event.target.closest("#restart-quiz")) startQuiz();
});

$("#topic-search").addEventListener("input", renderTopics);
$("#glossary-search").addEventListener("input", renderGlossary);
$("#unfinished-only").addEventListener("change", renderTopics);
$("#dialog-close").addEventListener("click", () => $("#topic-dialog").close());
$("#abbreviation-close").addEventListener("click", () => $("#abbreviation-dialog").close());
$("#save-note").addEventListener("click", () => {
  state.notes[activeTopicId] = $("#dialog-note").value.trim();
  saveState();
  $("#save-note").textContent = "Сохранено";
  setTimeout(() => { $("#save-note").textContent = "Сохранить заметку"; }, 1000);
});
$("#start-topic-lesson").addEventListener("click", () => startLesson(activeTopicId));
$("#lesson-close").addEventListener("click", () => $("#lesson-dialog").close());
$("#continue-button").addEventListener("click", () => {
  const next = nextTopic();
  if (next) startLesson(next.id); else showView("quiz");
});
$("#reset-simulator").addEventListener("click", resetSimulator);
$("#start-quiz").addEventListener("click", startQuiz);
$("#next-question").addEventListener("click", nextQuestion);
$("#active-term-link").addEventListener("click", (event) => openTopic(event.currentTarget.dataset.topic));

let installPrompt = null;

function updateOfflineStatus(message, stateName = "ready") {
  const status = $("#offline-status");
  status.textContent = message;
  status.dataset.state = stateName;
}

function openOfflineGuide() {
  if (window.matchMedia("(display-mode: standalone)").matches) {
    updateOfflineStatus("Приложение уже установлено. После первого полного открытия материалы доступны без сети.");
  } else if (!navigator.onLine) {
    updateOfflineStatus("Сейчас нет сети, но кэшированная версия приложения работает.", "offline");
  } else if (navigator.serviceWorker?.controller) {
    updateOfflineStatus("Офлайн-кэш готов. Можно устанавливать приложение и отключать интернет.");
  } else {
    updateOfflineStatus("Подготавливаем файлы для автономной работы…", "loading");
  }
  $("#offline-dialog").showModal();
}

window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
  $("#install-from-guide").textContent = "Установить приложение";
});
$("#install-app").addEventListener("click", openOfflineGuide);
$("#offline-close").addEventListener("click", () => $("#offline-dialog").close());
$("#install-from-guide").addEventListener("click", async () => {
  if (installPrompt) {
    installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    installPrompt = null;
    updateOfflineStatus(choice.outcome === "accepted" ? "Установка подтверждена. Значок появится на главном экране." : "Установка отменена — инструкцией ниже можно воспользоваться позже.");
  } else {
    updateOfflineStatus("Если системное окно не появилось, откройте меню ⋮ в Chrome и выберите «Установить приложение» или «Добавить на главный экран».");
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      await navigator.serviceWorker.register("./service-worker.js");
      await navigator.serviceWorker.ready;
      updateOfflineStatus("Офлайн-кэш готов. Можно устанавливать приложение и отключать интернет.");
    } catch {
      updateOfflineStatus("Не удалось подготовить офлайн-режим. Проверьте соединение и обновите страницу.", "error");
    }
  });
}
window.addEventListener("offline", () => updateOfflineStatus("Сейчас нет сети, но кэшированная версия приложения работает.", "offline"));
window.addEventListener("online", () => updateOfflineStatus("Соединение восстановлено. Обновления приложения снова доступны."));

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "get_learning_progress",
      title: "Показать учебный прогресс",
      description: "Возвращает количество пройденных уроков, опыт, серию и следующий доступный урок.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({
        studied: state.studied.length,
        total: topics.length,
        percent: Math.round((state.studied.length / topics.length) * 100),
        xp: state.xp || 0,
        streak: state.streak || 0,
        nextTopic: nextTopic() ? { id: nextTopic().id, title: nextTopic().title } : null,
        quizBest: state.quizBest
      })
    },
    {
      name: "get_current_lesson",
      title: "Показать следующий урок",
      description: "Возвращает первую непройденную тему последовательного маршрута.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => {
        const current = nextTopic();
        return current ? { topicId: current.id, title: current.title, module: moduleMap[current.module].title } : { completed: true };
      }
    },
    {
      name: "open_learning_topic",
      title: "Открыть учебную тему",
      description: "Открывает карточку указанной темы в приложении.",
      inputSchema: { type: "object", properties: { topicId: { type: "integer", minimum: 1, maximum: 100 } }, required: ["topicId"], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: ({ topicId }) => { showView("topics"); openTopic(topicId); return { topicId, title: topicById(topicId)?.title }; }
    },
    {
      name: "search_abbreviations",
      title: "Найти расшифровку аббревиатуры",
      description: "Ищет сокращения по коду, полной форме, русскому смыслу или назначению и возвращает простые объяснения.",
      inputSchema: { type: "object", properties: { query: { type: "string", minLength: 1, maxLength: 80 } }, required: ["query"], additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: ({ query }) => {
        const normalized = query.trim().toLowerCase();
        const results = abbreviations.filter((item) => `${item.code} ${item.full} ${item.meaning} ${item.purpose}`.toLowerCase().includes(normalized)).slice(0, 10);
        showView("glossary");
        $("#glossary-search").value = query;
        renderGlossary();
        return results.map(({ code, full, meaning, purpose, example }) => ({ code, full, meaning, purpose, example }));
      }
    },
    {
      name: "advance_production_simulation",
      title: "Продвинуть производственный заказ",
      description: "Выполняет следующий безопасный шаг учебного производственного заказа до этапа контроля качества.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: () => { showView("simulator"); advanceSimulator(); return { stage: simStages[state.simulator.index].label, status: simStages[state.simulator.index].status }; }
    }
  ];
  tools.forEach((tool) => { try { context.registerTool(tool); } catch {} });
}

renderAll();
renderSimulator();
registerWebMcpTools();
const initialView = location.hash.slice(1);
showView(["overview", "topics", "glossary", "simulator", "quiz"].includes(initialView) ? initialView : "overview", false);
