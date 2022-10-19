import { PrismicRichText } from "@prismicio/react";
import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { Disclosure } from "@headlessui/react";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";


const Faq = ({ slice }) => {
  return (
    <Bounded
      collapsible={false}
      as="section"
      className="bg-slate-100"
    >
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
     </div>
     <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {slice.items.map((item, index) => (
          <div key={index} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full px-4 py-4 text-lg text-left text-gray-800 rounded-lg bg-gray-50 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200">
                    <span className="basis-11/12">{item.question}</span>
                    <ChevronUpIcon
                      className={`${
                        open ? "transform rotate-180" : ""
                      } w-6 h-6 text-indigo-500`}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel className="px-4 pt-4 pb-2 text-gray-500 dark:text-gray-300">
                  <PrismicRichText
                field={item.answer}
                components={{
                  paragraph: ({children}) => (
                    <p>{children}</p>
                  ),
                }}
              />
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Bounded>
  );
};

export default Faq;