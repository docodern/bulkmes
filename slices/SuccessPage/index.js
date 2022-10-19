import { PrismicRichText } from "@prismicio/react";
import { PrismicNextImage } from "@prismicio/next";
import * as prismicH from "@prismicio/helpers";
import axios from "axios";

import { Bounded } from "../../components/Bounded";
import { Heading } from "../../components/Heading";

const SuccessPage = ({ slice, context }) => {

  const handleSubmit = async e => {
    e.preventDefault();
    
    try {
      const {
        error
      } = await axios.post("/api/update_payment", {
        id: e.target.payment.value,
      });
  
      if (error) throw new Error(error.message);
  
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
          <p className={`${context.description==="true" ? "text-red-500" : ""} my-6`}>{context.description==="true" ? slice.primary.error : slice.primary.text}</p>
          </div>
          <form onSubmit={handleSubmit}>
            <input readOnly id="payment" value={context.payment} hidden></input>
            <button type="sumbit">Submit</button>
          </form>
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
