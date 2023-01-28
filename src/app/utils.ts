//Fetch JSON data from URL
export function fetchJson(url: string) {
  return new Promise<{ data: any }>((resolve) => {
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        resolve({ data: data });
      });
  });
}