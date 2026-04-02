export const askAI = async (question: string, context: string) => {
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_OPENAI_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Explain simply." },
          { role: "user", content: question },
        ],
      }),
    });

    if (res.status === 429) throw new Error("limit");

    const data = await res.json();
    return data.choices[0].message.content;
  } catch {
    // ✅ FREE FALLBACK AI
    if (question.toLowerCase().includes("funding"))
      return "Funding means a company gets money from investors to grow.";

    if (question.toLowerCase().includes("startup"))
      return "A startup is a new company trying to solve a problem.";

    return "This article explains something important in simple terms.";
  }
};