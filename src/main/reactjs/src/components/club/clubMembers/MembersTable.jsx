import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    Avatar,
    Badge,
    Button,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input, Spinner,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow
} from "@nextui-org/react";
import {VerticalDotsIcon} from "./VerticalDotsIcon";
import {SearchIcon} from "./SearchIcon";
import defaultAvatar from '../../../assets/icon/Avatar'
import {useRecoilValue} from "recoil";
import {PiCrownDuotone} from "react-icons/pi";
import {
    currentClubMembershipInfoState,
    currentMembershipState,
    useMembershipData
} from "../../../recoil/hooks/UseMembershipApi";
import {useFetchUserInfo, userInfoState} from "../../../recoil/hooks/UseFetchUserInfo";
import RoleChangeModal from "./RoleChangeModal";
import {instance} from "../../../recoil/module/instance";
import {Cookies} from "react-cookie";
import ResultModal from "./ResultModal";
import {useParams} from "react-router-dom";
import RemoveMemberModal from "./RemoveMemberModal";
import Layout from "../../../common/Layout";
import ClubDetailsHeader from "../clubDetail/ClubDetailsHeader";

const statusColorMap = {
    active  : "success",
    banned  : "danger",
    pending : "secondary",
    inactive: "warning",
};

export default function MembersTable() {

    const {clubId} = useParams();
    const [refreshKey, setRefreshKey] = useState(0);

    const {loading: loadingClubMembershipData} =
        useMembershipData({
            state      : currentClubMembershipInfoState,
            dynamicPath: `/${clubId}/memberships`,
            refreshKey : refreshKey
        });

    const {loading: loadingMyMembership} =
        useMembershipData({state: currentMembershipState, dynamicPath: `/${clubId}/member`});

    const loading = loadingMyMembership || loadingClubMembershipData;

    const userInfo = useRecoilValue(userInfoState);

    const users = useRecoilValue(currentClubMembershipInfoState).summaryList;

    const myMembership = useRecoilValue(currentMembershipState);

    const fetchUserInfo = useFetchUserInfo();
    useEffect(() => {
        fetchUserInfo();
    }, []);

    // console.log("마이멤버쉽", myMembership)
    const myRole = myMembership?.info?.role || '권한정보가 없습니다.';

    const [filterValue, setFilterValue] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sortDescriptor, setSortDescriptor] = useState({
        column   : "status",
        direction: "ascending",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [isResultOpen, setIsResultOpen] = useState(false);
    const [removeModalOpen, setRemoveModalOpen] = useState(false);
    const [selectUser, setSelectUser] = useState('');
    const [changedRole, setChangedRole] = useState('');
    const [targetStatus, setTargetStatus] = useState('');
    const [targetMembershipId, setTargetMembershipId] = useState('');
    const [shouldRemove, setShouldRemove] = useState(false);

    useEffect(() => {
        if (changedRole && targetStatus && targetMembershipId) {
            onChange();
        }
    }, [changedRole, targetStatus, targetMembershipId]);

    useEffect(() => {
        if (shouldRemove && targetMembershipId) {
            onRemove();
        }
    }, [targetMembershipId]);

    // const {toggleLikeClub} = useLikeClub();

    const statusOptions = [
        {name: "활동중", uid: "ACTIVE"},
        {name: "차단", uid: "BANNED"},
        {name: "대기중", uid: "PENDING"},
        {name: "비활성", uid: "INACTIVE"},
    ];

    ////like-start///
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        setLiked(!liked);
    }, []);

    const handleLikeClick = (event) => {
        event.stopPropagation();
        setLiked(!liked);
        //toggleLikeClub({type: "CLUB", targetId: club.clubId});
    };
    ////like-end///

    const hasSearchFilter = Boolean(filterValue);
    const filteredItems = useMemo(() => {
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

    const sortedItems = useMemo(() => {
        return [...filteredItems].sort((a, b) => {
            const first = a[sortDescriptor.column];
            const second = b[sortDescriptor.column];
            const cmp = first < second ? -1 : first > second ? 1 : 0;
            return sortDescriptor.direction === "descending" ? -cmp : cmp;
        });
    }, [sortDescriptor, filteredItems]);

    const handleApprovalOpenModal = ({selectUser}) => {
        setChangedRole('MEMBER');
        setTargetStatus('PENDING');
        setTargetMembershipId(selectUser.membershipId);
    };

    const handleChangeRoleOpenModal = ({isOpen, selectUser}) => {
        setSelectUser(selectUser);
        setIsOpen(isOpen)
    };

    const handleRemoveOpenModal = ({isOpen, selectUser}) => {
        setShouldRemove(true);
        setSelectUser(selectUser);
        setRemoveModalOpen(isOpen)
    };

    const onSearchChange = useCallback((value) => {
        setFilterValue(value);
    }, []);

    const onClear = useCallback(() => {
        setFilterValue("");
    }, []);

    const onChange = async () => {
        const requestBody =
            {
                membershipId    : targetMembershipId,
                membershipStatus: targetStatus,
                role            : changedRole,
                updatedUserId   : userInfo.accountId,
            };

        const cookie = new Cookies();
        try {
            const res = await instance.put("/membership", requestBody, {
                headers: {
                    Authorization: `Bearer ${cookie.get("accessToken")}`,
                },
            });
            console.log("✅[Change Role] Success", res);
            setRefreshKey(prevKey => prevKey + 1);
            setIsResultOpen(true);
            setTargetMembershipId('');
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const onRemove = async () => {
        const cookie = new Cookies();
        try {
            const res = await instance.delete(`/membership/${clubId}/${targetMembershipId}`, {
                headers: {
                    Authorization: `Bearer ${cookie.get("accessToken")}`,
                },
            });
            console.log("✅[Change Role] Success", res);
            setRefreshKey(prevKey => prevKey + 1);
            setIsResultOpen(true);
            setTargetMembershipId('');
            setShouldRemove(false);
        } catch (error) {
            console.error("Error:", error);
        }
    };


    const topContent = useMemo(() => (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
                <span className="text-default-400 text-small">총 {users.length} 명</span>
            </div>
            <div className="flex justify-between gap-3 items-end">
                <Input
                    isClearable
                    className="w-full sm:max-w-[44%]"
                    placeholder="멤버 찾기"
                    startContent={<SearchIcon/>}
                    value={filterValue}
                    onClear={onClear}
                    onValueChange={onSearchChange}
                />
                {/*<div className="flex gap-3">*/}
                {/*    <Dropdown>*/}
                {/*        <DropdownTrigger className="hidden sm:flex">*/}
                {/*            <Button endContent={<ChevronDownIcon className="text-small"/>} variant="flat">*/}
                {/*                상태*/}
                {/*            </Button>*/}
                {/*        </DropdownTrigger>*/}
                {/*        <DropdownMenu*/}
                {/*            disallowEmptySelection*/}
                {/*            aria-label="Table Columns"*/}
                {/*            closeOnSelect={false}*/}
                {/*            selectedKeys={statusFilter}*/}
                {/*            selectionMode="multiple"*/}
                {/*            onSelectionChange={setStatusFilter}*/}
                {/*        >*/}
                {/*            {statusOptions.map((status) => (*/}
                {/*                <DropdownItem key={status.uid} className="capitalize">*/}
                {/*                    {capitalize(status.name)}*/}
                {/*                </DropdownItem>*/}
                {/*            ))}*/}
                {/*        </DropdownMenu>*/}
                {/*    </Dropdown>*/}
                {/*</div>*/}
            </div>
        </div>
    ), [filterValue, statusFilter, users.length, onSearchChange]);
    if (loading) {
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <Spinner size="lg" color="danger"/>
            </div>
        );
    }

    return (
        <>
            <Table
                style={{maxWidth: '600px', width: '100%'}}
                aria-label="Example table with custom cells, pagination and sorting"
                isHeaderSticky
                sortDescriptor={sortDescriptor}
                topContent={topContent}
                topContentPlacement="inside"
                onSortChange={setSortDescriptor}
                radius='none'
                fullWidth
            >
                <TableHeader>
                    {/*<TableColumn key="like" align="start" allowsSorting={false}*/}
                    {/*             style={{width: '5%', justifyContent: 'center', alignItems: 'center'}}/>*/}
                    <TableColumn key="userProfile" align="start" allowsSorting={false}
                                 style={{width: '7%'}}/>
                    <TableColumn key="userName" align="start" allowsSorting={true}
                                 style={{width: '62%'}}>멤버</TableColumn>
                    <TableColumn key="status" align="start" allowsSorting={true}
                                 style={{width: '16%', justifyContent: 'center'}}>상태</TableColumn>
                    <TableColumn key="actions" align="center" allowsSorting={false}
                                 style={{width: '10%'}}>설정</TableColumn>
                </TableHeader>
                <TableBody emptyContent="No users found" items={sortedItems}>
                    {(item) => (

                        <TableRow key={item.userId}>
                            {/*<TableCell>*/}
                            {/*    <Button*/}
                            {/*        isIconOnly*/}
                            {/*        className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2"*/}
                            {/*        radius="full"*/}
                            {/*        variant="light"*/}
                            {/*        onClick={(event) => handleLikeClick(event)}*/}
                            {/*    >*/}
                            {/*        <HeartIcon*/}
                            {/*            style={{color: '#D4D4D8'}}*/}
                            {/*            className={liked ? "[&>path]:stroke-transparent" : ""}*/}
                            {/*            fill={liked ? "currentColor" : "none"}*/}
                            {/*        />*/}
                            {/*    </Button>*/}
                            {/*</TableCell>*/}
                            <TableCell>
                                {item.role === 'HOST' ?
                                    <Badge content={<PiCrownDuotone/>} color="danger" size="sm">
                                        <Avatar
                                            isBordered
                                            radius="md"
                                            color="danger"
                                            src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${item.userProfile}?type=f&w=600&h=600&ttype=jpg`
                                                || defaultAvatar}
                                        /></Badge>
                                    :
                                    <Avatar
                                        radius="md"
                                        showFallback
                                        color="default"
                                        src={`https://ffkv1pqc2354.edge.naverncp.com/p5Rq2SwoqV/user-profile/${item.userProfile}?type=f&w=600&h=600&ttype=jpg`}
                                    />
                                }
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-row items-center">
                                    <div className="flex flex-col">
                                        <p>{item.userName}</p>
                                        <p className="text-tiny text-stone-400">{item.role}</p>
                                    </div>
                                    {/*{item.role === 'HOST' &&*/}
                                    {/*    <div>*/}
                                    {/*        <Button isIconOnly variant="light" color="warning"*/}
                                    {/*                startContent={<PiCrownDuotone*/}
                                    {/*                    style={{width: '1.4em', height: '1.4em'}}/>}*/}
                                    {/*        />*/}
                                    {/*    </div>*/}
                                    {/*}*/}
                                    {
                                        item.userId === userInfo.accountId &&
                                        <div>
                                            <Chip className="ml-2" variant="flat" color="primary" size="sm">me</Chip>
                                        </div>
                                    }
                                </div>
                            </TableCell>
                            <TableCell>
                                <Chip className="capitalize" color={statusColorMap[item.status.toLowerCase()]} size="sm"
                                      variant="flat">
                                    {statusOptions.find(option => option.uid === item.status.toUpperCase())?.name || '상태 없음'}
                                </Chip>
                            </TableCell>

                            <TableCell>
                                <div className="relative flex justify-end items-center gap-2">
                                    {item.role !== 'HOST' &&
                                        <Dropdown>
                                            <DropdownTrigger>
                                                {
                                                    item.userId === userInfo.accountId ?
                                                        <></>
                                                        :
                                                        <Button isIconOnly size="sm" variant="light">
                                                            <VerticalDotsIcon className="text-default-300"/>
                                                        </Button>
                                                }
                                            </DropdownTrigger>

                                            {(myRole === "HOST" || myRole === "MODERATOR") ? (
                                                <DropdownMenu>
                                                    {item.role === 'WAITING' ? '' :
                                                        <DropdownItem>1 : 1 채팅</DropdownItem>}
                                                    {
                                                        item.role === 'WAITING' ?
                                                            <DropdownItem
                                                                onClick={() => handleApprovalOpenModal({selectUser: item})}
                                                            >가입 승인</DropdownItem>
                                                            : ''
                                                    }
                                                    <DropdownItem
                                                        onClick={() => handleChangeRoleOpenModal({
                                                            isOpen    : true,
                                                            selectUser: item
                                                        })}
                                                    >
                                                        {item.role !== 'WAITING' ? <>권한 변경</> : ''}
                                                    </DropdownItem>
                                                    <DropdownItem color="danger"
                                                                  onClick={() => handleRemoveOpenModal({
                                                                      isOpen    : true,
                                                                      selectUser: item
                                                                  })}
                                                    >
                                                        {item.role === 'WAITING' ? <>승인 거절</> : <>회원 추방</>}
                                                    </DropdownItem>
                                                </DropdownMenu>
                                            ) : (
                                                <DropdownMenu>
                                                    <DropdownItem>1 : 1 채팅</DropdownItem>
                                                </DropdownMenu>)
                                            }
                                        </Dropdown>
                                    }
                                </div>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <RoleChangeModal
                isOpen={isOpen}
                selectUser={selectUser}
                setChangedRole={setChangedRole}
                setTargetStatus={setTargetStatus}
                setTargetMembershipId={setTargetMembershipId}
                onClose={() => setIsOpen(false)}

            />
            <RemoveMemberModal
                isOpen={removeModalOpen}
                selectUser={selectUser}
                onRemove={onRemove}
                setTargetMembershipId={setTargetMembershipId}
                onClose={() => setRemoveModalOpen(false)}
            />
            <ResultModal
                isOpen={isResultOpen}
                onClose={() => setIsResultOpen(false)}
            />
        </>

    );
}
