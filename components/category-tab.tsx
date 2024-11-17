import { EditContext } from "@/lib/context";
import { Category } from "@prisma/client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useContext } from "react";
import { deleteCategory, renameCategory } from "@/actions/categories";
import { X } from "lucide-react";
import { fetchItems } from "@/actions/fetchItems";
import { useToast } from "./ui/use-toast";
import TabField from "./tab-field";

const CategoryTab = ({
  category,
  invalidateSignal,
  setInvalidateSignal,
}: {
  category: Category;
  invalidateSignal: boolean;
  setInvalidateSignal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { edit } = useContext(EditContext);
  const [tabEditMode, setTabEditMode] = React.useState(false);
  const { toast } = useToast();

  // true by default so we can't delete before checking
  const [hasChildren, setHasChildren] = React.useState(true);
  React.useEffect(() => {
    const fetchChildren = async () => {
      const children = await fetchItems(category.id);
      setHasChildren(children.length > 0);
    };
    fetchChildren();
  }, [category.id]);

  return (
    <div className="flex items-center bg-background rounded-sm">
      {tabEditMode ? (
        <TabField
          defaultValue={category.name}
          onCancel={() => setTabEditMode(false)}
          onSubmit={(e) => {
            const newName = e.currentTarget.value;
            if (newName == "") {
              deleteCategory(category.id);
            }
            if (
              !newName.toLowerCase().includes("prior") &&
              newName.length > 0
            ) {
              renameCategory(category.id, e.currentTarget.value);
              setTabEditMode(false);
              setInvalidateSignal(!invalidateSignal);
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
          onClick={() => {
            if (tabEditMode) {
              setTabEditMode(false);
            } else {
              if (hasChildren) {
                toast({
                  title: "Can't delete category",
                  description:
                    "To delete a category, all of it's items must be deleted first or reassigned to other categories. If this is wrong, please try again in a few seconds.",
                  variant: "destructive",
                });
              } else {
                deleteCategory(category.id);
                setInvalidateSignal(!invalidateSignal);
              }
            }
          }}
        >
          <X />
        </button>
      )}
    </div>
  );
};

export default CategoryTab;
