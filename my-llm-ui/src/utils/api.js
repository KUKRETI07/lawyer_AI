import axios from "axios";

const BASE = import.meta.env.VITE_BACKEND_URL || "";

export async function callChatAPI(payload) {
  if (!BASE) throw new Error("No backend URL set in VITE_BACKEND_URL");
  const res = await axios.post(`${BASE}/chat`, payload, { timeout: 120000 });
  return res.data;
}
