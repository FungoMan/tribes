import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { get } from "lodash";

import Break from "components/Break/Break";
import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import InforCard from "components/InforCard/InforCard";
import Popover from "components/Popover/Popover";
import SectionLayout from "components/SectionLayout/SectionLayout";
import { getAddItemsFields } from "constant";
import AddItems from "./AddItems/AddItems";
import ProductApi from "../../../services/product";
import Modal, { ModalFooter } from "../../Modal/Modal";
import { Categories } from "enums";
import Loader from "components/Loader/Loader";
import useGetRevision from "hooks/useGetRevision";
import {
  formatCardItemProps,
  formatSubmittedListingItem,
  isArray,
} from "utils";

import styles from "./TabContent.module.scss";
import UpgradePopup from "components/UpgradePopup/UpgradePopup";
interface ProductListingProps {
  isPaid: boolean;
}

enum ProductListingScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ProductListing = (props: ProductListingProps) => {
  const { isPaid } = props;

  const { query } = useRouter();
  const { listingSlug }: any = query;

  const {
    loading,
    revisionListing,
    isRevision,
    revisionId,
    setLoading,
    getRevisionId,
  } = useGetRevision(listingSlug);

  const [selectedItem, setSelectedItem] = useState<any[]>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteModalProductId, setDeleteModalProductId] = useState<number>(0);
  const [productList, setProductList] = useState<any>();
  const [screen, setScreen] = useState<ProductListingScreens>(
    ProductListingScreens.LIST
  );

  useEffect(() => {
    const getProductsByBizListingId = async () => {
      const productArray = get(revisionListing, "products");
      if (isArray(productArray)) {
        const listingArray = productArray.map((item) => {
          console.log("item", item);
          return {
            name: item.name,
            is_revision: isRevision,
            isPinned: item.is_pinned,
            parent_id: item.parent_id,
            price: item.price,
            id: item.id,
            description: item.description,
            images: item.images,
            imgUrl:
              get(item, "images[0]") ||
              require("public/images/default-avatar.svg"),
            discount: item.discount,
            tags: item.tags,
            currency: item.currency,
            discountUnit: item.discount_unit,
            websiteUrl: item.website_url,
            klookUrl: item.klook_url,
            isEdited: false,
          };
        });
        setProductList(listingArray);
      }
      setLoading(false);
    };

    getProductsByBizListingId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug, revisionListing, loading]);

  const submitProduct = async (products: any) => {
    const currentProductIds = isArray(revisionListing.products)
      ? revisionListing.products.map((item) => item.id)
      : [];

    const product = {
      ...products[0],
      discount_unit: get(products, "[0].discountUnit"),
      is_revision: isRevision,
      biz_listing_revision: isRevision
        ? revisionListing.id
        : await getRevisionId({ products: currentProductIds }),
    };

    const submitProductApi = product.isEdited
      ? ProductApi.updateProduct(product.id, product)
      : ProductApi.createProduct(product);

    submitProductApi
      .then((res) =>
        toast.success("Create product successfully!", { autoClose: 2000 })
      )
      .catch((err) => toast.error("Create product failed!"))
      .finally(() => setLoading(true));
  };

  const handleDelete = async () => {
    const newProductList = isArray(productList)
      ? productList.filter((product) => {
          return product.id !== deleteModalProductId;
        })
      : [];
    await ProductApi.deleteProduct(deleteModalProductId);
    setProductList(newProductList);
    setIsShowDeleteModal(false);
  };

  const handlePinToTop = async (e) => {
    await ProductApi.updateProduct(e.id, {
      is_pinned: !e.isPinned,
    })
      .then((res) => toast.success("Update successfully!", { autoClose: 1000 }))
      .catch((error) => toast.error("Update failed!"))
      .finally(() => setLoading(true));
  };

  const PopoverContent = ({ item }) => (
    <React.Fragment>
      <div
        onClick={() => {
          setSelectedItem([item]);
          setScreen(ProductListingScreens.EDIT);
        }}
      >
        Edit
      </div>
      <div
        className={styles.delete_action}
        onClick={() => {
          setDeleteModalProductId(item.id);
          setIsShowDeleteModal(true);
        }}
      >
        Delete
      </div>
    </React.Fragment>
  );

  if (loading) {
    return <Loader />;
  }

  return (
    <React.Fragment>
      <SectionLayout
        title="Product listing"
        className={styles.product_listing}
        containerClassName="w-full"
        show={screen === ProductListingScreens.LIST}
      >
        <div className={styles.tips_button}>
          <div className={styles.tips}>
            <strong>Tips:</strong> Click the pin icon to put 5 products on the
            top.
          </div>
          <div className="flex gap-2 flex-wrap">
            {!isPaid && Array.isArray(productList) && productList.length > 2 ? (
              <UpgradePopup>
                <Button text="Add new" width={200} />
              </UpgradePopup>
            ) : (
              <Button
                disabled={
                  !isPaid &&
                  Array.isArray(productList) &&
                  productList.length > 2
                }
                text="Add new"
                width={200}
                onClick={() => {
                  setSelectedItem([{}]);
                  setScreen(ProductListingScreens.ADD);
                }}
              />
            )}
          </div>
        </div>
        <Break />
        <div className={styles.product_container}>
          {productList &&
            productList.map((item: any) => (
              <div key={item.id} className={styles.info_card_container}>
                <InforCard {...formatCardItemProps(item)} />
                <div className={styles.toolbar}>
                  <Popover content={<PopoverContent item={item} />}>
                    <Icon icon="toolbar" color="white" />
                  </Popover>
                </div>
                <div
                  className={styles.pin}
                  onClick={() => handlePinToTop(item)}
                >
                  <Icon
                    icon="pin"
                    color={item.isPinned ? undefined : "white"}
                  />
                </div>
              </div>
            ))}
        </div>
        <Break />
      </SectionLayout>
      <SectionLayout
        show={screen !== ProductListingScreens.LIST}
        title={
          screen === ProductListingScreens.EDIT ? "Edit product" : "Add product"
        }
      >
        <AddItems
          isEdit={screen === ProductListingScreens.EDIT}
          isPaid={isPaid}
          itemList={selectedItem}
          placeholders={getAddItemsFields(Categories.BUY).placeholder}
          onCancel={() => setScreen(ProductListingScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ProductListingScreens.LIST);
            submitProduct(e);
          }}
        />
      </SectionLayout>
      <DeleteModal
        visible={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onSubmit={handleDelete}
      />
    </React.Fragment>
  );
};

const DeleteModal = (props) => {
  const { visible, onClose, onSubmit } = props;
  return (
    <Modal
      visible={visible}
      width={579}
      title="Delete Product?"
      onClose={onClose}
    >
      <div className="p-7">
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>You are about to delete this product.</p>
          <p>
            This action <span className="font-bold">cannot</span> be undone. Are
            you sure?
          </p>
        </div>
        <ModalFooter>
          <Button
            className="text-sm bg-transparent text-black border mr-2"
            text="Do not delete"
            onClick={onClose}
          />
          <Button className="text-sm" text="Delete" onClick={onSubmit} />
        </ModalFooter>
      </div>
    </Modal>
  );
};

export default ProductListing;
