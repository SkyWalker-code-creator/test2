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
    shortBio: 'Привет! Я SkyWalker. Я не просто пишу код — я создаю системы безопасности, которые защищают миллионы игроков от нечестной игры. Мой фокус: Reverse Engineering, анализ памяти и разработка высоконагруженных анти-чит решений на C# и .NET.',
    philosophy: 'Идеальный анти-чит не должен мешать игроку. Он должен работать незаметно, но безжалостно уничтожать любые попытки вмешательства в игровой процесс. Без ложных срабатываний. Без лагов. Только чистая игра.',
    location: 'Remote / Worldwide',
    status: 'Available for collaboration'
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
      { name: 'Python', level: 70, color: 'var(--yellow)' },
      { name: 'SQL', level: 65, color: 'var(--orange)' },
      { name: 'JavaScript', level: 60, color: 'var(--yellow)' },
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
      { name: 'UI Layer', tech: 'WPF + MVVM', desc: 'Представление данных и взаимодействие с пользователем. Использует паттерн MVVM для чистого разделения логики и интерфейса.' },
      { name: 'Core Engine', tech: 'C# / .NET 8', desc: 'Оркестрация сканеров, управление потоками, сбор и агрегация результатов.' },
      { name: 'Memory Scanner', tech: 'Win32 API (ReadProcessMemory)', desc: 'Поиск сигнатур в RAM процессов. Чтение памяти игры Rust и сравнение с базой известных читов.' },
      { name: 'File Scanner', tech: 'System.IO / Hashing', desc: 'Хеширование и проверка целостности файлов игры. Обнаружение подменённых DLL.' },
      { name: 'Driver Scanner', tech: 'WMI / Registry', desc: 'Поиск подозрительных драйверов ядра и записей в реестре, используемых читами.' }
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
  }
};