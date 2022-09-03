import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <title>
        Tribes: Get travel information and recommendation for what to eat, buy,
        things to do, where to stay and how to get there
      </title>
      <Head>
        <meta
          name="google-site-verification"
          content="2VDEkCpliYr8FkS2an1M0kvjTAL3iRJSiBedyiBTrLs"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta
          name="description"
          content="Tribes: Get travel information and recommendation for what to eat, buy, things to do, where to stay and how to get there"
        />
        <link rel="icon" href="/favicon.png" />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-P13Q084SXR"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-P13Q084SXR');
            `,
          }}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:3074318,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `,
          }}
        ></script>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
