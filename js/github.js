// Автоматическая подмена ссылок на реальные данные GitHub
const GithubAPI = {
  async init() {
    try {
      // Просто тянем JSON профиля, чтобы если локальная аватарка не загрузится, показать реальную
      const res = await fetch(`https://api.github.com/users/${CONFIG.githubUser}`);
      if (res.ok) {
        const data = await res.json();
        // Можно добавить логику обновления статистики в будущем
        console.log('[GitHub API] Profile loaded:', data.login);
      }
    } catch(e) {
      console.warn('[GitHub API] Rate limit or offline. Using static data.');
    }
  }
};