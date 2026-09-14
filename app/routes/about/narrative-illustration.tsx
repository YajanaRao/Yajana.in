import narrativeFigure from "@/assets/images/about/narrative-figure.webp";
import { ILLUSTRATION_TONE } from "./illustration-tone";

const RINGS = 7;
const RATIO = 0.82;
const OUTER_W = 190;
const OUTER_H = 180;
const OUTER_BORDER = 6;
const CENTER_X = 116;
const CENTER_Y = 118;

const BOX_W = 240;
const BOX_H = 360;

const FIGURE = { width: 333, height: 400, left: -54, top: -64 };

export function NarrativeIllustration() {
  return (
    <div
      className="relative overflow-hidden w-full"
      style={{ width: BOX_W, height: BOX_H }}
      aria-hidden="true"
    >
      {Array.from({ length: RINGS }, (_, i) => {
        const scale = RATIO ** i;
        const w = OUTER_W * scale;
        const h = OUTER_H * scale;
        return (
          <div
            key={i}
            className={`absolute ${ILLUSTRATION_TONE.border}`}
            style={{
              width: w,
              height: h,
              left: CENTER_X - w / 2,
              top: CENTER_Y - h / 2,
              borderWidth: OUTER_BORDER * scale,
              borderStyle: "solid",
            }}
          />
        );
      })}
      <img
        src={narrativeFigure}
        alt="how I got here"
        className="pointer-events-none absolute max-w-none object-cover"
        style={FIGURE}
      />
    </div>
  );
}
