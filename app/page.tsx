import Card from "@/components/card";
import Nav from "@/components/nav";
import { Item } from "@/lib/types";
import Image from "next/image";

export default function Home() {
  const {
    medicalSupplies,
    foodSupplies,
    cleaningSupplies,
    hygieneSupplies,
  }: {
    medicalSupplies: Item[];
    foodSupplies: Item[];
    cleaningSupplies: Item[];
    hygieneSupplies: Item[];
  } = {
    medicalSupplies: [],
    foodSupplies: [],
    cleaningSupplies: [],
    hygieneSupplies: [],
  };

  const sections: { name: string; val: Item[] }[] = [
    { name: "Food & Supplies", val: foodSupplies },
    { name: "Cleaning & Sanitizing", val: cleaningSupplies },
    { name: "Hygiene", val: hygieneSupplies },
    { name: "Medicine", val: medicalSupplies },
  ];

  return (
    <>
      <Nav />
        {sections.map((section) => (
          <>
            <h1>{section.name}</h1>
            {section.val.map((item) => (
              <div className="full-screen">
                <Card
                  name={item.name}
                  target={item.target}
                  quantity={item.quantity}
                  unverifiedQuantity={item.unverifiedQuantity}
                  description={item.description}
                  trend={item.trend}
                />
              </div>
            ))}
          </>
        ))}
    </>
  );
}
