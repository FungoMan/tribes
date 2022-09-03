import Breadcrumbs, {
  BreadcrumbsProps,
} from "components/Breadcrumbs/Breadcrumbs";
import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Heading from "components/Heading/Heading";
import Icon from "components/Icon/Icon";
import SectionLayout from "components/SectionLayout/SectionLayout";
import TabsHorizontal, { ITab } from "components/TabsHorizontal/TabsHorizontal";
import TopSearches from "components/TopSearches/TopSearches";
import { useEffect, useState } from "react";
import styles from "styles/PageTemplate.module.scss";

const dummyBreadcrumbs: BreadcrumbsProps[] = [
  { text: "Home", path: "/" },
  { text: "User", path: "/profile/favourited" },
  { text: "Support", path: "/support" },
];

const dummyScrollspy = [
  "What is Tribes?",
  "Who is Tribes for?",
  "How can I contribute to the Tribes community?",
  "What is Tribes relevance to HHWT?",
  "Are the products listed on Tribes halal?",
  "What do the different halal statuses mean?",
  "Why am I unable to make a purchase on the platform?",
  "What is unique in each category B, E, S, T, S?",
  "Are the brand owners local or international?",
  "How do I reset my password?",
  "Who do I contact for more information with regards to the information listed on Tribes?",
  "What do I do if I see a post against the community guidelines?",
  "Where do I write in my suggestions and feedback regarding the Tribes platform?",
  "How do I submit a review?",
  "Why are some of my reviews not showing up under the business’s review section?",
  "How long does a review take to be shown on Tribes?",
  "Am I able to refer a friend to sign up for a Tribes account?",
  "What benefits do I get if I refer a friend to sign up for a Tribes account?",
  "What do I do if a business does not honour their deal as listed on Tribes?",
  "How many times can I use a Deal?",
];

const dummyScrollsp = ["1", "2", "3", "4", "5", "6", "8", "9", "7", "10"];

