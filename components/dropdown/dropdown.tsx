import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./dropdown.module.scss";

interface pageprops {
  items: any;
  getSelectedItem: (arg: string) => void;
  initialData: { name: string; id: number };
}

const Dropdown = ({ items, getSelectedItem, initialData }: pageprops) => {
  const [showItems, setShowItems] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>("");

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const onSelect = (item: any) => {
    setSelectedItem(item);
    setShowItems(false);
  };

  useEffect(() => {
    getSelectedItem(selectedItem);
  }, [selectedItem]);

  return (
    <div className={styles.dropdown}>
      <div className={showItems ? styles.selectBoxActive : styles.selectBox}>
        <div className={styles.selectBoxContainer}>
          <div onClick={dropDown}>
            <div
              className={
                showItems
                  ? styles.selectBoxSelectedItemActive
                  : styles.selectBoxSelectedItem
              }
            >
              {selectedItem ? selectedItem?.name : initialData?.name}
            </div>
            <div className={styles.selectBoxArrow}>
              <Image src="/svg/dropdown.svg" width={15} height={15} />
            </div>
          </div>

          <div
            style={
              showItems
                ? {
                    visibility: "visible",
                    top: 63,
                    opacity: 1,
                    zIndex: 1,
                    display: "block",
                  }
                : {
                    visibility: "hidden",
                    top: 30,
                    opacity: 0,
                    zIndex: -1,
                    display: "none",
                  }
            }
            className={styles.selectBoxItems}
          >
            {items.map((item: { id: string; name: string }) => (
              <div
                key={item.id}
                onClick={() => onSelect(item)}
                className={selectedItem === item ? styles.selected : ""}
              >
                {item.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
