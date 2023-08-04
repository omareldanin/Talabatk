import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ChevronLeft } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Button,
  Checkbox,
  Badge,
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components";
import { AdminItem } from "@/models";
import { displayUserRoles, extractRoles } from "./transformRolObj";
import { DeleteAdminDialog, EditAdminDialog, EditAdminRoles } from "./components";




export const adminColumns: ColumnDef<AdminItem>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: boolean) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="تحديد الكل"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
        aria-label="تحديد صف"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "image",
    accessorKey: "image",
    cell: ({ row }) => {
      const value = row.original;
      return (
        <Avatar className="mx-auto">
          <AvatarImage src={value.image || ''} alt="restaurant image" />
          <AvatarFallback>
            {value.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar >
      )
    },
  },
  {
    accessorKey: "name",
    header: "الاسم",
  },
  {
    accessorKey: "phone",
    header: "الهاتف",
  },
  {
    accessorKey: "email",
    header: "البريد الالكتروني",
  },
  {
    accessorKey: "role",
    header: "الدور",
    cell: ({ row }) => {
      const roles = extractRoles(row.original.admin.adminRole);

      return <div className="text-center">{displayUserRoles(roles) || 'لا يوجد'}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "الحالة",
    cell: ({ getValue }) => {
      const status = getValue();
      return (
        <Badge variant={status === "active" ? "default" : "destructive"}>
          {status === "active" ? "مفعل" : "غير مفعل"}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const admin = row.original;

      return (
        <div className="flex justify-center items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">فتح قائمة الاجراءات للمستخدم</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel className="text-end mb-2">
                <span className="sr-only">الاجراءات</span>
                الاجراءات
              </DropdownMenuLabel>
              <DeleteAdminDialog admin={admin} />
              <EditAdminDialog admin={admin} />
              <EditAdminRoles admin={admin} />
              <DropdownMenuSeparator />
            </DropdownMenuContent>
          </DropdownMenu>
          <div>
            <span className="sr-only">الذهاب الى صفحة تفاصيل المشرف</span>
            <ChevronLeft className="h-4 w-4 cursor-pointer" />
          </div>
        </div>
      );
    },
  },
];
