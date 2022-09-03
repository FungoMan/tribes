import { useState } from "react";

import Modal from "components/Modal/Modal";
import Icon from "components/Icon/Icon";
import TagsSelection from "components/TagsSelection/TagsSelection";
import { IOption } from "type";
import Badge from "components/Badge/Badge";
import PreviewValue from "components/AddListingPages/PreviewValue/PreviewValue";

interface TagsProps {
  isViewPage?: boolean;
  tags: IOption[];
  tagOptions: IOption[];
  onSetTags: (tags: IOption[]) => void;
}

const Tags = (props: TagsProps) => {
  const { isViewPage, tags = [], tagOptions, onSetTags } = props;
  const [showTagsModal, setShowTagsModal] = useState(false);
  const [localTags, setLocalTags] = useState(tags);

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex items-center gap-1">
          <Icon icon="tags-color" />
          Tags
        </div>
        {!isViewPage && <a onClick={() => setShowTagsModal(true)}>Add tags</a>}
      </div>
      <div className="flex flex-wrap mt-5 gap-y-5 gap-5">
        <PreviewValue valueKey="tags" value={tags} />
      </div>
      <Modal
        title="Tags"
        subTitle="Select 5 max"
        visible={showTagsModal}
        width={750}
        mobilePosition="center"
        onClose={() => {
          setLocalTags(tags);
          setShowTagsModal(false);
        }}
      >
        <TagsSelection
          selectedList={tags}
          options={tagOptions}
          onCancel={() => {
            setLocalTags(tags);
            setShowTagsModal(false);
          }}
          onSubmit={(localTags) => {
            setLocalTags(localTags);
            onSetTags(localTags);
            setShowTagsModal(false);
          }}
        />
      </Modal>
    </div>
  );
};

export default Tags;
