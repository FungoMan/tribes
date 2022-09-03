import Badge from "components/Badge/Badge"
import { YesNo } from "enums"

interface RelationshipToBusinessProps {
  relationship?: YesNo
  setRelationship(e?: YesNo): void
}

const RelationshipToBusiness = (props: RelationshipToBusinessProps) => {
  const { relationship, setRelationship } = props
  return (
    <div className="flex gap-2">
      <Badge
        onClick={() => setRelationship(YesNo.YES)}
        selected={YesNo.YES === relationship}
        text={YesNo.YES}
      />
      <Badge
        onClick={() => setRelationship(YesNo.NO)}
        selected={YesNo.NO === relationship}
        text={YesNo.NO}
      />
    </div>
  )
}

export default RelationshipToBusiness
