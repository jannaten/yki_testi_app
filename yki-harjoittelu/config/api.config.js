const BASE = '/api';

export const api = {
  userWords: `${BASE}/user/words`,
  userUpdate: `${BASE}/user/update`,
  userSignIn: `${BASE}/user/signin`,
  userByToken: `${BASE}/user/token`,
  userWordUpdate: `${BASE}/user/words/update`,
  localizationLocales: `${BASE}/localization_locales`,
  localizationKeyValues: `${BASE}/localization_key_values`,
  localizationStudy: `${BASE}/localization_key_values/studies`,
  localizationKeyValuesByText: `${BASE}/localization_key_values/search`,
  localizationLocalesById: (id) => `${BASE}/localization_locales/${id}`,
  localizationKeyValuesPaginate: `${BASE}/localization_key_values/paginate`,
  localizationKeyValuesById: (id) => `${BASE}/localization_key_values/${id}`,
};
