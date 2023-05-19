import React, { useState } from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import * as prismicH from "@prismicio/helpers";
import { RocketLaunchIcon, BanknotesIcon, ChatBubbleLeftEllipsisIcon, BoltIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import getStripe from '../../utils/get-stripejs'
import { fetchPostJSON } from '../../utils/api-helpers'

const PricePage = ({ slice }) => {
  const [loading, setLoading] = useState(false);

  const sendEmailDefault = (e) => {
    e.preventDefault()
    let email = "support@bulkmes.com";
    let subject = e.target.prod.value + " komplekts";
    window.open(`mailto:${email}?subject=${subject}`);
  }

 const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  // Create a Checkout Session.
  const response = await fetchPostJSON('/api/checkout_sessions', {
    price: e.target.prod.value
  })

  if (response.statusCode === 500) {
    console.error(response.message)
    return
  }

  // Redirect to Checkout.
  const stripe = await getStripe()
  const { error } = await stripe.redirectToCheckout({
    // Make the id field from the Checkout Session creation API response
    // available to this file, so you can provide it as parameter here
    // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
    sessionId: response.id,
  })
  // If `redirectToCheckout` fails due to a browser or network
  // error, display the localized error message to your customer
  // using `error.message`.
  console.warn(error.message)
  setLoading(false)
}

 return <Bounded collapsible={false} as="section" className="bg-slate-100">
       <ul className="grid grid-cols-1 text-left">
          {slice.items.map((item, index) => (
            <li
              key={index}
              className="flex flex-col leading-relaxed py-12 md:px-12 "
            >
              <div>
              <PrismicRichText
                field={item.text}
                components={{
                  heading3: ({ children }) => (
                    <div className="flex flex-row items-center gap-6">
                      <div className="w-12">
                      <PrismicNextImage
                         field={item.image}
                         layout="responsive"
                         className="relative"
                      />
                      </div>
                      <Heading as="h3" size="2xl" className="mb-2 last:mb-0">
                         {children}
                      </Heading>
                    </div>
                  ),
                  paragraph: ({children}) => (
                    <p className="mt-4">{children}</p>
                  ),
                }}
              />
              </div>
              <form onSubmit={sendEmailDefault} className="text-center sm:text-right">
                   <input readOnly id="prod" name="prod" value={item.price_id} hidden />
                   <button 
                      type="submit"
                      className="rounded bg-main hover:bg-[#7d6fd8] px-7 py-3 font-bold text-white text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7d6fd8] focus:ring-offset-2 mt-4"
                      disabled={loading}
                      >
                         {item.button_text}
                   </button>
              </form>
            </li>
          ))}
        </ul>
  </Bounded>
}

export default PricePage