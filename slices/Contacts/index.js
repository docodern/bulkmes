import { Fragment, useRef, useState } from 'react'
import { PrismicRichText } from "@prismicio/react";
import { Dialog, Transition } from '@headlessui/react'
import { MapIcon, AtSymbolIcon, DevicePhoneMobileIcon, ExclamationTriangleIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";


const Contacts = ({ slice }) => {
  const [open, setOpen] = useState(false);
  const [fail, setFail] = useState(false);

  const cancelButtonRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
 
    const response = await fetch(`/api/sign-up`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: e.target.email.value,
          name: e.target.name.value,
          text: e.target.text.value
         })
    })
    if (response.status === 400) {
      console.error(response.message)
      setFail(true);
      setOpen(true);
      return
    } 
    setFail(false);
    setOpen(true);
  }

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
             <a href={`mailto:${slice.primary.email}`}>{slice.primary.email}</a>
           </div>
           <div className="flex flex-row gap-6">
             <DevicePhoneMobileIcon className="block h-6 w-6 text-main" aria-hidden="true" />
             <a href={`tel:${slice.primary.telephone}`}>{slice.primary.telephone}</a>
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
           onSubmit={handleSubmit}
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
     </div>

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
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className={`mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${fail ? "bg-red-100" : "bg-green-100"} sm:mx-0 sm:h-10 sm:w-10`}>
                      {fail ? <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" /> : <CheckCircleIcon className="h-6 w-6 text-green-600" aria-hidden="true" />}
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        {fail ? slice.primary.popup_error_title : slice.primary.popup_title}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                        {fail ? slice.primary.popup_error_text : slice.primary.popup_text}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    {slice.primary.popup_button}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>

    </Bounded>
  );
};

export default Contacts;