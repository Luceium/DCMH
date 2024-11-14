"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

// Categories and their items
const categories = [
  { id: "priority", label: "Priority Items" },
  { id: "cleaning", label: "Cleaning & Sanitizing" },
  { id: "medicine", label: "Medicine" },
  { id: "food", label: "Food & Food Supplies" },
  { id: "hygiene", label: "Hygiene" },
];

const inventoryItems = [
  {
    id: 1,
    category: "priority",
    name: "Boxer Briefs",
    image: "/placeholder.svg",
    specs: "Sizes M, L, XL, and XXL needed",
    current: 1,
    goal: 15,
  },
  {
    id: 2,
    category: "priority",
    name: "Jeans",
    image: "/placeholder.svg",
    specs: "Sizes 32, 34, 36, 38 preferred",
    current: 3,
    goal: 15,
  },
  {
    id: 3,
    category: "food",
    name: "Soup",
    image: "/placeholder.svg",
    specs: "Cans or boxes. Pull-top or easy open preferred. Any variety.",
    current: 2,
    goal: 50,
  },
];

const ItemTabs = () => {
  const [activeCategory, setActiveCategory] = useState("priority");

  return (
    <>
      {/* Categories */}
      <Tabs
        defaultValue="priority"
        className="mb-8"
        onValueChange={setActiveCategory}
      >
        <TabsList className="w-full h-12 justify-start overflow-x-auto px-2">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="px-4 py-2 text-sm"
            >
              {category.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {inventoryItems
          .filter((item) => item.category === activeCategory)
          .map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                  width={400}
                  height={400}
                />
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{item.specs}</p>
                <div className="space-y-2">
                  <Progress value={(item.current / item.goal) * 100} />
                  <p className="text-sm text-gray-600">
                    Donation Goal: {item.current}/{item.goal}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </>
  );
};

export default ItemTabs;
