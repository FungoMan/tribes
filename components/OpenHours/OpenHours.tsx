import Break from "components/Break/Break"
import Button from "components/Button/Button"
import Checkbox from "components/Checkbox/Checkbox"
import Icon from "components/Icon/Icon"
import Input from "components/Input/Input"
import Heading from "components/Heading/Heading"
import React, { useState } from "react"
import { randomId } from "utils"
import styles from "./OpenHours.module.scss"

export interface IOpenHour {
  id: string | number
  from?: string
  to?: string
}

export interface IOpenDay {
  name: string
  twentyFourHours: boolean
  openHours: IOpenHour[]
}

export type IOpenHours = IOpenDay[]

const defaultOpenDays: IOpenHours = [
  { name: "Monday", twentyFourHours: false, openHours: [] },
  { name: "Tuesday", twentyFourHours: false, openHours: [] },
  {
    name: "Wednesday",
    twentyFourHours: false,
    openHours: [],
  },
  {
    name: "Thursday",
    twentyFourHours: false,
    openHours: [],
  },
  { name: "Friday", twentyFourHours: false, openHours: [] },
  {
    name: "Saturday",
    twentyFourHours: false,
    openHours: [],
  },
  { name: "Sunday", twentyFourHours: false, openHours: [] },
]

export interface OpeningHoursProps {
  data: IOpenHours
  onCancel?: () => void
  onSubmit: (openHours: IOpenHours) => void
}

const getIndex = (value, list) => {
  return Array.isArray(list)
    ? list.findIndex((item) => item.name === value || item.id === value)
    : -1
}

const OpenHours = (props: OpeningHoursProps) => {
  const { data, onSubmit, onCancel } = props
  const [openHours, setOpeningHours] = useState(
    Array.isArray(data) && data.length > 0 ? data : defaultOpenDays
  )

  const handleCheckAllDay = (dayName: string, value: boolean) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openHours]
    subOpeningHours[index].twentyFourHours = value
    setOpeningHours(subOpeningHours)
  }

  const handleAddNewHours = (dayName: string) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openHours]
    subOpeningHours[index].openHours.push({ id: randomId(), from: "", to: "" })
    setOpeningHours(subOpeningHours)
  }

  const handleRemoveHours = (dayName, id) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openHours]
    subOpeningHours[index].openHours = [...openHours][index].openHours.filter(
      (hours) => hours.id !== id
    )
    setOpeningHours(subOpeningHours)
  }

  const handleChangeHours = (dayName: string, id: string | number, type: string, value: string) => {
    const index = getIndex(dayName, defaultOpenDays)
    const subOpeningHours = [...openHours]
    const subOpenHours = [...openHours][index].openHours
    const hoursIndex = getIndex(id, subOpenHours)
    subOpeningHours[index].openHours[hoursIndex][type] = value
    setOpeningHours(subOpeningHours)
  }

  const handleSubmit = () => {
    onSubmit(openHours)
  }

  return (
    <div className="sm:p-[30px] p-[10px]">
      {openHours.map((day) => (
        <div key={day.name}>
          <Heading text={day.name} />
          {!day.twentyFourHours &&
            Array.isArray(day.openHours) &&
            !!day.openHours.length &&
            day.openHours.map((time) => (
              <div key={time.id} className="flex items-center gap-3 my-3">
                <Input
                  value={time.from}
                  size="small"
                  type="time"
                  onChange={(e: any) =>
                    handleChangeHours(day.name, time.id, "from", e.target.value)
                  }
                />
                to
                <Input
                  value={time.to}
                  type="time"
                  size="small"
                  onChange={(e: any) => handleChangeHours(day.name, time.id, "to", e.target.value)}
                />
                <div
                  style={{ cursor: "pointer", fontSize: 11 }}
                  onClick={() => handleRemoveHours(day.name, time.id)}
                >
                  &#x2715;
                </div>
              </div>
            ))}
          {!day.twentyFourHours && (
            <Button
              variant="secondary"
              text="Add open hours"
              size="small"
              width="fit-content"
              className="mt-3"
              onClick={() => handleAddNewHours(day.name)}
            />
          )}
          <br />
          <Checkbox
            id={day.name}
            label="Open 24 hours"
            checked={day.twentyFourHours}
            onChange={(e: any) => handleCheckAllDay(day.name, e.target.checked)}
          />
          <Break />
        </div>
      ))}
      <div className="flex justify-end gap-3">
        <Button variant="secondary-no-outlined" text="Cancel" width={100} onClick={onCancel} />
        <Button text="Continue" width={150} onClick={handleSubmit} />
      </div>
    </div>
  )
}

export default OpenHours
