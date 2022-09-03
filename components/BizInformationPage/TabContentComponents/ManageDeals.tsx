import React, { useEffect, useState } from "react";
import get from "lodash/get";
import { useRouter } from "next/router";
import { isArray } from "lodash";
import { toast } from "react-toastify";
import moment from "moment";

import Button from "components/Button/Button";
import Icon from "components/Icon/Icon";
import Popover from "components/Popover/Popover";
import Question from "components/Question/Question";
import SectionLayout from "components/SectionLayout/SectionLayout";
import Table, { IColumn } from "components/Table/Table";
import AddDeals from "./AddDeal/AddDeals";
import DealApi from "services/deal";
import Modal, { ModalFooter } from "../../Modal/Modal";
import useGetRevision from "hooks/useGetRevision";

import styles from "./TabContent.module.scss";
import DealDetailModal from "components/DealDetailModal/DealDetailModal";
import { formatDeals } from "utils";

interface ManageDealProps {
  bizListingId?: number | string;
}

enum ManageDealsScreens {
  LIST = "list",
  ADD = "add",
  EDIT = "edit",
}

const ManageDeals = (props: ManageDealProps) => {
  const { bizListingId } = props;

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

  const [showDealDetailModal, setShowDealDetailModal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState<any>({});
  const [screen, setScreen] = useState<ManageDealsScreens>(
    ManageDealsScreens.LIST
  );
  const [activeDealList, setActiveDealList] = useState<any[]>([]);
  const [pastDealList, setPastDealList] = useState<any>([]);
  const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [deleteModalDealId, setDeleteModalDealId] = useState<number>(0);

  const getDealsByBizListingId = async () => {
    const currentDate = new Date();
    const activeDeals: any = [];
    const pastDeals: any = [];
    const dealList = get(revisionListing, "deals");
    const formattedDeals = formatDeals(dealList);

    Array.isArray(formattedDeals) &&
      formattedDeals.forEach((deal: any) => {
        const startDate =
          get(deal, "startDate") && new Date(get(deal, "startDate"));

        const endDate = get(deal, "endDate") && new Date(get(deal, "endDate"));
        if (startDate <= currentDate && currentDate <= endDate) {
          activeDeals.push(deal);
        } else {
          pastDeals.push(deal);
        }
      });

    setLoading(false);
    setActiveDealList(activeDeals);
    setPastDealList(pastDeals);
  };

  useEffect(() => {
    getDealsByBizListingId();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingSlug, revisionListing, loading]);

  const submitDeal = async (deals) => {
    const currentDealIds = isArray(revisionListing.deals)
      ? revisionListing.deals.map((item) => item.id)
      : [];

    const deal = {
      ...deals[0],
      end_date:
        moment(get(deals, "[0].endDate")).format("YYYY-MM-DD") + "T:00:00.000Z",
      terms_condistions: get(deals, "[0].termsConditions"),
      is_revision: isRevision,
      biz_listing_revision: isRevision
        ? revisionListing.id
        : await getRevisionId({ products: currentDealIds }),
    };

    const submitDealApi = deal.isEdited
      ? DealApi.updateDeal(deal.id, deal)
      : DealApi.createDeal(deal);

    submitDealApi
      .then((res) => {
        toast.success("Create deal successfully!", { autoClose: 2000 });
        setScreen(ManageDealsScreens.LIST);
      })
      .catch((err) => toast.error("Create deal failed!"))
      .finally(() => setLoading(true));
  };

  const handleDelete = async () => {
    await DealApi.deleteDeal(deleteModalDealId)
      .then((res) => {
        setIsShowDeleteModal(false);
        toast.success("Delete deal successfully!", { autoClose: 2000 });
      })
      .catch((error) => toast.error("Delete deal failed!"))
      .finally(() => {
        setLoading(true);
      });
  };

  const handlePinToTop = async (e) => {
    await DealApi.updateDeal(e.id, {
      is_pinned: !e.isPinned,
    })
      .then((res) => toast.success("Update successfully!", { autoClose: 1000 }))
      .catch((error) => toast.error("Update failed!"))
      .finally(() => setLoading(true));
  };

  const activeDealColumns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div
          className={styles.table_deal_name}
          onClick={() => {
            setSelectedDeal(item);
            setShowDealDetailModal(true);
          }}
        >
          <div className={styles.name}>{get(item, "name")}</div>
          <div className={styles.deal_information}>
            {get(item, "description")}
          </div>
        </div>
      ),
      width: "45%",
    },
    {
      key: "date",
      title: "DATE",
      render: (item: any) => {
        return moment(item.endDate || "").format("YYYY/MM/DD");
      },
      width: "30%",
    },
    {
      key: "clicks",
      title: "CLICKS",
      render: (item: any) => (
        <div className={styles.click}>{get(item, "click_counts") || 0}</div>
      ),
      width: "10%",
      textAlign: "right",
    },
    {
      key: "action",
      title: "ACTIONS",
      textAlign: "center",
      render: (item: any) => <TableAction pin item={item} />,
      width: "10%",
    },
  ];

  const pastDealColumns: IColumn[] = [
    {
      key: "name",
      title: "DEALS",
      render: (item: any) => (
        <div
          className={styles.table_deal_name}
          onClick={() => {
            setSelectedDeal(item);
            setShowDealDetailModal(true);
          }}
        >
          <div className={styles.name}>{get(item, "name")}</div>
          <div className={styles.deal_information}>
            {get(item, "description")}
          </div>
        </div>
      ),
      width: "45%",
    },
    {
      key: "date",
      title: "DATE",
      render: () => <span className="text-gray-500">Ended</span>,
      width: "30%",
    },
    {
      key: "clicks",
      title: "CLICKS",
      render: (item: any) => (
        <div className={styles.click}>{get(item, "click_counts") || 0}</div>
      ),
      width: "10%",
      textAlign: "right",
    },
    {
      key: "action",
      title: "ACTIONS",
      textAlign: "right",
      render: (item: any) => <TableAction item={item} />,
      width: "10%",
    },
  ];

  const TableAction = (props) => {
    const { item, pin } = props;
    const content = (
      <React.Fragment>
        <div
          onClick={() => {
            setSelectedDeal(item);
            setScreen(ManageDealsScreens.EDIT);
          }}
        >
          Edit deal
        </div>
        <div
          className={styles.delete_action}
          onClick={() => {
            setDeleteModalDealId(item.id);
            setIsShowDeleteModal(true);
          }}
        >
          Delete deal
        </div>
      </React.Fragment>
    );
    return (
      <div className="flex gap-1 w-100 justify-end">
        {pin && (
          <div className={styles.pin} onClick={() => handlePinToTop(item)}>
            <Icon
              icon="pin"
              color={get(item, "is_pinned") ? undefined : "gray"}
            />
          </div>
        )}
        <Popover content={content} position="bottom-left">
          <Icon icon="toolbar" />
        </Popover>
      </div>
    );
  };

  return (
    <React.Fragment>
      <SectionLayout
        title="Manage deals"
        className={styles.manage_deals}
        containerClassName="w-full"
        show={screen === ManageDealsScreens.LIST}
      >
        <div className={styles.tips_button}>
          <div className={styles.tips}>
            <strong>Tips:</strong> Click the pin icon to put 5 deals on the top.
          </div>
          <Button
            text="Create deal"
            width={200}
            onClick={() => {
              setSelectedDeal({});
              setScreen(ManageDealsScreens.ADD);
            }}
          />
        </div>
        <Question
          question={`Active deals (${
            Array.isArray(activeDealList) ? activeDealList.length : 0
          })`}
        >
          <Table columns={activeDealColumns} data={activeDealList} />
        </Question>

        <Question
          question={`Past deals (${
            Array.isArray(pastDealList) ? pastDealList.length : 0
          })`}
        >
          <Table columns={pastDealColumns} data={pastDealList} />
        </Question>
      </SectionLayout>
      <SectionLayout
        show={screen !== ManageDealsScreens.LIST}
        title={screen === ManageDealsScreens.EDIT ? "Edit deal" : "Add deal"}
      >
        <AddDeals
          isEdit={screen === ManageDealsScreens.EDIT}
          isPaid={true}
          dealList={[selectedDeal]}
          onCancel={() => setScreen(ManageDealsScreens.LIST)}
          onSubmit={(e) => {
            setScreen(ManageDealsScreens.LIST);
            submitDeal(e);
          }}
        />
      </SectionLayout>
      <DeleteModal
        visible={isShowDeleteModal}
        onClose={() => setIsShowDeleteModal(false)}
        onSubmit={handleDelete}
      />
      <DealDetailModal
        data={{
          ...selectedDeal,
        }}
        visible={showDealDetailModal}
        onClose={() => setShowDealDetailModal(false)}
      />
    </React.Fragment>
  );
};

const DeleteModal = (props) => {
  const { visible, onClose, onSubmit } = props;
  return (
    <Modal visible={visible} width={579} title="Delete deal?" onClose={onClose}>
      <div className="p-7">
        <div className="text-sm max-w-sm mx-auto text-center mb-7">
          <p>You are about to delete this deal.</p>
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

export default ManageDeals;
