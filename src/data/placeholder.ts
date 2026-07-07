const GRADIENTS: [string, string][] = [
  ['#ff6b6b', '#4b1248'],
  ['#4facfe', '#00f2fe'],
  ['#a18cd1', '#fbc2eb'],
  ['#fa709a', '#fee140'],
  ['#30cfd0', '#330867'],
  ['#f83600', '#f9d423'],
  ['#0ba360', '#3cba92'],
  ['#8e2de2', '#4a00e0'],
];

export function placeholderImage(seed: number, label = ''): string {
  const [c1, c2] = GRADIENTS[Math.abs(seed) % GRADIENTS.length];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="1000">
    <defs>
      <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${c1}"/>
        <stop offset="100%" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="1600" height="1000" fill="url(#g)"/>
    ${label ? `<text x="50%" y="50%" font-family="system-ui" font-size="42" fill="rgba(255,255,255,0.55)" text-anchor="middle" dominant-baseline="middle">${label}</text>` : ''}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
