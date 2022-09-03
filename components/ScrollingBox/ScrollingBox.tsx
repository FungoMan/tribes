import { ReactElement } from "react"
import styles from "./ScrollingBox.module.scss"

interface IScrollingBox {
  className?: string
  children?: ReactElement
  maxHeight?: number
  axis?: "x" | "y" | "xy"
}

const ScrollingBox = (props: IScrollingBox) => {
  const _axis = {
    x: 'overflowX',
    y: 'overflowY',
    xy: 'overflow',
  }

  const {
    className,
    children,
    maxHeight = 350,
    axis = 'y'
  } = props

  return (
    <div className={`${styles.scrollbar_wrapper} ${className}`}>
      <div className={styles.scrolling_box} style={{[_axis[axis]]: 'scroll' ,maxHeight: maxHeight}}>
        {children}
      </div>
    </div>
  )
}

export default ScrollingBox