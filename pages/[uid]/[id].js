import Head from "next/head";
import { SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import useSWR from "swr";

import { createClient } from "../../prismicio";
import { components } from "../../slices";
import { Layout } from "../../components/Layout";
import { fetcher } from "../../utils/helpers"
import axios from "axios";


const IDpage = ({ page, navigation, settings }) => {

//Recive data from session
  const {
    query: { session_id },
  } = useRouter();

  const { data, error } = useSWR(
    () => `/api/checkout_sessions/${session_id}`,
    fetcher
  );

//Handle file submit and payment update
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
      
      <SliceZone slices={page.data.slices} components={components} context={{...data, ...error}} />
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
