const CONFIG = {
  githubUser: 'skywalker-code-creator',
  telegram: '@Loksimen',
  discord: 'maks8013',
  projectRepo: 'RustShieldWorking',
  projectUrl: 'https://github.com/SkyWalker-code-creator/RustShieldWorking'
};

const DATA = {
  bio: {
    name: 'SkyWalker',
    title: 'Anti-Cheat Architect & Reverse Engineer',
    shortBio: 'Привет! Я SkyWalker. Я не просто пишу код - я создаю системы безопасности, которые защищают миллионы игроков от нечестной игры.',
    philosophy: 'Идеальный анти-чит не должен мешать игроку. Он должен работать незаметно, но безжалостно уничтожать любые попытки вмешательства в игровой процесс. Без ложных срабатываний. Без лагов. Только чистая игра.',
    location: 'Remote / Worldwide',
    status: 'Available for collaboration',
    tags: ['Reverse Engineering', 'Memory Analysis', 'C# / .NET']
  },
  experience: [
    { year: '2024 - Наст. время', role: 'Lead Anti-Cheat Developer', company: 'Independent / RustShield', desc: 'Разработка Rust Shield Scanner с нуля. Создание архитектуры ядра, алгоритмов сканирования памяти, обход протекторов и анализ сигнатур. Работа с Win32 API и WPF.', skills: ['C#', '.NET 8', 'WPF', 'Win32 API', 'Memory Scanning'] },
    { year: '2022 - 2024', role: 'Reverse Engineer (Freelance)', company: 'Various Projects', desc: 'Изучение бинарных протекторов, написание драйверов для защиты памяти, анализ вредоносного ПО. Исследование уязвимостей ядра Windows.', skills: ['IDA Pro', 'x64dbg', 'C++', 'Assembly', 'Kernel Drivers'] },
    { year: '2020 - 2022', role: 'C# / .NET Developer', company: 'Tech Solutions Inc.', desc: 'Разработка настольных приложений (WPF) и бэкенд-сервисов на ASP.NET Core. Интеграция с базами данных и сторонними API.', skills: ['C#', 'WPF', 'ASP.NET Core', 'SQL', 'Entity Framework'] }
  ],
  skills: {
    languages: [
      { name: 'C#', level: 95, color: 'var(--purple)' },
      { name: 'C++', level: 75, color: 'var(--blue)' },
      { name: 'Python', level: 70, color: 'var(--orange)' },
      { name: 'SQL', level: 65, color: 'var(--orange)' },
      { name: 'JavaScript', level: 60, color: 'var(--orange)' },
      { name: 'Assembly (x86/x64)', level: 50, color: 'var(--red)' }
    ],
    frameworks: ['.NET 8.0', 'WPF', 'WinForms', 'ASP.NET Core', 'Entity Framework Core'],
    tools: ['IDA Pro', 'x64dbg', 'Cheat Engine', 'Wireshark', 'Process Hacker', 'Git', 'Docker', 'Visual Studio'],
    concepts: ['Reverse Engineering', 'Memory Scanning', 'Pattern Matching', 'Windows Internals', 'Multithreading', 'Kernel Drivers', 'Obfuscation']
  },
  project: {
    title: 'Rust Shield Scanner',
    subtitle: 'Professional Anti-Cheat Solution for Rust',
    status: 'Active Development',
    version: 'v1.2.0',
    desc: 'Высокопроизводительный сканер системы, предназначенный для обнаружения запрещённого ПО (читов) в игре Rust. Приложение использует глубокий анализ оперативной памяти, сверку сигнатур файлов и мониторинг подозрительных процессов в реальном времени.',
    features: [
      { icon: '🔍', title: '3 режима сканирования', desc: 'Быстрое (процессы), Полное (файлы + память), Глубокое (драйверы + реестр)' },
      { icon: '🖥️', title: 'Мониторинг ресурсов', desc: 'Отслеживание CPU/RAM в реальном времени для предотвращения лагов' },
      { icon: '💾', title: 'Экспорт отчётов', desc: 'Сохранение детальных логов в JSON и TXT форматах' },
      { icon: '🎨', title: 'Современный UI', desc: 'Отзывчивый интерфейс на WPF (.NET 8) с тёмной темой' },
      { icon: '🛡️', title: 'Whitelist система', desc: 'Защита от ложных срабатываний на системные файлы' },
      { icon: '⚡', title: 'Многопоточность', desc: 'Асинхронный парсинг памяти без блокировки главного потока' }
    ],
    architecture: [
      { name: 'UI Layer', tech: 'WPF + MVVM', desc: 'Представление данных и взаимодействие с пользователем.' },
      { name: 'Core Engine', tech: 'C# / .NET 8', desc: 'Оркестрация сканеров, управление потоками, сбор результатов.' },
      { name: 'Memory Scanner', tech: 'Win32 API', desc: 'Поиск сигнатур в RAM процессов. Чтение памяти игры Rust.' },
      { name: 'File Scanner', tech: 'System.IO / Hashing', desc: 'Хеширование и проверка целостности файлов игры.' },
      { name: 'Driver Scanner', tech: 'WMI / Registry', desc: 'Поиск подозрительных драйверов ядра и записей в реестре.' }
    ],
    requirements: { os: 'Windows 10 / 11 (x64)', cpu: '4 ядра, 2.5 ГГц', ram: '8 ГБ', disk: '100 МБ', net: '.NET Desktop Runtime 8.0' },
    roadmap: [
      { version: 'v1.0', status: 'Done', desc: 'Базовый сканер процессов и файлов.' },
      { version: 'v1.1', status: 'Done', desc: 'Добавлен UI на WPF и экспорт в JSON.' },
      { version: 'v1.2', status: 'Current', desc: 'Мониторинг RAM, Whitelist система.' },
      { version: 'v2.0', status: 'Planned', desc: 'Сканер драйверов ядра (Kernel Mode).' },
      { version: 'v2.1', status: 'Planned', desc: 'Облачная база сигнатур (API).' }
    ],
    stats: { downloads: '1,200+', stars: '25', forks: '0', issues: '2', commits: '150+', linesOfCode: '~8,500' }
  },
  setup: {
    install: [
      'Скачайте последний релиз Rust Shield Scanner с GitHub.',
      'Распакуйте архив в любую папку.',
      'Запустите RustShieldWorking.exe от имени администратора.',
      'Нажмите кнопку "БЫСТРАЯ", "ПОЛНАЯ" или "ГЛУБОКАЯ" для начала сканирования.'
    ],
    buildFromSource: [
      'git clone https://github.com/SkyWalker-code-creator/RustShieldWorking.git',
      'cd RustShieldWorking',
      'dotnet build',
      'dotnet run'
    ],
    reports: 'Отчёты сохраняются на рабочем столе в папку RustShield_Reports в форматах JSON и TXT.'
  },
  timeline: [
    { year: '2024', title: 'Lead Anti-Cheat Developer', desc: 'Запуск Rust Shield Scanner.' },
    { year: '2022', title: 'Reverse Engineer', desc: 'Фриланс, драйверы, анализ протекторов.' },
    { year: '2020', title: 'C# Developer', desc: 'WPF/ASP.NET Core в Tech Solutions Inc.' }
  ],
  contacts: [
    { label: 'Telegram', value: '@Loksimen', icon: '✈', url: 'https://t.me/Loksimen' },
    { label: 'Discord', value: 'maks8013', icon: '💬', url: '#' },
    { label: 'GitHub', value: '@skywalker-code-creator', icon: '◈', url: 'https://github.com/skywalker-code-creator' }
  ],
  gallery: {
    title: 'Visual Archive',
    subtitle: 'Screenshots, UI concepts, reverse-engineering notes',
    items: [
      { id: 1, title: 'Rust Shield Dashboard', type: 'UI Concept', color: 'var(--blue)', desc: 'Тёмный WPF-интерфейс с живыми графиками CPU/RAM.' },
      { id: 2, title: 'Memory Scanner Flow', type: 'Architecture', color: 'var(--purple)', desc: 'Схема пайплайна чтения памяти процесса Rust.' },
      { id: 3, title: 'Signature DB', type: 'Data', color: 'var(--cyan)', desc: 'База сигнатур с хешами и уровнями риска.' },
      { id: 4, title: 'Driver Audit', type: 'Kernel', color: 'var(--orange)', desc: 'Проверка подозрительных драйверов ядра Windows.' },
      { id: 5, title: 'Whitelist Manager', type: 'UI Concept', color: 'var(--green)', desc: 'Интерфейс управления белым списком.' },
      { id: 6, title: 'Report Exporter', type: 'Data', color: 'var(--red)', desc: 'Экспорт логов в JSON/TXT.' }
    ]
  },
  blog: {
    posts: [
      { 
        date: '2026-10-10', 
        title: 'Почему анти-чит должен быть невидимым', 
        tag: 'Philosophy', 
        excerpt: 'Хороший анти-чит не мешает игроку. Разбираем принципы zero-false-positive.',
        fullText: `
          <p>Когда я только начинал разрабатывать Rust Shield, я задал себе один простой вопрос: <b>«Что должен чувствовать игрок при использовании анти-чита?»</b></p>
          <br>
          <p>Ответ очевиден - <b>ничего</b>. Игрок не должен замечать работу защиты. Он не должен страдать от падения FPS, его не должно выкидывать из игры из-за ложных срабатываний, и он не должен видеть странные процессы в диспетчере задач.</p>
          <br>
          <p>Главный принцип моего анти-чита - <b>Zero False Positives (Ноль ложных срабатываний)</b>. Лучше пропустить одного читера, чем забанить невиновного. В современном гейминге репутация дороже золота. Если система ошибается, ей перестают доверять.</p>
          <br>
          <p>Поэтому архитектура Rust Shield строится на многоуровневой проверке. Мы не баним за подозрительный процесс в памяти, мы анализируем сигнатуры, хеши файлов и поведение драйверов в комплексе. Это как детектив: улики должны сойтись вместе.</p>
        `
      },
      { 
        date: '2026-09-22', 
        title: 'ReadProcessMemory без лагов', 
        tag: 'C#', 
        excerpt: 'Асинхронный парсинг памяти и почему Thread.Sleep - зло.',
        fullText: `
          <p>Чтение памяти другого процесса (RPM) - это самая ресурсоемкая операция в анти-чите. Если делать это неправильно, игра начнет фризить.</p>
          <br>
          <p>Многие новички используют <code>Thread.Sleep(100)</code> в цикле сканирования. Это фатальная ошибка. Sleep блокирует поток, и пока он спит, читер может спокойно внедриться в процесс.</p>
          <br>
          <p><b>Мое решение:</b> Использование <code>async/await</code> и асинхронных задач с приоритетами. Мы разбиваем память на чанки (блоки) и читаем их параллельно в пуле потоков. Главный игровой поток при этом вообще не затрагивается.</p>
          <br>
          <p>Второй нюанс - кэширование. Если мы просканировали модуль <code>rust_client.exe</code>, нет смысла сканировать его снова через секунду. Мы запоминаем базовые адреса и проверяем только измененные страницы памяти (Page Guards). Это снижает нагрузку на CPU с 15% до 1.5%.</p>
        `
      },
      { 
        date: '2026-08-15', 
        title: 'Reverse Engineering протекторов', 
        tag: 'RE', 
        excerpt: 'Как читать бинарные протекторы и не сломать игру.',
        fullText: `
          <p>Самое сложное в реверсе - это не ассемблер, а понимание того, <i>как думал разработчик</i>. Когда я смотрю на протектор игры в IDA Pro, я ищу аномалии.</p>
          <br>
          <p>Часто читы используют так называемые "хайджек-техники" (Hijacking). Они перехватывают вызовы WinAPI функций. Мой подход - это динамический анализ в связке со статическим. Мы не просто смотрим код, мы запускаем игру в песочнице и смотрим, какие системные вызовы она делает.</p>
          <br>
          <p><b>Важно:</b> Никогда не патчите (не изменяйте) память игры бездумно. Если вы перезапишете байт не в том месте, вы сломаете CRC-сумму, и игра вылетит. Всегда проверяйте целостность перед вмешательством.</p>
        `
      },
      { 
        date: '2026-07-01', 
        title: 'Kernel Drivers: первые шаги', 
        tag: 'Kernel', 
        excerpt: 'Что нужно знать перед написанием драйвера защиты памяти.',
        fullText: `
          <p>Переход в Kernel Mode (Ring 0) - это как получить доступ к ядру атомной станции. Одна ошибка в коде (например, разыменование нулевого указателя) - и ты получаешь BSOD (Синий экран смерти).</p>
          <br>
          <p>Зачем вообще нужен драйвер в анти-чите? Потому что User-mode анти-чит можно легко обойти (закрыть процесс, убить службу). Драйвер же загружается на уровне ядра и может защищать сам себя.</p>
          <br>
          <p>Мой первый драйвер был простым: он перехватывал <code>PsLookupProcessByProcessId</code> и не давал открыть хендл на процесс игры с правами <code>PROCESS_VM_READ</code>. Это уже блокировало 80% дешевых читов.</p>
          <br>
          <p>Но будь осторожен с обфускацией (запутыванием кода). Антивирусы (особенно Defender) очень нервно реагируют на драйверы, которые пытаются скрыть свои строки. Всегда подписывай драйвер валидным сертификатом, иначе игра просто не запустится.</p>
        `
      }
    ]
  },
  stats: {
    counters: [
      { label: 'Скачиваний', value: '1,200+', color: 'var(--blue)' },
      { label: 'Строк кода', value: '~8,500', color: 'var(--purple)' },
      { label: 'Коммитов', value: '150+', color: 'var(--cyan)' },
      { label: 'Issues', value: '2', color: 'var(--orange)' },
      { label: 'Звёзд', value: '25', color: 'var(--green)' },
      { label: 'Форков', value: '0', color: 'var(--text-dim)' }
    ],
    uptime: '99.9%',
    lastUpdate: '2026-10-17'
  },
  changelog: [
    { version: 'v1.2.0', date: '2026-10-17', changes: ['Добавлен мониторинг RAM', 'Whitelist система', 'Экспорт отчётов'] },
    { version: 'v1.1.0', date: '2026-09-01', changes: ['UI на WPF', 'Экспорт в JSON', 'Тёмная тема'] },
    { version: 'v1.0.0', date: '2026-07-20', changes: ['Базовый сканер процессов', 'Сканер файлов', 'CLI-режим'] }
  ]
};