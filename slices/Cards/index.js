import React from 'react';
import { PrismicRichText, PrismicLink } from '@prismicio/react';
import { PrismicNextImage } from '@prismicio/next';
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Cards = ({ slice }) => (
  <Bounded collapsible={false} as="section">
    <div className="grid grid-cols-1 justify-center content-center text-center">
       <ul className="grid grid-cols-1 lg:grid-cols-3 text-left">
          {slice.items.map((item) => (
            <li
              key={prismicH.asText(item.text)}
              className="flex flex-col leading-relaxed py-12 md:px-12 gap-6"
            >
              <div className="place-self-center w-28">
              <PrismicNextImage
            field={item.image}
            layout="responsive"
            className="relative"
          />
              </div>
              <div className="md:text-center">
              <PrismicRichText
                field={item.text}
                components={{
                  heading4: ({ children }) => (
                    <Heading as="h4" size="2xl" className="mb-2 last:mb-0">
                      {children}
                    </Heading>
                  ),
                  paragraph: ({children}) => (
                    <p>{children}</p>
                  ),
                }}
              />
              </div>
            </li>
          ))}
        </ul>
    </div>
    <div className="flex w-full place-content-center">
    {prismicH.isFilled.link(slice.primary.button_link) &&
          prismicH.isFilled.keyText(slice.primary.button_text) && (
            <PrismicLink
              field={slice.primary.button_link}
              className="rounded bg-main px-7 py-3 font-bold text-slate-100 shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {slice.primary.button_text}
            </PrismicLink>
          )}
    </div>
  </Bounded>
)

export default Cards