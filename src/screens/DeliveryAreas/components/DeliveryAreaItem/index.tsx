import { DeliveryArea } from "@/models";
import { handleFormateDate } from "@/lib/formatDate";
import { DeleteDeliveryAreaDialog, EditDeliveryArea } from "..";

interface CategoryItemProps {
    area: DeliveryArea;
}

export const DeliveryAreaItem = ({ area }: CategoryItemProps) => {
    return (
        <div className="max-w-sm col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3 rounded-lg overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="flex justify-between items-center">
                    <div className="font-bold text-xl mb-2">{area.name}</div>
                    <div className="flex items-center gap-4">
                        <EditDeliveryArea area={area} />
                        <DeleteDeliveryAreaDialog area={area} />
                    </div>
                </div>
                <p className="text-gray-500 text-sm mt-2">
                    تم إنشاء المنطقة في: {handleFormateDate(area.createdAt)}
                </p>
            </div>
        </div>
    );
};
