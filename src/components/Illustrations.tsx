/** Flat storybook illustrations in the Family palette: thin #343433 strokes, dot eyes, stick limbs. */
const S = "#343433";
const C = { sky: "#64C6FF", sun: "#FFCD6C", green: "#00C978", ember: "#FF3E00", pink: "#FF58AE", honey: "#FFBB26", violet: "#9F4FFF" };

type P = { className?: string };
const svg = (children: React.ReactNode, className?: string, vb = "0 0 200 200") => (
  <svg viewBox={vb} className={className} fill="none" stroke={S} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>{children}</svg>
);
const Eyes = ({ x1, x2, y }: { x1: number; x2: number; y: number }) => (
  <>
    <circle cx={x1} cy={y} r={3.4} fill={S} stroke="none" />
    <circle cx={x2} cy={y} r={3.4} fill={S} stroke="none" />
  </>
);

export const Flower = ({ className }: P) => svg(
  <>
    <path d="M100 150v30M100 165l-18 12M100 165l18 12" />
    {[0, 60, 120, 180, 240, 300].map((a) => (
      <circle key={a} cx={100 + 52 * Math.cos((a * Math.PI) / 180)} cy={84 + 52 * Math.sin((a * Math.PI) / 180)} r={26} fill={C.pink} />
    ))}
    <rect x={64} y={48} width={72} height={72} rx={18} fill={C.sun} />
    <Eyes x1={86} x2={114} y={80} />
    <path d="M86 96q14 14 28 0" />
  </>, className);

export const Blob = ({ className }: P) => svg(
  <>
    <path d="M62 188v-14M118 188v-14M62 174l-14 6M118 174l14 6" />
    <path d="M40 120c-6-44 22-84 64-80 44 4 64 46 54 86-8 34-48 50-84 42-20-4-32-20-34-48z" fill={C.green} />
    <path d="M40 112l-22-8M160 108l22-10" />
    <Eyes x1={80} x2={118} y={96} />
    <path d="M82 120q18 18 38 0" />
  </>, className);

export const Triangle = ({ className }: P) => svg(
  <>
    <path d="M76 168v18M124 168v18M76 186l-12 4M124 186l12 4" />
    <path d="M100 30c6 0 10 4 14 10l56 100c6 10-2 26-14 26H44c-12 0-20-16-14-26L86 40c4-6 8-10 14-10z" fill={C.sun} />
    <Eyes x1={84} x2={116} y={110} />
    <path d="M88 128q12 12 24 0" />
  </>, className);

export const Cloud = ({ className }: P) => svg(
  <>
    <path d="M70 168v16M130 168v16" />
    <path d="M52 156c-26 0-34-34-10-46-6-30 30-48 52-30 14-22 54-14 56 18 24 2 30 32 8 44-6 6-14 14-28 14z" fill={C.ember} />
    <Eyes x1={84} x2={118} y={118} />
    <path d="M88 134q14 12 28 0" />
  </>, className);

export const Cat = ({ className }: P) => svg(
  <>
    <path d="M82 170v14M118 170v14M158 150c20-6 24-30 10-42" />
    <path d="M56 160c0-34 20-54 44-54s44 20 44 54z" fill={C.sky} />
    <path d="M52 76l6-38 30 20c8-3 16-3 24 0l30-20 6 38c8 10 8 24 0 34-10 12-26 18-48 18s-38-6-48-18c-8-10-8-24 0-34z" fill={C.sky} />
    <Eyes x1={80} x2={120} y={88} />
    <path d="M94 100h12l-6 7zM100 107v6M92 116q8 6 16 0M60 98l-22-4M60 106l-22 6M140 98l22-4M140 106l22 6" />
  </>, className);

const Star = ({ className }: P) => svg(<path d="M50 6l12 28 30 3-23 20 7 30-26-16-26 16 7-30L8 37l30-3z" fill={C.sun} />, className, "0 0 100 100");
const Coin = ({ className }: P) => svg(<><circle cx={50} cy={50} r={40} fill={C.honey} /><circle cx={50} cy={50} r={28} /><path d="M50 34v32M42 42q8-6 16 0M42 58q8 6 16 0" /></>, className, "0 0 100 100");
const Heart = ({ className }: P) => svg(<path d="M50 88C14 62 6 40 18 24c12-14 28-8 32 4 4-12 20-18 32-4 12 16 4 38-32 64z" fill={C.pink} />, className, "0 0 100 100");
const Gear = ({ className }: P) => svg(<><path d="M50 8l8 10 12-4 4 12 12 4-4 12 10 8-10 8 4 12-12 4-4 12-12-4-8 10-8-10-12 4-4-12-12-4 4-12-10-8 10-8-4-12 12-4 4-12 12 4z" fill={C.green} /><circle cx={50} cy={50} r={14} fill="#FBFAF9" /></>, className, "0 0 100 100");
const Leaf = ({ className }: P) => svg(<><path d="M14 86C10 40 40 12 88 12c2 48-26 78-74 74z" fill={C.green} /><path d="M14 86L58 42" /></>, className, "0 0 100 100");
const Lock = ({ className }: P) => svg(<><path d="M30 46V32a20 20 0 0140 0v14" /><rect x={20} y={46} width={60} height={44} rx={10} fill={C.sky} /><circle cx={50} cy={66} r={5} fill={S} stroke="none" /></>, className, "0 0 100 100");
const Qr = ({ className }: P) => svg(<><rect x={10} y={10} width={30} height={30} rx={6} fill="#FBFAF9" /><rect x={60} y={10} width={30} height={30} rx={6} fill="#FBFAF9" /><rect x={10} y={60} width={30} height={30} rx={6} fill="#FBFAF9" /><rect x={19} y={19} width={12} height={12} fill={S} stroke="none" /><rect x={69} y={19} width={12} height={12} fill={S} stroke="none" /><rect x={19} y={69} width={12} height={12} fill={S} stroke="none" /><rect x={60} y={60} width={12} height={12} fill={C.ember} stroke="none" /><rect x={78} y={78} width={12} height={12} fill={S} stroke="none" /></>, className, "0 0 100 100");
const Spark = ({ className }: P) => svg(<path d="M50 6c4 28 16 40 44 44-28 4-40 16-44 44-4-28-16-40-44-44 28-4 40-16 44-44z" fill={C.sky} />, className, "0 0 100 100");

export const Confetti = { Star, Coin, Heart, Gear, Leaf, Lock, Qr, Spark };
export const Mascots = { Flower, Blob, Triangle, Cloud, Cat };
