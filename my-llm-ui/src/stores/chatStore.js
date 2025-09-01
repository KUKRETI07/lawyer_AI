import create from "zustand";

export const useChatStore = create((set, get) => ({
  conversations: [
    {
      id: "default",
      title: "Conversation 1",
      messages: [
        { id: 1, role: "bot", text: "Hi — I’m your assistant. Ask me anything!" },
      ],
      createdAt: Date.now(),
    },
  ],
  activeId: "default",
  settings: {
    temperature: 0.7,
    top_p: 0.9,
    max_new_tokens: 200,
  },

  addMessage: (convId, msg) =>
    set((s) => ({
      conversations: s.conversations.map((c) =>
        c.id === convId ? { ...c, messages: [...c.messages, msg] } : c
      ),
    })),

  newConversation: (title = "New conversation") => {
    const id = String(Date.now());
    const conv = { id, title, messages: [], createdAt: Date.now() };
    set((s) => ({ conversations: [conv, ...s.conversations], activeId: id }));
  },

  setActive: (id) => set({ activeId: id }),

  updateSettings: (patch) =>
    set((s) => ({ settings: { ...s.settings, ...patch } })),

  openSettings: () => set({ _settingsOpen: true }),
  closeSettings: () => set({ _settingsOpen: false }),
  isSettingsOpen: () => get()._settingsOpen,
}));
