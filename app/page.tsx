import Card from "@/components/card";
import Nav from "@/components/nav";
import { Trend } from "@/lib/types";
import prisma from "@/lib/prisma"
import { Item, Category } from "@prisma/client";

async function getItems() {
  const medicineItems = await prisma.item.findMany({
    where: { category: Category.MEDICINE },
  });

  const food_suppliesItems = await prisma.item.findMany({
    where: { category: Category.FOOD_SUPPLIES },
  });

  const cleaning_suppliesItems = await prisma.item.findMany({
    where: { category: Category.CLEANING_SANITIZING },
  });

  const hygieneItems = await prisma.item.findMany({
    where: { category: Category.HYGIENE },
  });


  return {
    medicineItems,
    food_suppliesItems,
    cleaning_suppliesItems,
    hygieneItems
  }
}

export default async function Home() {
  const {
    medicineItems,
    food_suppliesItems,
    cleaning_suppliesItems,
    hygieneItems
  } = await getItems();

  const sections: { name: string; val: Item[] }[] = [
    { name: "Food & Supplies", val: food_suppliesItems },
    { name: "Cleaning & Sanitizing", val: cleaning_suppliesItems },
    { name: "Hygiene", val: hygieneItems },
    { name: "Medicine", val: medicineItems },
  ];

  return (
    <>
      <Nav />
        {sections.map((section) => (
          <div key={section.name} className="mx-4">
            <h1 className="text-2xl">{section.name}</h1>
            <div className="bg-black rounded-lg shadow-md grid lg:grid-cols-3 grid-cols-2 gap-2 overflow-y-auto  min-h-[calc(50vh)] p-4">
              {section.val.map((item) => (
                <div className="full-screen flex flex-wrap gap-4 m-4" key={item.name}>
                  <Card
                    id={item.id}
                    name={item.name}
                    targetQuantity={item.targetQuantity}
                    quantity={item.quantity}
                    description={item.description}
                    imageURL={item.imageURL}
                    category={item.category} 
                    arrival={item.arrival}
                  />
                </div>
              ))}
            </div>
            <div className="divider"></div> 
          </div>
        ))}
    </>
  );
}
