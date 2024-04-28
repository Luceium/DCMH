import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import prisma from "@/lib/prisma";
import { redirect } from 'next/navigation';







export default async function Add(){
    async function submitItem(formData: FormData){
        "use server"

        await prisma.item.create({
            data: {
                name: formData.get("name") as string,
                description: formData.get("description")as string,
                category: formData.get("category") as string,
                quantity: parseInt(formData.get("quantity") as string),
                targetQuantity: parseInt(formData.get("targetQuantity") as string),
                imageURL: formData.get("imageURL") as string
            }
        })
        redirect("/")
    }
    return(
        <div>
            <div>
                <h1 className='text-4xl font-bold gap-4'>Add New Item</h1>
                <form className='flex flex-col gap-4 text-primary' action={submitItem}>
                    <input className='input input-large p-4 border rounded-md' name="name" placeholder="Name of Item"/> 
                    <input className='input input-large p-4 border rounded-md' name="description" placeholder="Description"/> 
                    <Select name="category">
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="FOOD_SUPPLIES">Food and Supplies</SelectItem>
                            <SelectItem value="CLEANING_SANITIZING">Cleaning and Sanitizing</SelectItem>
                            <SelectItem value="HYGIENE">Hygiene</SelectItem>
                            <SelectItem value="MEDICINE">Food and Supplies</SelectItem>
                        </SelectContent>
                    </Select>
                    <input className='input input-large p-4 border rounded-md' name="quantity" placeholder="Quantity"/>
                    <input className='input input-large p-4 border rounded-md' name="targetQuantity" placeholder="Target Quantity"/>
                    <input className='input input-large p-4 border rounded-md' name="imageURL" placeholder="Image URL"/>
                    <button className='btn bg-blue-500' type="submit">
                        Add Item
                    </button>
                </form>
            </div>
        </div>
    )
    }