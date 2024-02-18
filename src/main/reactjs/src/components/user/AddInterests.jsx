import React, { useEffect, useState } from 'react';
import { FaMoneyBillTrendUp } from 'react-icons/fa6';
import { GrGamepad } from 'react-icons/gr';
import { LuLanguages } from 'react-icons/lu';
import { MdOutlineSelfImprovement, MdOutlineSportsFootball } from 'react-icons/md';
import { PiHandHeartDuotone, PiMountainsDuotone, PiWineDuotone } from 'react-icons/pi';
import { RiMovie2Line } from 'react-icons/ri';
import { TbFriends } from 'react-icons/tb';
import categories from "../club/addClub/categories.json";
import NextButton from '../club/addClub/NextButton';
import { Accordion, AccordionItem, Button } from '@nextui-org/react';
import { useRecoilState } from 'recoil';
import { signUpFormState } from '../../recoil/hooks/UseFetchSignUP';

const AddInterests = ({ onNext }) => {
    const [isNextDisabled, setIsNextDisabled] = useState(true);
    const [category, setCategory] = useState('');
    const [subCategory, setSubCategory] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(category);
    const [selectedSubCategory, setSelectedSubCategory] = useState(subCategory);
    const [form, setForm] = useRecoilState(signUpFormState);
    

    const itemClasses = {
        base     : "py-0 w-full",
        title    : "font-normal text-medium",
        trigger  : "px-2 py-0 data-[hover=true]:bg-default-100 rounded-lg h-14 flex items-center",
        indicator: "text-medium",
        content  : "text-small px-2",
    };

    useEffect(() => {
        setIsNextDisabled(!(category && subCategory));
    }, [category, subCategory]);

    const handleCategorySelect = (name) => {
        setSelectedCategory(name);
        setCategory(name);
    };

    const handleSubCategorySelect = (subcategory) => {
        setSelectedSubCategory(subcategory);
        setSubCategory(subcategory);
    
        // interests 배열에 현재 클릭한 서브카테고리만 설정
        setForm((prevForm) => ({
            ...prevForm,
            interests: [subcategory],
        }));
    
        window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
        });
    };

    console.log('form', form.interests);
    console.log('category', categories.sub);


    const renderIcon = (category) => {
        switch (category) {
            case 'CULTURE_ART':
                return <RiMovie2Line style={{...styles.icon}} />
            case 'ACTIVITY' :
                return <MdOutlineSportsFootball style={{...styles.icon}} />
            case 'FOOD_DRINK' :
                return <PiWineDuotone style={{...styles.icon}} />
            case 'HOBBY' :
                return <GrGamepad style={{...styles.icon}} />
            case 'TRAVEL_COMPANION' :
                return <PiMountainsDuotone style={{...styles.icon}} />
            case 'SELF_IMPROVEMENT' :
                return <MdOutlineSelfImprovement style={{...styles.icon}} />
            case 'LOCAL_COMMUNITY' :
                return <TbFriends style={{...styles.icon}} />
            case 'FINANCE' :
                return <FaMoneyBillTrendUp style={{...styles.icon}} />
            case 'FOREIGN_LANGUAGE' :
                return <LuLanguages style={{...styles.icon}} />
            case 'ROMANCE' :
                return <PiHandHeartDuotone style={{...styles.icon}} />
        }
    }
    return (
        <>
        <span style={{fontSize: 20, fontWeight: 600}} className="mb-[10px]">관심사 선택<small style={{color:"gray"}}> (관심사 추가는 마이페이지에서 가능합니다)</small></span>
        <br/><br/>
        <Accordion
            showDivider={false}
            className="p-2 flex flex-col gap-1 w-full max-w"
            variant="shadow"
            itemClasses={itemClasses}
        >
            {categories.map((category, idx) => (
            <AccordionItem
                key={category.name}
                style = {{
                    border: selectedCategory === category.name ? '1px solid #FF89A1' : '',
                    borderRadius: selectedCategory === category.name ? 10 : '',
                }}
                expanded={selectedCategory === category.name}
                onPress={() => handleCategorySelect(category.name)}
                title={category.description}
                startContent={renderIcon(category.name)}
            >
                <div style={{...styles.category}}>
                    {category.subcategories.map((subcategory, subIdx) => (
                        <Button
                            key={subIdx}
                            radius='lg'
                            style={{color: selectedSubCategory === subcategory ? '' : '#7F7F7F'}}
                            variant={selectedSubCategory === subcategory ? 'solid' : 'ghost'}
                            color={selectedSubCategory === subcategory ? 'danger' : 'default'}
                            className="w-[85px] h-[50px] mb-[7px] mr-[7px]"
                            onClick={()=> handleSubCategorySelect(subcategory)}
                        >{subcategory}</Button>
                    ))}
                </div>
            </AccordionItem>
            ))}
        </Accordion>
        <br/><br/><br/><br/><br/><br/>

        <NextButton isNextDisabled={isNextDisabled} onNext={onNext}/>
    </>
    );
};

export default AddInterests;


const styles = {
    category :{
        display : 'flex',
        justifyContent : 'center',
        alignItems:'center',
        flexWrap:'wrap',
    },
    icon : {
        width : 24,
        height: 24,
        color : '#F31260',
    }
}
