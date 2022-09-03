import { useState } from "react"

import Button from "components/Button/Button"
import Input from "components/Input/Input"
import Modal from "components/Modal/Modal"
import Heading from "../../Heading/Heading"

interface DetailsProps {
  isViewPage?: boolean
  description: string
  onSetDescription: (description: string) => void
}

const Details = (props: DetailsProps) => {
  const { isViewPage, description, onSetDescription } = props
  const [showDescriptionModal, setShowDescriptionModal] = useState(false)
  const [localDescription, setLocalDescription] = useState(description)

  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading text="Details" />
        {!isViewPage && <a onClick={() => setShowDescriptionModal(true)}>Add description</a>}
      </div>
      <p className="text-left mt-[10px]">{description}</p>
      <Modal
        title="Details"
        visible={showDescriptionModal}
        width={500}
        mobilePosition="center"
        onClose={() => {
          setLocalDescription(description)
          setShowDescriptionModal(false)
        }}
      >
        <div className="px-[10px] sm:px-[30px] py-5">
          <Input
            placeholder="Description of property (optional)"
            onChange={(e: any) => setLocalDescription(e.target.value)}
            value={localDescription}
          />
          <br />
          <Button
            text="Submit"
            size="small"
            onClick={() => {
              onSetDescription(localDescription)
              setShowDescriptionModal(false)
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

export default Details
