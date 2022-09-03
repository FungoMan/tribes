import Badge from "components/Badge/Badge"
import { categories } from "constant"
import { Categories } from "enums"
import {useEffect, useState} from "react";
import CategoryApi from '../../../../services/category/index';

interface ChooseCategoryProps {
  category?: Categories
  setCategory?(e?: Categories): void
}

const SubTitle = ({category}) => {
  let subTitle = ""
  switch (category) {
    case Categories.BUY:
      subTitle = "For shopping trip. Market, mall, souvenir shop, bookstore, etc"
      break
    case Categories.EAT:
      subTitle = "Halal/Muslim-friendly restaurants, cafes, bakeries, etc"
      break
    case Categories.STAY:
      subTitle = "Hotels, resorts, homestays with Halal/Muslim-friendly amenities, ect"
      break
    case Categories.SEE_AND_DO:
      subTitle = "Attractions, tours, relaxation, etc"
      break
    case Categories.TRANSPORT:
      subTitle = "Airport transfer, Car rentals, Trains, Buses."
      break
  }
  return <p className="mb-10">{subTitle}</p>
}

const ChooseCategory = (props: ChooseCategoryProps) => {
  const { category, setCategory } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const data = await CategoryApi.getCategories();
      setCategories(data.data.data);
    }

    getCategories().catch(console.error);
  }, [])

  return (
    <>
      <div className="flex flex-wrap gap-2">
        {categories.map((cate: any) => (
          <Badge
            key={cate.id}
            onClick={() => setCategory?.(cate.id)}
            value={cate.id}
            selected={cate.id === category}
          >
            {cate.attributes.name}
          </Badge>
        ))}
      </div>
      <SubTitle category={category} />
    </>
  )
}

export default ChooseCategory
