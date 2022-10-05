import { PrismicRichText } from "@prismicio/react";
import { MapIcon, AtSymbolIcon, DevicePhoneMobileIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";


const Image = ({ slice }) => {
  return (
    <Bounded
      collapsible={false}
      as="section"
      className="bg-slate-100"
    >
     <div className="grid grid-cols-1 md:grid-cols-2 ">
      <div className="flex flex-col items-center gap-6">
        <PrismicRichText
        field={slice.primary.title}
        components={{
          heading2: ({children}) => (
            <Heading as="h2" size="6xl" className="text-center">
              {children}
            </Heading>
          )
        }}
        />
        <PrismicRichText
        field={slice.primary.description}
        components={{
          paragraph: ({children}) => (
            <p className="text-center mb-6">{children}</p>
          )
        }}
        />
        <div className="flex flex-col gap-6">
           <div className="flex flex-row gap-6">
              <MapIcon className="block h-6 w-6 text-main" aria-hidden="true" />
              <p>{slice.primary.adress}</p>
           </div>
           <div className="flex flex-row gap-6">
             <AtSymbolIcon className="block h-6 w-6 text-main" aria-hidden="true" />
             <p>{slice.primary.email}</p>
           </div>
           <div className="flex flex-row gap-6">
             <DevicePhoneMobileIcon className="block h-6 w-6 text-main" aria-hidden="true" />
             <p>{slice.primary.telephone}</p>
           </div>
        </div>
      </div>
      <div className="flex flex-col items-center w-full">
        <PrismicRichText
          field={slice.primary.title2}
          components={{
            heading2: ({children}) => (
              <Heading as="h2" size="6xl" className="text-center my-12 md:my-0 md:mb-6">
                {children}
              </Heading>
            )
          }}
        />
        <form 
           action="/api/sign-up"
           method="post"
           className="flex flex-col w-full sm:w-1/2"
        >
        <div>
          <input
             type="text"
             name="name"
             id="name"
             placeholder={slice.primary.nameField}
             className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             required
          />
          <input
             type="email"
             name="email"
             id="email"
             placeholder={slice.primary.emailField}
             className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             required
          />
          <textarea
               id="text"
               name="text"
               rows={5}
               className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               placeholder={slice.primary.textField}
               defaultValue={''}
               required
          />
          <button
               type="submit"
               className="mt-6 w-full rounded-md border border-transparent bg-main py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
              {slice.primary.buttonText}
          </button>
         </div>
        </form>
      </div>
     </div>
    </Bounded>
  );
};

export default Image;