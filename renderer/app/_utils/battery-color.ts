/**
 * Colors are ordered in such way that neighbors have contrast.
 *
 * red
 * yellow
 * emerald
 * sky
 * violet
 * pink
 * orange
 * lime
 * teal
 * blue
 * purple
 * rose
 * amber
 * green
 * cyan
 * indigo
 * fuchsia
 */

const colors = [
  // 500
  ["#ef4444", "bg-red-500"],
  ["#eab308", "bg-yellow-500"],
  ["#10b981", "bg-emerald-500"],
  ["#0ea5e9", "bg-sky-500"],
  ["#8b5cf6", "bg-violet-500"],
  ["#ec4899", "bg-pink-500"],
  ["#f97316", "bg-orange-500"],
  ["#84cc16", "bg-lime-500"],
  ["#14b8a6", "bg-teal-500"],
  ["#3b82f6", "bg-blue-500"],
  ["#a855f7", "bg-purple-500"],
  ["#f43f5e", "bg-rose-500"],
  ["#f59e0b", "bg-amber-500"],
  ["#22c55e", "bg-green-500"],
  ["#06b6d4", "bg-cyan-500"],
  ["#6366f1", "bg-indigo-500"],
  ["#d946ef", "bg-fuchsia-500"],

  // 300
  ["#fca5a5", "bg-red-300"],
  ["#fde047", "bg-yellow-300"],
  ["#6ee7b7", "bg-emerald-300"],
  ["#7dd3fc", "bg-sky-300"],
  ["#c4b5fd", "bg-violet-300"],
  ["#f9a8d4", "bg-pink-300"],
  ["#fdba74", "bg-orange-300"],
  ["#bef264", "bg-lime-300"],
  ["#5eead4", "bg-teal-300"],
  ["#93c5fd", "bg-blue-300"],
  ["#d8b4fe", "bg-purple-300"],
  ["#fda4af", "bg-rose-300"],
  ["#fcd34d", "bg-amber-300"],
  ["#86efac", "bg-green-300"],
  ["#67e8f9", "bg-cyan-300"],
  ["#a5b4fc", "bg-indigo-300"],
  ["#f5d0fe", "bg-fuchsia-300"],

  // 700
  ["#b91c1c", "bg-red-700"],
  ["#b45309", "bg-yellow-700"],
  ["#047857", "bg-emerald-700"],
  ["#0369a1", "bg-sky-700"],
  ["#6d28d9", "bg-violet-700"],
  ["#be185d", "bg-pink-700"],
  ["#c2410c", "bg-orange-700"],
  ["#4d7c0f", "bg-lime-700"],
  ["#0f766e", "bg-teal-700"],
  ["#1d4ed8", "bg-blue-700"],
  ["#7e22ce", "bg-purple-700"],
  ["#be123c", "bg-rose-700"],
  ["#b45309", "bg-amber-700"],
  ["#15803d", "bg-green-700"],
  ["#0e7490", "bg-cyan-700"],
  ["#4338ca", "bg-indigo-700"],
  ["#a21caf", "bg-fuchsia-700"],
] as const;

export const batteryColor = (
  batteryId: number,
  type: "hex" | "class" = "hex",
) => {
  const index = batteryId % colors.length;
  const color = colors[index];

  return type === "hex" ? color[0] : color[1];
};
