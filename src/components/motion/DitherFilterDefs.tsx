import type { Ref } from "react"

export const DITHER_FILTER_ID = "services-dither"

/**
 * Filtro SVG per applicare un effetto dither monocromatico alle immagini.
 *
 * L'effetto viene creato aggiungendo una texture di noise alla luminanza
 * dell'immagine. Non viene usato JavaScript o Canvas: il filtro può essere
 * applicato direttamente a un elemento <img> tramite CSS.
 */
type TDitherFilterDefsProps = {
  /** Forwarded to the <feTurbulence> primitive so a parent can drive baseFrequency/seed imperatively (see DitherImage's ripple loop). */
  turbulenceRef?: Ref<SVGFETurbulenceElement>
}

export function DitherFilterDefs({ turbulenceRef }: TDitherFilterDefsProps = {}) {
  return (
    <svg aria-hidden className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <filter id={DITHER_FILTER_ID} colorInterpolationFilters="sRGB">
        {/*
         * 1. CONVERSIONE IN SCALA DI GRIGI
         *
         * Elimina i colori dell'immagine mantenendo la luminanza.
         * values="0" = completamente desaturato.
         */}
        <feColorMatrix type="saturate" values="0" result="gray" />

        {/*
         * 2. GENERAZIONE DEL NOISE
         *
         * Crea una texture di rumore che verrà usata per modificare
         * leggermente la luminanza dell'immagine.
         *
         * baseFrequency → dimensione della grana:
         *   valore basso  = grana più grande
         *   valore alto   = grana più fine
         *
         * numOctaves → complessità del noise:
         *   1 = noise semplice e uniforme
         *   valori più alti = texture più complessa
         *
         * seed → cambia il pattern del noise senza modificarne l'intensità.
         */}
        <feTurbulence
          ref={turbulenceRef}
          type="fractalNoise"
          baseFrequency="0.2"
          numOctaves="10"
          seed="4"
          result="noise"
        />

        {/*
         * 3. CONTROLLO DELL'INTENSITÀ DEL NOISE
         *
         * slope → QUANTO noise viene applicato.
         *
         *   0.2 - 0.3 = molto leggero
         *   0.4 - 0.5 = evidente ma morbido
         *   0.6 - 0.8 = forte
         *
         * Aumentando slope aumentiamo quindi la quantità di variazione
         * applicata all'immagine.
         *
         * intercept → sposta il valore medio del noise.
         * Serve a mantenere il noise centrato e a evitare che l'immagine
         * diventi globalmente più chiara o più scura.
         *
         * Normalmente conviene modificare slope e lasciare intercept invariato.
         */}
        <feComponentTransfer in="noise" result="softNoise">
          <feFuncR type="linear" slope="0.8" intercept="0.325" />
          <feFuncG type="linear" slope="0.8" intercept="0.325" />
          <feFuncB type="linear" slope="0.8" intercept="0.325" />
        </feComponentTransfer>

        {/*
         * 4. APPLICAZIONE DEL NOISE ALL'IMMAGINE
         *
         * Combina la luminanza originale con il noise.
         *
         * k2 = 1 → mantiene la luminanza originale.
         * k3 = 0.5 → determina quanto il noise influenza il risultato.
         *
         * Per aumentare/ridurre ulteriormente l'effetto è possibile
         * intervenire principalmente su k3.
         */}
        <feComposite
          in="gray"
          in2="softNoise"
          operator="arithmetic"
          k1="0"
          k2="1"
          k3="0.5"
          k4="0"
          result="dither"
        />

        {/*
         * 5. MANTENIMENTO DELLA SCALA DI GRIGI
         *
         * Garantisce che il risultato finale rimanga monocromatico.
         */}
        <feColorMatrix in="dither" type="saturate" values="0" />
      </filter>
    </svg>
  )
}
