import { useState } from "react";
import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import { count as counter} from "sms-length";
import * as prismicH from "@prismicio/helpers";
import axios from "axios";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const SuccessPage = ({ slice, context }) => {


  const [ submited, setSubmited ] = useState(false);
  const [ msg, setMsg ] = useState(1);
  const [ length, setLength ] = useState(160);
  const [ len, setLen ] = useState(160);

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

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      await axios.post("/api/update_payment", {
        id: e.target.payment.value,
      })
      .then((res) => {
      setSubmited(res.data.description)})
      .catch((err) => {
        allert(err.message)
      });
  
    } catch (err) {
      alert(err.message);
    }
  };
  
  
  return (
    <Bounded as="section" collapsible={false} className="bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center gap-10">
      {context.message ? (
        <p className="text-4xl font-bold">{context.message}</p>
      ) : !context.status ? (
        <p className="text-4xl font-bold">{slice.primary.waiting}</p>
      ) : (
        <div className="flex flex-wrap content-center justify-center text-center leading-relaxed">
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading1: ({ children }) => (
                <Heading className="mb-12 last:mb-0">{children}</Heading>
              ),
            }}
          />
          <div className="text-lg">
          <p>{slice.primary.status} <span className={`${context.status==="paid" ? "text-green-500" : "text-red-500"}`}>{context.status}</span></p>
          <p>{slice.primary.emailDesc} {context.email}</p>
          
          {submited || context.description==="true" ? (
          <p className="text-red-500">{slice.primary.error}</p>
          ) : (
            <div>
            <p>{slice.primary.text}</p>
          <form onSubmit={handleSubmit} className="text-left my-6">
            <label htmlFor="name">Name</label>
            <input
               type="text"
               name="name"
               id="name"
               placeholder="name"
               className="mb-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               required />

           <div className="flex flex-row justify-between items-center">
            <label htmlFor="sms">SMS text</label>
            <span className="flex flex-row justify-between items-center basis-1/6"><p className={`text-sm ${len < 20 ? "text-red-400" : "text-slate-400"}`}>{len}</p><p className="text-sm text-slate-400">   {msg}/3</p></span>
          </div>
            <textarea
               id="sms"
               name="sms"
               rows={5}
               className="mb-6 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
               placeholder="sms text"
               defaultValue={''}
               maxLength={length}
               onChange={v => handleText(v.target.value)}
               required
            />
            <input readOnly id="payment" value={context.payment} hidden></input>
            <button 
               type="sumbit"
               className="rounded bg-main hover:bg-[#7d6fd8] px-7 py-3 font-bold text-white text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-[#7d6fd8] focus:ring-offset-2 mt-4"
            >
               Submit
            </button>
          </form>
          </div>
          )}

          </div>
        </div>
      )}
        {prismicH.isFilled.image(slice.primary.image) && (
          <div className="w-2/3 place-self-center md:w-full">
            <PrismicNextImage field={slice.primary.image} layout="responsive" />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default SuccessPage;
