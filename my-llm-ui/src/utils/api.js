const SPACE_URL = "https://shristi0777-lawyer-ai-backend.hf.space";

export async function callChat(prompt) {
  const res = await fetch(`${SPACE_URL}/api/predict/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      data: [prompt, 200, 0.7, 0.9] // prompt, max_tokens, temperature, top_p
    }),
  });
  if (!res.ok) throw new Error("Backend error");
  const j = await res.json();
  return j.data[0]; // response text
}
