import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WizardLayout from '../components/wizard/WizardLayout';
import Step1Photo from '../components/wizard/Step1Photo';
import Step2BasicInfo from '../components/wizard/Step2BasicInfo';

export default function WineWizard() {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [wineData, setWineData] = useState<{
        photo?: string;
        nameKr?: string;
        nameEn?: string;
        vintage?: string;
        country?: string;
    }>({});

    const handleStep1Next = (photoData: string) => {
        setWineData(prev => ({ ...prev, photo: photoData }));
        setStep(2);
    };

    const handleStep2Next = (data: { nameKr: string; nameEn: string; vintage: string; country: string }) => {
        setWineData(prev => ({ ...prev, ...data }));
        console.log('Step 2 Complete. Data:', data);
        alert('2단계 완료! 다음 단계는 개발 중입니다.');
        // setStep(3); // Uncomment when Step 3 is ready
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <WizardLayout
            currentStep={step}
            totalSteps={4}
            onBack={handleBack}
            title={step === 1 ? "와인 등록" : "기본 정보"}
            previewImage={step > 1 ? wineData.photo : undefined}
        >
            {step === 1 && (
                <Step1Photo onNext={handleStep1Next} initialPhoto={wineData.photo} />
            )}
            {step === 2 && (
                <Step2BasicInfo onNext={handleStep2Next} initialData={wineData} />
            )}
        </WizardLayout>
    );
}
