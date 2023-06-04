import React, { Fragment, useState, useRef } from 'react';

import { PrismicNextImage } from '@prismicio/next';
import { PrismicRichText } from '@prismicio/react';
import { Dialog, Transition } from '@headlessui/react';
import { count as counter} from "sms-length";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";
// import getStripe from '../../utils/get-stripejs'
// import { fetchPostJSON } from '../../utils/api-helpers'

const PricePage = ({ slice }) => {

  const [open, setOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [done, setDone] = useState(false);
  const [ msg, setMsg ] = useState(1);
  const [ length, setLength ] = useState(160);
  const [ len, setLen ] = useState(160);

  const cancelButtonRef = useRef(null);

  const handleClose = () => {
    setOpen(false);
    setDone(false);
    setSubject("");
  }

  const handleForm = async (e) => {
    e.preventDefault()
    setSubject(e.target.prod.value);
    setOpen(true);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setDone(true);
 
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          name: e.target.name.value,
          text: e.target.text.value,
          sms: e.target.sms.value,
          subject: e.target.subject.value,
          id: 7
         })
    })
    if (response.status === 400) {
      console.error(response.message)
      alert("Something gone wrong")
      setSubject("");
      return
    } 
      router.push("/success");
      setSubject("");
      const timeout = setTimeout(() => {
          setOpen(false);
          setDone(false);
        }, 5000)
     
        return () => clearTimeout(timeout)
    
  }

  const handleText = async v => {

    let enc = counter(v)

    if (enc.encoding === "GSM_7BIT" || enc.encoding === "GSM_7BIT_EXT") {
      setLength(459);
     } 
    else {
      setLength(201);
     };

     setLen(enc.remaining);
     setMsg(enc.messages);
  }

  //// FOR BETTER DAYS
//   const [loading, setLoading] = useState(false);

//   const sendEmailDefault = (e) => {
//     e.preventDefault()
//     let email = "support@bulkmes.com";
//     let subject = e.target.prod.value + " komplekts";
//     window.open(`mailto:${email}?subject=${subject}`);
//   }

//  const handleSubmit = async (e) => {
//   e.preventDefault()
//   setLoading(true)
//   // Create a Checkout Session.
//   const response = await fetchPostJSON('/api/checkout_sessions', {
//     price: e.target.prod.value
//   })

//   if (response.statusCode === 500) {
//     console.error(response.message)
//     return
//   }

//   // Redirect to Checkout.
//   const stripe = await getStripe()
//   const { error } = await stripe.redirectToCheckout({
//     // Make the id field from the Checkout Session creation API response
//     // available to this file, so you can provide it as parameter here
//     // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
//     sessionId: response.id,
//   })
//   // If `redirectToCheckout` fails due to a browser or network
//   // error, display the localized error message to your customer
//   // using `error.message`.
//   console.warn(error.message)
//   setLoading(false)
// }

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
              <form onSubmit={handleForm} className="text-center sm:text-right">
                   <input readOnly id="prod" name="prod" value={item.price_id} hidden />
                   <button 
                      type="submit"
                      className="rounded bg-main hover:bg-[#7d6fd8] px-7 py-3 font-bold text-white text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7d6fd8] focus:ring-offset-2 mt-4"
                      >
                         {item.button_text}
                   </button>
              </form>
            </li>
          ))}
        </ul>

        <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                {
                  done ?
                  <div className="p-4 text-sm text-gray-800 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300" role="alert">
                      <span className="font-medium">Loading...</span> Please wait!
                  </div>
                  :
                <>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {slice.primary.popupTitle}
                      </Dialog.Title>
                </div>     
                <form 
           onSubmit={handleSubmit}
           method="post"
           className="flex flex-col w-full"
        >
        <div>
        <input
             type="text"
             name="subject"
             id="subject"
             placeholder={subject}
             className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             autoComplete="given-name"
             value={subject}
             disabled
          />
          <input
             type="text"
             name="name"
             id="name"
             placeholder={slice.primary.nameField}
             className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             autoComplete="given-name"
             required
          />
          <input
             type="email"
             name="email"
             id="email"
             placeholder={slice.primary.emailField}
             className="mt-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
             autoComplete="email"
             required
          />
            <span className="mt-4 w-full flex flex-row justify-end gap-6"><p className={`text-sm ${len < 20 ? "text-red-400" : "text-slate-400"}`}>{len}</p><p className="text-sm text-slate-400">   {msg}/3</p></span>
          <textarea
               id="sms"
               name="sms"
               rows={5}
               className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               placeholder={slice.primary.smsText}
               defaultValue={''}
               maxLength={length}
               onChange={v => handleText(v.target.value)}
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
          <span className="flex items-center mt-6">
            <input 
               id="link-checkbox"
               type="checkbox"
               value=""
               className="w-4 h-4 text-blue-600 bg-white-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
               required/>
            <label 
               htmlFor="link-checkbox"
               className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{slice.primary.checkbox} <a href="https://www.brevo.com/legal/termsofuse/" className="text-blue-600 dark:text-blue-500 hover:underline">{slice.primary.checkbox_link_text}</a>.
            </label>
          </span>
          <button
               type="submit"
               className="mt-6 w-full rounded-md border border-transparent bg-main py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
              {slice.primary.buttonText}
          </button>
         </div>
        </form>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={handleClose}
                    ref={cancelButtonRef}
                  >
                    {slice.primary.popup_button}
                  </button>
                </div>
                </>
                }
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

  </Bounded>
}

export default PricePage