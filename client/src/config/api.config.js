const BASE =
  process.env.NODE_ENV === "production" ? "/api" : "http://localhost:3005/api";

export const api = {
  userSignIn: `${BASE}/users/signin`,
  localizationLocales: `${BASE}/localization_locales`,
  localizationLocalesById: (id) => `${BASE}/localization_locales/${id}`,
  localizationKeyValues: `${BASE}/localization_key_values`,
  localizationKeyValuesById: (id) => `${BASE}/localization_key_values/${id}`,
};
