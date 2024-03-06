import React, {useEffect, useRef, useState} from 'react';
import Layout from "../../common/Layout";
import FeedEditorHeader from "../../components/feed/feedEditor/FeedEditorHeader";
import styled from "styled-components";
import {Button, Chip, Divider, Image, Textarea} from "@nextui-org/react";
import {BsReverseLayoutTextSidebarReverse} from "react-icons/bs";
import {MdOutlineAddPhotoAlternate} from "react-icons/md";
import WeatherRadio from "../../components/feed/feedEditor/WeatherRadio";
import {v4 as uuidv4} from 'uuid';
import {instance} from "../../recoil/module/instance";
import {useNavigate, useParams} from "react-router-dom";
import {Cookies} from "react-cookie";
import PublicRadio from "../../components/feed/feedEditor/PublicRadio";
import {WiDayCloudy} from "react-icons/wi";
import {useRecoilValue} from "recoil";
import {clubDetailState} from "../../recoil/hooks/UseClubApi";

const FeedEditor = () => {

    const { feedId} = useParams();
    const { clubId } = useParams();

    const feedDetails = {
        //feed 수정은 이런식으로 json 데이터 받아오면 됩니다.
        isPublic: false,
        weather: "눈폭풍",
        content:"내용이 이러쿵저러푸우우웅",
        code : "default.gif",
    }

    const club = useRecoilValue(clubDetailState).clubDetail;

    const defaultImage = "https://kr.object.ncloudstorage.com/cherry-weather/feed-files/feedSample.gif";

    const [content, setContent] = useState(feedId ? feedDetails.content : '')
    const [isPublic, setIsPublic] = useState(feedId ? feedDetails.isPublic : true)
    const [weather, setWeather] = useState(feedId ? feedDetails.weather : '맑음')
    const [code, setCode] = useState(feedId ? feedDetails.code : '');

    const [file, setFile] = useState('')
    const [preview, setPreview] = useState();
    const [fileSelected, setFileSelected] = useState(false);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const formData = new FormData();
    const cookie = new Cookies();

    useEffect(() => {
        if (file) {
            const fileReader = new FileReader();
            fileReader.onloadend = () => {
                setPreview(fileReader.result);
            };
            fileReader.readAsDataURL(file);
        } else {
            // 파일이 없을 때 기본 이미지로 설정합니다.
            setPreview(defaultImage);
        }
    }, [file]);
    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            const file = e.target.files[0];
            const shortUUID = generateShortUUID()
            const extension = getFileExtension(file.name);
            const newFileName = 'fd-'+ shortUUID + '.jpg'; //+ extension; // 새로운 파일 이름
            const modifiedFile = new File([file], newFileName, { type: file.type });

            setCode('fd-'+ shortUUID);
            handlePhotoChange(modifiedFile);
        }
    };

    const handlePhotoChange = (file) => {
        setFile(file);
    };

    const getFileExtension = (fileName) => {
        return fileName.split('.').pop();
    }

    const generateShortUUID = () => {
        const uuid = uuidv4();
        const uuidWithoutHyphen = uuid.replace(/-/g, '');
        return uuidWithoutHyphen.substring(0, 7);
    }

    const onFileUpload = async () => {
        formData.append("file", file);
        try {
            const resFile = await instance.post("/feeds/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("✅[Feed File] Success", resFile.data);
        } catch (error) {
            console.error("[Feed File] Error:", error);
        }
    };

    const onSave = async () => {

        const requestData = {
            ...(feedId && {feedId: feedId}),
            clubId: club.clubId,
            weather: weather,
            feedCode: code,
            content: content,
            isPublic: isPublic,
        };

        try {
            const res = await instance.post("/feeds", requestData, {
                headers: {
                    Authorization: `Bearer ${cookie.get("accessToken")}`,
                },
            });

            if (file) {
                await onFileUpload();
            }
            console.log("✅[Add Feed] Success", res);

            navigate(`/club-feed/${club.clubId}`);
        } catch (error) {
            console.error("[Add Feed] Error:", error);
        }
    };

    return (
        <Layout useFooter={false} useHeader={false} containerMargin="0" containerPadding="0">
            <FeedEditorHeader onSave={onSave}/>
            <Divider/>
            <Section>
                <PublicRadio isPublic={isPublic} setIsPublic={setIsPublic} />
            </Section>
            <Section>
                <Chip
                    startContent={<WiDayCloudy/>}
                    color="primary'"
                    variant="light"
                    className='mb-2'
                >오늘 날씨는 어땠나요?</Chip>
                <WeatherRadio setWeather={setWeather} />
            </Section>
            <Section>
                <div className="flex w-full flex-col md:flex-nowrap mb-3">
                    <Chip
                        startContent={<BsReverseLayoutTextSidebarReverse/>}
                        color="primary'"
                        variant="light"
                    >피드 내용</Chip>

                    <Textarea type="text"
                              variant='flat'
                              radius="full"
                              value={content}
                              classNames={{
                                  base : "max-w-full",
                                  input: "resize-y min-h-[250px]",
                              }}
                              placeholder="오늘은 무슨 일이 있었나요?"
                              onChange={handleContentChange}
                    />
                </div>
                <input
                    name="file"
                    type="file"
                    style={{display: "none"}}
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                {
                    (fileSelected || feedId) ? (
                        <Image
                            removeWrapper
                            alt="clubProfilePicture"
                            className="z-0 w-full object-cover h-[220px] object-middle"
                            src={preview}
                            style={{border: '1px solid #E4E4E7', cursor: 'pointer', borderRadius:'20px'}}
                        />
                    ) : (
                        <div onClick={handleClick}>
                            <Button
                                color="primary'"
                                variant="bordered"
                                style={{width: '100%', height: '220px', border: '1px solid #E4E4E7', borderRadius:'20px'}}
                                onClick={handleClick}
                                startContent={<>
                                    <MdOutlineAddPhotoAlternate style={{width: '50px', height: '50px', color: 'gray'}}/>
                                </>}
                            />
                        </div>
                    )
                }
            </Section>
        </Layout>
    );
};

export default FeedEditor;

const Section = styled.div`
  padding: 20px;
`
