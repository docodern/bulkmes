import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import useSWR from "swr";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { fetcher } from "../../utils/helpers"


const IDpage = ({ page, navigation, settings }) => {

  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

  useEffect(() => {
    if (data) {
      console.log("DATA: " + data)
    }
  }, [data]);
  
  return (
    <Layout
      alternateLanguages={page.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>
          {prismicH.asText(page.data.title)} |{" "}
          {prismicH.asText(settings.data.siteTitle)}
        </title>
      </Head>
      <div className="container xl:max-w-screen-xl mx-auto py-12 px-6 text-center">
      {error ? (
        <div className="p-2 rounded-md bg-rose-100 text-rose-500 max-w-md mx-auto">
          <p className="text-lg">Sorry, something went wrong!</p>
        </div>
      ) : !data ? (
        <div className="p-2 rounded-md bg-gray-100 text-gray-500 max-w-md mx-auto">
          <p className="text-lg animate-pulse">Loading...</p>
        </div>
      ) : (
        <div className="py-4 px-8 rounded-md bg-gray-100 max-w-lg mx-auto">
          <h2 className="text-4xl font-semibold flex flex-col items-center space-x-1">
            
            <span>Thanks for your order!</span>
          </h2>
          <p className="text-lg mt-3">Check your inbox for the receipt.</p>
        </div>
      )}
    </div>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default IDpage;

export async function getStaticProps({ params, locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("idpage", params.id, { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });


  return {
    props: {
      page,
      navigation,
      settings,
    },
  };
}

export async function getStaticPaths() {
  const client = createClient();

  const pages = await client.getAllByType("idpage", { lang: "*" });

  return {
    paths: pages.map((page) => {
      return {
        params: { id: page.uid,
                  uid: "order" },
        locale: page.lang,
      };
    }),
    fallback: false,
  };
}
