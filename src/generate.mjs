// Pi's UI, Markdown, syntax, thinking levels and HTML exports, from the pinned palette.
const roles = {
  accent: 'accent', border: 'border', borderAccent: 'borderActive', borderMuted: 'bgAlt',
  success: 'success', error: 'error', warning: 'warning', muted: 'fgMuted', dim: 'fgSubtle', text: 'fg',
  thinkingText: 'fgMuted', selectedBg: 'selection', scrollbarTrack: 'border', scrollbarThumb: 'fgMuted',
  searchMatchBg: 'match', searchMatchText: 'bg', userMessageBg: 'bgAlt', userMessageText: 'fg',
  customMessageBg: 'bgAlt', customMessageText: 'fg', customMessageLabel: 'decorator',
  toolPendingBg: 'bgAlt', toolTitle: 'accent', toolOutput: 'fg',
  mdHeading: 'heading', mdLink: 'link', mdLinkUrl: 'link', mdCode: 'code', mdCodeBlock: 'fg',
  mdCodeBlockBorder: 'border', mdQuote: 'quote', mdQuoteBorder: 'border', mdHr: 'border', mdListBullet: 'accent',
  toolDiffAdded: 'added', toolDiffRemoved: 'removed', toolDiffContext: 'fgMuted',
  syntaxComment: 'comment', syntaxKeyword: 'keyword', syntaxFunction: 'function', syntaxVariable: 'variable',
  syntaxString: 'string', syntaxNumber: 'number', syntaxType: 'type', syntaxOperator: 'operator', syntaxPunctuation: 'punctuation',
  thinkingOff: 'border', thinkingMinimal: 'fgSubtle', thinkingLow: 'info', thinkingMedium: 'accent',
  thinkingHigh: 'decorator', thinkingXhigh: 'warning', thinkingMax: 'error', bashMode: 'warning',
};
export function generate(flavors) {
  return flavors.map(f => ({
    path: `themes/${f.slug}.json`,
    content: JSON.stringify({
      $schema: 'https://raw.githubusercontent.com/earendil-works/pi/main/packages/coding-agent/src/modes/interactive/theme/theme-schema.json',
      name: f.slug, appearance: f.light ? 'light' : 'dark',
      colors: { ...Object.fromEntries(Object.entries(roles).map(([key, role]) => [key, f.r(role)])),
        toolSuccessBg: f.mix('bg', 'success', 0.08), toolErrorBg: f.mix('bg', 'error', 0.10) },
      export: { pageBg: f.r('bg'), cardBg: f.r('bgAlt'), infoBg: f.r('bgDeep') },
    }, null, 2) + '\n',
  }));
}
