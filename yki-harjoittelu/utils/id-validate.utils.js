export const validateID = (id) => {
  return id.match(/^[0-9a-fA-F]{24}$/);
};
