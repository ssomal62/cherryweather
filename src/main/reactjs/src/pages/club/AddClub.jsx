import React, {useEffect, useState} from 'react';
import AddClubSelectCategory from "../../components/club/addClub/AddClubSelectCategory";
import Layout from "../../common/Layout";
import {IoArrowBack} from "react-icons/io5";
import {Progress} from "@nextui-org/react";
import AddClubNameInput from "../../components/club/addClub/AddClubNameInput";
import AnimationLeftInWrapper from "../../utils/animations/AnimationLeftInWrapper";
import {useNavigate, useParams} from "react-router-dom";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import AddClubSettingDetails from "../../components/club/addClub/AddClubSettingDetails";
import AddClubSelectJoinStatus from "../../components/club/addClub/AddClubSelectJoinStatus";
import AddClubInputActivitiesArea from "../../components/club/addClub/AddClubInputActivitiesArea";
import {Cookies} from "react-cookie";
import {clubDetailState} from "../../recoil/hooks/UseClubDetailState";
import {useRecoilValue} from "recoil";
import {instance} from "../../recoil/module/instance";

const AddClub = () => {

    const {clubId} = useParams();

    const club = useRecoilValue(clubDetailState);

    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(20);
    const [animationDirection, setAnimationDirection] = useState('left');

    const [category, setCategory] = useState(clubId ? club.category : '');
    const [subCategory, setSubCategory] = useState(clubId ? club.subCategory : null);
    const [name, setName] = useState(clubId ? club.name : '');
    const [description, setDescription] = useState(clubId ? club.description : '');
    const [file, setFile] = useState('');
    const [joinApprovalStatus, setJoinApprovalStatus] = useState(clubId ? club.joinApprovalStatus : '');
    const [activitiesArea, setActivitiesArea] = useState(clubId ? club.activitiesArea : '');
    const [code, setCode] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const navigate = useNavigate()
    const formData = new FormData();

    const handlePhotoChange = (file) => {
        setFile(file);
    };

    const onSave = async () => {

        const requestData = {
            name              : name,
            description       : description,
            code              : code,
            status            : "PUBLIC",
            category          : category,
            subCategory       : subCategory,
            activitiesArea    : activitiesArea,
            joinApprovalStatus: joinApprovalStatus,
        };

        const cookie = new Cookies();

        if (file) {
            formData.append('file', file);

            try {
                const res = await instance.post('/clubs', requestData, {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`
                    }
                });

                const resFile = await instance.post('/clubs/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                navigate('/');
                console.log('✅[Add Club] Success', res);
                console.log('✅[Add Club Profile] Success', resFile.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };


    const onUpdate = async () => {

        console.log("진입확인");

        const requestData = {
            ...(clubId && {clubId: clubId}),
            name              : name,
            description       : description,
            code              : code,
            status            : "PUBLIC",
            category          : category,
            subCategory       : subCategory,
            activitiesArea    : activitiesArea,
            joinApprovalStatus: joinApprovalStatus,
        };

        const cookie = new Cookies();

        if (file) {
            formData.append('file', file);
            try {
                const res = await instance.put('/clubs', requestData, {
                    headers: {
                        Authorization: `Bearer ${cookie.get('accessToken')}`
                    }
                });

                const resFile = await instance.post('/clubs/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                navigate('/');
                console.log('✅[Update Club] Success', res);
                console.log('✅[Update Club Profile] Success', resFile.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
    };

    const nextStep = () => {
        setStep(step + 1);
        setProgress(progress + 20);
        setAnimationDirection('left');
    };
    const prevStep = () => {
        setStep(step - 1);
        setProgress(progress - 20);
        setAnimationDirection('left');
    }

    const renderStep = () => {
        switch (step) {
            case 1:
                return <AddClubSelectCategory
                    onNext={nextStep}
                    category={category}
                    subCategory={subCategory}
                    setCategory={setCategory}
                    setSubCategory={setSubCategory}
                />;
            case 2:
                return <AddClubNameInput
                    onNext={nextStep}
                    name={name}
                    setName={setName}/>;
            case 3:
                return <AddClubSettingDetails
                    onNext={nextStep}
                    file={file}
                    description={description}
                    setDescription={setDescription}
                    setCode={setCode}
                    onFileSelect={handlePhotoChange}
                />;
            case 4:
                return <AddClubSelectJoinStatus
                    onNext={nextStep}
                    joinApprovalStatus={joinApprovalStatus}
                    setJoinApprovalStatus={setJoinApprovalStatus}/>;
            case 5:
                return <AddClubInputActivitiesArea
                    isClubId={clubId}
                    onSave={onSave}
                    onUpdate={onUpdate}
                    activitiesArea={activitiesArea}
                    setActivitiesArea={setActivitiesArea}/>;
            default:
                return navigate('/');
        }
    };

    return (
        <Layout useHeader={false} useFooter={false} containerPadding="0">
            <div onClick={prevStep}>
                <IoArrowBack style={{width: 30, height: 30, color: 'black'}}/>
            </div>

            <Progress aria-label="Loading..." value={progress} color='danger' className="max-w my-[20px]"/>
            {animationDirection === 'right' ? (
                <AnimationRightInWrapper key={step}>
                    {renderStep()}
                </AnimationRightInWrapper>
            ) : (
                <AnimationLeftInWrapper key={step}>
                    {renderStep()}
                </AnimationLeftInWrapper>
            )}

        </Layout>
    );
};

export default AddClub;

