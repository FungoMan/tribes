import { Categories, CategoryText } from "./enums";
import { get } from "lodash";
import { IOption } from "type";
import moment from "moment";
import parseISO from "date-fns/parseISO";
import { locations, videoExtensions } from "constant";
import { useMediaQuery } from "usehooks-ts";

export const validateEmail = (emailAdress) => {
  let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailAdress.match(regexEmail) ? true : false
}


export const getListingUrl = (category, categoryLink, slug) => {
  let categorySlug = "category";
  if (category === "Buy") categorySlug = CategoryText.BUY;
  if (category === "Eat") categorySlug = CategoryText.EAT;
  if (category === "Transport") categorySlug = CategoryText.TRANSPORT;
  if (category === "Stay") categorySlug = CategoryText.STAY;
  if (category === "See & Do") categorySlug = CategoryText.SEE_AND_DO;

  if (categoryLink) {
    return `${categorySlug}/${categoryLink}/${slug}`;
  } else {
    return `${categorySlug}/sub-${categorySlug}/${slug}`;
  }
};

export const formatCardItemProps = (item) => ({
  title: get(item, "attributes.name") || item.name || item.title || "",
  price: get(item, "attributes.price") || item.price || "",
  discount: get(item, "attributes.discount") || item.discount,
  endDate:
    get(item, "attributes.endDate") ||
    (item.endDate && moment(item.endDate).format("YYYY/MM/DD")) ||
    (item.end_date && moment(item.end_date).format("YYYY/MM/DD")),
  startDate:
    get(item, "attributes.startDate") ||
    (item.startDate && moment(item.startDate).format("YYYY/MM/DD")) ||
    (item.start_date && moment(item.start_date).format("YYYY/MM/DD")),
  images: get(item, "attributes.images") || item.images || get(item, "attributes.menu_file") || item.menu_file,
  imgUrl:
    item.imgUrl ||
    get(item, "images.[0]") ||
    get(item, "attributes.images.[0]") ||
    get(item, "menu_file.[0]") ||
    require("public/images/default-thumbnail.png"),
  description: get(item, "attributes.description") || item.description,
  currency: (get(item, "attributes.currency") || item.currency)?.toUpperCase(),
  discountUnit:
    get(item, "attributes.discount_unit") ||
    item.discountUnit ||
    item.discount_unit,
  klookUrl: get(item, "attributes.klook_url") || item.klook_url || "",
  websiteUrl: get(item, "attributes.website_url") || item.website_url || "",
  termsConditions:
    get(item, "attributes.terms_conditions") ||
    item.termsConditions ||
    item.terms_conditions,
  rate: item.rate,
  rateNumber: item.rateNumber,
  followerNumber: item.followerNumber,
  categories: item.categories,
  categoryLinks: item.category_links,
  tags: item.tags,
  isVerified: item.isVerified,
});

export const getParentId = (item) => {
  return !item?.is_revision
    ? item?.id?.toString()
    : item?.parent_id
    ? item?.parent_id?.toString()
    : "";
};

export const formatSubmittedListingItem = (
  item,
  bizListingRevisionCreateId,
  bizListingId
) => ({
  id: item.id,
  biz_listing_revision: bizListingRevisionCreateId || bizListingId,
  name: item.name,
  description: item.description,
  price: item.price,
  currency: item.currency,
  discount: item.discount,
  discount_unit: item.discountUnit,
  tags: item.tags,
  images: item.images,
  website_url: item.websiteUrl,
  klook_url: item.klookUrl,
  is_revision: true,
  isEdited: item.isEdit,
});

export const formatSubmittedDeals = (
  item,
  bizListingRevisionCreateId,
  bizListing
) => ({
  biz_listing_revision: bizListingRevisionCreateId || bizListing?.id,
  end_date: moment(item.endDate).format("YYYY-MM-DD") + "T:00:00.000Z",
  name: item.name,
  description: item.description,
  images: item.images,
  start_date: new Date(),
  terms_conditions: item.termsConditions,
  is_revision: true,
  category: get(bizListing, "categories[0].id"),
});

