import LipariLogo from "@/assets/svg/LipariLogo"

export function Logo() {
  return (
    <div className="h-20 w-20 perspective-[600px]">
      <div className="relative h-full w-full">
        <div
          id="layer1"
          className="absolute inset-0 z-40 rounded-sm transition-transform duration-1000 ease-in-out transform-3d group-hover:z-10 group-hover:transform-[rotateY(180deg)_rotateZ(90deg)]"
        >
          {/* LAYER 1 */}
          <div className="absolute inset-0 transform-[translateZ(30px)] transform-3d">
            {/* FRONT */}
            <div className="bg-brand-blue-950 text-brand-green absolute inset-0 flex items-center justify-center rounded-sm backface-hidden">
              <LipariLogo className="size-11" />
            </div>

            {/* BACK */}
            <div className="bg-brand-blue-900 absolute inset-0 transform-[rotateY(180deg)] rounded-sm backface-hidden" />
          </div>

          {/* LAYER 2 */}
          <div className="absolute inset-0 transform-[translateZ(20px)] transform-3d">
            {/* FRONT */}
            <div className="bg-brand-green absolute inset-0 rounded-sm backface-hidden" />

            {/* BACK */}
            <div className="bg-brand-green-800 absolute inset-0 transform-[rotateY(180deg)] rounded-sm backface-hidden" />
          </div>

          <div className="absolute inset-0 transform-[translateZ(10px)] transform-3d">
            {/* FRONT */}
            <div className="bg-brand-green-800 absolute inset-0 rounded-sm backface-hidden" />

            {/* BACK */}
            <div className="bg-brand-green absolute inset-0 transform-[rotateY(180deg)] rounded-sm backface-hidden" />
          </div>

          {/* LAYER 3 */}
          <div className="absolute inset-0 transform-[rotateZ(270deg)] transform-3d">
            {/* FRONT */}
            <div className="bg-brand-blue-900 absolute inset-0 rounded-sm backface-hidden" />

            {/* BACK */}
            <div className="bg-brand-blue-950 absolute inset-0 flex transform-[rotateY(180deg)] flex-col items-start justify-end rounded-sm p-2 pb-3 text-left text-slate-50 backface-hidden">
              <p className="font-condensed text-2xl leading-none font-bold uppercase">Lipari</p>
              <p className="font-condensed text-xs leading-tight font-bold uppercase">Consulting</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
