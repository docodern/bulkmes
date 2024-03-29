import { PrismicLink, PrismicRichText, PrismicText } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { Bounded } from "./Bounded";
import { Heading } from "./Heading";

const SignUpForm = ({ settings }) => {
  return (
    <div className="px-4">
      <form
        action="/api/sign-up"
        method="post"
        className="grid w-full max-w-xl grid-cols-1 gap-6"
      >
        {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
          <div className="text-center tracking-tight text-slate-300">
            <PrismicRichText
              field={settings.data.newsletterDescription}
              components={{
                heading1: ({ children }) => (
                  <Heading
                    as="h2"
                    size="6xl"
                    className="mb-4 text-white last:mb-0"
                  >
                    {children}
                  </Heading>
                ),
                paragraph: ({ children }) => (
                  <p className="mb-4 last:mb-0">{children}</p>
                ),
              }}
            />
          </div>
        )}
        <div className="grid grid-cols-1 gap-2">
          <div className="relative">
            <label>
              <span className="sr-only">Email address</span>
              <input
                name="email"
                type="email"
                placeholder="jane.doe@example.com"
                required={true}
                className="w-full rounded border border-slate-500 bg-slate-600 py-3 pl-3 pr-10 text-white placeholder-slate-400"
              />
            </label>
            <button
              type="submit"
              className="absolute top-0 right-0 bottom-0 flex items-center justify-center px-3 text-2xl text-slate-400"
            >
              <span className="sr-only">Submit</span>
              <span aria-hidden={true}>&rarr;</span>
            </button>
          </div>
          {prismicH.isFilled.richText(settings.data.newsletterDisclaimer) && (
            <p className="text-center text-xs text-slate-400">
              <PrismicText field={settings.data.newsletterDisclaimer} />
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export const Footer = ({ settings }) => {
  return (
    <Bounded as="footer" className="bg-gray-800 pb-12 text-slate-300 md:pb-12">
      <div className="grid grid-cols-1 justify-items-center gap-20 md:gap-24 text-center">
        <p className="text-xl">© 2023 BulkMes.  All rights reserved.</p>
        <p>Developed by <a href="https://docodern.dev/" target="_blank" rel = "noopener noreferrer">DOCODERN</a></p>
      </div>
    </Bounded>
  );
};