export const formatDeals = (rawDeals) =>
  isArray(rawDeals)
    ? rawDeals.map((item) => ({
        id: item.id,
        is_revision: item.is_revision,
        parent_id: item.parent_id,
        name: item.name,
        images: item.images,
        imgUrl: get(item, "images[0]"),
        description: item.description,
        termsConditions: item.terms_conditions,
        startDate: moment(item.start_date).format("YYYY/MM/DD"),
        endDate: moment(item.end_date).format("YYYY/MM/DD"),
        isChange: false,
      }))
    : [];

export const formatMenu = (rawMenu) => {
  return isArray(rawMenu)
    ? rawMenu.map((item) => ({
        id: item.id,
        is_revision: item.is_revision,
        parent_id: item.parent_id,
        name: item.name,
        images: item.menu_file,
        imgUrl: item.menu_file[0],
        isChange: false,
      }))
    : [];
};

export const formatListingItems = (rawListingItems) =>
  rawListingItems.map((item) => ({
    name: item.name,
    is_revision: item.is_revision,
    parent_id: item.parent_id,
    price: item.price,
    id: item.id,
    description: item.description,
    images: item.images,
    imgUrl: get(item, "images[0]"),
    discount: item.discount,
    tags: item.tags,
    websiteUrl: item.website_url,
    klookUrl: item.klook_url,
    isEdited: false,
    currency: item.currency,
    discountUnit: item.discount_unit,
  }));

export const checkHasSocialLink = (bizListing) => {
  return bizListing.email ||
    bizListing.website ||
    get(bizListing, "social_info.twitter") ||
    get(bizListing, "social_info.facebook") ||
    get(bizListing, "social_info.instagram")
    ? true
    : false;
};

export const formatOptions = (list) =>
  Array.isArray(list)
    ? list.map((item: any) => ({
        label: item.label,
        value: item.value,
        id: item.id,
      }))
    : [];

export const detectIsVideo = (src: string | Blob) => {
  if (typeof src === "string") {
    return videoExtensions.some((item) => src?.includes(item));
  } else {
    // console.log(src.type);
  }
};

export const getIndex = (id, list) => {
  return isArray(list) ? list.findIndex((item) => item.id === id) : -1;
};

export const randomId = () => Math.floor(Math.random() * 10000000);

export const monthOfTwoYearsOptions = () => {
  const startDate = moment(new Date()).subtract(2, "year").subtract(1, "month");
  var startMonth = moment(startDate); //clone the startDate

  const now = moment(new Date());

  var dates: string[] = [];
  while (startMonth < now) {
    startMonth.add(1, "month");
    dates.push(startMonth.format("YYYY-MM"));
  }

  const monthsOfTwoYearsOptions = dates.map((item) => ({
    label: moment(item).format("MMMM YYYY"),
    value: item,
  }));
  return monthsOfTwoYearsOptions;
};

export const calcRateNumber = (reviewsData) => {
  let rateNumber = 0;
  if (reviewsData && reviewsData.length > 0) {
    let sum = 0;
    reviewsData.map((review) => {
      sum += get(review, "attributes.rating") || 0;
    });
    rateNumber = Math.ceil(sum / reviewsData.length);
  } else {
    rateNumber = 0;
  }
  return rateNumber;
};

export const removeZeroInPhoneNumber = (e) => {
  let phoneNumber = "";
  if (e.input?.[0] == 0) {
    phoneNumber = e?.select?.value + e?.input?.substr(1, e.input.length - 1);
  } else {
    phoneNumber = e?.select?.value + e?.input;
  }
  return phoneNumber;
};

export const formatSelectInputValue = (e: string, selectOptions: IOption[]) => {
  if (!e) {
    return;
  }
  const phoneCodeValueList = Object.values(
    selectOptions.map((item) => item.value)
  );
  const codeOptionIndex = phoneCodeValueList.findIndex((code) =>
    e.includes(code)
  );
  const selectValue = selectOptions[codeOptionIndex]?.value;
  const inputValue = e.substring(selectValue?.length);
  return { select: selectOptions[codeOptionIndex], input: inputValue };
};

export const numberVerify = (e) => {
  let phoneNumber = "";
  for (let index = 0; index < e.length; index++) {
    if (index < 10) {
      phoneNumber = phoneNumber + "*";
    } else {
      phoneNumber = phoneNumber + e[index];
    }
  }
  return phoneNumber;
};

