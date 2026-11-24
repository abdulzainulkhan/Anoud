import Papa from "papaparse";

/**
 * Fetches a published Google Sheet CSV and parses it into an array of objects.
 *
 * @param {string} url - Published CSV URL
 * @returns {Promise<Array<Object>>}
 */
export async function fetchGoogleSheet(url) {
  if (!url) {
    throw new Error("Google Sheets CSV URL is required.");
  }

  const response = await fetch(url + `&_=${Date.now()}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch Google Sheet (${response.status} ${response.statusText})`,
    );
  }

  const csv = await response.text();

  const { data, errors } = Papa.parse(csv, {
    header: true,
    skipEmptyLines: "greedy",
    transformHeader: (header) => header.trim(),
    transform: (value) => value.trim(),
  });

  if (errors.length) {
    console.warn("Google Sheets CSV parsing warnings:", errors);
  }

  return data;
}
