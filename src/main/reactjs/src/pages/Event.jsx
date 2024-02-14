import React, { useState } from 'react';
import Layout from '../common/Layout';
import { Card, CardFooter, Image, Button } from "@nextui-org/react";
const Event = () => {

    // const [reservation, setReservation] = useState({
    //     eventName: '',
    //     date: '',
    //     time: '07:00',
    //     note: '',
    //     notification: '',
    //     quantity: 1,
    // });


    return (
        <Layout>
            <div>
                <Card
                    isFooterBlurred
                    radius="lg"
                    className="border-none"
                >
                    <input type='file' />
                    <Image
                        alt="Woman listing to music"
                        className="object-cover"
                        height={200}
                        src="/images/hero-card.jpeg"
                        width={200}
                    />

                </Card>
            </div>

        </Layout>
    );
};

export default Event;