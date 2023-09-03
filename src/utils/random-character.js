module.exports = (characterType, capitalize) => {
  const character = characterType[Math.floor(Math.random() * characterType.length)];
  return capitalize ? character.toUpperCase() : character;
};
