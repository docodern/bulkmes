import React from 'react';
import { PrismicRichText } from '@prismicio/react';
import { PrismicNextImage } from "@prismicio/next";
import { SparklesIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const Testimonials = ({ slice }) => (
  <Bounded collapsible={false} as="section" className="bg-white">
    <div className="grid grid-cols-1 justify-center content-center text-center">
          <p className="uppercase text-main mb-12">{slice.primary.subtitle}</p>
      <PrismicRichText
      field={slice.primary.title}
      components={{
        heading2: ({children}) => (
          <Heading as="h2" size="6xl" className="uppercase mb-12">
            {children}
          </Heading>
        )
      }}
       />
       <PrismicRichText
      field={slice.primary.description}
      components={{
        paragraph: ({children}) => (
          <p className="uppercase text-lg mb-20 md:mb-32">{children}</p>
        )
      }}
       />
        <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
        
        {slice.items.map((item) =>(
          <div
           key={item.author}
           className="relative first:md:col-span-2 first:xl:col-auto drop-shadow-sm">
            <SparklesIcon className="absolute block h-14 w-14 text-main right-2 top-2 rotate-[135deg]" aria-hidden="true" />
          <div className="flex flex-col justify-between w-full h-full bg-slate-100 px-14 rounded-2xl py-14">
            <p className="leading-normal text-left md:text-center">
              {item.text}
            </p>

            <div className="flex items-center text-left mt-8 space-x-3">
              <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
              <PrismicNextImage
                 field={item.image}
                 width="40"
                 height="40"
                 alt="Avatar"
                 layout="responsive"
               />
              </div>
             <div>
           <div className="text-lg font-medium">{item.author}</div>
           <div className="text-gray-600">{item.company}</div>
      </div>
    </div>
          </div>
        </div>
        ))}
        
        </div>
    </div>
  </Bounded>
)

export default Testimonials