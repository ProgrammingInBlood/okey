import Image from "next/image";
import { useEffect, useState } from "react";
import TickMark from "../svg-icons/TickMark";
import styles from "../industry-dropdown/industry.module.scss";

interface pageprops {
  items: any;
  getSelectedItem: (arg: string) => void;
  initialData: { name: string; id: number };
}

const IndustryDropdown = ({
  items,
  getSelectedItem,
  initialData,
}: pageprops) => {
  const [options, setOptions] = useState(items);
  const [showItems, setShowItems] = useState(false);

  const dropDown = () => {
    setShowItems(!showItems);
  };

  const onSelect = (item: any) => {
    let tempItems = options;
    const findItem = tempItems.find((i: any) => i.id === item.id);

    if (findItem) {
      findItem.selected = !findItem.selected;
      setOptions([...tempItems]);
    }
  };

  const onChildSelect = (pitem: any, item: any) => {
    let tempItems = options;
    const findParent = tempItems?.find((i: any) => i.id === pitem.id);

    if (findParent) {
      const findChild = findParent.child?.find((i: any) => i.id === item.id);
      if (findChild) {
        findChild.selected = !findChild.selected;
        setOptions([...tempItems]);
      }
    }
  };

  const handleSelectedItem = () => {
    getSelectedItem(options);
    dropDown();
  };

  useEffect(() => {
    setOptions(items);
    console.log({ items });
  }, [items]);

  //search functionality
  const handleSearch = (e: any) => {
    const searchValue = e.target.value;
    const filteredItems = items.filter((item: any) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });
    setOptions(filteredItems);
  };

  console.log(options);

  return (
    <div className={styles.dropdown} onBlur={() => setShowItems(false)}>
      <div className={showItems ? styles.selectBoxActive : styles.selectBox}>
        <div className={styles.selectBoxContainer}>
          <div
            //close dropdown if clicked outside
            onClick={dropDown}
          >
            <div
              className={
                showItems
                  ? styles.selectBoxSelectedItemActive
                  : styles.selectBoxSelectedItem
              }
            >
              {initialData?.name}
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
            <div className={styles.selectsearchpanel}>
              <div className={styles.searchicon}>
                <Image src="/svg/search.svg" width={16} height={16} />
              </div>
              <input
                onChange={handleSearch}
                type="text"
                className={`${styles.inputsearch} inputform`}
                placeholder="Search"
              />
            </div>

            {options.map(
              (item: {
                id: string;
                name: string;
                selected: boolean;
                child: any;
              }) => {
                const selected = item?.selected;
                return (
                  <>
                    <div
                      key={item.id}
                      onClick={() => onSelect(item)}
                      className={styles.selected}
                    >
                      <p style={{ margin: 0 }}>{item.name}</p>
                      <TickMark color={selected ? "#1d99f2" : "#fff"} />
                    </div>

                    {selected && item.child?.length > 0 ? (
                      <div className={styles.indertogel}>
                        {item.child?.map(
                          (child: {
                            name: string;
                            id: number;
                            selected: boolean;
                          }) => {
                            const childSelected = child?.selected;
                            return (
                              <span
                                className={childSelected ? styles.active : ""}
                                onClick={() => onChildSelect(item, child)}
                              >
                                {child.name}
                              </span>
                            );
                          }
                        )}
                      </div>
                    ) : null}
                  </>
                );
              }
            )}
            <div className={styles.dropdownsearchbox}>
              <div
                className={` ${styles.dropsearchbox} simply-row align-content-between justify-content-between align-self-center`}
              >
                <div className={styles.halfdiv}>
                  <p className={styles.dropdownsearchboxlimitshow}>
                    {" "}
                    Add up to 4 more industries
                  </p>

                  {options.map((item: any, index: number) =>
                    item?.selected ? (
                      <span className={styles.addselecttext} key={index}>
                        {item.name}
                      </span>
                    ) : null
                  )}
                </div>
                <div
                  className={` ${styles.halfdiv} half-div align-self-center d-flex`}
                >
                  <button
                    className={styles.btnsearch}
                    onClick={handleSelectedItem}
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndustryDropdown;
