// src/utils/helpers.ts

// 📌 Limit headline to 2 lines (~50 chars)
export const formatTitle = (title: string): string => {
  if (!title) return "";
  return title.length > 55 ? title.substring(0, 52) + "..." : title;
};

// 📌 Convert long text into 3 simple cards
export const splitIntoCards = (content: string): string[] => {
  if (!content) return [];

  const words = content.split(" ");
  const chunkSize = Math.ceil(words.length / 3);

  return [
    words.slice(0, chunkSize).join(" "),
    words.slice(chunkSize, chunkSize * 2).join(" "),
    words.slice(chunkSize * 2).join(" "),
  ];
};

// 📌 Simple date formatter
export const formatDate = (date: string): string => {
  const d = new Date(date);
  return d.toDateString();
};

// 📌 Clean API text (remove extra spaces)
export const cleanText = (text: string): string => {
  return text?.replace(/\s+/g, " ").trim();
};