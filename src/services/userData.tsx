export const getUsers = async (
  usersNr: number = 10,
  word?: string
): Promise<any[]> => {

  const searchWord = word ? `&seed=${word}` : ""
  const url = `https://randomuser.me/api/?results=${usersNr}${searchWord}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.results;
};
