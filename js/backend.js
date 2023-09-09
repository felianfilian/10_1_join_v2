// backend indentifier
const STORAGE_TOKEN = "HXZH6LGQSB8KPYZZ39S7IBUKJD8VHEQUH375LYY8";
// URL Backend
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";

/**
 * save data on server with a key value pair
 * @param key id to find the data
 * @param value value to save
 * @returns
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((res) => res.json());
}

/**
 * get data from server
 * @param key id to find the data
 * @returns requested data
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((res) => res.json())
    .then((res) => {
      if (res.data) {
        return res.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}
