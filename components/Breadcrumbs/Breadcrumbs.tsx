import Icon from "components/Icon/Icon"
import Link from "next/link"
import React from "react"
import styles from "./Breadcrumbs.module.scss"
export interface BreadcrumbsProps {
  text: string
  path: string
} 

const Breadcrumbs = (props: {data: BreadcrumbsProps[]}) => {
  const {data} = props

  return (
    <React.Fragment>
      <nav aria-label="breadcrumb" className={styles.container}>
        <ol className={styles.breadcrumbs}>
          {data?.map((breadcrumb, index) => {
            if (index === data.length - 1) {
              return (<li key={index} className={styles.breadcrumb_item} aria-current="page">{breadcrumb.text}</li>)
            }
            return (
              <li key={index} className={styles.breadcrumb_item}>
                <Link href={breadcrumb.path}>{breadcrumb.text}</Link>
                <Icon icon="carret-right" color="#E2E4E9" size={16} className="mx-[10px]"/>
              </li>
            )
            })}
        </ol>
      </nav>
    </React.Fragment>
  )
}



export default Breadcrumbs