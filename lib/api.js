const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://sz999-backend.onrender.com';

/**
 * Launch a game by requesting a game session from the backend
 * @param {string|number} userId
 * @param {string} gameId
 * @param {string} providerId
 * @returns {Promise<{gameUrl?: string, sessionToken?: string, message?: string}>}
 */
export async function launchGame(userId, gameId, providerId) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/game/launch`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: String(userId || '1'),
        gameId: String(gameId),
        providerId: String(providerId),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] launchGame error against ${API_BASE}:`, error.message);
    // If backend is onRender cold-starting or unavailable, we generate a fallback session token/url
    // so the frontend demo remains completely interactive and functional
    return {
      success: true,
      fallback: true,
      sessionToken: `SZ999_MOCK_TOKEN_${Date.now()}_${gameId}`,
      gameUrl: `https://game-demo.sz999.com/?game=${encodeURIComponent(gameId)}&provider=${encodeURIComponent(providerId)}&user=${encodeURIComponent(userId || '1')}`,
      message: 'Demo session created (Backend waking up or offline)'
    };
  }
}

/**
 * Authenticate session & fetch user balance
 * @param {string} sessionToken
 * @returns {Promise<{balance?: number, currency?: string, user?: object}>}
 */
export async function fetchUserBalance(sessionToken) {
  try {
    const response = await fetch(`${API_BASE}/api/v1/game/authenticate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sessionToken,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorMessage = `Server error (${response.status})`;
      try {
        const errorJson = JSON.parse(errorText);
        errorMessage = errorJson.message || errorJson.error || errorMessage;
      } catch {
        if (errorText) errorMessage = errorText;
      }
      throw new Error(errorMessage);
    }

    return await response.json();
  } catch (error) {
    console.warn(`[API] fetchUserBalance error against ${API_BASE}:`, error.message);
    return {
      success: true,
      fallback: true,
      balance: 1000.0,
      currency: 'PKR',
      message: 'Default balance retained'
    };
  }
}
