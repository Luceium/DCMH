"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { produce } from "immer";

type Tab = {
  title: string;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  orderedTabs,
  setActiveTabName,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  orderedTabs: Tab[];
  setActiveTabName: (tabName: string) => void;
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [hovering, setHovering] = useState(false);

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName
        )}
      >
        {propTabs.map((tab, idx) => (
          <button
            key={tab.title}
            onClick={() => {
              setActiveTabName(propTabs[idx].value);
            }}
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            className={cn("relative px-4 py-2 rounded-full", tabClassName)}
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {orderedTabs[0].value === tab.value && (
              <motion.div
                layoutId="clickedbutton"
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className={cn(
                  "absolute inset-0 bg-[#fff6ba] dark:bg-zinc-800 rounded-full",
                  activeTabClassName
                )}
              />
            )}

            <span className="relative block text-black dark:text-white">
              <b>{tab.title}</b>
            </span>
          </button>
        ))}
      </div>
      <h1 className="my-5">
        <b>
          These are the items we need to provide basic necessities to the
          unhoused members of our community.
        </b>
        &nbsp; We offer a clean place to sit and rest, enjoy a cup of coffee and
        a bowl of cereal, a shower and space to clean up, and laundry facilities
        to wash clothes. Of course, we also offer intangible resources like
        guidance navigating county services.
        <b>
          &nbsp; By providing these items you can help those less fortunate to
          start their day with hope. Thank you!
        </b>
        <br />
        <br />
        Items can be brought to 1111 H Street, (also known as Paul&apos;s Place)
        between 8AM and 1:30PM Monday - Friday.
      </h1>
      <FadeInDiv
        tabs={orderedTabs}
        key={orderedTabs[0].value}
        hovering={hovering}
        className={contentClassName}
      />
    </>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  hovering?: boolean;
}) => {
  return (
    <div className="relative w-full h-full">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -50 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: idx === 0 ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
