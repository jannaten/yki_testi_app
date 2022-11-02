export const themePallate = [
	{
		id: 1,
		name: "default",
		primary: "#9967CE",
		secondary: "#4E008E",
		themeIdentity: "defaultTheme",
	},
	{
		id: 2,
		name: "orange",
		primary: "#E06F07",
		secondary: "#B05807",
		themeIdentity: "orangeTheme",
	},
	{
		id: 3,
		name: "dark",
		primary: "#2f3335",
		secondary: "#232526",
		themeIdentity: "darkTheme",
	},
];

export const colors = {
	dark: "#000000",
	grey: "#6C757D",
	bright: "#ffffff",
	danger: "#AB003C",
	darkOpacity: "#00000040",
};

export const colorsDefault = {
	primary: themePallate[0].primary,
	secondary: themePallate[0].secondary,
	basic: colors,
};

export const colorsOrange = {
	primary: themePallate[1].primary,
	secondary: themePallate[1].secondary,
	basic: colors,
};

export const colorsDark = {
	primary: themePallate[2].primary,
	secondary: themePallate[2].secondary,
	basic: colors,
};

export const themes = {
	defaultTheme: colorsDefault,
	orangeTheme: colorsOrange,
	darkTheme: colorsDark,
};
