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
const topics = rawTopics.map(([id, title, definition]) => ({ id, title, definition, module: moduleFor(id) }));
const moduleMap = Object.fromEntries(modules.map((module) => [module.id, module]));

const defaultState = {
  studied: [],
  notes: {},
  quizBest: null,
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

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const saveState = () => localStorage.setItem("ceh-znaniy-state", JSON.stringify(state));
const topicById = (id) => topics.find((topic) => topic.id === Number(id));

function showView(name, updateHash = true) {
  $$(".view").forEach((view) => view.classList.toggle("active", view.id === `${name}-view`));
  $$(".nav-button").forEach((button) => button.classList.toggle("active", button.dataset.view === name));
  if (updateHash) history.replaceState(null, "", `#${name}`);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderProgress() {
  const count = state.studied.length;
  const percent = Math.round((count / topics.length) * 100);
  $("#header-progress-value").textContent = `${percent}%`;
  $("#header-progress-bar").style.width = `${percent}%`;
  $("#studied-count").textContent = count;
  $("#quiz-best").textContent = state.quizBest === null ? "—" : `${state.quizBest}/10`;
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

function renderTopics() {
  const query = $("#topic-search").value.trim().toLowerCase();
  const unfinishedOnly = $("#unfinished-only").checked;
  const visible = topics.filter((topic) => {
    const matchesModule = selectedModule === "all" || topic.module === selectedModule;
    const matchesQuery = !query || `${topic.title} ${topic.definition}`.toLowerCase().includes(query);
    const matchesProgress = !unfinishedOnly || !state.studied.includes(topic.id);
    return matchesModule && matchesQuery && matchesProgress;
  });

  $("#topic-result-count").textContent = `${visible.length} ${wordForTopics(visible.length)}`;
  $("#topic-empty").hidden = visible.length !== 0;
  $("#topic-list").innerHTML = visible.map((topic) => `<button class="topic-card ${state.studied.includes(topic.id) ? "studied" : ""}" data-topic="${topic.id}">
    <span class="topic-number">${topic.id}</span>
    <span><h3>${topic.title}</h3><p>${topic.definition}</p></span>
    <span class="studied-indicator" aria-label="${state.studied.includes(topic.id) ? "Изучено" : "Не изучено"}">✓</span>
  </button>`).join("");
}

function wordForTopics(number) {
  const mod100 = number % 100;
  const mod10 = number % 10;
  if (mod100 >= 11 && mod100 <= 14) return "тем";
  if (mod10 === 1) return "тема";
  if (mod10 >= 2 && mod10 <= 4) return "темы";
  return "тем";
}

function openTopic(id) {
  const topic = topicById(id);
  if (!topic) return;
  activeTopicId = topic.id;
  const module = moduleMap[topic.module];
  $("#dialog-module").textContent = `${module.title} · тема ${topic.id}`;
  $("#dialog-title").textContent = topic.title;
  $("#dialog-definition").textContent = topic.definition;
  $("#dialog-context").textContent = `${module.description} Понимание этой темы помогает связать отдельный термин с общей моделью цифрового предприятия.`;
  $("#dialog-question").textContent = `Объясни своими словами, какую проблему решает «${topic.title}», и приведи пример для завода электродвигателей.`;
  $("#dialog-note").value = state.notes[topic.id] || "";
  updateStudiedButton();
  $("#topic-dialog").showModal();
}

function updateStudiedButton() {
  const studied = state.studied.includes(activeTopicId);
  $("#toggle-studied").textContent = studied ? "Вернуть в неизученные" : "Отметить изученной";
  $("#toggle-studied").classList.toggle("secondary", studied);
  $("#toggle-studied").classList.toggle("primary", !studied);
}

function toggleStudied(id = activeTopicId) {
  const number = Number(id);
  state.studied = state.studied.includes(number)
    ? state.studied.filter((topicId) => topicId !== number)
    : [...state.studied, number].sort((a, b) => a - b);
  saveState();
  updateStudiedButton();
  renderAll();
  return state.studied.includes(number);
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
  renderTopics();
}

document.addEventListener("click", (event) => {
  const viewButton = event.target.closest("[data-view]");
  if (viewButton) showView(viewButton.dataset.view);

  const topicButton = event.target.closest("[data-topic]");
  if (topicButton) openTopic(topicButton.dataset.topic);

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
  if (event.target.closest("#restart-quiz")) startQuiz();
});

$("#topic-search").addEventListener("input", renderTopics);
$("#unfinished-only").addEventListener("change", renderTopics);
$("#dialog-close").addEventListener("click", () => $("#topic-dialog").close());
$("#save-note").addEventListener("click", () => {
  state.notes[activeTopicId] = $("#dialog-note").value.trim();
  saveState();
  $("#save-note").textContent = "Сохранено";
  setTimeout(() => { $("#save-note").textContent = "Сохранить заметку"; }, 1000);
});
$("#toggle-studied").addEventListener("click", () => toggleStudied());
$("#continue-button").addEventListener("click", () => {
  const next = topics.find((topic) => !state.studied.includes(topic.id));
  if (next) openTopic(next.id); else showView("quiz");
});
$("#reset-simulator").addEventListener("click", resetSimulator);
$("#start-quiz").addEventListener("click", startQuiz);
$("#next-question").addEventListener("click", nextQuestion);
$("#active-term-link").addEventListener("click", (event) => openTopic(event.currentTarget.dataset.topic));

let installPrompt = null;
window.addEventListener("beforeinstallprompt", (event) => {
  event.preventDefault();
  installPrompt = event;
});
$("#install-app").addEventListener("click", async () => {
  if (installPrompt) {
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
  } else {
    alert("На Android открой меню браузера и выбери «Установить приложение» или «Добавить на главный экран».");
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./service-worker.js").catch(() => {}));
}

function registerWebMcpTools() {
  const context = document.modelContext;
  if (!context?.registerTool) return;
  const tools = [
    {
      name: "get_learning_progress",
      title: "Показать учебный прогресс",
      description: "Возвращает количество изученных тем и лучший результат экзамена.",
      inputSchema: { type: "object", properties: {}, additionalProperties: false },
      annotations: { readOnlyHint: true, untrustedContentHint: false },
      execute: () => ({ studied: state.studied.length, total: topics.length, percent: Math.round(state.studied.length), quizBest: state.quizBest })
    },
    {
      name: "mark_topics_studied",
      title: "Отметить темы изученными",
      description: "Отмечает один или несколько номеров тем как изученные и обновляет интерфейс.",
      inputSchema: { type: "object", properties: { topicIds: { type: "array", items: { type: "integer", minimum: 1, maximum: 100 }, minItems: 1 } }, required: ["topicIds"], additionalProperties: false },
      annotations: { readOnlyHint: false, untrustedContentHint: false },
      execute: ({ topicIds }) => {
        state.studied = [...new Set([...state.studied, ...topicIds.filter((id) => topicById(id))])].sort((a, b) => a - b);
        saveState(); renderAll();
        return { studied: state.studied.length, total: topics.length };
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
showView(["overview", "topics", "simulator", "quiz"].includes(initialView) ? initialView : "overview", false);
