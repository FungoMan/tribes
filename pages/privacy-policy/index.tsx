import Breadcrumbs, {
  BreadcrumbsProps,
} from "components/Breadcrumbs/Breadcrumbs";
import React, { useEffect, useState } from "react";
import SectionLayout from "components/SectionLayout/SectionLayout";
import styles from "styles/PageTemplate.module.scss";

import { useRouter } from "next/router";

const dummyBreadcrumbs: BreadcrumbsProps[] = [
  { text: "Home", path: "/home" },
  { text: "User", path: "/user" },
  { text: "Terms & Conditions", path: "/terms-conditions" },
];

const TermsConditionsPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>(
    [] as BreadcrumbsProps[]
  );
  const router = useRouter();

  useEffect(() => {
    setBreadcrumbs(dummyBreadcrumbs);
  }, [breadcrumbs]);

  return (
    <div className={styles.terms_conditions}>
      <SectionLayout>
        <Breadcrumbs data={breadcrumbs} />
        <h1 className={styles.title}>Tribes Privacy Policy</h1>
        <div className={styles.content}>
          <br /> <h2 className="underline font-bold">1. Introduction</h2>
          <br />
          <p>
            1.1 Welcome to the Tribes platform by Hello Travel Pte Ltd (the
            "Site" or "Tribes"). Please read the following Terms of Service
            carefully before using this Site or opening a Tribes account
            ("Account") so that you are aware of your legal rights and
            obligations with respect to Tribes by Hello Travel Pte Ltd and its
            affiliates and subsidiaries (individually and collectively,
            "Tribes", "we", "us" or "our"). The "Services" we provide or make
            available include (a) the Site, (b) the services provided by the
            Site and by Tribes client software made available through the Site,
            and (c) all information, linked pages, features, data, text, images,
            photographs, graphics, music, sounds, video (including live
            streams), messages, tags, content, programming, software,
            application services (including, without limitation, any mobile
            application services) or other materials made available through the
            Site or its related services ("Content"). Any new features added to
            or augmenting the Services are also subject to these Terms of
            Service. These Terms of Service govern your use of Services provided
            by Tribes. We may collect, process, use and disclose your
            information when you use this website www.exploretribes.com and the
            services offered by Tribes or the third party operators (the
            'Operators') through Tribes Platform (the 'Services') as described
            in this Privacy Policy.
          </p>
          <br />
          <p>
            1.2 "Personal Information" or "personal data" means data, whether
            true or not, about an individual who can be identified from that
            data, or from that data and other information to which an
            organisation has or is likely to have access. Common examples of
            personal data could include residential address, telephone number,
            email address, travel document information, vehicle rental
            information, insurance information, age, date of birth, or any such
            information we have requested and you have provided through the
            Tribes Platform
          </p>
          <br />
          <p>
            1.3 By using the Services, registering for an account with us,
            visiting our Platform, or accessing the Services, you acknowledge
            and agree that you accept the practices, requirements, and/or
            policies outlined in this Privacy Policy, and you hereby consent to
            us collecting, using, disclosing and/or processing your personal
            data as described herein. IF YOU DO NOT CONSENT TO THE PROCESSING OF
            YOUR PERSONAL DATA AS DESCRIBED IN THIS PRIVACY POLICY, PLEASE DO
            NOT USE OUR SERVICES OR ACCESS OUR PLATFORM. If we change our
            Privacy Policy, we will notify you including by posting those
            changes or the amended Privacy Policy on our Platform. We reserve
            the right to amend this Privacy Policy at any time. To the fullest
            extent permissible under applicable law, your continued use of the
            Services or Platform, including placing of any orders, shall
            constitute your acknowledgment and acceptance of the changes made to
            this Privacy Policy.
          </p>
          <br />
          <p>
            1.4 This Policy applies in conjunction with other notices,
            contractual clauses, consent clauses that apply in relation to the
            collection, storage, use, disclosure and/or processing of your
            personal data by us and is not intended to override those notices or
            clauses unless we state expressly otherwise.
          </p>
          <br />
          <p>
            1.5 This Policy applies to both buyers and sellers who use the
            Services except where expressly stated otherwise.
          </p>
          <br />
          <h2 className="underline font-bold">
            2. WHEN WILL TRIBES COLLECT PERSONAL DATA?
          </h2>
          <br />
          <p>
            2.1 We will/may collect personal data about you:
            <ol className={styles.disc_style}>
              <li>
                when you register and/or use our Services or Platform, or open
                an account with us;
              </li>
              <li>
                when you submit any form, including, but not limited to,
                application forms or other forms relating to any of our products
                and services, whether online or by way of a physical form;
              </li>
              <li>
                when you enter into any agreement or provide other documentation
                or information in respect of your interactions with us, or when
                you use our products and services;
              </li>
              <li>
                when you interact with us, such as via telephone calls (which
                may be recorded), letters, fax, face-to-face meetings, social
                media platforms and emails, including when you interact with our
                customer service agents;
              </li>
              <li>
                when you use our electronic services, or interact with us via
                our application or use services on our Platform. This includes,
                without limitation, through cookies which we may deploy when you
                interact with our application or website;
              </li>
              <li>
                when you grant permissions on your device to share information
                with our application or Platform;
              </li>
              <li>
                when you link your Tribes account with your social media or
                other external account or use other social media features, in
                accordance with the provider’s policies;
              </li>
              <li>when you carry out transactions through our Services;</li>
              <li>when you provide us with feedback or complaints;</li>
              <li>when you register for a contest; or</li>
              <li>when you submit your personal data to us for any reason.</li>
            </ol>
          </p>
          <br />
          <p>
            The above does not purport to be exhaustive and sets out some common
            instances of when personal data about you may be collected.
          </p>
          <br />
          <h2 className="underline font-bold">
            3. WHAT PERSONAL DATA WILL Tribes COLLECT?
          </h2>
          <br />
          <p>
            3.1 The personal data that Tribes may collect includes but is not
            limited to:
          </p>
          <ol className={styles.disc_style}>
            <li>name;</li>
            <li>email address;</li>
            <li>date of birth;</li>
            <li>billing and/or delivery address;</li>
            <li>bank account and payment information;</li>
            <li>telephone number;</li>
            <li>gender;</li>
            <li>
              information sent by or associated with the device(s) used to
              access our Services or Platform;
            </li>
            <li>
              information about your network and the people and accounts you
              interact with;
            </li>
            <li>photographs or audio or video recordings;</li>
            <li>
              government issued identification or other information required for
              our due diligence, know your customer, identity verification, or
              fraud prevention purposes;
            </li>
            <li>
              marketing and communications data, such as your preferences in
              receiving marketing from us and third parties, your communication
              preferences and history of communications with us, our service
              providers, and other third parties;
            </li>
            <li>
              usage and transaction data, including details about your searches,
              orders, the advertising and content you interact with on the
              Platform, and other products and services related to you;
            </li>
            <li>location data;</li>
            <li>
              any other information about the User when the User signs up to use
              our Services or Platform, and when the User uses the Services or
              Platform, as well as information related to how the User uses our
              Services or Platform; and
            </li>
            <li>aggregate data on content the User engages with.</li>
          </ol>
          <br />
          <h2 className="underline font-bold">
            4. Withdrawal of Consent to Continued Use, Disclosure, Storing
            and/or Processing of Personal Data
          </h2>
          <p>
            4.1. You may communicate the withdrawal of your consent to the
            continued use, disclosure, storing and/or processing of your
            personal data by contacting us using the contact details below,
            subject to the conditions and/or limitations imposed by applicable
            laws or regulations.
          </p>
          <p>
            4.2. Please note that if you communicate your withdrawal of your
            consent to our use, disclosure, storing or processing of your
            personal data for the purposes and in the manner as stated above or
            exercise your other rights as available under applicable local laws,
            we may not be in a position to continue to provide the Services to
            you or perform any contract we have with you, and we will not be
            liable in the event that we do not continue to provide the Services
            to, or perform our contract with you. Our legal rights and remedies
            are expressly reserved in such an event.
          </p>
          <p className="font-bold">Marketing information</p>
          <p>
            4.3. You may unsubscribe from receiving marketing information at any
            time in our mobile application settings or by using the unsubscribe
            function within the electronic marketing material. We may use your
            contact information to send newsletters from us and from our related
            companies
          </p>
          <br />
          <h2 className="underline font-bold">
            5. Updating Your Personal Data
          </h2>
          <br />
          <p>
            5.1. It is important that the personal data you provide to us is
            accurate and complete for you to continue using the Platform and for
            us to provide the Services. You are responsible for informing us of
            changes to your personal data, or in the event you believe that the
            personal data we have about you is inaccurate, incomplete,
            misleading or out of date.
          </p>
          <p>
            5.2. You can update your personal data anytime by accessing your
            account on the Platform.
          </p>
          <p>
            5.3. We take steps to share the updates to your personal data with
            third parties and our affiliates with whom we have shared your
            personal data if your personal data is still necessary for the
            above-stated purposes.
          </p>
          <br />
          <h2 className="underline font-bold">
            6. Accessing and Correcting Your Personal Data
          </h2>
          <br />
          <p>
            6.1. You may request information about your personal data which we
            have collected, or enquire about the ways in which your personal
            data may have been used, disclosed, stored or processed by us via
            the personal account information setting on our Platform or by
            contacting us using the contact details below. You may also request
            correction of any error or omission in your personal data which we
            have collected in the same way. In order to facilitate processing of
            your request, it may be necessary for us to request further
            information relating to your request. Where permissible under law,
            we may refuse such correction requests if deemed vexatious or
            unreasonable.
          </p>
          <p>
            6.2. Where permitted by applicable data protection laws, we reserve
            the right to charge a reasonable administrative fee for retrieving
            your personal data records. If so, we will inform you of the fee
            before processing your request.
          </p>
          <br />
          <h2 className="underline font-bold">
            7. Security of Your Personal Data
          </h2>
          <p>
            7.1. To safeguard your personal data from unauthorised access,
            collection, use, disclosure, processing, copying, modification,
            disposal, loss, misuse, modification or similar risks, we have
            introduced appropriate administrative, physical and technical
            measures such as:
          </p>
          <ol className={styles.none_style}>
            <li>
              (a) Restricting access to personal data to individuals who require
              access;
            </li>
            <li>
              (b) Maintaining technology products to prevent unauthorised
              computer access;
            </li>
            <li>
              (c) Using 128-bit SSL (secure sockets layer) encryption technology
              when processing your financial details; and/or
            </li>
            <li>
              (d) implementing other security measures as required by applicable
              law.
            </li>
          </ol>
          <p>
            7.2. You should be aware, however, that no method of transmission
            over the Internet or method of electronic storage is completely
            secure. While security cannot be guaranteed, we strive to protect
            the security of your information and are constantly reviewing and
            enhancing our information security measures.
          </p>
          <br />
          <h2 className="underline font-bold">8. Retention of Personal Data</h2>
          <br />
          <p>
            8.1. We will only retain your personal data for as long as we are
            either required or permitted to by law or as relevant for the
            purposes for which it was collected.
          </p>
          <p>
            8.2. We will cease to retain your personal data, or remove the means
            by which the data can be associated with you, as soon as it is
            reasonable to assume that such retention no longer serves the
            purposes for which the personal data was collected, and is no longer
            necessary for any legal or business purpose.
          </p>
          <br /> <h2 className="underline font-bold">9. Minors</h2>
          <br />
          <p>
            9.1. Tribesda does not sell products to minors (which is to be
            determined based on the applicable law), nor does it intend to
            provide any of the Services or the use of the Platform to minors. We
            do not knowingly collect any personal data relating to minors.
          </p>
          <p>
            9.2. You hereby confirm and warrant that you are above the age of
            minority and you are capable of understanding and accepting the
            terms of this Privacy Policy. If you are a minor, you may use our
            Platform only with the involvement of a parent or legal guardian.
          </p>
          <p>
            9.3. As a parent or legal guardian, please do not allow minors under
            your care to submit personal data to Tribesda. In the event that
            such personal data of a minor is disclosed to Tribesda, you hereby
            consent to the processing of the minor’s personal data and accept
            and agree to be bound by this Privacy Policy and take responsibility
            for his or her actions.
          </p>
          <p>
            9.4. We will not be responsible for any unauthorised use of the
            Services on the Platform by yourself, users who act on your behalf
            or any unauthorised users. It is your responsibility to make your
            own informed decisions about the use of the Services on the Platform
            and take necessary steps to prevent any misuse of the Services on
            the Platform.
          </p>
          <br />
          <h2 className="underline font-bold">
            10. Collection of Computer Data
          </h2>
          <br />
          <p>
            10.1. We or our authorised service providers may use cookies, web
            beacons, and other similar technologies in connection with your use
            of the Services or access of the Platform.
          </p>
          <p>
            10.2. When you visit the Platform through your computer, mobile
            device, or any other device with Internet connectivity, our company
            servers will automatically record data that your browser sends
            whenever you visit a website, such as the technical data and usage
            data outlined in Section 2 above.
          </p>
          <p>
            10.3. This data is collected for analysis and evaluation in order to
            help us improve our website and the services and products we
            provide, as well as to help us to personalise the content to match
            your preferred interests more quickly. The data is also collected to
            make the Services and the Platform more convenient and useful to
            you, and to provide more relevant advertising related to market
            products, services and features to you.
          </p>
          <p>
            10.4. Cookies are small text files (typically made up of letters and
            numbers) placed in the memory of your browser or device when you
            visit a website or view a message. They allow us to recognise a
            particular device or browser. Web beacons are small graphic images
            that may be included on our Services and the Platform. They allow us
            to count users who have viewed these pages so that we can better
            understand your preference and interests.
          </p>
          <p>
            10.5. You may be able to manage and delete cookies through your
            browser or device settings. However, certain cookies are required to
            enable core functionality (such as adding items to your shopping
            basket), so please note that changing and deleting cookies may
            affect the functionality available on the Platform or through our
            Services.
          </p>
          <br /> <h2 className="underline font-bold">11. Third Party Sites</h2>
          <br />
          <p>
            11.1. The Platform may contain links to other websites operated by
            other parties, such as our business affiliates, merchants or payment
            gateways. We are not responsible for the privacy practices of
            websites operated by these other parties. You are advised to check
            on the applicable privacy policies of those websites to determine
            how they will handle any information they collect from you.
          </p>
          <br />
          <h2 className="underline font-bold">
            11. Questions, Feedback, Concerns, Suggestions or Complaints
          </h2>
          <p>
            12.1. If you have any questions on personal data protection or data
            privacy, please refer to our list of frequently asked questions on
            data protection / privacy.
          </p>
          <p>
            12.2. If your queries are not covered in our FAQs, or if you have
            any queries or complaints about this Privacy Policy or how we handle
            your personal data, please feel free to contact us via our online
            chat service or as follows:
          </p>
          <p>
            If you would like to access your personal data that is retained by
            us or amend any personal data, please feel free to contact us via
            email at
            <a
              style={{ color: "#3faeff" }}
              href="mailto:tribes@havehalalwilltravel.com"
            >
              tribes@havehalalwilltravel.com
            </a>
            .
          </p>
        </div>
      </SectionLayout>
    </div>
  );
};

export default TermsConditionsPage;
