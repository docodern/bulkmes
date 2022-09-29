import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from "@prismicio/helpers";
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Features = ({ slice }) => (
  <Bounded collapsible={false} as="section" className="relative bg-slate-100">
     <div className="absolute top-12 md:top-24 inset-x-1/2 z-0"><ArrowTrendingUpIcon className="block h-32 w-32 lg:h-40 lg:w-60 text-main" aria-hidden="true" /></div>
    <div className="relative grid grid-cols-1 justify-center content-center text-center z-10">
      <PrismicRichText
      field={slice.primary.title}
      components={{
        heading1: ({children}) => (
          <Heading as="h2" size="6xl" className="uppercase mb-20 md:mb-32">
            {children}
          </Heading>
        )
      }}
       />
       <ul className="grid grid-cols-1 md:grid-cols-3 text-left">
          {slice.items.map((item) => (
            <li
              key={prismicH.asText(item.text)}
              className="leading-relaxed py-12 md:py-0 md:px-12 even:border-y md:even:border-y-0 md:even:border-x even:border-main"
            >
              <PrismicRichText
                field={item.text}
                components={{
                  heading3: ({ children }) => (
                    <Heading as="h3" size="2xl" className="mb-2 last:mb-0">
                      {children}
                    </Heading>
                  ),
                  paragraph: ({children}) => (
                    <p>{children}</p>
                  ),
                }}
              />
            </li>
          ))}
        </ul>
    </div>
  </Bounded>
)

export default Features