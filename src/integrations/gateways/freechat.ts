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
    description: 'FreeChatAPI proxy — local or remote (DeepSeek)',
    baseUrlEnvVars: ['OPENAI_BASE_URL'],
    modelEnvVars: ['OPENAI_MODEL'],
    vendorId: 'openai',
  },
  catalog: {
    // Live model list from the proxy's OpenAI-compatible GET /v1/models (the
    // DeepSeek models the site currently offers). deepseek-v4-pro is kept as a
    // static fallback so a default is always available if discovery is offline.
    source: 'hybrid',
    discovery: {
      kind: 'openai-compatible',
      requiresAuth: false,
      mapModel(raw: unknown) {
        const model = raw as { id?: string }
        if (!model.id) {
          return null
        }
        return { id: model.id, apiName: model.id, label: model.id }
      },
    },
    discoveryCacheTtl: '1d',
    discoveryRefreshMode: 'background-if-stale',
    allowManualRefresh: true,
    models: [
      { id: 'deepseek-v4-pro', apiName: 'deepseek-v4-pro', label: 'DeepSeek V4 Pro' },
    ],
  },
  usage: { supported: false },
})
