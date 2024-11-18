import { EditContext } from "@/lib/context";
import { Category } from "@prisma/client";
import { TabsTrigger } from "@/components/ui/tabs";
import React, { useContext } from "react";
import { deleteCategory, renameCategory } from "@/actions/categories";
import { Trash } from "lucide-react";
import { useToast } from "./ui/use-toast";
import TabField from "./tab-field";

const CategoryTab = ({
  category,
  setCategories,
}: {
  category: Category;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}) => {
  const { edit } = useContext(EditContext);
  const [tabEditMode, setTabEditMode] = React.useState(false);
  const { toast } = useToast();

  return (
    <div className="flex items-center rounded-sm">
      {tabEditMode ? (
        <TabField
          defaultValue={category.name}
          onCancel={() => setTabEditMode(false)}
          onSubmit={async (e) => {
            const newName = e.currentTarget.value;
            if (newName == "") {
              deleteCategory(category.id);
            }
            if (
              !newName.toLowerCase().includes("prior") &&
              newName.length > 0
            ) {
              const updatedCategory = await renameCategory(
                category.id,
                e.currentTarget.value
              );
              if (updatedCategory)
                setCategories((prev) =>
                  prev.map((c) => (c.id === category.id ? updatedCategory : c))
                );
              setTabEditMode(false);
            }
          }}
        />
      ) : (
        <TabsTrigger
          key={category.name}
          value={category.id}
          className="px-4 py-2 text-sm border-gray-400 border"
          onDoubleClick={() => {
            if (edit) {
              setTabEditMode(true);
            }
          }}
        >
          {category.name}
        </TabsTrigger>
      )}
      {edit && !tabEditMode && (
        <button
          className="p-2"
          aria-label="Delete Category"
          onClick={async () => {
            if (tabEditMode) {
              setTabEditMode(false);
            } else {
              const deletedCategory = await deleteCategory(category.id);
              if (!deletedCategory || "error" in deletedCategory) {
                toast({
                  title: "Can't delete category",
                  description:
                    "error" in deletedCategory
                      ? deletedCategory.error
                      : "An unknown error occurred.",
                  variant: "destructive",
                });
              } else {
                setCategories((prev) =>
                  prev.filter((c) => c.id !== deletedCategory.id)
                );
              }
            }
          }}
        >
          <Trash />
        </button>
      )}
    </div>
  );
};

export default CategoryTab;
