const BASE = '/api';

export const api = {
	userWords: `${BASE}/user/words`,
	userUpdate: `${BASE}/user/update`,
  userSignIn: `${BASE}/user/signin`,
  userByToken: `${BASE}/user/token`,
	userWordUpdate: `${BASE}/user/words/update`,
  localizationLocales: `${BASE}/localization_locales`,
  localizationStudy: `${BASE}/localization_key_values/studies`,
  localizationLocalesById: (id) => `${BASE}/localization_locales/${id}`,
  localizationKeyValues: `${BASE}/localization_key_values`,
  localizationKeyValuesById: (id) => `${BASE}/localization_key_values/${id}`
};
