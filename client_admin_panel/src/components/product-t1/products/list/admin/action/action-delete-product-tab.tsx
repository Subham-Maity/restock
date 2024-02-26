import React from "react";
import { Tab, Tabs } from "@nextui-org/react";
import { Grid } from "@/components/product-t1/grid/admin/grid";
import { Flame, Trash, Trash2 } from "lucide-react";

export default function ActionDeleteProductTab({
  status,
  allProducts,
  deletedProducts,
  normalProducts,
}: {
  status: string;
  allProducts: any;
  deletedProducts: any;
  normalProducts: any;
}) {
  const [selected, setSelected] = React.useState("all");

  return (
    <>
      <Tabs
        fullWidth
        size="md"
        aria-label="Options"
        color="primary"
        variant="bordered"
        selectedKey={selected}
        onSelectionChange={(key) => setSelected(key.toString())}
      >
        <Tab
          key="all"
          title={
            <div className="flex items-center space-x-2 dark:text-yellow-600 text-yellow-300">
              <Flame />
              <span>All</span>
            </div>
          }
        >
          <Grid products={allProducts} status={status} />
        </Tab>
        <Tab
          key="withoutDeleted"
          title={
            <div className="flex items-center space-x-2 dark:text-green-600 text-green-300">
              <Trash />
              <span>Without Deleted</span>
            </div>
          }
        >
          <Grid products={normalProducts} status={status} />
        </Tab>
        <Tab
          key="deleted"
          title={
            <div className="flex items-center space-x-2 dark:text-red-600 text-red-300">
              <Trash2 />
              <span>Deleted</span>
            </div>
          }
        >
          <Grid products={deletedProducts} status={status} />
        </Tab>
      </Tabs>
    </>
  );
}
