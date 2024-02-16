import React, {useState} from 'react';
import AddClubSelectCategory from "../../components/club/addClub/AddClubSelectCategory";
import Layout from "../../common/Layout";
import {IoArrowBack} from "react-icons/io5";
import {Progress} from "@nextui-org/react";
import AddClubNameInput from "../../components/club/addClub/AddClubNameInput";
import AnimationLeftInWrapper from "../../utils/animations/AnimationLeftInWrapper";
import {useNavigate} from "react-router-dom";
import AnimationRightInWrapper from "../../utils/animations/AnimationRightInWrapper";
import AddClubSettingDetails from "../../components/club/addClub/AddClubSettingDetails";
import AddClubSelectJoinStatus from "../../components/club/addClub/AddClubSelectJoinStatus";
import AddClubInputActivitiesArea from "../../components/club/addClub/AddClubInputActivitiesArea";
import axios from "axios";

const AddClub = () => {

    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(20);
    const [animationDirection, setAnimationDirection] = useState('left');

    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [joinApprovalStatus, setJoinApprovalStatus] = useState('');
    const [activitiesArea, setActivitiesArea] = useState('');
    const [code, setCode] = useState('');

    const navigate = useNavigate()

    const handlePhotoChange = (file) => {
        setFile(file);
    };

    const onSave = async () => {

        const requestData = {
            name              : name,
            description       : description,
            code              : code,
            category          : category,
            subCategory       : subCategory,
            status            : "PUBLIC",
            activitiesArea    : activitiesArea,
            joinApprovalStatus: joinApprovalStatus,
        };

        if (file) {
            const formData = new FormData();
            formData.append('file', file);

            try {
                const res = await axios.post('http://localhost:9002/api/clubs', requestData);
                const resFile = await axios.post('http://localhost:9002/api/clubs/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                navigate('/');
                console.log('Success:', res);
                console.log('Success:', resFile.data);
            }
            catch (error) {
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
                    onSave={onSave}
                    activitiesArea={activitiesArea}
                    setActivitiesArea={setActivitiesArea}/>;
            default:
                return navigate('/');
        }
    };

    return (
        <Layout useHeader={false} useFooter={false}>
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

