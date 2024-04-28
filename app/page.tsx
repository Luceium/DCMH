import Card from "@/components/card";
import Nav from "@/components/nav";
import { Item, Trend } from "@/lib/types";
import Image from "next/image";

export default function Home() {
  const tmpURL = "https://media.istockphoto.com/id/501945961/photo/cough-drops.jpg?s=612x612&w=0&k=20&c=r5OvBT5Ghp2ilzcGY2ljboq0y33ThPspihBiBefiavg="
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
    foodSupplies: [],
    cleaningSupplies: [],
    hygieneSupplies: [],
    // medicalSupplies: [],
    // TESTING
    medicalSupplies: [{name: "Cough Drops", target: 1000, quantity: 500, unverifiedQuantity: 650, description: "Cough drops help our ", trend: Trend.DECREASE, imageURL: tmpURL}]
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
            <h1 className="text-2xl">{section.name}</h1>
            {section.val.map((item) => (
              <div className="full-screen flex flex-row flex-wrap gap-4 m-4">
                <Card
                  name={item.name}
                  target={item.target}
                  quantity={item.quantity}
                  unverifiedQuantity={item.unverifiedQuantity}
                  description={item.description}
                  trend={item.trend}
                  imageURL={item.imageURL}
                />
              </div>
            ))}
            <div className="divider"></div> 
          </>
        ))}
    </>
  );
}