export const getOptionsMappedFromResponse = (res) => {
  const rawArray = get(res, "data.data") || [];
  if (Array.isArray(rawArray)) {
    return rawArray.map((item) => ({
      value: item.id,
      label: get(item, "attributes.label"),
    }));
  }
};

export const calcDistanceFromNow = (time) => {
  const timeCalcDistance = parseISO(moment(time).format("YYYY-MM-DD HH:mm:ss"));
  let diff_in_minutes = moment().diff(moment(timeCalcDistance), "minutes");
  let diff_in_hours = Math.floor(diff_in_minutes / 60);
  let diff_in_days = Math.floor(diff_in_minutes / 1440);
  if (diff_in_hours < diff_in_minutes / 60) {
    diff_in_hours = diff_in_hours + 1;
  }
  if (diff_in_days < diff_in_minutes / 1440) {
    diff_in_days = diff_in_days + 1;
  }
  if (diff_in_minutes == 0) {
    return "few second ago";
  } else if (diff_in_minutes < 60 && diff_in_minutes == 1) {
    return "1 minute ago";
  } else if (diff_in_minutes < 60 && diff_in_minutes != 1) {
    return `${diff_in_minutes} minutes ago`;
  } else if (diff_in_hours < 24 && diff_in_hours == 1) {
    return "1 hour ago";
  } else if (diff_in_hours < 24 && diff_in_hours != 1) {
    return `${diff_in_hours} hours ago`;
  } else if (diff_in_days == 1) {
    return "1 day ago";
  } else {
    return `${diff_in_days} days ago`;
  }
};

export const formatListingArray = (rawListing) =>
  Array.isArray(rawListing)
    ? rawListing.map((item) => ({
        images: get(item, "images") || [],
        title: get(item, "name"),
        slug: get(item, "slug"),
        isVerified: get(item, "is_verified"),
        address: get(item, "address"),
        country: get(item, "country"),
        description: get(item, "description"),
        followerNumber: get(item, "user_listing_follows.length"),
        tags: get(item, "tags"),
        categories: get(item, "categories"),
        categoryLinks: get(item, "category_links") || [],
        price: get(item, "min_price") || "",
        currency: get(item, "currency") || "",
        rate: get(item, "rating"),
        rateNumber: get(item, "rate_number"),
      }))
    : [];

export const isArray = (item) => {
  return Array.isArray(item) && item.length > 0;
};

