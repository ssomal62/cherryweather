import React from 'react';
import Layout from '../../common/Layout';
import ImagePreview from "../../components/ai/image/ImagePreview";

const ImageGenerator = () => {
    return (
        <Layout useHeader={false}>
            <ImagePreview/>
        </Layout>
    );
};

export default ImageGenerator;
