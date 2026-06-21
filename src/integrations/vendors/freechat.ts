import { defineVendor } from '../define.js'

// FreeChatAPI — local OpenAI-compatible proxy (FreeChatAPI desktop app) that fronts
// the DeepSeek web chat. It needs no API key (the proxy holds the DeepSeek session)
// and is bound to one upstream chat per openclaude session via the `user` field,
// which openaiShim sends only for this route (id 'freechat').
export default defineVendor({
  id: 'freechat',
  label: 'FreeChatAPI',
  classification: 'openai-compatible',
  defaultBaseUrl: 'http://localhost:9700/v1',
  defaultModel: 'deepseek-v4-pro',
  setup: {
    requiresAuth: false,
    authMode: 'none',
  },
  transportConfig: {
    kind: 'openai-compatible',
    openaiShim: {
      preserveReasoningContent: true,
      requireReasoningContentOnAssistantMessages: true,
      reasoningContentFallback: '',
      thinkingRequestFormat: 'deepseek-compatible',
      maxTokensField: 'max_tokens',
      removeBodyFields: ['store'],
      supportsApiFormatSelection: false,
      supportsAuthHeaders: false,
    },
  },
  usage: { supported: false },
})
