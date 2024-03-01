import React from 'react';
import Layout from '../../common/Layout';
import ImageList from "../../components/ai/image/ImageList";
import SaveImageHeader from "../../components/ai/image/SaveImageHeader";
import {useLocation, useNavigate} from "react-router-dom";

const SavedImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from || '/ai';

    const handleBack = () => {
        navigate(from);
    }

    return (
        <Layout useHeader={false}>
            <SaveImageHeader handleBack={handleBack}/>
            <ImageList/>
        </Layout>
    );
};

export default SavedImage;
