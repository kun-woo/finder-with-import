import { useCallback, useContext } from "react";
import { observer } from "mobx-react-lite";
import clsx from "clsx";
import Directory from "../interfaces/Directory";
import folderIcon from "../assets/ic-folder.svg";
import fileIcon from "../assets/ic-file.svg";
import caretRightIcon from "../assets/ic-caret-right.svg";
import StoreContext from "../contexts/StoreContext";

type Props = {
  item?: Directory;
};

const DirectoryItem = ({ item }: Props) => {
  const rootStore = useContext(StoreContext);
  const fileExplorerStore = rootStore?.fileExplorerStore;
  const uiStore = rootStore?.uiStore;
  const activeStateByItemLabel = uiStore?.activeStateByItemLabel || {};
  const selectedLabel = uiStore?.selectedLabel || "";
  const label = item?.label || "";
  const depth = item?.depth || 0;
  const onClick = useCallback(
    (e) => {
      e.stopPropagation();
      fileExplorerStore?.setSelectedItemByItemDepth(item);
      uiStore?.setSelectedLabel(label);
      uiStore?.setActiveStateByItemLabel(depth, label);
    },
    [depth, label, item, fileExplorerStore, uiStore]
  );

  return (
    <li
      className={clsx({
        "directory-item": true,
        active: activeStateByItemLabel[depth] === item?.label,
        selected: selectedLabel === item?.label,
      })}
      onClick={onClick}
      tabIndex={0}
    >
      {item && !item.content && (
        <img
          src={folderIcon}
          alt="folder-icon"
          className="directory-item-folder-icon"
        />
      )}
      {item && item.content && (
        <img
          src={fileIcon}
          alt="file-icon"
          className="directory-item-file-icon"
        />
      )}
      <span className="directory-item-text">{item ? item.label : null}</span>
      {item && item.items && item.items.length > 0 && (
        <img
          src={caretRightIcon}
          alt="arrow-icon"
          className="directory-item-arrow-icon"
        />
      )}
    </li>
  );
};

export default observer(DirectoryItem);