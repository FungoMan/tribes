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
        <h1 className={styles.title}>Terms of Service</h1>
        <div className={styles.content}>
          <br /> <h2 className="underline font-bold">1. Introduction</h2>
          <br />
          <p>
            1.1 Welcome to the Tribes platform by Hello Travel Pte Ltd (the
            "Platform" or "Tribes"). Please read the following Terms of Service
            carefully before using this Platform or opening a Tribes account
            ("Account") so that you are aware of your legal rights and
            obligations with respect to Tribes and its affiliates and
            subsidiaries (individually and collectively, "Tribes", "we", "us" or
            "our"). The "Services" we provide or make available include (a) the
            Platform, (b) the services provided by the Platform and by Tribes
            client software made available through the Platform, and (c) all
            information, linked pages, features, data, text, images,
            photographs, graphics, music, sounds, video (including live
            streams), messages, tags, content, programming, software,
            application services (including, without limitation, any mobile
            application services) or other materials made available through the
            Platform or its related services ("Content"). Any new features added
            to or augmenting the Services are also subject to these Terms of
            Service. These Terms of Service govern your use of Services provided
            by Tribes.
          </p>
          <br />
          <p>
            1.2 The Services we provide or make available include (a) the
            Platform, (b) the features provided or introduced from time to time
            on the Platform and software made available through the Platform,
            including, but not limited to, "Tribes Deals", User Generated
            Content, Listings information (c) all information, linked pages,
            features, data, text, images, photographs, graphics, music, sounds,
            video, messages, tags, content, programming, software, tools,
            application services (including, without limitation, any mobile
            application services) or other materials made available on or
            through the Platform or its related services ("Content"). Any new
            features added to or augmenting the Services are also subjected to
            these Terms of Use. These Terms of Use shall bind all users who use
            the Platform and/or any Services provided by us such as our
            customers and/ or consumers ("Users", "User", "you" or "your").
          </p>
          <br />
          <p>
            1.3 The actual contract for sale is directly between Buyer and
            Seller and Tribes is not a party to that or any other contract
            between Buyer and Seller and accepts no obligations in connection
            with any such contract. Parties to such a transaction will be
            entirely responsible for the sales contract between them, the
            listing of goods, warranty of purchase and the like. Tribes is not
            involved in the transaction between Users. Tribes may or may not
            pre-screen Users or the Content or information provided by Users.
            Tribes reserves the right to remove any Content or information
            posted by you on the Platform that has violated the Terms of Use
            and/or any national laws.
          </p>
          <br />
          <p>
            1.4 Please do not use or access the Platform and/or our Services if
            you are under the age of eighteen (18) or the legal age for giving
            consent hereunder pursuant to the applicable laws in your
            jurisdiction ("Legal Age"). If you are below the Legal Age, you must
            get permission from a parent or legal guardian to open an Account
            and that parent or legal guardian must agree to these Terms of Use
            on your behalf. If you are the parent or legal guardian of a minor
            who is creating an account, you must accept the terms of this
            agreement on the minor’s behalf and you will be responsible for all
            the use of the account or company services using such
            account,whether such account is currently open or created later.
          </p>
          <br />
          <p>
            1.5 We reserve the right to change, modify, suspend or discontinue
            all or any part of the Platform and/or the Services at any time or
            upon notice as required by local laws. We may release new features
            in a beta or trial version, which may not work correctly or in the
            same way the final version may work, and we shall not be held liable
            in such instances. We may also impose limits on certain features or
            restrict your access to parts of, or the entire, Platform and/or
            Services in our sole discretion and without notice and any liability
            to you. Tribes may modify these Terms of Service at any time by
            posting the revised Terms of Service on this Platform. Your
            continued use of this Platform and the new features after such
            changes have been posted shall constitute your acceptance of such
            revised Terms of Service.
          </p>
          <br /> <h2 className="underline font-bold">2. Privacy Policy</h2>
          <br />
          <p>
            2.1 Tribes is committed to protecting and respecting your personal
            data privacy and complying with data protection principles and
            provisions under applicable laws. To better protect your rights we
            have provided the Tribes Privacy Policy to explain our privacy
            practices in detail. Please review the Privacy Policy
            <span
              onClick={() => router.push("/privacy-policy")}
              className="cursor-pointer"
              style={{ color: "#3faeff" }}
            >
              here
            </span>
            to understand how Tribes collects and uses the information
            associated with your Account and/or your use of the Services (the
            "User Information"). By using the Services or providing information
            on the Platform, you: (i) consent to Tribes’ collection, use,
            disclosure and/or processing of your Content, personal data and User
            Information as described in the Privacy Policy; (ii) agree and
            acknowledge that the proprietary rights of your User Information are
            jointly owned by you and Tribes; and (iii) shall not, whether
            directly or indirectly, disclose your User Information to any third
            party, or otherwise allow any third party to access or use your User
            Information, without Tribes’ prior written consent.
          </p>
          <br />
          <p>
            2.2 Users in possession of another User’s personal data through the
            use of the Services (the "Receiving Party") hereby agree that, they
            will (i) comply with all applicable personal data protection laws
            with respect to any such data; (ii) allow the User whose personal
            data the Receiving Party has collected (the "Disclosing Party") to
            remove his or her data so collected from the Receiving Party’s
            database; and (iii) allow the Disclosing Party to review what
            information have been collected about them by the Receiving Party,
            in each case of (ii) and (iii) above, in compliance with and where
            required by applicable laws.
          </p>
          <br /> <h2 className="underline font-bold">3. Third party sites </h2>
          <br />
          <p>
            Tribes may contain links to other websites operated by other parties
            such as our business affiliates, merchants or payment gateways. We
            are not responsible for the privacy practices of websites operated
            by these other parties. You are advised to check on the applicable
            privacy policies of those websites to determine how they will handle
            any information they collect from you.
          </p>
          <p>
            We may at any time or from time to time sub-contract and/or appoint
            our subsidiaries, affiliates, related entities and/or any third
            party service provider(s) to operate the Platform and/or provide the
            Services and/or part thereof on our behalf at our absolute
            discretion. We shall have the rights to delegate, transfer, assign
            or novate, in whole or in part, our rights, benefits or obligations
            to our subsidiaries, affiliates, related entities or appointed third
            party service provider(s) without your consent and/or without notice
            to you.
          </p>
          <p>
            Tribes’ inclusion of hyperlinks to such websites does not imply any
            endorsement of the material on such third party websites or apps or
            any association with their operators.In some cases, you may be asked
            by a third party site or app to link your Tribes account profile to
            a profile on another third party site. You are responsible for
            deciding if you choose to do so, it is purely optional, and the
            decision to allow this information to be linked can be disabled
            (with the third party site or app) at any time. If you do choose to
            link your Tribes account to a third party site or app, the third
            party site or app will be able to access the information you have
            stored on your Tribes account, including information regarding other
            users with whom you share information. You should read the terms and
            conditions and privacy policy of the third party sites and apps that
            you visit as they have rules and permissions about how they use your
            information that may differ from the Services, including our
            websites. We encourage you to review these third party sites and
            apps and to use them at your own risk.
          </p>
          <p>
            All rights reserved. Tribes is not responsible for content on
            websites operated by parties other than Tribes.
          </p>
          <br />
          <h2 className="underline font-bold">4. Additional Products</h2>
          <br />
          <p>
            Tribes may, from time to time, decide to change, update or
            discontinue certain products and features of the Services. You agree
            and understand that Tribes has no obligation to store or maintain
            your Content or other information you provide, except to the extent
            required by applicable law.
          </p>
          <h2 className="underline font-bold">5. Prohibited activities</h2>
          <br />
          <p>
            The Content and information available on and through the Platform
            (including, but not limited to, messages, data, information, text,
            music, sound, photos, graphics, video, maps, icons, software, code
            or other material), as well as the infrastructure, used to provide
            such Content and information, is proprietary to Tribes. For all
            Content other than your Content, you agree not to otherwise modify,
            copy, distribute, transmit, display, perform, reproduce, publish,
            license, create derivative works from, transfer, or sell or re-sell
            any information, software, products, or services obtained from or
            through the Services. Additionally, you agree not to:
          </p>
          <ol className={styles.none_style}>
            <li>
              (i) use the Services or Content for any commercial purpose,
              outside the scope of those commercial purposes explicitly
              permitted under this Agreement and related guidelines as made
              available by Tribes;
            </li>
            <li>
              (ii) access, monitor, reproduce, distribute, transmit, broadcast,
              display, sell, licence, copy or otherwise exploit any Content of
              the Services, including but not limited to, user profiles and
              photos, using any robot, spider, scraper or other automated means
              or any manual process for any purpose not in accordance with this
              Agreement or without our express written permission;
            </li>
            <li>
              (iii) violate the restrictions in any robot exclusion headers on
              the Services or bypass or circumvent other measures employed to
              prevent or limit access to the Services;
            </li>
            <li>
              (iv) take any action that imposes, or may impose, in our
              discretion, an unreasonable or disproportionately large load on
              our infrastructure;
            </li>
            <li>
              (v) deep-link to any portion of the Services for any purpose
              without our express written permission;
            </li>
            <li>
              (vi) "frame", "mirror" or otherwise incorporate any part of the
              Services into any other websites or service without our prior
              written authorization;
            </li>
            <li>
              (vii) attempt to modify, translate, adapt, edit, decompile,
              disassemble, or reverse engineer any software programs used by
              Tribes in connection with the Services;
            </li>
            <li>
              (viii) circumvent, disable or otherwise interfere with
              security-related features of the Services or features that prevent
              or restrict use or copying of any Content; or
            </li>
            <li>
              (ix) download any Content unless it’s expressly made available for
              download by Tribes
            </li> 
          </ol>
          <br />
          <h2 className="underline font-bold">
            6. Reviews, comments and use of other interactive areas; licence
            grant
          </h2>
          <p>
            We appreciate hearing from you. Please be aware that by providing
            your Content to or through the Services, be it via email, posting
            via any Tribes synchronization product, via the services and
            applications of others, or otherwise, including any of your Content
            that is transmitted to your Tribes account by virtue of any Tribes
            product or service, reviews, questions, photographs or videos,
            comments, suggestions, ideas or the like contained in any of your
            Content, you grant Tribes a nonexclusive, royalty-free, perpetual,
            transferable, irrevocable and fully sublicensable right to (a) host,
            use, reproduce, modify, run, adapt, translate, distribute, publish,
            create derivative works from and publicly display and perform such
            Content of yours throughout the world in any media, now known or
            hereafter devised; (b) make your Content available to the rest of
            the world and to let others do the same; (c) to provide, promote,
            and improve the Services and to make your Content shared on the
            Services available to other companies, organizations or individuals
            for the syndication, broadcast, distribution, promotion or
            publication of such Content of yours on other media and services,
            subject to our Privacy Policy and this Agreement; and (d) use the
            name and/or trademark that you submit in connection with such
            Content of yours. You acknowledge that Tribes may choose to provide
            attribution of your Content at our discretion. You further grant
            Tribes the right to pursue at law any person or entity that violates
            your or Tribes rights in your Content by a breach of this Agreement.
            You acknowledge and agree that your Content is non-confidential and
            non-proprietary. You affirm, represent, and warrant that you own or
            have the necessary licenses, rights (including copyright and other
            proprietary rights), consents, and permissions to publish and
            otherwise use (and for Tribes to publish and otherwise use) your
            Content as authorized under this Agreement.
          </p>
          <br />
          <p>
            If it is determined that you retain moral rights (including rights
            of attribution or integrity) in your Content, you hereby declare
            that, to the extent permitted by applicable law, (a) you do not
            require that any personally identifying information be used in
            connection with the Content, or any derivative works of or upgrades
            or updates thereto; (b) you have no objection to the publication,
            use, modification, deletion and exploitation of your Content by
            Tribes or their licensees, successors and assigns; (c) you forever
            waive and agree not to claim or assert any entitlement to any and
            all moral rights of an author in any of your Content; and (d) you
            forever release Tribes and their licensees, successors and assigns,
            from any claims that you could otherwise assert against the Tribes
            by virtue of any such moral rights.
          </p>
          <p>
            Note that any feedback and other suggestions you provide may be used
            at any time and we are under no obligation to keep them
            confidential.
          </p>
          <p>
            The Services may contain discussion forums, bulletin boards, review
            services, personal social accounts or other forums in which you may
            post your Content, such as reviews of experiences, messages,
            materials or other items ("Interactive Areas"). If Tribes provides
            such Interactive Areas on the websites, you are solely responsible
            for your use of such Interactive Areas and use them at your own
            risk. Tribes does not guarantee any confidentiality with respect to
            any of your Content you provide to the Services or in any
            Interactive Area. To the extent that Tribes provides any form of
            private communication channel between Account Holders, you agree
            that such entity(ies) may monitor the substance of such
            communications in order to help safeguard our community and the
            Services. You understand that Tribes does not edit or control the
            user messages posted to or distributed through the Services,
            including through any chat rooms, bulletin boards or other
            communications forums, and will not be in any way responsible or
            liable for such messaging. In particular, Tribes does not edit or
            control users’ Content that appears on the websites. Tribes
            nevertheless reserve the right to remove without notice any such
            messaging or other Content from the Services, where they believe in
            good faith that such Content breaches this Agreement or otherwise
            believe the removal is reasonably necessary to safeguard the rights
            of Tribes and/or other users of the Services. Should you disagree
            with the removal of your Content from the websites, you may contact
            Tribes using the Help Center to make your objections. By using any
            Interactive Areas, you expressly agree only to submit Content of
            yours that complies with Tribes’ published guidelines, as are in
            force at the time of submission and made available to you by Tribes.
            You expressly agree not to post, upload to, transmit, distribute,
            store, create or otherwise publish through the Services any Content
            of yours that:
          </p>
          <ol className={styles.none_style}>
            <li>
              (i) Is false, unlawful, misleading, libelous, defamatory, obscene,
              pornographic, indecent, lewd, suggestive, harassing (or advocates
              harassment of another person), threatening, invasive of privacy or
              publicity rights, abusive, inflammatory, fraudulent or otherwise
              objectionable;
            </li>
            <li>
              (ii) Is patently offensive to the online community, such as that
              which promotes racism, bigotry, hatred or physical harm of any
              kind against any group or individual;
            </li>
            <li>
              (iii) Would constitute, encourage, promote or provide instructions
              for conduct of an illegal activity, a criminal offence, give rise
              to civil liability, violate the rights of any party in any country
              of the world, or that would otherwise create liability or violate
              any local, state, national or international law. Illegal
              activities including but not limited making or buying illegal
              weapons, violating someone’s privacy, or providing or creating
              computer viruses;
            </li>
          </ol>
          <p>
            May infringe any patent, trademark, trade secret, copyright or other
            intellectual or proprietary right of any party. In particular,
            content that promotes an illegal or unauthorised copy of another’s
            copyrighted work, such as providing pirated computer programs or
            links to them, providing information to circumvent
            manufacturer-installed copy-protect devices, or providing pirated
            music or links to pirated music files;
          </p>
          <ol className={styles.none_style}>
            <li>
              (i) Constitutes mass mailings or "spamming", "junk mail", "chain
              letters" or "pyramid schemes";
            </li>
            <li>
              (ii) Impersonates any person or entity or otherwise misrepresents
              your affiliation with a person or entity, including Tribes;
            </li>
            <li>
              (iii) Is private information of any third party, including,
              without limitation, addresses, phone numbers, email addresses,
              Social Security numbers and credit card numbers. Note that an
              individual’s surname (family name) may be posted to our websites,
              but only where express permission of the identified individual has
              been secured beforehand;
            </li>
            <li>
              (iv) Contains restricted or password only access pages, or hidden
              pages or images (those not linked to or from another accessible
              page);
            </li>
            <li>
              (v) Include or are intended to facilitate viruses, corrupted data
              or other harmful, disruptive or destructive files;
            </li>
            <li>
              (vii) Is unrelated to the topic of the Interactive Area(s) in
              which such Content is posted; or
            </li>
          </ol>
          <br />
          <p>
            In the sole judgement of Tribes, (a) violates the previous
            subsections herein, (b) violates Tribe’s related guidelines as made
            available to you by Tribes, (c) is objectionable, (d) restricts or
            inhibits any other person from using or enjoying the Interactive
            Areas or any other aspect of the Platform, or (e) may expose Tribes
            or their users to any harm or liability of any type.
          </p>
          <p>
            Tribes take no responsibility and assume no liability for any
            Content posted, stored, transmitted or uploaded to the Services by
            you (in the case of your Content) or any third party (in the case of
            any and all Content more generally), or for any loss or damage
            thereto, nor Tribes liable for any mistakes, defamation, slander,
            libel, omissions, falsehoods, obscenity, pornography or profanity
            you may encounter. As a provider of interactive services, the Tribes
            is not liable for any statements, representations or any other
            Content provided by its users (including you as to your Content) in
            the websites or any other forum. Although Tribes has no obligation
            to screen, edit or monitor any of the Content posted to or
            distributed through any Interactive Area, Tribes reserves the right,
            and has absolute discretion, to remove, screen, translate or edit
            without notice any Content posted or stored on the Services at any
            time and for any reason, or to have such actions performed by third
            parties on their behalf, and you are solely responsible for creating
            backup copies of and replacing any Content you post or otherwise
            submit to us or store on the Services at your sole cost and expense.
          </p>
          <p>
            Any use of the Interactive Areas or other aspects of the Platform in
            violation of the foregoing violates the terms of this Agreement and
            may result in, among other things, termination or suspension of your
            rights to use the Interactive Areas and/or the Services more
            generally.
          </p>
          <p>
            When you post your Content to the Services, the licence you grant
            Tribes in Your Content shall be limited to a nonexclusive,
            royalty-free, transferable, sublicensable, and worldwide licence to
            host, use, distribute, modify, run, reproduce, publicly display or
            perform, translate, and create derivative works of your Content for
            purposes of displaying such on th]Restricted License applies to any
            of your Content (again, other than text-based reviews and associated
            bubble ratings) you or another on your behalf (e.g., a third party
            that contributes to or otherwise manages your account) make
            available on or in connection with the Services.
          </p>
          <p>
            Tribes will not use your Content in advertisements for the products
            and services of third parties to Data protection and cybersecurity
            laws in Singapore - CMS Lawothers without your separate consent
            (including sponsored Content), although you agree and understand
            that Tribes may place advertising and promotions on the Services
            alongside, near, adjacent, or otherwise in close proximity to your
            Content (including, for video or other dynamic content, before,
            during or after its presentation), as well as the Content of others.
            In all instances in which your Content is displayed on the Services,
            we shall provide attribution by using the name and/or trademark that
            you submit in connection with your Content.
          </p>
          <br />
          <h2 className="underline font-bold">7. Contests and personal data</h2>
          <br />
          <p>
            Tribes may run Contests via social media channels (facebook, google,
            twitter etc.) from tiem to time. Tribes may require participants to
            ensure that his/her social media account settings allow for public
            view during the duration of the Contest. In the event the Tribes is
            unable to verify the entry due to incorrect account settings, the
            entry will be considered invalid and voided.
          </p>
          <p>
            Acceptance of the Prize constitutes permission for the Organiser and
            its advertising and promotional agencies to use the Winner’s name,
            and/or likeness and their winning entries (including photos) that
            may be used for editorial, advertising, promotional, marketing
            and/or other relevant purposes without additional compensation
            except where prohibited by law, without notice provided to the
            Winner
          </p>
          <br />
          <h2 className="underline font-bold">8. Misinformation</h2>
          <br />
          <p>
            Tribes operates on a "notice and takedown" basis. If you have any
            complaints or objections. If you have any objections or complaints
            with regards to the products and services listed by a certain
            merchant, Tribes will address the issues on a case by case basis. If
            Tribes deems the issue fit, we will address the complaints or
            objections directly with the merchant involved. However, we are not
            liable If a merchant does not honour a deal or provide products and
            services that are listed on the Platform.
          </p>
          <p>
            Tribes does not guarantee that the information given by the brands
            are accurate. Tribes is not liable for any misinformation given by
            individual merchants. This includes their Halal status,
            Deal/Products/Services’ availability, operating hours or other
            information entered by the merchant on the Platform. For example, if
            a merchant’s Halal Certification expires or is inaccurate, we are
            not liable for this misinformation. However, we will ensure to take
            down a listing or include the necessary discretions needed if we
            deem it necessary.
          </p>
          <br />
          <h2 className="underline font-bold">
            9. Notice and Take-Down Policy for Illegal Content
          </h2>
          <br />
          <p>
            Tribes operates on a "notice and takedown" basis. If you have any
            complaints or objections to Content, including user messages posted
            on the Services, or if you believe that material or content posted
            on the Services infringes a copyright that you hold, please contact
            us immediately by following our notice and takedown procedure. Once
            this procedure has been followed, Tribes will respond to valid and
            properly substantiated complaints by making all reasonable efforts
            to remove manifestly illegal content within a reasonable time.
          </p>
          <br />
          <h2 className="underline font-bold">10. LIABILITY DISCLAIMER</h2>
          <br />
          <p>
            PLEASE READ THIS SECTION CAREFULLY. THIS SECTION LIMITS Tribes
            LIABILITY TO YOU FOR ISSUES THAT MAY ARISE IN CONNECTION WITH YOUR
            USE OF THE SERVICES. IF YOU DO NOT UNDERSTAND THE TERMS IN THIS
            SECTION OR ELSEWHERE IN THIS AGREEMENT, PLEASE CONSULT A LAWYER FOR
            CLARIFICATION BEFORE ACCESSING OR USING THE SERVICES.
          </p>
          <p>
            THE INFORMATION, SOFTWARE, PRODUCTS, AND SERVICES PUBLISHED ON OR
            OTHERWISE PROVIDED VIA THE SERVICES MAY INCLUDE INACCURACIES OR
            ERRORS, INCLUDING PRICING ERRORS. Tribes DOES NOT GUARANTEE THE
            ACCURACY OF, AND DISCLAIMS ALL LIABILITY FOR, ANY ERRORS OR OTHER
            INACCURACIES RELATING TO THE INFORMATION AND DESCRIPTION OF THE
            ACCOMMODATION, EXPERIENCES, AIR, CRUISE, RESTAURANT OR ANY OTHER
            TRAVEL PRODUCTS DISPLAYED ON THE SERVICES (INCLUDING, WITHOUT
            LIMITATION, THE PRICING, AVAILABILITY, PHOTOGRAPHS, LIST OF
            ACCOMODATION, EXPERIENCE, AIR, CRUISE, RESTAURANT OR OTHER TRAVEL
            PRODUCT AMENITIES, GENERAL PRODUCT DESCRIPTIONS, REVIEWS AND
            RATINGS, ETC.). IN ADDITION, Tribes EXPRESSLY RESERVE THE RIGHT TO
            CORRECT ANY AVAILABILITY AND PRICING ERRORS ON THE SERVICES AND/OR
            ON PENDING RESERVATIONS MADE UNDER AN INCORRECT PRICE.
          </p>
          <p>
            Tribes MAKES NO REPRESENTATIONS OF ANY KIND ABOUT THE SUITABILITY OF
            THE SERVICES, INCLUDING THE INFORMATION CONTAINED ON ITS WEBSITES OR
            ANY PORTION THEREOF, FOR ANY PURPOSE, AND THE INCLUSION OR OFFERING
            OF ANY PRODUCTS OR SERVICE OFFERINGS ON ITS WEBSITES OR OTHERWISE
            THROUGH THE SERVICES DOES NOT CONSTITUTE ANY ENDORSEMENT OR
            RECOMMENDATION OF SUCH PRODUCTS OR SERVICE OFFERINGS BY Tribes,
            NOTWITHSTANDING ANY AWARDS DISTRIBUTED BASED ON USER REVIEWS. ALL
            SUCH INFORMATION, SOFTWARE, PRODUCTS, AND SERVICE OFFERINGS MADE
            AVAILABLE BY OR THROUGH THE SERVICES ARE PROVIDED "AS IS" WITHOUT
            WARRANTY OF ANY KIND. Tribes DISCLAIMS ALL WARRANTIES, CONDITIONS,
            OR OTHER TERMS OF ANY KIND THAT THE SERVICES, ITS SERVERS OR ANY
            DATA (INCLUDING EMAIL) SENT FROM Tribes, ARE FREE OF VIRUSES OR
            OTHER HARMFUL COMPONENTS. TO THE MAXIMUM EXTENT PERMITTED UNDER
            APPLICABLE LAW, Tribes HEREBY DISCLAIMS ALL WARRANTIES AND
            CONDITIONS WITH REGARD TO THIS INFORMATION, SOFTWARE, PRODUCTS, AND
            THE SERVICES, INCLUDING ALL IMPLIED WARRANTIES AND CONDITIONS OR
            TERMS OF ANY KIND AS TO OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, QUIET POSSESSION AND NONINFRINGEMENT.
          </p>
          <p>
            Tribes ALSO EXPRESSLY DISCLAIM ANY WARRANTY, REPRESENTATION, OR
            OTHER TERM OF ANY KIND AS TO THE ACCURACY OR PROPRIETARY CHARACTER
            OF THE CONTENT AVAILABLE BY AND THROUGH THE SERVICES.
          </p>
          <p>
            THE THIRD PARTY SUPPLIERS PROVIDING ACCOMMODATIONS, FLIGHT, RENTALS,
            EXPERIENCES, RESTAURANTS, OR CRUISE INFORMATION, TRAVEL OR OTHER
            SERVICES ON OR THROUGH THE SERVICES ARE INDEPENDENT CONTRACTORS AND
            NOT AGENTS OR EMPLOYEES OF Tribes. Tribes IS NOT LIABLE FOR THE
            ACTS, ERRORS, OMISSIONS, REPRESENTATIONS, WARRANTIES, BREACHES OR
            NEGLIGENCE OF ANY SUCH SUPPLIERS OR FOR ANY PERSONAL INJURIES,
            DEATH, PROPERTY DAMAGE, OR OTHER DAMAGES OR EXPENSES RESULTING
            THEREFROM. Tribes HAS NO LIABILITY IN THE EVENT OF ANY DELAY,
            CANCELLATION, OVERBOOKING, STRIKE, FORCE MAJEURE OR OTHER CAUSES
            BEYOND ITS DIRECT CONTROL, AND IT HAS NO RESPONSIBILITY FOR ANY
            ADDITIONAL EXPENSE, OMISSIONS, DELAYS, RE-ROUTING OR ACTS OF ANY
            GOVERNMENT OR AUTHORITY.
          </p>
          <p>
            SUBJECT TO THE FOREGOING, YOU USE THE SERVICES AT YOUR OWN RISK AND
            IN NO EVENT SHALL Tribes (OR THEIR OFFICERS, DIRECTORS AND/OR
            EMPLOYEES) BE LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL,
            SPECIAL, OR CONSEQUENTIAL LOSSES OR DAMAGES OR ANY LOSS OF INCOME,
            PROFITS, GOODWILL, DATA, CONTRACTS, USE OF MONEY, OR LOSS OR DAMAGES
            ARISING FROM OR CONNECTED IN ANY WAY TO BUSINESS INTERRUPTION OF ANY
            TYPE ARISING OUT OF, OR IN ANY WAY CONNECTED WITH, YOUR ACCESS TO,
            DISPLAY OF OR USE OF THE SERVICES OR WITH THE DELAY OR INABILITY TO
            ACCESS, DISPLAY OR USE THE SERVICES (INCLUDING, BUT NOT LIMITED TO,
            YOUR RELIANCE UPON REVIEWS AND OPINIONS APPEARING ON OR THROUGH THE
            SERVICES; ANY VIRUSES, BUGS, TROJAN HORSES, INFORMATION, SOFTWARE,
            LINKED SITES, PRODUCTS, AND SERVICES OBTAINED THROUGH THE SERVICES
            (INCLUDING, BUT NOT LIMITED TO Tribe’s SYNCRONIZATION PRODUCT);
            PERSONAL INJURY OR PROPERTY DAMAGE, OF ANY NATURE WHATSOEVER,
            RESULTING FROM YOUR USE OF THE SERVICES’ SERVERS AND/OR ANY AND ALL
            PERSONAL INFORMATION AND/OR FINANCIAL INFORMATION STORED THEREIN;
            ANY ERRORS OR OMISSIONS IN ANY CONTENT OR FOR ANY LOSS OR DAMAGE OF
            ANY KIND INCURRED AS A RESULT OF THE USE OF ANY CONTENT; OR
            OTHERWISE ARISING OUT OF THE ACCESS TO, DISPLAY OF OR USE OF THE
            SERVICES) WHETHER BASED ON A THEORY OF NEGLIGENCE, CONTRACT, TORT,
            STRICT LIABILITY, OR OTHERWISE, AND EVEN IF Tribes OR ITS CORPORATE
            AFFILIATES HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
          </p>
          <p>
            The limitation of liability reflects the allocation of risk between
            the parties. The limitations specified in this section will survive
            and apply even if any limited remedy specified in these terms is
            found to have failed of its essential purpose. The limitations of
            liability provided in these terms inure to the benefit of Tribes.
          </p>
          <p>
            THESE TERMS AND CONDITIONS AND FOREGOING LIABILITY DISCLAIMER DO NOT
            AFFECT MANDATORY LEGAL RIGHTS THAT CANNOT BE EXCLUDED UNDER
            APPLICABLE LAW, FOR EXAMPLE UNDER CONSUMER PROTECTION LAWS IN PLACE
            IN CERTAIN COUNTRIES.
          </p>
          <p>
            IF THE LAW OF THE COUNTRY WHERE YOU LIVE DOES NOT ALLOW ANY
            PARTICULAR LIMITATION OR EXCLUSION OF LIABILITY PROVIDED FOR IN THIS
            CLAUSE, THAT LIMITATION WILL NOT APPLY. THE LIABILITY DISCLAIMER
            WILL OTHERWISE APPLY TO THE MAXIMUM EXTENT ALLOWED BY YOUR LOCAL
            LAW.
          </p>
          <br />
          <h2 className="underline font-bold">
            11. Copyright and trademarks regulations
          </h2>
          <br />
          <p>
            Tribes, our logo, and all other product or service names or slogans
            displayed on the Platform are registered and/or common law
            trademarks of Hello Travel Pte Ltd and/or its suppliers or
            licensors, and may not be copied, imitated or used, in whole or in
            part, without the prior written permission of Tribes or the
            applicable trademark holder. In addition, the look and feel of the
            Platform, including our websites, as well as all page headers,
            custom graphics, button icons and scripts related to same, is the
            service mark, trademark and/or trade dress of Tribes and may not be
            copied, imitated or used, in whole or in part, without the prior
            written permission of Tribes. All other trademarks, registered
            trademarks, product names and company names or logos mentioned on
            the Platform are the property of their respective owners. Except to
            the extent noted elsewhere in this Agreement, reference to any
            products, services, processes or other information, by trade name,
            trademark, manufacturer, supplier or otherwise does not constitute
            or imply endorsement, sponsorship or recommendation thereof by
            Tribes.
          </p>
          <br />
          <h2 className="underline font-bold">
            11. Modifications to the services; termination
          </h2>
          <br />
          <p>
            Tribes may change, add or delete these terms and conditions of this
            Agreement or any portion thereof from time to time in its sole
            discretion where we deem it necessary for legal, general regulatory
            and technical purposes, or due to changes in the Services provided
            or nature or layout of Services. Thereafter, you expressly agree to
            be bound by the terms and conditions of this Agreement as amended.
          </p>
          <p>
            Tribes may change, suspend or discontinue any aspect of the Platform
            at any time, including availability of any of the Services’
            features, databases or Content. Tribes may also impose limits or
            otherwise restrict your access to all or parts of the Platform
            without notice or liability for technical or security reasons, to
            prevent against unauthorised access, loss of, or destruction of data
            or where Tribes and/or its corporate affiliates consider(s) in
            its/their sole discretion that you are in breach of any provision of
            this Agreement or of any law or regulation and where Tribes and/or
            its corporate affiliates decide to discontinue providing any aspect
            of the Services.
          </p>
          <p>
            YOUR CONTINUED USE OF THE SERVICES NOW, OR FOLLOWING THE POSTING OF
            ANY SUCH NOTICE OF ANY CHANGES, WILL INDICATE ACCEPTANCE BY YOU OF
            SUCH MODIFICATIONS.
          </p>
          <p>
            Tribes may terminate this Agreement with you at any time, without
            advanced notice, where it believes in good faith that you have
            breached this Agreement or otherwise believes that termination is
            reasonably necessary to safeguard the rights of Tribes and/or others
            users of the Platform. That means that we may stop providing you
            with Services.
          </p>
        </div>
      </SectionLayout>
    </div>
  );
};

export default TermsConditionsPage;
