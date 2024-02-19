import { useState, useEffect, useContext } from "react";

import { FaTimes } from "react-icons/fa";
import Context from "@/store/context/context";
import { useRouter } from "next/navigation";

type Tab = {
  path: string;
};

const MAX_TABS = 10;

export default function MemoryTab() {
  const { prevPath } = useContext(Context);
  const [tabs, setTabs] = useState<Tab[]>([]);
  const router = useRouter();

  useEffect(() => {
    if (!tabs.find((tab) => tab.path === prevPath)) {
      setTabs((prevTabs) => {
        let newTabs = [...prevTabs];
        if (newTabs.length >= MAX_TABS) {
          newTabs.shift();
        }
        return [...newTabs, { path: prevPath }];
      });
    }
  }, [prevPath]);

  const closeTab = (path: string, event: { preventDefault: () => void }) => {
    event.preventDefault();
    setTabs(tabs.filter((tab) => tab.path !== path));
  };

  const navigateToTab = (path: string) => {
    router.push(path);
  };

  return (
    <div className="flex space-x-2">
      {tabs.map((tab) => (
        <div
          className="flex items-center space-x-2 border rounded px-2"
          key={tab.path}
        >
          <button
            onClick={() => navigateToTab(tab.path)}
            className="text-blue-500 hover:text-blue-700"
          >
            {tab.path}
          </button>
          <FaTimes onClick={(event: any) => closeTab(tab.path, event)} />
        </div>
      ))}
    </div>
  );
}
