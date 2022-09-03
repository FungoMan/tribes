import ArticleCard from "components/ArticleCard/ArticleCard";
import Break from "components/Break/Break";
import Carousel from "components/Carousel/Carousel";
import Icon from "components/Icon/Icon";
import InforCard, { InforCardProps } from "components/InforCard/InforCard";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TopSearches from "components/TopSearches/TopSearches";
import {
  homeArticleCarousel,
  homeCuratedResponsive,
  inforCardList,
} from "constant";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import styles from "styles/Articles.module.scss";
import ArticleApi from "../../../services/article";
import { get, isArray } from "lodash";
import {
  calcDistanceFromNow,
  calcRateNumber,
  formatArticleDetails,
  getListingUrl,
} from "../../../utils";
import showdown from "showdown";
import moment from "moment";
import { Router, useRouter } from "next/router";

const infoCardResponsive = {
  xsShow: 2,
  xsScroll: 1,
  smShow: 2,
  smScroll: 2,
  mdShow: 2.5,
  mdScroll: 3,
  xlShow: 3.2,
  xlScroll: 3,
  show: 4,
  scroll: 3,
};

interface IArticle {
  title: string;
  excerpt?: string;
  date: string;
  content: string;
  brandRelated?: any[];
}

const Breadcrumbs = (props: {
  breadcrumbs: { text: string; path: string }[];
}) => {
  const { breadcrumbs } = props;

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb">
        <ol className={styles.breadcrumbs}>
          {breadcrumbs?.map((crumb, index) => {
            if (index === breadcrumbs.length - 1) {
              return (
                <li
                  key={index}
                  className={styles.breadcrumb_item}
                  aria-current="page"
                >
                  {crumb.text}
                </li>
              );
            }
            return (
              <li key={index} className={styles.breadcrumb_item}>
                <Link href={crumb.path}>{crumb.text}</Link>
                <Icon icon="carret-right" color="#E2E4E9" />
              </li>
            );
          })}
        </ol>
      </nav>
    </React.Fragment>
  );
};

