import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Hero = ({ slice }) => {
  return (
    <Bounded as="section" collapsible={false} className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10">
        <div className="flex flex-wrap content-center justify-center text-center leading-relaxed">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading1: ({ children }) => (
                <Heading className="mb-6 last:mb-0">{children}</Heading>
              ),
              paragraph: ({ children }) => (
                <p className="mb-6 last:mb-0">{children}</p>
              ),
            }}
          />
          {prismicH.isFilled.link(slice.primary.buttonLink) &&
          prismicH.isFilled.keyText(slice.primary.buttonText) && (
            <PrismicLink
              field={slice.primary.buttonLink}
              className="rounded bg-main px-7 py-3 font-bold text-slate-100 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {slice.primary.buttonText}
            </PrismicLink>
          )}
        </div>
        
        {prismicH.isFilled.image(slice.primary.image) && (
          <div className="w-2/3 place-self-center md:w-full">
            <PrismicNextImage field={slice.primary.image} layout="responsive" />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default Hero;
