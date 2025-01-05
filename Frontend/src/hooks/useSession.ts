export const useSession = () => {
  const saveToken = (token: string) => {
    document.cookie = `token=${token}; path=/; max-age=${7 * 24 * 60 * 60}`;
  };

  const clearToken = () => {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC';
  };

  const getToken = (): string | null => {
    const cookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));

    return cookie ? cookie.split('=')[1] : null;
  };

  return {
    saveToken,
    clearToken,
    getToken,
  };
};