const ArticlesDetailPage = (props: any) => {
  const { article, breadcrumbs } = props;
  const router = useRouter();

  const converter = new showdown.Converter();

  const actionShare = (provider: string) => {
    const url = window.location.href;
    switch (provider) {
      case "facebook":
        window.open(
          "https://www.facebook.com/sharer/sharer.php?u=" + url,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "twitter":
        window.open(
          "https://twitter.com/intent/tweet/?url=" + url,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "email":
        const emailContent = `mailto:?subject=I wanted you to see this site&body=Check out this site ${url}.`;
        window.open(
          emailContent,
          "pop",
          "width=600, height=400, scrollbars=no"
        );
        break;
      case "copy":
        navigator.clipboard.writeText(url).then(
          function () {
            console.log("Async: Copying to clipboard was successful!");
          },
          function (err) {
            console.error("Async: Could not copy text: ", err);
          }
        );
    }
  };

  return (
    <div className={styles.articles}>
      <div className={styles.cover}>
        <div className={styles.cover_container}>
          <Image
            src={article.imgUrl || require("public/images/default-avatar.svg")}
            alt="banner"
            layout="fill"
            className={styles.cover_image}
          />
          <SectionLayout
            backgroundColor
            className={styles.cover_heading}
            containerClassName={styles.section_layout_container}
          >
            <div className={styles.articles_container}>
              <Breadcrumbs breadcrumbs={breadcrumbs} />
              <h1 className={styles.title}>{article.title}</h1>
              {article.time && (
                <div className={styles.date}>
                  {moment(article.time).format("DD/MM/YYYY")}
                </div>
              )}
            </div>
          </SectionLayout>
        </div>
      </div>

      <div className={styles.content}>
        <SectionLayout containerClassName={styles.section_layout_container}>
          <div className={styles.call_to_action_fixed}>
            <ul className={styles.cta_list}>
              <li
                className={styles.cta_item}
                onClick={() => actionShare("facebook")}
              >
                <Icon icon="facebook-logo" size={20} />
              </li>
              <li
                className={styles.cta_item}
                onClick={() => actionShare("twitter")}
              >
                <Icon icon="twitter-logo" color="#7F859F" size={20} />
              </li>
              <li
                className={styles.cta_item}
                onClick={() => actionShare("email")}
              >
                <Icon icon="mail" color="#7F859F" size={17} />
              </li>
              <li
                className={styles.cta_item}
                onClick={() => actionShare("copy")}
              >
                <Icon icon="copy" color="#7F859F" size={22} />
              </li>
            </ul>
          </div>
          <div className={styles.articles_container}>
            <div
              className="mb-[35px]"
              dangerouslySetInnerHTML={{
                __html: converter.makeHtml(article.content),
              }}
            ></div>

            <div className={styles.call_to_action_container}>
              {/* <Break /> */}
              <div className={styles.call_to_action}>
                <span className="text-[11px]">SHARE</span>
                <ul className="flex items-center gap-[35px]">
                  <li onClick={() => actionShare("facebook")}>
                    <Icon icon="facebook-logo" size={20} />
                  </li>
                  <li onClick={() => actionShare("twitter")}>
                    <Icon icon="twitter-logo" color="#7F859F" size={20} />
                  </li>
                  <li onClick={() => actionShare("email")}>
                    <Icon icon="mail" color="#7F859F" size={17} />
                  </li>
                  <li onClick={() => actionShare("copy")}>
                    <Icon icon="copy" color="#7F859F" size={22} />
                  </li>
                </ul>
              </div>
              <Break />
            </div>

            {/* <div className="advertisement max-w-[728px] mx-auto my-5">
              <Image
                src="https://picsum.photos/728/90"
                width={728}
                height={90}
                layout="responsive"
                alt=""
              />
            </div> */}
            {isArray(article.bizlisting) && (
              <>
                <h3 className="mb-[24px] font-bold text-base">
                  Brands you can find:
                </h3>
                <div className="my-7">
                  <Carousel responsive={infoCardResponsive}>
                    {isArray(article.bizlisting) &&
                      article.bizlisting?.map((card: any, index) => (
                        <InforCard
                          key={index}
                          imgUrl={
                            card?.images?.[0] ||
                            require("public/images/default-avatar.svg")
                          }
                          description={card.description}
                          title={card.title}
                          rate={card.rate}
                          rateNumber={card.rateNumber}
                          followerNumber={card.followerNumber}
                          price={card.price}
                          categories={card.categories}
                          tags={card.tags}
                          iconTag={true}
                          isVerified={card.isVerified}
                          className="max-w-[95%] w-full"
                          onClick={() =>
                            router.push(
                              `/${getListingUrl(
                                get(card, "categories[0]"),
                                get(card, "categoryLinks[0].attributes.value"),
                                card.slug
                              )}`
                            )
                          }
                        />
                      ))}
                  </Carousel>
                </div>
              </>
            )}
          </div>
        </SectionLayout>
        <Break show={isArray(article.relatedArticles)} />
        <SectionLayout
          show={isArray(article.relatedArticles)}
          title="Related Articles"
          className="pt-0"
          containerClassName={styles.section_layout_container}
        >
          <Carousel responsive={homeCuratedResponsive}>
            {article.relatedArticles?.map((item, index) => (
              <Link href={`/articles/${item.slug}`} key={index} passHref>
                <div className="pb-5 pt-3 pl-3">
                  <ArticleCard
                    title={item.title}
                    imgUrl={item.imgUrl}
                    time={calcDistanceFromNow(item.time)}
                    width="95%"
                  />
                </div>
              </Link>
            ))}
          </Carousel>
        </SectionLayout>
        <SectionLayout className="pt-0">
          <TopSearches />
        </SectionLayout>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  // Pass data to the page via props
  const slug = context.query.slug;

  const data = await ArticleApi.getArticleDetail(slug);
  const rawDataArticle = get(data, "data.data");
  const articles: any = formatArticleDetails(rawDataArticle) || null;
  const breadcrumbs = [
    { text: "Home", path: "/home" },
    {
      text: articles[0].title,
      path: "/" + articles[0].slug,
    },
  ];
  return {
    props: {
      article: articles[0],
      breadcrumbs,
    },
  };
}

export default ArticlesDetailPage;
