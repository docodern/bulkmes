import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from "@prismicio/helpers";
import { RocketLaunchIcon, BanknotesIcon, ChatBubbleLeftEllipsisIcon, BoltIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Benefits = ({ slice }) => (
  <Bounded collapsible={false} as="section" className="bg-slate-100">
    <div className="grid grid-cols-1 justify-center content-center text-center">
    <PrismicRichText
      field={slice.primary.subtitle}
      components={{
        paragraph: ({children}) => (
          <p className="uppercase text-main mb-6">{children}</p>
        )
      }}
      />
      <PrismicRichText
      field={slice.primary.title}
      components={{
        heading2: ({children}) => (
          <Heading as="h2" size="6xl" className="uppercase mb-20 md:mb-32">
            {children}
          </Heading>
        )
      }}
       />
       <ul className="grid grid-cols-1 md:grid-cols-3 text-left">
          {slice.items.map((item, index) => (
            <li
              key={prismicH.asText(item.text)}
              className="flex flex-row md:flex-col leading-relaxed py-12 md:py-0 md:px-12 gap-6"
            >
              <div className="md:place-self-center">
              {(() => {
                 switch (index) {
                    case 0:   
                      return <RocketLaunchIcon className="block rounded h-12 w-12 bg-main text-slate-100" aria-hidden="true" />;
                    case 1:
                      return <BanknotesIcon className="block rounded h-12 w-12 bg-main text-slate-100" aria-hidden="true" />;
                    case 2:
                      return <ChatBubbleLeftEllipsisIcon className="block rounded h-12 w-12 bg-main text-slate-100" aria-hidden="true" />;
                    default:
                      return <BoltIcon className="block rounded h-12 w-12 bg-main text-slate-100" aria-hidden="true" />;
                   }
               })()}
              </div>
              <div className="md:text-center">
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
              </div>
            </li>
          ))}
        </ul>
    </div>
  </Bounded>
)

export default Benefits