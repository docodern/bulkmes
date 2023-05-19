import React, { useState } from 'react';

import { PrismicLink, PrismicRichText } from '@prismicio/react';
import * as prismicH from "@prismicio/helpers";
import { RocketLaunchIcon, BanknotesIcon, ChatBubbleLeftEllipsisIcon, BoltIcon } from '@heroicons/react/24/outline'
import { loadStripe } from '@stripe/stripe-js';

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
import getStripe from '../../utils/get-stripejs'
import { fetchPostJSON } from '../../utils/api-helpers'


const Prices = ({ slice }) => {

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
////

  
 return <Bounded collapsible={false} as="section" className="bg-wite">
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
              className="flex flex-col place-content-evenly leading-relaxed py-4 px-6 gap-6 w-60 h-80 place-self-center border rounded shadow-md even:bg-[#f7f6f6] even:shadow-lg even:w-64 even:h-96"
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
              <form onSubmit={sendEmailDefault} className="md:text-center">
                   <p className="text-2xl font-bold mb-6">{item.amount}</p>
                   <p>{item.text}</p>
                   <input readOnly id="prod" name="prod" value={item.price_id} hidden />
                   <button 
                      type="submit"
                      className={`w-full rounded ${index===1 ? "bg-main hover:bg-[#7d6fd8]" : "bg-[#9180fc] hover:bg-[#7d6fd8]"} px-7 py-3 font-bold text-white text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7d6fd8] focus:ring-offset-2 mt-4`}
                      disabled={loading}
                      >
                         {item.buttontext}
                   </button>
              </form>
            </li>
          ))}
        </ul>
    </div>
  </Bounded>
}

export default Prices