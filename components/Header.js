import * as prismicH from "@prismicio/helpers";
import { PrismicLink, PrismicText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { Disclosure, Transition } from '@headlessui/react'
import { Bars3CenterLeftIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { linkResolver } from "../prismicio";
import { Bounded } from "./Bounded";

const FlagIcon = ({ lang }) => {
  let code
  if (lang.length > 2) {
    code = lang.substring(3).toLowerCase();
  } else {
    code = lang
  }
  

  return <span className={`fi fi-${code}`} />;
};

export const Header = ({ alternateLanguages = [], navigation, settings }) => {
  return (
    <Bounded as="header" yPadding="sm">
      <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button className='lg:hidden absolute right-6'>
            {open ? <XMarkIcon className="block h-8 w-8" aria-hidden="true" /> : <Bars3CenterLeftIcon className="block h-8 w-8" aria-hidden="true" />}
                 
          </Disclosure.Button>
        
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none invisible lg:visible">
        <PrismicLink href="/" className="visible text-2xl font-semibold"> 
          <h1>Bulk<span className="text-main">Mes</span></h1>
        </PrismicLink>
        <nav>
          <ul className="flex flex-wrap gap-6 md:gap-10">
            {navigation.data?.links.map((item) => (
              <li
                key={prismicH.asText(item.label)}
                className="font-semibold tracking-tight text-slate-800"
              >
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </li>
            ))}
            {alternateLanguages.map((lang) => (
              <li key={lang.lang}>
                <PrismicLink href={linkResolver(lang)} locale={lang.lang}>
                  <span className="sr-only">{lang.lang}</span>
                  <FlagIcon lang={lang.lang} />
                </PrismicLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-100 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
          <Disclosure.Panel>
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 leading-none mt-10 border-t-2 border-bor">
        <nav>
          <ul className="flex flex-col gap-6 md:gap-10 mt-6">
            {navigation.data?.links.map((item) => (
              <li
                key={prismicH.asText(item.label)}
                className="font-light tracking-tight text-slate-800"
              >
                <PrismicLink field={item.link}>
                  <PrismicText field={item.label} />
                </PrismicLink>
              </li>
            ))}
            <ul className="flex flex-row gap-x-6">
            {alternateLanguages.map((lang) => (
              <li key={lang.lang}>
                <PrismicLink href={linkResolver(lang)} locale={lang.lang}>
                  <span className="sr-only">{lang.lang}</span>
                  <FlagIcon lang={lang.lang} />
                </PrismicLink>
              </li>
            ))}
            </ul>
          </ul>
        </nav>
      </div>
          </Disclosure.Panel>
          </Transition>
        </>
      )}
    </Disclosure>
    </Bounded>
  );
};
