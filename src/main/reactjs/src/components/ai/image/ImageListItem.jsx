import React, {useEffect, useState} from 'react';
import {Button, Card, CardHeader, CardBody, CardFooter, Chip, Image} from "@nextui-org/react";
import {HeartFill, useSaveImageState, UseSaveState} from "../../../recoil/hooks/UseSaveState";
import {useRecoilState, useRecoilValue} from "recoil";
import {Spinner} from "@nextui-org/react";
import { FcEmptyTrash } from "react-icons/fc";
import {deleteState, useDeleteImage} from "../../../recoil/hooks/UseDeleteImage";
import SaveImageModal from "../../../utils/SaveImageModal";
import DeleteImageModal from "../../../utils/DeleteImageModal";



const ImageListItem = ({list}) => {
    const [isDeleted, setIsDeleted] = useRecoilState(deleteState);
    const deleteImage = useDeleteImage();
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        const newWindow = window.open(list.bucketURL, '_blank');
        if (newWindow) {
            newWindow.opener = null; // 새 창의 opener를 null로 설정하여 보안 상의 이슈를 방지합니다.
        }
    };
    const handleDeleteClick = async () => {
            setIsModalOpen(true); // 모달 열기
            await deleteImage(list.bucketURL);
    };

    useEffect(() => {
        if (isDeleted) {
            setIsDeleted(false); // 삭제 완료 후 상태를 다시 초기화합니다.
        }
    }, [isDeleted, setIsDeleted]);

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        // <div className="max-w-[600px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
        <>
            <Card
                isFooterBlurred
                className="w-full h-[350px] col-span-12 sm:col-span-5"
                id={list.aiImageId}
            >
                <CardHeader className="absolute z-10 top-1 flex-col items-start">
                    <p className="text-tiny text-black/65 uppercase font-bold">Cherry's match</p>
                    {/*<h4 className="text-black font-medium text-2xl">{list.createdAt}</h4>*/}
                </CardHeader>
                <Image
                    removeWrapper
                    alt="Card example background"
                    className="z-0 w-450 h-450 scale-95 -translate-y-6 object-cover"
                    src={list.bucketURL}
                    onClick={handleClick} // 클릭 이벤트 처리
                />
                <CardFooter
                    className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
                    <div>
                        <p className="text-black text-tiny">{formatDate(list.createdAt)}</p>
                        <p className="text-tiny text-black/65 uppercase font-bold">Cherry's match</p>
                        {/*<p className="text-black text-tiny">날씨 정보</p>*/}
                    </div>
                    <Button className="text-tiny" color="danger" radius="full" size="sm" onClick={handleDeleteClick}>
                         삭제
                    </Button>
                    <div style={{
                        position: 'absolute',
                        bottom: '14px',
                        right: 'calc(4.5em + 8px)',
                        // display: isDeleted ? 'none' : 'block'
                    }}>
                        {/*<FcEmptyTrash style={{...styles2.icon}}/>*/}
                    </div>
                </CardFooter>
            </Card>
            <DeleteImageModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

const styles = {
    icon: {
        color: 'white',
    },
};
const styles2 = {
    title: {
        fontSize: 20,
        fontWeight: 900,
    },
    icon: {
        width: 24,
        height: 24,
        marginTop: 8,
        marginLeft: 8,
    }
}
export default ImageListItem;