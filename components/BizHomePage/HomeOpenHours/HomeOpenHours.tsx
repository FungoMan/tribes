import { useState } from "react"

import Modal from "components/Modal/Modal"
import Icon from "components/Icon/Icon"
import OpenHours, { IOpenHours } from "components/OpenHours/OpenHours"
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue"

interface OpenHoursProps {
  isViewPage?: boolean
  openHours: IOpenHours
  onSetOpenHours: (openHours: IOpenHours) => void
}

const HomeOpenHours = (props: OpenHoursProps) => {
  const { isViewPage, openHours = [], onSetOpenHours } = props
  const [showOpenHoursModal, setShowOpenHoursModal] = useState(false)
  const [localOpenHours, setLocalOpenHours] = useState(openHours)

  const handleCancel = () => {
    setLocalOpenHours(openHours)
    setShowOpenHoursModal(false)
  }

  const handleSubmit = (data) => {
    setShowOpenHoursModal(false)
    onSetOpenHours(data)
  }
  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="clock" />
          Opening hours
        </div>
        {!isViewPage && <a onClick={() => setShowOpenHoursModal(true)}>Add open hours</a>}
      </div>
      <br />
      <PreviewValue valueKey="openHours" value={openHours} />
      <Modal
        title="OpenHours"
        visible={showOpenHoursModal}
        width={700}
        mobilePosition="center"
        onClose={handleCancel}
      >
        <OpenHours data={openHours} onCancel={handleCancel} onSubmit={handleSubmit} />
      </Modal>
    </div>
  )
}

export default HomeOpenHours
