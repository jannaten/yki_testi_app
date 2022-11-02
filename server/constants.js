const contentType = ["word", "sentense"];
const statusType = ["active", "restricted"];
const userType = ["basic", "admin", "teacher"];

const partOfSpeechs = [
	"nouns",
	"adjectives",
	"verbs",
	"pronouns",
	"Adverbs",
	"Numbers",
];

const grammerCases = [
	"nominatiivi",
	"genetiivi",
	"akkusatiivi",
	"partitiivi",
	"inessiivi",
	"elatiivi",
	"illatiivi",
	"adessiivi",
	"ablatiivi",
	"allatiivi",
	"essiivi",
	"translatiivi",
	"instruktiivi",
	"abessiivi",
	"komitatiivi",
];

const wordLevelType = [
	"beginners",
	"intermediate",
	"advanced",
	"spoken",
	"official",
];

module.exports = {
	partOfSpeechs,
	wordLevelType,
	grammerCases,
	contentType,
	statusType,
	userType,
};
