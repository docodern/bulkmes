import Head from "next/head";
import { PrismicLink, SliceZone } from "@prismicio/react";
import * as prismicH from "@prismicio/helpers";

import { createClient } from "../prismicio";
import { components } from "../slices/";
import { Layout } from "../components/Layout";

const Index = ({ meta, page, navigation, settings }) => {
  return (
    <Layout
      alternateLanguages={page.alternate_languages}
      navigation={navigation}
      settings={settings}
    >
      <Head>
        <title>{prismicH.asText(page.data.title)}</title>
        <meta name="og:title" property="og:title" content={meta.meta_title} />
        <meta name="og:description" property="og:description" content={meta.meta_description} />
        <meta name="og:url" property="og:url" content={meta.meta_url} />
        <meta name="og:type" property="og:type" content={meta.meta_type} />
        <meta name="og:site_name" property="og:site_name" content={meta.meta_sitename} />
        <meta name="og:image" property="og:image" content={meta.meta_image.url} />
        <meta name="og:image:width" property="og:image:width" content={meta.meta_image_width} />
        <meta name="og:image:height" property="og:image:height" content={meta.meta_image_height} />
      </Head>
      <SliceZone slices={page.data.slices} components={components} />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale, previewData }) {
  const client = createClient({ previewData });

  const page = await client.getByUID("page", "home", { lang: locale });
  const navigation = await client.getSingle("navigation", { lang: locale });
  const settings = await client.getSingle("settings", { lang: locale });

  return {
    props: {
      page,
      navigation,
      settings,
      meta: {
        meta_title: page.data.meta_title,
        meta_description: page.data.meta_description,
        meta_url: page.data.meta_url,
        meta_type: page.data.meta_type,
        meta_sitename: page.data.meta_sitename,
        meta_image: page.data.meta_image,
        meta_image_width: page.data.meta_image_width,
        meta_image_height: page.data.meta_image_height,
      },
    },
  };
}
