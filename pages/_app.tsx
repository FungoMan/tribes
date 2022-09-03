import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { get } from "lodash";

import type { AppProps } from "next/app";
import AuthPopup from "components/AuthPopup/AuthPopup";
import Footer from "components/Footer/Footer";
import Header from "components/TheHeader/Header";
import HamModal from "components/HamModal/HamModal";
import BizApi from "services/biz-listing";
import ContributeTabBar from "components/ContributeTabBar/ContributeTabBar";
import { Tiers, UserTypes } from "enums";
import AuthApi from "../services/auth";
import {
  IUser,
  UserInforContext,
  UserInforProvider,
} from "Context/UserInforContext";
import CategoryApi from "services/category";
import "../styles/globals.css";
import { locations } from "constant";

import styles from "styles/App.module.scss";
import Toast from "components/Toast/Toast";
import Button from "components/Button/Button";
import Head from "next/head";

export type ILoginInfor = {
  token?: string;
  type?: UserTypes;
  tier?: Tiers;
  avatar?: string;
  first_name?: string;
  last_name?: string;
  listing_follow_ids?: any;
};

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const pathname = router.pathname;
  const notAuthPages = [
    "/login",
    "/signup",
    "/forgot-password",
    "/forgot-password/otp",
    "/forgot-password/reset",
    "/signup/otp",
    "/signup/setup-profile",
    "/biz/verify",
  ];
  const isAuthPage = !notAuthPages.includes(pathname);

  const [loginInfor, setLoginInfo] = useState<ILoginInfor>({});
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const [showHamModal, setShowHamModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [navList, setNavList] = useState<{ [key: string]: any }[]>([]);

  function Loading() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const handleStart = (url) => url !== router.asPath && setLoading(true);
      const handleComplete = (url) =>
        url === router.asPath &&
        setTimeout(() => {
          setLoading(false);
        }, 5000);

      router.events.on("routeChangeStart", handleStart);
      router.events.on("routeChangeComplete", handleComplete);
      router.events.on("routeChangeError", handleComplete);

      return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
      };
    });

    return loading ? (
      <div className="spinner-wrapper">
        <div className="spinner"></div>
      </div>
    ) : (
      <div />
    );
  }

  useEffect(() => {
    const stringyLoginInfo = localStorage.getItem("user");
    const localLoginInfo = stringyLoginInfo ? JSON.parse(stringyLoginInfo) : {};

    const getMenuList = async () => {
      const dataCategories = await CategoryApi.getItemCategory();
      const rawCategories = get(dataCategories, "data.data");
      const categoryArray = await rawCategories.map((item) => ({
        category: get(item, "attributes.name"),
        icon: get(item, "attributes.icon"),
        slug: get(item, "attributes.slug"),
        id: item.id,
        items: Array.isArray(get(item, "attributes.category_links.data"))
          ? get(item, "attributes.category_links.data").map(
              (navItem, index) => ({
                label: get(navItem, "attributes.label"),
                value: get(navItem, "attributes.value"),
                href: `/${get(item, "attributes.slug")}/${get(
                  navItem,
                  "attributes.value"
                )}`,
              })
            )
          : // .slice(0, 5)
            [],
      }));
      setNavList(categoryArray);
    };

    window.scrollTo(0, 0);
    setIsMobile(screen.width < 501);
    setLoginInfo(localLoginInfo.token ? localLoginInfo : {});
    setShowAuthPopup(!localLoginInfo.token);
    getMenuList();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  //handle logic hide header when scroll, not hide when in desktop || when setShowOpenHoursModal ham modal || in unAuthPages
  useEffect(() => {
    var prevScrollpos = window.pageYOffset;
    const header = document.getElementById("header") as any;
    const handleScroll = function () {
      var currentScrollPos = window.pageYOffset;
      if (prevScrollpos < currentScrollPos && !showHamModal && isAuthPage) {
        header.style.top = header && screen.width < 501 ? "-120px" : "-60px";
      } else {
        header.style.top = "0";
      }
      prevScrollpos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showHamModal, isAuthPage]);

  return (
    <UserInforProvider>
      <Head>
        <meta
          property="og:image"
          content="https://exploretribes.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fdefault-thumbnail.1402cbdd.png&w=1920&q=75"
        />
      </Head>
      <Loading />
      <div className={styles.app}>
        <Header
          id="header"
          loginInfor={loginInfor}
          navList={navList}
          onOpenHamModal={() => setShowHamModal(!showHamModal)}
        />
        <Component {...pageProps} />
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          visible={isAuthPage && showAuthPopup && !loginInfor.token}
        />
        <HamModal
          loginInfor={loginInfor}
          showHamModal={showHamModal}
          onSetShowHamModal={(e: boolean) => setShowHamModal(e)}
        />
        <Footer
          navList={navList}
          visible={isAuthPage}
          backgroundColor={pathname !== "/biz/information"}
        />
        <ContributeTabBar visible={!showHamModal && isAuthPage && isMobile} />
        <Toast />
      </div>
    </UserInforProvider>
  );
}

export default MyApp;