const dummyQuestion = [
  {
    question: "What is Tribes?",
    answer:
      "Tribes is a community-driven, lifestyle platform for Muslims to explore and discover new content in the areas of Buy, Eat, Stay, Transport, See & Do. All items listed on the platform are Muslim-friendly. As much as we have a team of dedicated members working tirelessly curating listings to help fellow community members make better travel and purchase decisions, we believe fully that each community member has the power and desire to contribute and share as well. This platform is designed in a way that allows each and every one of you to create and edit unclaimed listings, as well as to leave honest reviews and feedback on every brand listed on the platform. Our cumulative effort will enable the Tribes community and platform to become better!",
    smallAnswer: "",
  },
  {
    question: "Who is it for?",
    answer:
      "Tribes is for everyone and anyone, regardless of race, language or religion, who is interested to contribute and be a part of the Muslim community.",
  },
  {
    question: "How can I contribute to the Tribes community?",
    answer:
      "There are currently 3 ways for you to contribute to the community! Every contribution will enable you to earn Tribes points.",
  },
  {
    question: "How old is Tribes?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Is it available on my device?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Who are the people behind Tribes?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
  {
    question: "Who is it for?",
    answer:
      "HHWT Tribes aims to be a safe space for Muslims to discover travel-related content and share their own meaningful experiences. In addition to that, Muslims are able to discover great listings of where to eat, where to stay, what to see and what to buy. (BESTS)",
  },
];

const QuestionItem = (props: { question: string; answer: string }) => {
  const { question, answer } = props;
  return (
    <div className={styles.question_item}>
      <h2 className={styles.question}>{question}</h2>
      <p className={styles.answer}>{answer}</p>
    </div>
  );
};

const QuestionForUser = () => {
  return (
    <div className="for-user">
      <ul>
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>What is Tribes?</h2>
            <p className={styles.answer}>
              Tribes is a community-driven, lifestyle platform for Muslims to
              explore and discover new content in the areas of{" "}
              <i>Buy, Eat, Stay, Transport, See & Do</i>. All items listed on
              the platform are Muslim-friendly. As much as we have a team of
              dedicated members working tirelessly curating listings to help
              fellow community members make better travel and purchase
              decisions, we believe fully that each community member has the
              power and desire to contribute and share as well. This platform is
              designed in a way that allows each and every one of you to create
              and edit unclaimed listings, as well as to leave honest reviews
              and feedback on every brand listed on the platform. Our cumulative
              effort will enable the Tribes community and platform to become
              better!
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>Who is Tribes for?</h2>
            <p className={styles.answer}>
              Tribes is for everyone and anyone, regardless of race, language or
              religion, who is interested to contribute and be a part of the
              Muslim community.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              How can I contribute to the Tribes community?
            </h2>
            <p className={styles.answer}>
              There are currently 3 ways for you to contribute to the community!
              Every contribution will enable you to earn Tribes points.
            </p>
            <br />
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Edit a listing - if you see a familiar brand with incomplete or
                outdated information, you will be able to suggest an edit to put
                in the correct information.
              </li>
              <li className={styles.answer}>
                Suggest a new listing - know of a new brand that is currently
                not listed on Tribes? Feel free to create a page for them so
                that other users will learn of the new options that they have
              </li>
              <li className={styles.answer}>
                Reviews - Purchased or dined in at one of the brands listed on
                Tribes? Share your experience with other Tribes users! This will
                help them make better decisions based on their requirements.
              </li>
              <br />
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What is Tribes relevance to HHWT?
            </h2>
            <p className={styles.answer}>
              Tribes is a product of Hello Travel Pte. Ltd. which owns Have
              Halal, Will Travel (HHWT). Over the years as a publication, the
              HHWT team has come to realise that many of our readers, like
              yourself, are looking for something more interactive, that will
              enable you to discover new brands and products in just a few
              steps. With that in mind, we spent almost a year planning for this
              new platform that will satisfy your needs - Tribes!
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Are the products listed on Tribes halal?
            </h2>
            <p className={styles.answer}>
              Yes, they are! Tribes is here to serve the Muslim community and
              therefore, the products listed on our platform are halal. That
              being said, we understand that different individuals have
              different preferences and tolerance levels. As such, we have
              labelled each brand, with the type of halal status that best
              describes them. We advise users to filter and choose the halal
              status based on their comfort level and to dine at their own
              discretion.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What do the different halal statuses mean?
            </h2>
            <ul className={styles.small_answer}>
              <li>
                <p className={styles.answer}>
                  Halal Certified - The brands are officially certified by the
                  Islamic Authority of the country (i.e. MUIS in Singapore,
                  JAKIM in Malaysia, etc)
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Muslim Owned - The brand may not be officially certified by an
                  Islamic Authority but is owned by fellow Muslims
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Halal Ingredients Used - The brands may not be officially
                  certified or Muslim-owned. However, based on accounts of the
                  store owners, halal-certified ingredients are being used in
                  the preparation of their dishes.
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Halal meals available on request - The brands may not be
                  officially certified or Muslim-owned however brands are able
                  to prepare halal meals upon request.
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Vegetarian options available - The brands may not be
                  officially certified or Muslim-owned but provide vegetarian
                  options
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Kosher options available - The brands may not be officially
                  certified or Muslim-owned but provide kosher options
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Seafood options available - The brands may not be officially
                  certified or Muslim-owned but provide seafood options
                </p>
              </li>
              <li>
                <p className={styles.answer}>
                  Alcohol served on-premise - The brands are not officially
                  certified or Muslim-owned and served alcohol but may have
                  vegetarian or halal options upon request.
                </p>
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Why am I unable to make a purchase on the platform?
            </h2>
            <p className={styles.answer}>
              Tribes is not a marketplace and we do not offer direct purchase
              services. You will be able to make the purchases in 2 possible
              ways
            </p>
            <br />
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Directly off the brand’s website
              </li>
              <li className={styles.answer}>
                Through our partners such as Klook
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What is unique in each category B, E, S, T, S?
            </h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                BUY - Anything that you could purchase off the shelf. Includes
                (but not limited to) brands that offer halal, organic, vegan
                skincare products, halal grocery items, supplements, home
                decorations, modest fashion and activewear
              </li>
              <li className={styles.answer}>
                EAT - Anywhere that you can get cooked meals. Includes (but not
                limited to) halal restaurants, Muslim-friendly eateries,
                Muslim-owned home cooks, etc.
              </li>
              <li className={styles.answer}>
                SEE & DO - Anywhere that you can indulge in fun, Muslim-friendly
                activities and experiences. Includes (but not limited to)
                fitness activities such as yoga, wellness activities such as
                spa, cultural experiences such as pottery and kid-friendly
                activities like bouncy castles.
              </li>
              <li className={styles.answer}>
                TRANSPORT - Brands that offer transport services, including
                land, sea and air transportation.
              </li>
              <li className={styles.answer}>
                STAY - List of hotels, resorts and apartments
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Are the brand owners local or international?
            </h2>
            <p className={styles.answer}>
              The brand owners come from different parts of the world, mostly
              from Singapore, Malaysia and Indonesia.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>How do I reset my password?</h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Enter the email address or phone number that you signed up with
                in the login section
              </li>
              <li className={styles.answer}>Click “forgot password”</li>
              <li className={styles.answer}>Fill out the log-in account</li>
              <li className={styles.answer}>
                Enter the OTP sent to the logged-in account (either the email
                address or the phone number)
              </li>
              <li className={styles.answer}>Reset new password</li>
              <li className={styles.answer}>
                Click “next” to complete the process
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Will the point system restart if I reset my password?
            </h2>
            <p className={styles.answer}>
              No, it will not affect the point system
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>Are my points transferable?</h2>
            <p className={styles.answer}>Points are not transferable.</p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Who do I contact for more information with regards to the
              information listed on Tribes?
            </h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                For unclaimed businesses, there will be a button for users to
                suggest an edit. Please feel free to make edits to business
                listings with outdated information
              </li>
              <li className={styles.answer}>
                For claimed businesses, Please write to the Tribes team at
                <a href="mailto:tribes@havehalalwilltravel.com">
                  <u>tribes@havehalalwilltravel.com</u>
                </a>{" "}
                stating the inaccuracy of the listing!
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What do I do if I see a post against the community guidelines?
            </h2>
            <p className={styles.answer}>
              See something against our Community Guidelines? Report it to us!
              Be the eyes and ears of our community to keep our platform a safe
              and pleasant space for all.
            </p>
            <br />
            <p className={styles.answer}>
              To help us review your report more efficiently, please file a
              report to us via the app/web if it is regarding:
            </p>
            <ul className={styles.small_answer}>
              <li>Listings in the wrong category</li>
              <li>Duplicate posts</li>
              <li>Prohibited items</li>
              <li>Counterfeits</li>
              <li>Listings containing irrelevant keywords</li>
              <li>Offensive content</li>
              <li>Illegal activities</li>
            </ul>
            <p className={styles.answer}>
              Reports are kept anonymous unless a direct follow-up from the
              report is required. Once our moderators have reviewed your
              submitted report on a user/listing, you will receive a
              notification.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Where do I write in my suggestions and feedback regarding the
              Tribes platform?
            </h2>
            <p className={styles.answer}>
              You may submit your suggestions and feedback now at{" "}
              <a href="mailto:Tribes@havehalalwilltravel.com">
                <u>Tribes@havehalalwilltravel.com</u>
              </a>
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>How do I submit a review?</h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Firstly be a member of Tribes by signing up to our platform to
                enjoy getting updates on new Muslim-friendly places and
                activities and the perks of sharing reviews amongst the Tribes
                community
              </li>
              <li className={styles.answer}>
                After signing up, you may go to “Contribute” and click on “Add a
                new review”
              </li>
              <li className={styles.answer}>
                Search for the business listing that you wish to review
              </li>
              <li className={styles.answer}>Fill up the details accordingly</li>
              <li className={styles.answer}>
                Remember, we encourage only positive and constructive feedback
                that may help businesses better improve their services
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Why are some of my reviews not showing up under the business’s
              review section?
            </h2>
            <p className={styles.answer}>
              Your review is under review by Tribes.
            </p>
            <br />
            <p className={styles.answer}>
              Please wait for 1-3 working days for Tribes to verify your review.
              If your review still does not show up, please refer to our
              community guidelines (To include community guidelines/review
              guidelines) here and resubmit a review.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              How long does a review take to be shown on Tribes?
            </h2>
            <p className={styles.answer}>
              Once you have submitted a product listing for review, it will take
              1-3 working days for the listing to be up. If your review process
              takes longer than expected, reach out to us through our{" "}
              <a href="mailto:tribes@havehalalwilltravel.com">
                <u>tribes@havehalalwilltravel.com</u>
              </a>
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Am I able to refer a friend to sign up for a Tribes account?
            </h2>
            <p className={styles.answer}>
              Yes, and we encourage you to do so! Each Tribes user has a unique
              referral link which can be found in their profile
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What benefits do I get if I refer a friend to sign up for a Tribes
              account?
            </h2>
            <p className={styles.answer}>
              The referrer will receive points which can be used to participate
              in exclusive events and lucky draws after the referee has
              successfully created their account
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What do I do if a business does not honour their deal as listed on
              Tribes?
            </h2>
            <p className={styles.answer}>
              Take a screenshot of the deal on Tribes and email us at
              <a href="mailto:tribes@havehalalwilltravel.com">
                <u>tribes@havehalalwilltravel.com</u>
              </a>
              . We encourage users to confirm the deals with the business before
              heading down to use the deal to avoid disappointment
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              How many times can I use a Deal?
            </h2>
            <p className={styles.answer}>
              You may use the deal for as long as the brands posted on their
              listing!
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

const QuestionForBusiness = () => {
  return (
    <div className="for-business">
      <ul>
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              How can Tribes help me grow my business?
            </h2>
            <p className={styles.answer}>
              Tribes is a platform that serves the Muslim community. Our goal is
              to enrich our users have experiences by providing them with an
              array of high-quality brands. By listing on Tribes, you can expose
              your brand to the Muslim community in Singapore, Malaysia and
              Indonesia.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>Is it free?</h2>
            <p className={styles.answer}>
              There is a free and a paid version for businesses.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              What is the difference between a free and basic listing?
            </h2>
            <p className={styles.answer}>
              More features are available for brands who sign up for the basic
              listing. For more information, please click here (put in the URL
              to the diagram showing the difference between free and paid
              listing)
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>What is a brand listing?</h2>
            <p className={styles.answer}>
              Brand listings are for business owners to promote their new
              products and offer deals primarily for our main Muslim audience.
              As Tribes aims to offer BUSINESS USERS the unique opportunity to
              reach a Muslim audience, we encourage brand owners to claim their
              listing if it is currently available on the platform or create a
              listing if it is not currently available.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Will I be able to downgrade my tier in the future?
            </h2>
            <p className={styles.answer}>
              We will be really sad to see you leave. Should you feel that the
              basic tier does not meet your expectations, we would advise you to
              speak to our customer success representatives, who will assist you
              in optimising your listing. That said, you will have the option to
              downgrade your tier at any point in time.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Who can I contact if I require support?
            </h2>
            <p className={styles.answer}>
              Please feel free to drop us an email at{" "}
              <a href="mailto:tribes@havehalalwilltravel.com">
                <u>tribes@havehalalwilltravel.com</u>
              </a>
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>How do I claim a listing?</u>
            </h2>
            <p className={styles.answer}>
              For a brand that has already been listed on Tribes?
            </p>
            <br />
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Sign up / Log in to Tribes FREE business account
              </li>
              <li className={styles.answer}>
                Click on “Business” to find your listing to be claimed
              </li>
              <li className={styles.answer}>Proceed to claim your listing</li>
              <li className={styles.answer}>
                Click “Yes” if you are the owner or representative of the brand.
                Please ensure to select your role accordingly, we at Tribes
                trust that you are a legit representative and responsible for
                claiming the brand listing
              </li>
              <li className={styles.answer}>
                Choose the tiers to go for (Free or Basic)
              </li>
              <li className={styles.answer}>
                Continue to verify your email/phone no.
              </li>
              <li className={styles.answer}>
                Once verified, a successful message will indicate your listing
                has been claimed
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>How can I update the details on my listing page?</u>
            </h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                Claim your listing if you haven’t already done so
              </li>
              <li className={styles.answer}>
                Click on the ‘Business’ button to gain access to your business
                listing dashboard
              </li>
              <li className={styles.answer}>
                Click on “Contributes” and then “Update Listing”
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>
                What is the total number of products that I can list on my
                listing?
              </u>
            </h2>
            <p className={styles.answer}>
              If you are using the free version, you will be able to list a
              maximum of 3 products. If you are on the basic tier, you will be
              able to list an UNLIMITED number of products.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>Why is my product deleted/suspended</u>
            </h2>
            <p className={styles.answer}>
              If your product has been reported and found to violate the listing
              guidelines, you would have received an email notification stating
              that the product has been removed.
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              Do business listings need to be reviewed?
            </h2>
            <p className={styles.answer}>
              Claimed business listings will have to undergo moderation and be
              approved by the moderator before going live. We also encourage the
              Tribes community to “raise a flag” should you see any suspicious
              or non-legit business listings on the platform!
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>Customer Service</u>
            </h2>
            <p className={styles.answer}>
              Please feel free to drop us an email at{" "}
              <a href="mailto:tribes@havehalalwilltravel.com">
                <u>tribes@havehalalwilltravel.com</u>
              </a>
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>Deals</u>
            </h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                FREE listings: brand owners will not have the option to promote
                their deals
              </li>
              <li className={styles.answer}>
                PAID listings: brand owners will have unlimited sharing of deals
              </li>
            </ul>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              How do I make payment for Paid Listing?
            </h2>
            <p className={styles.answer}>
              Brand owners can make opt for quarterly or yearly tier
              subscriptions to enjoy unlimited usage of uploading deals,
              products, responding to reviews, etc
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>What details are required?</h2>
            <p className={styles.answer}>
              We will need either your Identification Card or Driver’s Licence
              for account verification
            </p>
          </div>
        </li>
        <Break />
        <li>
          <div className={styles.question_item}>
            <h2 className={styles.question}>
              <u>Managing reviews and response</u>
            </h2>
            <ul className={styles.small_answer}>
              <li className={styles.answer}>
                FREE listings: Brand owners will not be able to respond to
                reviews
              </li>
              <li className={styles.answer}>
                PAID listings: Brand owners are entitled to review and respond
                to unlimited user reviews
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  );
};

const SupportPage = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbsProps[]>(
    [] as BreadcrumbsProps[]
  );
  const [currentTab, setCurrentTab] = useState<string | number>("for-user");
  const [scrollspy, setScrollspy] = useState<any>(dummyScrollspy[0]);
  const [questions, setQuestions] = useState<any>();

  const TabList: ITab[] = [
    { label: "For user", value: "for-user", content: "" },
    { label: "For business", value: "for-business", content: "" },
  ];

  useEffect(() => {
    setBreadcrumbs(dummyBreadcrumbs);
    // setCurrentTab(TabList[0]?.value);
    setQuestions(dummyQuestion);
  }, [currentTab]);

  return (
    <div className={styles.support}>
      <SectionLayout>
        <Breadcrumbs data={breadcrumbs} />
        <h1 className={styles.title}>Support</h1>
        <div className={styles.tab_support}>
          <TabsHorizontal
            selectedTab="for-user"
            tablist={TabList}
            type="secondary-no-outline"
            className="mb-0"
            onChangeTab={(e) => {
              console.log(e);
              setCurrentTab(e);
            }}
          />
        </div>
        <div className="flex justify-between mt-[34px]">
          {/* <div className={styles.left_col}>
            <div className={`${styles.left_col_bottom} mt-0`}>
              <Button
                text="Contact admin"
                width="max-content"
                prefix={<Icon icon="chat" color="#ffffff" />}
              />
              {dummyScrollsp?.map((item, index) => (
                <div className="flex gap-3 justify-between" key={item}>
                  <Heading
                    icon={item}
                    type="tab"
                    text={item}
                    onClick={() => setScrollspy(item)}
                    selected={scrollspy === item}
                  />
                </div>
              ))}
            </div>
          </div> */}
          <div className={styles.right_col}>
            {currentTab === "for-user" && <QuestionForUser />}
            {currentTab === "for-business" && <QuestionForBusiness />}
          </div>
        </div>
        <TopSearches className="mt-[80px]" />
      </SectionLayout>
    </div>
  );
};

export default SupportPage;
