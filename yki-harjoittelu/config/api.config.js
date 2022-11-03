const BASE = '/api';

export const api = {
	userSignIn: `${BASE}/users/signin`,
	userByToken: `${BASE}/users/token`,
	localizationLocales: `${BASE}/localization_locales`,
	localizationLocalesById: (id) => `${BASE}/localization_locales/${id}`,
	localizationKeyValues: `${BASE}/localization_key_values`,
	localizationKeyValuesById: (id) => `${BASE}/localization_key_values/${id}`,
};
