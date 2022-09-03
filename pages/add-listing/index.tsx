import Image from "next/image";
import get from "lodash/get";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import map from "lodash/map";

import AddListingPageOne from "components/AddListingPages/PageOne/AddListingPageOne";
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor";
import AddListingPageTwo from "components/AddListingPages/PageTwo/AddListingPageTwo";
import Button from "components/Button/Button";
import Modal from "components/Modal/Modal";
import { Categories, ClaimStep, YesNo } from "enums";
import AddBuyInfor from "components/AddListingPages/PageThree/AddInforSections/AddBuyInfor";
import AddSeeAndDoInfor from "components/AddListingPages/PageThree/AddInforSections/AddSeeAndDoInfor";
import AddStayInfor from "components/AddListingPages/PageThree/AddInforSections/AddStayInfor";
import AddTransportInfor from "components/AddListingPages/PageThree/AddInforSections/AddTransportInfor";
import { IOpenHours } from "components/OpenHours/OpenHours";
import styles from "styles/AddListing.module.scss";
import { defaultAddlistingForm, fakeSubCateList, previewInfo } from "constant";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";
import BizListingApi from "../../services/biz-listing";
import BizListingRevisionApi from "services/biz-listing-revision";
import ContributeApi from "services/contribute";
import { UserInforContext } from "Context/UserInforContext";
import Head from "next/head";

export interface IAddListingForm {
  id?: number;
  name?: string;
  category: Categories;
  categoryLinks?: string;
  relationship: string;
  listing: string;
  role: string;
  isOpen: string;
  openDate: string;
  businessName: string;
  description: string;
  isOnline: string;
  city: string;
  country: string;
  address: string;
  additionalAddress: string;
  contact: string;
  email: string;
  socialMedia: string;
  typeMedia?: any;
  currency?: { label: string; value: string };
  minPrice: string;
  maxPrice: string;

  describePlace?: any[];

  foodOptions?: any[];
  paryerFacilities?: any[];
  foodOptionsRamadan?: any[];
  nonHalalActivities?: any[];

  images?: string[];
  productBrands?: any[];
  mealsKind?: any[];
  openHours?: IOpenHours;
  payment?: any[];
  additionalServices?: any[];
  media?: any[];
  agreePolicies: string;
  productTypes?: any[];
  atmosphere?: any[];
  parking?: any[];
  describeTags?: any[];

  categoryKind?: string;
  tags?: any[];
  placeGoodFor?: string[];
  expiration_date?: any;
}

