import React, {useEffect, useState} from "react";
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
import {clubDetailState} from "../../recoil/hooks/UseClubApi";
import {useRecoilValue} from "recoil";
import {instance} from "../../recoil/module/instance";
import AddClubInputNotice from "../../components/club/addClub/AddClubInputNotice";

const AddClub = () => {
  const {clubId} = useParams();

  const club = useRecoilValue(clubDetailState).clubDetail;

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(20);
  const [animationDirection, setAnimationDirection] = useState("left");

  const [category, setCategory] = useState(clubId ? club.category : "");
  const [subCategory, setSubCategory] = useState(
    clubId ? club.subCategory : ""
  );
  const [name, setName] = useState(clubId ? club.name : "");
  const [description, setDescription] = useState(
    clubId ? club.description : ""
  );
  const [notice, setNotice] = useState(clubId ? club.notice : "");
  const [file, setFile] = useState("");
  const [joinApprovalStatus, setJoinApprovalStatus] = useState(
    clubId ? club.joinApprovalStatus : ""
  );
  const [activitiesArea, setActivitiesArea] = useState(
    clubId ? club.activitiesArea : ""
  );
  const [code, setCode] = useState(clubId ? club.code : "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navigate = useNavigate();
  const formData = new FormData();
  const cookie = new Cookies();

  const requestData = {
    ...(clubId && {clubId: clubId}),
    name: name,
    description: description,
    code: code,
    notice: notice,
    category: category,
    subCategory: subCategory,
    activitiesArea: activitiesArea,
    joinApprovalStatus: joinApprovalStatus,
    status: "PUBLIC",
  };

  const handlePhotoChange = (file) => {
    setFile(file);
  };

  const onFileUpload = async () => {
    formData.append("file", file);
    try {
      const resFile = await instance.post("/clubs/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("✅[Upload Profile] Success", resFile.data);
    } catch (error) {
      console.error("Upload Profile Error:", error);
    }
  };

  const onSave = async () => {
    try {
      const res = await instance.post("/clubs", requestData, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });
      if (file) {
        await onFileUpload();

        console.log("✅[Add Club] Success", res);
      }

      const alarmData = {
        name: null,
        targetId: res.data.clubId,
        type: "CLUB",
        importance: 1,
        description: "새로운 클럽이 생성되었습니다.",
      };

      sendAlarmData(alarmData);
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendAlarmData = async (data) => {
    try {
      await instance.post("/alarm", data, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });
    } catch (error) {
      console.error("Alarm Data Error:", error);
    }
  };

  const onUpdate = async () => {
    try {
      const res = await instance.put("/clubs", requestData, {
        headers: {
          Authorization: `Bearer ${cookie.get("accessToken")}`,
        },
      });
      if (file) {
        await onFileUpload();
      }

      navigate(`/club-details/${clubId}`);
      console.log("✅[Update Club] Success", res);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const nextStep = () => {
    setStep(step + 1);
    setProgress(progress + 16.7);
    setAnimationDirection("left");
  };

  const prevStep = () => {
    setStep(step - 1);
    setProgress(progress - 16.7);
    setAnimationDirection("left");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <AddClubSelectCategory
            onNext={nextStep}
            category={category}
            subCategory={subCategory}
            setCategory={setCategory}
            setSubCategory={setSubCategory}
          />
        );
      case 2:
        return (
          <AddClubNameInput onNext={nextStep} name={name} setName={setName} />
        );
      case 3:
        return (
          <AddClubSettingDetails
            onNext={nextStep}
            file={file}
            description={description}
            setDescription={setDescription}
            setCode={setCode}
            onFileSelect={handlePhotoChange}
          />
        );
      case 4:
        return (
          <AddClubSelectJoinStatus
            onNext={nextStep}
            joinApprovalStatus={joinApprovalStatus}
            setJoinApprovalStatus={setJoinApprovalStatus}
          />
        );
      case 5:
        return (
          <AddClubInputActivitiesArea
            onNext={nextStep}
            activitiesArea={activitiesArea}
            setActivitiesArea={setActivitiesArea}
          />
        );
      case 6:
        return (
          <AddClubInputNotice
            notice={notice}
            setNotice={setNotice}
            isClubId={clubId}
            onSave={onSave}
            onUpdate={onUpdate}
          />
        );
      default:
        return navigate(-1);
    }
  };

  return (
    <Layout useHeader={false} useFooter={false} containerPadding="0">
      <div onClick={prevStep}>
        <IoArrowBack style={{width: 30, height: 30, color: "black"}} />
      </div>

      <Progress
        aria-label="Loading..."
        value={progress}
        color="danger"
        className="max-w my-[20px]"
      />
      {animationDirection === "right" ? (
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
