import { defineGateway } from '../define.js'

// FreeChatAPI — local OpenAI-compatible proxy (FreeChatAPI desktop app) fronting the
// DeepSeek web chat. No API key (the proxy holds the DeepSeek session). One openclaude
// session is bound to one upstream chat via the `user` field, which openaiShim sends
// only for this route (id 'freechat').
export default defineGateway({
  id: 'freechat',
  label: 'FreeChatAPI',
  category: 'local',
  defaultBaseUrl: 'http://localhost:9700/v1',
  defaultModel: 'deepseek-v4-pro',
  supportsModelRouting: true,
  setup: {
    requiresAuth: false,
    authMode: 'none',
  },
  transportConfig: {
    kind: 'local',
    openaiShim: {
      preserveReasoningContent: true,
      requireReasoningContentOnAssistantMessages: true,
      reasoningContentFallback: '',
      thinkingRequestFormat: 'deepseek-compatible',
      maxTokensField: 'max_tokens',
      removeBodyFields: ['store'],
      supportsAuthHeaders: false,
    },
  },
  preset: {
    id: 'freechat',
    description: 'FreeChatAPI local proxy (DeepSeek via localhost:9700)',
    modelEnvVars: ['OPENAI_MODEL'],
    vendorId: 'openai',
  },
  usage: { supported: false },
})
