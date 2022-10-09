const BASE = "http://localhost:3005/api";

export const api = {
  userSignIn: `${BASE}/users/signin`,
  localizationKeys: `${BASE}/localization_keys`,
  localizationKeyById: (id) => `${BASE}/localization_keys/${id}`,
  localizationLocales: `${BASE}/localization_locales`,
  localizationLocalesById: (id) => `${BASE}/localization_locales/${id}`,
  localizationValues: `${BASE}/localization_values`,
  localizationValuesById: (id) => `${BASE}/localization_keys/${id}`,
  localizationKeyValues: `${BASE}/localization_key_values`,
  localizationKeyValuesById: (id) => `${BASE}/localization_key_values/${id}`,
  localizationLocaleValues: `${BASE}/localization_locale_value`,
  localizationLocaleValuesById: (id) =>
    `${BASE}/localization_locale_value/${id}`,
};
