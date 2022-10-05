import React from 'react';
import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicH from "@prismicio/helpers";
import { RocketLaunchIcon, BanknotesIcon, ChatBubbleLeftEllipsisIcon, BoltIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Prices = ({ slice }) => (
  <Bounded collapsible={false} as="section" className="bg-wite">
    <div className="grid grid-cols-1 justify-center content-center text-center">
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
       <ul className="grid grid-cols-1 md:grid-cols-3 text-left gap-10">
          {slice.items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col place-content-between leading-relaxed py-4 px-6 gap-6 w-60 h-80 place-self-center border rounded shadow-md even:bg-main even:shadow-lg even:w-64 even:h-96 even:text-slate-100"
            >
              <div className="place-self-center flex flex-row gap-2">
              {(() => {
                 switch (index) {
                    case 0:   
                      return <RocketLaunchIcon className="block rounded h-12 w-12 bg-main text-slate-100 place-self-center" aria-hidden="true" />;
                    case 1:
                      return <BanknotesIcon className="block rounded h-12 w-12 bg-main text-slate-100 place-self-center" aria-hidden="true" />;
                    case 2:
                      return <ChatBubbleLeftEllipsisIcon className="block rounded h-12 w-12 bg-main text-slate-100 place-self-center" aria-hidden="true" />;
                    default:
                      return <BoltIcon className="block rounded h-12 w-12 bg-main text-slate-100 place-self-center" aria-hidden="true" />;
                   }
               })()}
               <div>
               <PrismicRichText
                field={item.name}
                components={{
                  heading3: ({ children }) => (
                    <Heading as="h3" size="2xl">
                      {children}
                    </Heading>
                  )
                }}
              />
              <p className="text-xl">{item.price}</p>
              </div>
              </div>
              <div className="md:text-center">
              <p className="text-2xl font-bold mb-6">{item.amount}</p>
              <p>{item.text}</p>
              </div>
              <PrismicLink
              field={item.buttonlink}
              className="rounded bg-golda/20 px-7 py-3 font-bold text-golda text-center shadow-sm hover:bg-golda hover:text-white focus:outline-none focus:ring-2 focus:ring-golda/75 focus:ring-offset-2"
            >
              {item.buttontext}
            </PrismicLink>
            </li>
          ))}
        </ul>
    </div>
  </Bounded>
)

export default Prices