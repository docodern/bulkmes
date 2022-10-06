import { PrismicLink, PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";
import clsx from "clsx";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const TextWithImage = ({ slice }) => {
  return (
    <Bounded as="section" className="bg-white">
      <div className={`flex flex-col md:flex-row gap-10 ${clsx(
        slice.variation === "rightImage" && "md:flex-row-reverse"
          )}`}>
        <div className="w-2/3 place-self-center md:w-full">
        <PrismicNextImage
        field={slice.primary.image}
        layout="responsive"
        className="relative"
         />
        </div>
         <div>
        <PrismicRichText
              field={slice.primary.text}
              components={{
                heading2: ({ children }) => (
                  <Heading as="h2" size="6xl" className="mb-6 last:mb-0">
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="mb-6">{children}</p>
                ),
              }}
            />
            <div className={`flex flex-col text-center sm:flex-row sm:justify-center md:justify-end sm:gap-10 ${clsx(
              slice.variation === "rightImage" && "sm:flex-row-reverse"
            )}`}>
              <div className="py-6">
               {prismicH.isFilled.link(slice.primary.buttonlink_2) &&
                 prismicH.isFilled.keyText(slice.primary.buttontext_2) && (
                 <PrismicLink
                   field={slice.primary.buttonlink_2}
                   className="rounded bg-[#9180fc] text-white px-7 py-3 font-bold border border-slate-100 shadow-sm hover:bg-[#7d6fd8] focus:outline-none focus:ring-2 focus:ring-golda/75 focus:ring-offset-2"
                 >
                   {slice.primary.buttontext_2}
                 </PrismicLink>
               )}
              </div>
              <div className="py-6">
                {prismicH.isFilled.link(slice.primary.buttonlink) &&
                 prismicH.isFilled.keyText(slice.primary.buttontext) && (
                 <PrismicLink
                   field={slice.primary.buttonlink}
                   className="rounded bg-main px-7 py-3 font-bold text-slate-100 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                 >
                   {slice.primary.buttontext}
                 </PrismicLink>
               )}
              </div>
            </div>
            </div>
      </div>
    </Bounded>
  );
};

export default TextWithImage;