const AddListing = () => {
  const { user, updateUser } = useContext(UserInforContext);

  const [pageNumber, setPageNumber] = useState(1); // TODO: remove
  const [formData, setFormData] = useState(defaultAddlistingForm);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [showSubmitResult, setShowSubmitResult] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [metaTitle, setMetaTitle] = useState(
    "Create a Listing | Tribes by HHWT"
  );
  const [metaDescription, setMetaDescription] = useState(
    "Know a place that's not listed? Share it with the community!"
  );

  const router = useRouter();

  useEffect(() => {
    //call api
  }, []);

  const handlePrevPage = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const handleUpdateFormData = (data) => {
    setFormData({ ...formData, ...data });
  };

  const handleSubmitFormData = async () => {
    setIsLoading(true);
    let userInfo = JSON.parse(localStorage.getItem("user") || "{}");
    ///do CRUD things here
    let address = "Online Business";
    if (!formData.isOnline) {
      address = ` ${formData.additionalAddress} - ${formData.address} - ${formData.city} - ${formData.country}`;
    }
    let socialType: any = {};
    switch (formData.typeMedia) {
      case "facebook":
        socialType.facebook = formData.socialMedia;
        break;
      case "instagram":
        socialType.instagram = formData.socialMedia;
        break;
      case "twitter":
        socialType.twitter = formData.socialMedia;
        break;
      default:
        break;
    }
    let dataSend: any = {
      user: userInfo.id,
      is_verified: false,
      is_online_store: !!formData.isOnline,
      categories: [formData.category],
      name: formData.businessName,
      description: formData.description,
      address,
      country: formData.country,
      phone_number: formData.contact,
      email: formData.email === "" ? null : formData.email,
      // price_range: {
      //   currency: formData.currency?.value,
      //   min: formData.minPrice,
      //   max: formData.maxPrice,
      // },
      min_price: isNaN(parseFloat(formData.minPrice))
        ? 0
        : parseFloat(formData.minPrice),
      max_price: isNaN(parseFloat(formData.maxPrice))
        ? 0
        : parseFloat(formData.maxPrice),
      currency: get(formData, "currency.value") || null,
      images: formData.images,
      open_hours: formData.openHours,
      category_links: formData.categoryLinks,
      product_types:
        formData.category === Categories.BUY
          ? formData.productTypes
          : map(formData.productTypes, "value"),
      product_brands:
        formData.category === Categories.BUY
          ? map(formData.productBrands, "value")
          : null,
      tags: formData.describeTags || [],
      facilities_data: {
        additionalServices: formData.additionalServices,
        atmosphere: formData.atmosphere,
        foodOptions: formData.foodOptions,
        foodOptionsRamadan: formData.foodOptionsRamadan,
        mealsKind: formData.mealsKind,
        nonHalalActivities: formData.nonHalalActivities,
        parking: formData.parking,
        paryerFacilities: formData.paryerFacilities,
        payment: formData.payment,
        placeGoodFor: formData.placeGoodFor,
      },
      social_info: socialType,
      is_accepted: false,
    };
    // get(dataSend, `social_info[${formData.typeMedia}]`, formData.socialMedia)
    const role = get(formData, "role.label");
    let result;
    let dataSendContribute: any = {
      user: userInfo.id,
      type: "Create listing",
    };
    if (role) {
      result = await BizListingApi.createBizListing(dataSend);
      dataSendContribute = {
        ...dataSendContribute,
        biz_listing: get(result, "data.data.id"),
        status: "Approved",
      };
      await BizListingApi.createListingRole({
        bizListingId: get(result, "data.data.id"),
        name: get(formData, "role.label"),
      });
    } else {
      result = await BizListingRevisionApi.createBizListingRevision(dataSend);
      dataSendContribute = {
        ...dataSendContribute,
        biz_listing_revision: get(result, "data.data.id"),
        status: "Pending",
      };
      await BizListingRevisionApi.createListingRoleRevison({
        bizListingId: get(result, "data.data.id"),
        name: get(formData, "role.label"),
      });
    }
    await ContributeApi.createContribute(dataSendContribute);
    userInfo = {
      ...userInfo,
      pay_price: "300",
      biz_id: get(result, "data.data.id"),
      biz_slug: get(result, "data.data.attributes.slug"),
      role: get(formData, "role.label"),
      type_handle: "Create",
    };
    localStorage.setItem("user", JSON.stringify(userInfo));
    // const random = Math.floor(Math.random() * 10000)
    if (formData.relationship === YesNo.NO) {
      setShowSubmitResult(true);
    } else {
      const listingId = result.data?.data?.id;
      router.push({
        pathname: `/claim/${listingId}`,
        query: { firstStep: ClaimStep.CHOOSE_TIER },
      });
    }
  };

  const handlePreview = (data) => {
    setFormData({ ...formData, ...data });
    setShowPreviewModal(true);
  };

  return (
    <div className={styles.add_listing}>
      <Head>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
      </Head>
      <AddListingPageOne
        show={pageNumber === 1}
        onUpdateFormData={handleUpdateFormData}
        onNextPage={handleNextPage}
      />
      <AddListingPageTwo
        data={formData}
        show={pageNumber === 2}
        onPrevPage={handlePrevPage}
        onNextPage={handleNextPage}
        onUpdateFormData={handleUpdateFormData}
      />
      {/* page three */}
      <div className="page-three">
        <AddBuyInfor
          subCateList={fakeSubCateList}
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.BUY}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddEatInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.EAT}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddSeeAndDoInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.SEE_AND_DO}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddStayInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.STAY}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
        <AddTransportInfor
          data={formData}
          show={pageNumber === 3 && formData.category === Categories.TRANSPORT}
          onPrevPage={handlePrevPage}
          onPreview={handlePreview}
        />
      </div>
      <Modal
        visible={showPreviewModal}
        title="Does everything look correct?"
        subTitle="Please review this information before submitting!"
        width={780}
        mobileFullHeight
        onClose={() => setShowPreviewModal(false)}
      >
        <div className="px-[30px] gap-6 flex flex-col">
          {previewInfo.map((row) => {
            return (
              <div key={row.question} className="flex gap-10 sm:gap-20">
                <div className="flex flex-wrap w-1/5 ">{row.question}</div>
                <div className="w-4/5 sm:w-2/5">
                  <PreviewValue
                    valueKey={row.valueKey}
                    value={get(formData, row.valueKey)}
                  />
                </div>
              </div>
            );
          })}
          <div className="flex justify-end md:py-3 pb-10">
            <Button
              text="Cancel"
              size="small"
              variant="underlined"
              width="fit-content"
              onClick={() => setShowPreviewModal(false)}
            />
            <Button
              isLoading={isLoading}
              text="Continue"
              size="small"
              width={270}
              onClick={handleSubmitFormData}
            />
          </div>
        </div>
      </Modal>
      <Modal visible={showSubmitResult} width={350} mobilePosition="center">
        <div className="p-5 flex flex-col items-center">
          <Image
            src={require("public/images/success-submit.svg")}
            width={100}
            height={100}
            alt="result-alt"
          />
          <div>
            <strong>Thank you</strong>
          </div>
          <p className="text-center">
            Thank you for your contribution. Your submission is currently under
            review and will be up in no time!
          </p>
          <Button
            className="mt-5"
            text="Continue"
            size="small"
            width={270}
            onClick={() => router.push("/")}
          />
        </div>
      </Modal>
    </div>
  );
};

export default AddListing;
