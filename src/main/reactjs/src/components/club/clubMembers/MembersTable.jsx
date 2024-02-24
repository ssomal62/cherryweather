import React, {useState} from "react";
import {
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    User
} from "@nextui-org/react";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import {ChevronDownIcon} from "./ChevronDownIcon";
import {capitalize} from "./utils";
import defaultAvatar from '../../../assets/icon/Avatar'
import {HeartIcon} from "../../../assets/icon/HeartIcon";


const statusColorMap = {
    active: "success",
    banned: "danger",
    pending : "secondary",
    Inactive : "warning",
};

export default function MembersTable({users}) {

    const [filterValue, setFilterValue] = React.useState("");
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
    const [statusFilter, setStatusFilter] = React.useState("all");
    const [sortDescriptor, setSortDescriptor] = React.useState({
        column: "status",
        direction: "ascending",
    });

    const columns = [
        {name: "", uid: "like"},
        {name: "멤버", uid: "userName", sortable: true},
        {name: "상태", uid: "status", sortable: true},
        {name: "설정", uid: "actions"},
    ];

    const statusOptions = [
        {name: "활동중", uid: "ACTIVE"},
        {name: "차단", uid: "BANNED"},
        {name: "대기중", uid: "PENDING"},
        {name: "비활성", uid: "INACTIVE"},
    ]
    const hasSearchFilter = Boolean(filterValue);

    ////like-start///
    const [liked, setLiked] = useState(false);

    const handleLikeClick = () => {
        setLiked(!liked);
    };

    ////like-end///

    const filteredItems = React.useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.userName.toLowerCase().includes(filterValue.toLowerCase()),
            );
        }
        if (statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
            filteredUsers = filteredUsers.filter((user) =>
                Array.from(statusFilter).includes(user.status),
            );
        }
        return filteredUsers;
    }, [users, filterValue, statusFilter]);

    const items = React.useMemo(() => {
        return filteredItems;
    }, [filteredItems]);

    const sortedItems = React.useMemo(() => {
        return [...items].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;

            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, items]);

    const renderCell = React.useCallback((user, columnKey) => {
        const cellValue = user[columnKey];

        switch (columnKey) {
            case "like" :
                return (
                    <div className="relative flex justify-end items-center gap-2">
                    <Button
                        isIconOnly
                        className="text-default-900/60 data-[hover]:bg-foreground/10"
                        radius="full"
                        variant="light"
                        onPress={handleLikeClick}
                       >
                        <HeartIcon
                            style={{
                                width:24,
                                height:24,
                                color : 'pink',
                                fill: liked ? "currentColor" : "none"
                        }}
                            //className={liked ? "[&>path]:stroke-transparent" : ""}
                            //fill={liked ? "pink" : "none"}
                        />
                     </Button>
                    </div>
                    );
            case "userName":
                return (
                    <User
                        avatarProps={{radius: "lg",
                            src: `https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${user.userProfile}.jpg?type=f&w=600&h=600&ttype=jpg`
                                || defaultAvatar}}
                        description={user.role}
                        name={cellValue}
                    >
                    </User>
                );
            case "status":
                return (
                    <Chip className="capitalize" color={statusColorMap[user.status.toLowerCase()]} size="sm" variant="flat">
                        {cellValue}
                    </Chip>
                );
            case "actions":
                return (
                    <div className="relative flex justify-end items-center gap-2">
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly size="sm" variant="light">
                                    <VerticalDotsIcon className="text-default-300" />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu>
                                <DropdownItem>권한 변경</DropdownItem>
                                <DropdownItem>회원 추방</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, []);

    const onSearchChange = React.useCallback((value) => {
        if (value) {
            setFilterValue(value);
        } else {
            setFilterValue("");
        }
    }, []);

    const onClear = React.useCallback(()=>{
        setFilterValue("")
    },[])

    const topContent = React.useMemo(() => {
        return (
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                    <span className="text-default-400 text-small">총 {users.length} 명</span>
                </div>
                <div className="flex justify-between gap-3 items-end">
                    <Input
                        isClearable
                        className="w-full sm:max-w-[44%]"
                        placeholder="검색"
                        startContent={<SearchIcon />}
                        value={filterValue}
                        onClear={() => onClear()}
                        onValueChange={onSearchChange}
                    />
                    <div className="flex gap-3">
                        <Dropdown>
                            <DropdownTrigger className="hidden sm:flex">
                                <Button endContent={<ChevronDownIcon className="text-small" />} variant="flat">
                                    상태
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu
                                disallowEmptySelection
                                aria-label="Table Columns"
                                closeOnSelect={false}
                                selectedKeys={statusFilter}
                                selectionMode="multiple"
                                onSelectionChange={setStatusFilter}
                            >
                                {statusOptions.map((status) => (
                                    <DropdownItem key={status.uid} className="capitalize">
                                        {capitalize(status.name)}
                                    </DropdownItem>
                                ))}
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>
            </div>
        );
    }, [
        filterValue,
        statusFilter,
        users.length,
        onSearchChange,
        hasSearchFilter,
    ]);


    return (
        <Table
            aria-label="Example table with custom cells, pagination and sorting"
            isHeaderSticky
            selectedKeys={selectedKeys}
            selectionMode="none"
            sortDescriptor={sortDescriptor}
            topContent={topContent}
            topContentPlacement="inside"
            onSelectionChange={setSelectedKeys}
            onSortChange={setSortDescriptor}
            radius='none'
            fullWidth
        >
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn
                        key={column.uid}
                        align={column.uid === "actions" ? "center" : "start"}
                        allowsSorting={column.sortable}
                    >
                        {column.name}
                    </TableColumn>
                )}
            </TableHeader>
            <TableBody emptyContent={"No users found"} items={sortedItems}>
                {(item) => (
                    <TableRow key={item.userId}>
                        {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
}
