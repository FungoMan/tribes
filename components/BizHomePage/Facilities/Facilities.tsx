import React, { useState } from "react";

import Modal from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import Button from "components/Button/Button";
import { fakeSubCateList } from "constant";
import AddEatInfor from "components/AddListingPages/PageThree/AddInforSections/AddEatInfor";
import { IAddListingForm } from "pages/add-listing";
import { Categories } from "enums";
import AddStayInfor from "components/AddListingPages/PageThree/AddInforSections/AddStayInfor";
import _, { get, random } from "lodash";
import { randomId } from "utils";

interface FacilitiesProps {
  category: Categories;
  isViewPage?: boolean;
  facilities: any;
  onSetFacilities: (data: any) => void;
}

const Facilities = (props: FacilitiesProps) => {
  const { category, isViewPage, facilities, onSetFacilities } = props;
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false);

  const showNumber = 6;

  //flat all facilities into array of string
  const facilityArray: string[] | undefined | any = facilities
    ? Object.values(facilities).flat()
    : [];

  //remove null, undefined, blank items
  const filteredArray = _.filter(facilityArray, Boolean)?.slice(0, showNumber);
  const showMoreButton = get(facilityArray, "length") > showNumber;

  const HomepageViewFacilities = () => {
    const facilityClassName =
      "flex gap-2 items-center px-3 w-full md:w-1/2 lg:w-1/3";
    return (
      <React.Fragment>
        {filteredArray.map((item) => (
          <FacilityItem key={item} item={item} className={facilityClassName} />
        ))}
      </React.Fragment>
    );
  };

  const FacilityItem = ({ item, className }) =>
    typeof item === "string" ? (
      <div key={item} className={className}>
        <Icon icon="checked-circle" size={14} />
        {item}
      </div>
    ) : null;

  const getFacilityDepartmentLabel = (facilitySlug: string) => {
    const facilityObject = {
      atmosphere: "Describe this place’s atmosphere:",
      additionalServices: "Additional features/ services that are available:",
      paryerFacilities: "Prayer facilities available:",
      foodOptionsRamadan: "Food options available during Ramadan:",
      nonHalalActivities: "Non-Halal activities in the hotel:",
      mealsKind: "Kind of meals does this place serve:",
      parking: "Parking available nearby:",
      payment: "Type of payment method is available:",
    };
    return facilityObject[facilitySlug];
  };

  const ModalViewFacilities = () => {
    const facilityClassName =
      "flex gap-2 items-center px-3 w-full md:w-1/2 lg:w-1/3";
    const facilityDepartments = facilities ? Object.keys(facilities) : [];
    return (
      <div className="px-[30px] pb-[30px]">
        {facilityDepartments.map((item) => {
          const facilitiesStringArray: string[] =
            facilities && facilities?.[item];
          if (
            Array.isArray(facilitiesStringArray) &&
            facilitiesStringArray.every((item) => !item)
          ) {
            return null;
          }

          return (
            <div key={item} className="mt-3">
              <strong>{getFacilityDepartmentLabel(item)}</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {Array.isArray(facilitiesStringArray) ? (
                  facilitiesStringArray.map(
                    (item) =>
                      item && (
                        <FacilityItem
                          key={randomId()}
                          item={item}
                          className={facilityClassName}
                        />
                      )
                  )
                ) : (
                  <FacilityItem
                    key={randomId()}
                    item={item}
                    className={facilityClassName}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const EditFacilities = ({ onSetFacilities }) => {
    let result = <div />;
    switch (category) {
      case Categories.EAT:
        result = (
          <AddEatInfor
            isEdit
            facilityMode
            data={facilities}
            onEdit={(data) => onSetFacilities?.(data)}
          />
        );
        break;
      case Categories.STAY:
        result = (
          <AddStayInfor
            isEdit
            facilityMode
            data={facilities}
            onEdit={(data) => onSetFacilities?.(data)}
          />
        );
        break;
    }
    return result;
  };

  const handleOpenFacilitiesModal = () => setShowFacilitiesModal(true);
  const handleCloseFacilitiesModal = () => setShowFacilitiesModal(false);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="like-color" />
          Facilities
        </div>
        {!isViewPage && (
          <a onClick={handleOpenFacilitiesModal}>Add facilities</a>
        )}
      </div>
      <div className="flex flex-wrap mt-5 gap-y-5">
        <HomepageViewFacilities />
      </div>
      {isViewPage && showMoreButton && (
        <Button
          className="mt-3"
          variant="secondary"
          text="See all facilities"
          width={250}
          onClick={handleOpenFacilitiesModal}
        />
      )}
      <Modal
        title="Facilities"
        visible={showFacilitiesModal}
        width={800}
        mobileFullHeight
        onClose={handleCloseFacilitiesModal}
      >
        {isViewPage ? (
          <ModalViewFacilities />
        ) : (
          <EditFacilities
            onSetFacilities={(data) => {
              onSetFacilities(data);
              handleCloseFacilitiesModal();
            }}
          />
        )}
      </Modal>
    </div>
  );
};

export default Facilities;
