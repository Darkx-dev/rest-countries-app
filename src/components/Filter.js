import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const Filter = ({ filterRegion }) => {
  const router = useRouter();
  const params = useSearchParams();
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys],
  );

  useEffect(() => {
    router.push("/?region=" + (selectedValue || "asia") + "&search=" + params.get("search"));
    filterRegion(selectedValue || params.get("region"));
  }, [selectedKeys]);

  return (
    <Dropdown className="dark:bg-darkblue-1">
      <DropdownTrigger>
        <Button
          variant="flat"
          disabled={selectedKeys.size === 0}
          className="h-full w-48 cursor-pointer justify-between px-6 py-4 capitalize dark:bg-darkblue-1 bg-white shadow-medium"
        >
          {selectedValue ? selectedValue : "Filter by Region"}
          <i id="icon-chevron-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          </i>
        </Button>
      </DropdownTrigger>
      {/* #react-aria6588227378-\:r1\: > li:nth-child(2) */}
      <DropdownMenu
        aria-label="Single selection example"
        variant="shadow"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="africa">Africa</DropdownItem>
        <DropdownItem key="america">America</DropdownItem>
        <DropdownItem key="asia">Asia</DropdownItem>
        <DropdownItem key="europe">Europe</DropdownItem>
        <DropdownItem key="oceania">Oceania</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Filter;
