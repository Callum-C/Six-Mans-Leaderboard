const BASE_URL = `https://orc8aw0hui.execute-api.eu-west-1.amazonaws.com/Initial`;
const STAT_RESOURCE = `${BASE_URL}/stats`;
const MATCH_RESOURCE = `${BASE_URL}/matches`;
const PLAYER_RESOURCE = `${BASE_URL}/players`;

export const fetchGuildData = async (guildID) => {
  try {
    const response = await fetch(`${STAT_RESOURCE}?guildID=${guildID}`);

    if (!response.ok) {
      throw new Error(`fetchGuildData API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
    
  } catch (error) {
    console.error("Failed to fetch guild data:", error);
    throw error;
  }
}

export const fetchGuildMatches = async (guildID) => {
  try {
    const response = await fetch(`${MATCH_RESOURCE}?guildID=${guildID}`);

    if (!response.ok) {
      throw new Error(`fetchGuildMatches API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch guild matches:", error);
    throw error;
  }
}

export const fetchPlayers = async () => {
  try {
    const response = await fetch(PLAYER_RESOURCE);

    if (!response.ok) {
      throw new Error(`fetchPlayers API Error: ${response.statusText}`);
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Failed to fetch players:", error);
    throw error;
  }
}