export async function fetchGithubProfile(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}`);
  return response.json();
}

export async function fetchGithubRepos(username: string) {
  const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated`);
  return response.json();
}

export async function fetchGithubLanguages(username: string) {
  const repos = await fetchGithubRepos(username);
  const languages = new Set<string>();
  
  for (const repo of repos) {
    if (repo.language) {
      languages.add(repo.language);
    }
  }
  
  return Array.from(languages);
}