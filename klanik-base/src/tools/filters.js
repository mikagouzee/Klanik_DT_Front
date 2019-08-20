export const dateFilter = function(stringDate) {
  if (stringDate && stringDate.length > 0)
    return new Date(stringDate.substring(0, 10)).toLocaleDateString();
};

export const lngFilter = function(langue) {
  switch (Number(langue)) {
    case 1: return "Beginner";
      break;
    case 2:return "Scholar";
      break;
    case 3:return "Technical";
      break;
    case 4:return "Fluent";
      break;
    case 5:return "Bilingual";
      break;
    default: return "Unknown"
      break;
  }
};