export const changeToSlugify = (str) => {
  return str
    .trim()
    .toLowerCase()
    .replace(" ", "-")
    .replace("'", "-")
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const isPaidUser = (time) => {
  if (!time) return false;
  const timeCalcDistance = parseISO(moment(time).format("YYYY-MM-DD HH:mm:ss"));
  let diff_in_minutes = moment().diff(moment(timeCalcDistance), "minutes");
  return diff_in_minutes < 0 ? true : false;
};

export const censoredPhoneNumber = (phoneNumber) => {
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const phoneArray = phoneNumber ? phoneNumber.split("") : [];

  for (let i = 2; i < phoneArray.length - 4; i++) {
    if (numbers.includes(phoneArray[i].toString())) {
      phoneArray[i] = "X";
    }
  }

  return phoneArray.join("");
};

export const getBrowserLocation = async () => {
  const locationData = await fetch(
    "https://www.cloudflare.com/cdn-cgi/trace"
  ).then((res) => res.text());

  if (!locationData.trim()) {
    return;
  }

  let data = locationData.replace(/[\r\n]+/g, '","').replace(/\=+/g, '":"');
  data = '{"' + data.slice(0, data.lastIndexOf('","')) + '"}';
  var userLocation = JSON.parse(data).loc?.toLowerCase();
  const locationOption = locations.find(
    (country) => country.code === userLocation
  );

  return locationOption?.value;
};

export const isEmptyObject = (item: any) => {
  const arrayValues = Object.values(item);
  for (let index = 0; index < arrayValues.length; index++) {
    const element = arrayValues[index];
    if (Array.isArray(element)) {
      if (isArray(element)) {
        return true;
      }
    } else {
      if (element !== null) return true;
    }
  }
  return false;
};

export const formatBizlistingArray = (rawListing) =>
  Array.isArray(rawListing)
    ? rawListing.map((item) => ({
        id: item.id,
        images: get(item, "attributes.images") || [],
        title: get(item, "attributes.name"),
        slug: get(item, "attributes.slug"),
        isVerified: get(item, "attributes.is_verified"),
        address: get(item, "attributes.address"),
        country: get(item, "attributes.country"),
        description: get(item, "attributes.description"),
        followerNumber: get(
          item,
          "attributes.user_listing_follows.data.length"
        ),
        tags: arrayLabeltags(get(item, "attributes.tags.data")),
        categories: arrayLabelCategory(get(item, "attributes.categories.data")),
        categoryLinks: get(item, "attributes.category_links.data"),
        price: get(item, "attributes.min_price") || "",
        currency: get(item, "attributes.currency") || "",
        rate: get(item, "attributes.rating"),
        rateNumber: get(item, "attributes.tags.data.length"),
      }))
    : [];

export const formatBanner = (rawBanner) =>
  Array.isArray(rawBanner)
    ? rawBanner.map((item) => ({
        imgUrl: get(item, "attributes.image.data.attributes.url"),
        linkActive: get(item, "attributes.link_active"),
      }))
    : [];

export const formatCollections = (rawCollections) =>
  Array.isArray(rawCollections)
    ? rawCollections.map((item) => ({
        imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
        slug: get(item, "attributes.slug"),
        title: get(item, "attributes.name"),
      }))
    : [];

export const formatArticle = (rawArticle) =>
  Array.isArray(rawArticle)
    ? rawArticle.map((item) => ({
        title: get(item, "attributes.name"),
        imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
        time: get(item, "attributes.createdAt"),
        slug: get(item, "attributes.slug"),
        content: get(item, "attributes.content"),
      }))
    : [];

export const formatArticleDetails = (rawArticle) =>
  Array.isArray(rawArticle)
    ? rawArticle.map((item) => ({
        title: get(item, "attributes.name"),
        imgUrl: get(item, "attributes.thumbnail.data.attributes.url"),
        time: get(item, "attributes.createdAt"),
        slug: get(item, "attributes.slug"),
        content: get(item, "attributes.content"),
        bizlisting:
          formatBizlistingArray(get(item, "attributes.biz_listings.data")) ||
          [],
        relatedArticles:
          formatArticle(get(item, "attributes.related_articles.data")) || [],
      }))
    : [];

export const formatCategoryLink = (rawCategoryLink) =>
  Array.isArray(rawCategoryLink)
    ? rawCategoryLink.map((item) => ({
        icon: get(item, "attributes.logo.data.attributes.url") || null,
        label: get(item, "attributes.label"),
        value: get(item, "attributes.value"),
        slug: get(item, "attributes.value"),
      }))
    : [];

export const formatArraySlugCategoryLink = (rawCategoryLink) =>
  Array.isArray(rawCategoryLink)
    ? rawCategoryLink.map((item) => get(item, "attributes.value") || get(item, "value"))
    : [];

export const formatArraySlugProductTypes = (rawProductTypes) =>
  Array.isArray(rawProductTypes)  
    ? rawProductTypes.map((item)   => get(item, "attributes.value") || get(item, "value"))
    : []; 

export const formatArrayImages = (rawImages) => 
  isArray(rawImages) ? rawImages.map((item) => (get(item, 'attributes.url') || require("public/images/default-thumbnail.png"))) : [];

export const arrayLabeltags = (rawTag) =>
  Array.isArray(rawTag)
    ? rawTag.map((item) => get(item, "attributes.label"))
    : [];

export const arrayLabelCategory = (rawCategory) =>
  Array.isArray(rawCategory)
    ? rawCategory.map((item) => get(item, "attributes.name"))
    : [];

export const calcProgressuser = (user: any) => {
  let step = 0;
  if (user.first_name && user.last_name) step = step + 1;
  if (user.birthday) step = step + 1;
  if (user.phone_number) step = step + 1;
  if (user.gender) step = step + 1;
  if (user.email) step = step + 1;
  if (user.educate_level) step = step + 1;
  if (user.industry) step = step + 1;
  if (user.display_name) step = step + 1;
  if (get(user, 'category_links.length') > 0) step = step + 1;
  return step;
}

export const formatUserContentPreferences = (items) => {
  let value = "";
  if (isArray(items)) {
    for (let index = 0; index < items.length; index++) {
      value = value + `${items[index].label}`;
      if (index !== items.length - 1) {
        value = value + ', ';
      }
    }
  }
  return value;
}